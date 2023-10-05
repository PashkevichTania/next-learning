interface Post {
  id: string
  username: string
  media_url: string
  media_type: string
  permalink: string
  caption: string
}
async function getData() {
  const fields = "id,username,caption,media_url,timestamp,media_type,permalink"
  const url = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${process.env.INSTAGRAM_CLIENT_TOKEN}`
  const response = await fetch(url)
  const { data } = await response.json()

  // console.log(feed)

  return data as Post[]
}

// async function getPageId(userId: string, token: string) {
//   // const url = `https://graph.facebook.com/v18.0/${userId}?fields=access_toke?access_token=${token}`
//   const url = `https://graph.facebook.com/v18.0/me/accounts?access_token=${token}`
//
//   const response = await fetch(url)
//   const { data } = await response.json()
//
//   return data
// }

export default async function Gallery() {
  const data = await getData()

  return (
    <div>
      <h2 className="text-center font-bold text-xl mb-4">Instagram Feed</h2>
      <div className="instagram-posts">
        {data?.map((post) => (
          <div key={post.id} className="instagram-post">
            <img src={post.media_url} alt={post.caption} />
            <p>{post.caption}</p>
            <a href={post.permalink} target="_blank" rel="noopener noreferrer">
              View on Instagram
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
