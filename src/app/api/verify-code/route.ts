import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
// import { z } from "zod";
// import { usernameValidation } from "@/schemas/signUpSchema";

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { username, code } = await req.json();
    const decodedUsername = decodeURIComponent(username);
    const user = await UserModel.findOne({ username: decodedUsername });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: `User Not Found`,
        },
        {
          status: 500,
        }
      );
    }

    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();
      return Response.json(
        {
          success: true,
          message: `Account verified Successfully`,
        },
        {
          status: 200,
        }
      );
    } else if (!isCodeNotExpired) {
      return Response.json(
        {
          success: false,
          message: `Verfication Code Expired`,
        },
        {
          status: 400,
        }
      );
    } else {
      return Response.json(
        {
          success: false,
          message: `Incorrect Verfication Code`,
        },
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    console.error("Error Verifying User: " + error);
    return Response.json(
      {
        success: false,
        message: `Verifying User: ${error}`,
      },
      {
        status: 500,
      }
    );
  }
}
