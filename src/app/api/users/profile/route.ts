import { getDataFromToken } from "@/helpers/tokenData";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import connect from "@/db/dbconfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json(
      {
        message: "User found",
        user,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
