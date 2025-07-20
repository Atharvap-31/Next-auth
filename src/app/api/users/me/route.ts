import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../dbConfig/dbCongfig";
import User from "../../../../models/userModel";
import { getTokenData } from "@/helpers/getTokenData";

connect();

export const GET = async (request: NextRequest) => {
  try {
    const userId = await getTokenData(request);
    const user = await User.findOne({ _id: userId }).select("-password");

    return NextResponse.json({
      message: "User Found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
};
