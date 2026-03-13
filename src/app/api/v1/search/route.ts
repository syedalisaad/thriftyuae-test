import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return NextResponse.json({ success: false, message: "Invalid Content-Type" }, { status: 400 });
    }

    const body = await request.json();

    const validations = [
      { id: "pick_up_city", label: "Pick Up City" },
      { id: "pick_up_location", label: "Pick Up Location" },
      { id: "pick_up_date", label: "Pick Up Date" },
      { id: "pick_up_time", label: "Pick Up Time" },
    ];

    if (body.activeTab === "Start Booking") {
      validations.push(
        { id: "drop_off_city", label: "Drop Off City" },
        { id: "drop_off_date", label: "Drop Off Date" },
        { id: "drop_off_time", label: "Drop Off Time" }
      );
    }

    const errors = validations
      .filter((v) => !body[v.id] || String(body[v.id]).trim() === "")
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
        { 
          status: 422,
          headers: {
            "X-Content-Type-Options": "nosniff", 
          }
        }
      );
    }

    const mockCars = [
      { id: 1, name: "Toyota Corolla", price: "120 AED/day", image: "/cars/corolla.png" },
      { id: 2, name: "Nissan Sunny", price: "100 AED/day", image: "/cars/sunny.png" },
      { id: 3, name: "Mitsubishi Pajero", price: "250 AED/day", image: "/cars/pajero.png" }
    ];

    return NextResponse.json({ 
      success: true, 
      results: mockCars,
      metadata: {
        timestamp: new Date().toISOString(),
        count: mockCars.length
      }
    });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}