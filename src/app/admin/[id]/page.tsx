import Room from "@/components/Chat/Room"

export default function ChatPage({ params }: { params: { id: string } }) {
  return <Room roomId={params.id} />
}
