import { composeResolvers } from '@graphql-tools/resolvers-composition'
import { UserInputError } from 'apollo-server-errors'
// import { holdRequest, completeRequest, rejectRequest } from '@lotus-tree/requestcat/lib/util'

import { hasRole, isAuthed } from '../../../utils/resolvers'
// import { discordClient } from '../../../utils/plugins'
import { mergeResolvers } from '@graphql-tools/merge'

const resolvers = {
  Mutation: {
    editRequest: async (parent, data, { db, user }, info) => {
      const request = await db.models.request.findByPk(data.id)
      if (!request) throw new UserInputError('Request not found')

      await db.transaction(async transaction => {
        await request.set(data, { transaction })

        if (request.changed('state')) {
          switch (request.state) {
          case 'complete':
            // await completeRequest(discordClient, db, process.env.GUILD, request)
            break

          case 'hold':
            // await holdRequest(discordClient, db, process.env.GUILD, request, data.reason)
            break
          }
        }

        await request.save({ transaction })
      })

      return request
    },

    rejectRequest: async (parent, data, { db, user }, info) => {
      const request = await db.models.request.findByPk(data.id)
      if (!request) throw new UserInputError('Request not found')

      // await rejectRequest(discordClient, db, process.env.GUILD, request, data.reason)
      return true
    }
  }
}

const submitActions = {
  Mutation: {
    submitAlbum: async (parent, data, { db, user }, info) => {
      const { request: requestId, title, vgmdb, links } = data
      let request

      if (requestId) {
        request = await db.models.request.findByPk(requestId)

        if (!request) throw new UserInputError('Request not found')
        if (request.state === 'complete') throw new UserInputError('Request already complete')
      }

      return db.models.submission.create({
        title,
        vgmdb,
        links,
        requestId,
        userUsername: user.username
      })
    }
  }
}

const requestResolvers = composeResolvers(resolvers, { 'Mutation.*': hasRole('REQUESTS') })
const submitResolvers = composeResolvers(submitActions, { 'Mutation.*': [isAuthed] })

export default mergeResolvers([requestResolvers, submitResolvers])
