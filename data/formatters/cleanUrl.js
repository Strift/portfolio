export default function (websiteUrl) {
  let hostname
  try {
    const url = new URL(websiteUrl)
    hostname = url.hostname
  } catch (error) {
    hostname = websiteUrl
  }
  return hostname
}
