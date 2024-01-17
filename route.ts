import axios from 'axios'
import { CheerioAPI, load, text } from 'cheerio'
import path from 'path'

interface Album {
  title: string
  subTitle: string
}

async function getHTML (stringPath: string): Promise<CheerioAPI> {
  const url = path.join('https://vgmdb.net', stringPath)
  const { data } = await axios.get(url, { headers: { 'Content-Type': 'text/html' } })
  const $ = load(data)

  return $
}

export async function GET (req: Request, { params } : {params: {id: string}}) {
  const { id } = params
  const $ = await getHTML(path.join('album', id))

  const titleElement = $('#innermain > h1:has(.albumtitle) span[style*="display:inline"]')[0]
  const title = text(titleElement.children)

  const subTitleElement = $('#innermain > div:has(.albumtitle) span[style*="display:inline"]')[0]
  const subTitle = text(subTitleElement.children)

  const result: Album = { title, subTitle }

  return Response.json(result)
}
