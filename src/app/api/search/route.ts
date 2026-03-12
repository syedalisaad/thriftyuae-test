import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validations = [
      { id: "pick_up_city", label: "Pick Up City" },
      { id: "pick_up_location", label: "Pick Up Location" },
      { id: "pick_up_date", label: "Pick Up Date" },
      { id: "pick_up_time", label: "Pick Up Time" },
    ];

    const errors = validations
      .filter((v) => !body[v.id] || body[v.id].trim() === "")
      .map((v) => ({
        field: v.id,
        message: `${v.label} is required`
      }));

    if (errors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          errors: errors, 
        },
        { status: 422 }
      );
    }

    return NextResponse.json({ success: true, results: [] });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}