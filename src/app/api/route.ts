import axios from 'axios'
import { Cheerio, CheerioAPI, load, text } from 'cheerio'
import path from 'path'

type LangField = {[lang: string] :string}

interface LangAlbum {
  title: LangField
  subTitle: LangField
}

function cheerioEntries (element: Cheerio<Element>): Element[] {
  const result = []

  for (let i = 0; i < element.length; i++) {
    result.push(element[i])
  }

  return result
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
  const result: LangAlbum = { title: {}, subTitle: {} }

  cheerioEntries($('#innermain > h1:has(.albumtitle) span'))
    .forEach(c => {
      const { attribs, children, type } = c
      if (type !== 'tag') return

      const { lang } = attribs
      const title = text(children.filter(c => c.name !== 'em'))
      result.title[lang] = title
    })

  cheerioEntries($('#innermain > div:has(.albumtitle) span'))
    .forEach(c => {
      const { attribs, children, type } = c
      if (type !== 'tag') return

      const { lang } = attribs
      const subTitle = text(children.filter(c => c.name !== 'em'))
      result.subTitle[lang] = subTitle
    })

  return Response.json(result)
}
