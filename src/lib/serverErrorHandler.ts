export const serverErrorHandler = (e: unknown, customMessage: string = "Something went wrong") => {
  const error = e as unknown as { message?: string }
  console.error(e)
  return Response.json({ message: error?.message || customMessage }, { status: 500 })
}
