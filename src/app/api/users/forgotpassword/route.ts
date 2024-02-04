import connect from "@/db/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: Request) {
  try {
    const { verifyEmail } = await request.json();
    console.log("forgot email is", verifyEmail);
    //check if user already exists
    const user = await User.findOne({ email: verifyEmail });
    // const user = await User.findOne({ email });

    console.log("user is ", user);
    if (!user) {
      return NextResponse.json(
        { error: "User doesn't exists" },
        { status: 400 }
      );
    }

    //hash password
    // const salt = await bcryptjs.genSalt(10);
    // const hashedPassword = await bcryptjs.hash(password, salt);

    // const newUser = new User({
    //   username,
    //   email,
    //   password: hashedPassword,
    // });

    // const savedUser = await newUser.save();
    // console.log(savedUser);

    //send verification email

    const mailResponse = await sendEmail({
      email: verifyEmail,
      emailType: "RESET",
      userId: user._id,
    });
    console.log("mail response is ", mailResponse);
    return NextResponse.json(
      {
        message: "Forget password Email send successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
