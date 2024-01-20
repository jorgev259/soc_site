import getVGMDB from '@sittingonclouds/vgmdb-parser'
import { type Album } from '@sittingonclouds/vgmdb-parser/src/types'

export async function GET (req: Request, { params } : {params: {id: string}}) {
  const { id } = params
  const album: Album = await getVGMDB(`https://vgmdb.net/album/${id}`)

  return Response.json(album)
}
