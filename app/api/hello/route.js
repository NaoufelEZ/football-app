export async function GET() {
  return Response.json({ 
    message: 'Merhaba Football API!',
    timestamp: new Date().toISOString()
  });
}