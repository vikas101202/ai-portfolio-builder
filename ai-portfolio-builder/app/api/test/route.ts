export async function GET() {
  const key = process.env.OPENAI_API_KEY;

  return Response.json({
    exists: !!key,
    preview: key?.slice(0, 10),
  });
}