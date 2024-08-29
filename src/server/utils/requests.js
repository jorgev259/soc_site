import axios from 'axios'

import { getNextCDNUrl } from '@/next/utils/getCDN'

async function postWebhook(album, userText = '') {
  const url = `https://www.sittingonclouds.net/album/${album.id}`
  const content = `${url}${userText}`
  const artists = await album.getArtists()
  const embeds = [
    {
      title: album.title,
      type: 'rich',
      description: album.subTitle || artists.map((a) => a.name).join(' - '),
      url,
      color: album.headerColor,
      thumbnail: {
        url: getNextCDNUrl(album.id, 'album')
      }
    }
  ]
  const payload = { content, embeds }

  axios.post(process.env.WEBHOOK_URL, payload).catch((err) => console.log(err))
}

export const requestPOST = (operation, body) =>
  axios.post(`http://localhost:${process.env.REQUESTPORT}/${operation}`, body)

export async function handleComplete(db, data, album) {
  if (data.request) {
    db.models.request.findByPk(data.request).then(async (request) => {
      if (request.state === 'complete') return

      await requestPOST('complete', { requestId: request.id })

      const userText =
        request.userID || request.user
          ? ` ${request.userID ? `<@${request.userID}>` : `@${request.user}`} :arrow_down:`
          : ''

      postWebhook(album, userText)
    })
  } else {
    postWebhook(album)
  }
}
