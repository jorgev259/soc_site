
import axios from 'axios'

export async function postWebhook (album, userText = '') {
  const url = `https://www.sittingonclouds.net/album/${album.id}`
  const content = `${url}${userText}`
  const payload = { content }

  axios.post(process.env.WEBHOOK_URL, payload)
    .catch(err => console.log(err))
}
