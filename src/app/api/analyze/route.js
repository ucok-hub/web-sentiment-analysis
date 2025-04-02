// app/api/analyze/route.js
export async function POST(request) {
  try {
    const { review } = await request.json()

    // Simulasi analisis: jika review mengandung kata "baik", hasilnya Positif
    const simulatedResult = review.toLowerCase().includes('baik')
      ? 'Positif'
      : 'Negatif'

    return new Response(JSON.stringify({ sentiment: simulatedResult }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Terjadi kesalahan saat memproses data.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    )
  }
}
