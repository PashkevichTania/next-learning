export default function ChatPage({ params }: { params: { id: string } }) {
  return <div>My Chat: {params.id}</div>
}