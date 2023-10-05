interface Post {
  id: string
  username: string
  media_url: string
  media_type: string
  permalink: string
  caption: string
  timestamp: string
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
      <div className="flex flex-row align-center flex-wrap justify-between">
        {data?.map((post) => (
            <div key={post.id} className="card card-compact w-96 bg-base-100 shadow-xl mb-2 mr-2">
              <figure><img src={post.media_url} alt="post" /></figure>
              <div className="card-body">
                <h2 className="card-title">{post.username}</h2>
                <p>{post.caption}</p>
                <p>{post.timestamp}</p>
                <div className="card-actions justify-end">
                  <a
                      className="btn btn-outline btn-primary"
                      role="button"
                      href={post.permalink}
                      target="_blank"
                      rel="noopener noreferrer">
                    View on Instagram
                  </a>
                </div>
              </div>
            </div>
        ))}
      </div>
    </div>
  )
}
