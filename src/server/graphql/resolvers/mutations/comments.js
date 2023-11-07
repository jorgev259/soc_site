import { composeResolvers } from '@graphql-tools/resolvers-composition'
// import axios from 'axios'

import { isAuthed } from '../../../utils/resolvers'

// const token = process.env.IRONCLAD

const resolversComposition = {
  'Mutation.*': [isAuthed]
}

const resolvers = {
  Mutation: {
    updateComment: async (_, { text, anon, albumId }, { db, user, res }) => (
      db.transaction(async transaction => {
        const { username } = user
        const row = await db.models.comment.findOne({ where: { albumId, username } })

        if (row) {
          await row.update({ text, anon }, { transaction })
          await row.save({ transaction })
        } else await db.models.comment.create({ albumId, username, text, anon }, { transaction })

        return true
      })
    ),
    addFavorite: async (_, { albumId }, { db, user, res }) => (
      db.transaction(async transaction => {
        await user.addAlbum(albumId, { transaction })
        return true
      })
    ),
    removeFavorite: async (_, { albumId }, { db, user, res }) => (
      db.transaction(async transaction => {
        await user.removeAlbum(albumId, { transaction })
        return true
      })
    ),
    rateAlbum: async (_, { albumId, score }, { db, user, res }) => (
      db.transaction(async transaction => {
        const { username } = user
        const row = await db.models.rating.findOne({ where: { albumId, username } })

        if (row) {
          await row.update({ score }, { transaction })
          await row.save({ transaction })
        } else await db.models.rating.create({ albumId, username, score }, { transaction })

        return true
      })
    )
  }
}

export default composeResolvers(resolvers, resolversComposition)
