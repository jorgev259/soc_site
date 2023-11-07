import { UserInputError } from 'apollo-server-errors'
import { composeResolvers } from '@graphql-tools/resolvers-composition'

import { img, createLog, createUpdateLog, getImgColor, slugify } from '../../../utils'
import { discordClient, postWebhook } from '../../../utils/plugins'
import { hasRole } from '../../../utils/resolvers'
// import { completeRequest } from '@lotus-tree/requestcat/lib/util'

const resolversComposition = { 'Mutation.*': hasRole('CREATE') }
const resolvers = {
  Mutation: {
    createAlbum: async (parent, data, { db, user }, info) => (
      db.transaction(async transaction => {
        data.artists = data.artists ? data.artists.map(artist => { return { name: artist, slug: slugify(artist) } }) : []
        await db.models.artist.bulkCreate(data.artists, { ignoreDuplicates: true, transaction })

        const album = await db.models.album.create(data, {
          include: [db.models.disc, db.models.store, {
            model: db.models.download, include: [db.models.link]
          }],
          transaction
        })

        await Promise.all([
          album.setArtists(data.artists.filter(({ slug }) => slug.length > 0).map(({ slug }) => slug), { transaction }),
          album.setCategories(data.categories || [], { transaction }),
          album.setClassifications(data.classifications || [], { transaction }),
          album.setPlatforms(data.platforms || [], { transaction }),
          album.setGames(data.games || [], { transaction }),
          album.setAnimations(data.animations || [], { transaction }),
          album.setRelated(data.related || [], { transaction }),
          createLog(db, 'createAlbum', data, user.username, transaction)
        ])

        const { id } = album.dataValues
        album.placeholder = data.cover ? await img(data.cover, 'album', id) : undefined
        album.headerColor = data.cover ? await getImgColor(`album/${id}`) : undefined

        await album.save({ transaction })

        if (album.status === 'show') {
          if (data.request) {
            db.models.request.findByPk(data.request)
              .then(async request => {
                if (request.state === 'complete') return

                // await completeRequest(discordClient, db, process.env.GUILD, request)
                const guild = await discordClient.guilds.fetch(process.env.GUILD)
                await guild.channels.fetch()

                const userText = request.userID || request.user
                  ? ` ${request.userID ? `<@${request.userID}>` : `@${request.user}`} :arrow_down:`
                  : ''

                postWebhook(album, userText)
              })
          } else {
            postWebhook(album)
          }
        }

        return album
      })
    ),

    deleteAlbum: async (parent, { id }, { db, user, res }, info) => {
      const album = await db.models.album.findByPk(id)
      if (!album) throw new UserInputError('Not Found')
      return db.transaction(async transaction => {
        await createUpdateLog(db, 'deleteAlbum', album, user.username, transaction)
        await album.destroy({ transaction })
        return 1
      })
    }
  }
}

export default composeResolvers(resolvers, resolversComposition)
