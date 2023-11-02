import { Types } from "@/app/types/types"
import Image from "next/image"

async function getData() {
  const fields = "id,username,caption,media_url,timestamp,media_type,permalink"
  const url = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${process.env.INSTAGRAM_CLIENT_TOKEN}`

  // This request should be refetched on every request.
  // Similar to `getServerSideProps`.
  // https://nextjs.org/blog/next-13#data-fetching
  const response = await fetch(url, { cache: "no-store" })
  const { data } = await response.json()

  return data as Types[]
}

export default async function Gallery() {
  const data = await getData()

  return (
    <div>
      <h2 className="text-center font-bold text-xl mb-4">Instagram Feed</h2>
      <div className="flex flex-row align-center flex-wrap justify-between">
        {data?.map((post) => (
          <div key={post.id} className="card card-compact w-96 bg-base-100 shadow-xl mb-2 mr-2">
            <figure>
              <Image src={post.media_url} alt="post" width="384" height="384" />
            </figure>
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
                  rel="noopener noreferrer"
                >
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
