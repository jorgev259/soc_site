/* const tokenCompare = process.env.IRONCLAD

async function handler (req, res) {
  const { token, revalidate = [] } = req.body

  if (req.method !== 'POST' || token !== tokenCompare) throw new Error('Forbidden')
  if (revalidate.length === 0) throw new Error('No specified paths to revalidate')

  await Promise.all(revalidate.map(p => res.revalidate(p)))

  return res.json({ success: true, revalidate })
}

export default handler */
