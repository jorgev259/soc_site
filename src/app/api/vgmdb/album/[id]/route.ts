import getPuppeteer from 'vgmdb-parser/lib/puppeteer'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params
  const album = await getPuppeteer(`https://vgmdb.net/album/${id}`)

  return Response.json(album)
}
