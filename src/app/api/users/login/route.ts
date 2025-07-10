import { connect } from "../../../../dbConfig/dbCongfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "../../../../models/userModel";
import jwt from "jsonwebtoken";

connect();

export async function POST(response: NextResponse) {
  try {
    const reqBody = await response.json();

    const { email, password } = reqBody;

    console.log(reqBody);

    // if User does not  exists
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User does not already exists" },
        { status: 400 }
      );
    }

    // if password does not exits

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // create Token Data

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // create token

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const responseCookie = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    responseCookie.cookies.set("token", token, {
      httpOnly: true,
    });

    return responseCookie;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
