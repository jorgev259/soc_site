export const getCDNUrl = (id, type) =>
  `https://cdn.sittingonclouds.net/${type}/${id}.png`
export const getNextCDNUrl = (
  id,
  type,
  options = { quality: 50, width: 250, height: 250 }
) =>
  `/_next/image?w=${options.width}&h=${options.height}&q=${options.quality}&url=${getCDNUrl(id, type)}`
