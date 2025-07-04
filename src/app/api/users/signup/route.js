import { connect } from "@dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@models/userModel";

connect();

export async function POST() {
  try {
    const reqBody = await req.json();
    const { username, email, password } = reqBody;

    console.log(reqBody);

    //check if user exists
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // hashpassword
    const salt = await bcryptjs.genSalt(10);
    const hashpassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      hashpassword,
    });

    const savedUser = newUser.save();
    console.log(savedUser);

    return NextResponse.json({
      message: "User Created Succesfully",
      success: true,
      savedUser,
    });

    
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
