import getVGMDB from '@sittingonclouds/vgmdb-parser'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params
  const album = await getVGMDB(`https://vgmdb.net/album/${id}`)

  return Response.json(album)
}
