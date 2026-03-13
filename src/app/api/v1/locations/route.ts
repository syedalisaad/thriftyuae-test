import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const locations = [
      {
        city: "Dubai",
        areas: ["Dubai Marina", "Downtown Dubai", "Jumeirah", "Al Barsha", "DXB Airport"]
      },
      {
        city: "Abu Dhabi",
        areas: ["Yas Island", "Corniche", "Al Reem Island", "Khalifa City", "AUH Airport"]
      },
      {
        city: "Sharjah",
        areas: ["Al Majaz", "Al Nahda", "Sharjah University City", "SHJ Airport"]
      }
    ];

    return NextResponse.json(
      {
        success: true,
        data: locations,
        metadata: {
          total_cities: locations.length,
          last_updated: new Date().toISOString()
        }
      },
      {
        status: 200,
        headers: {
          // 1. OPEN API REQUIREMENT
          'Access-Control-Allow-Origin': '*', 
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          
          // 2. SECURITY HEADERS
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
          
          // 3. PERFORMANCE
          'Cache-Control': 's-maxage=3600, stale-while-revalidate',
        }
      }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}