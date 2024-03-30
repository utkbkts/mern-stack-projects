import { connect } from "@/connect";
import { Contacts } from "@/model/ContactModel";
import { NextResponse } from "next/server";

await connect();

export const POST = async (req) => {
  const { fullname, email, address, phonenumber } = await req.json();
  try {
    const NewContact = await Contacts.create({
      fullname,
      email,
      address,
      phonenumber,
    });
    return NextResponse.json({
      success: true,
      status: 201,
      data: NewContact,
      message: "Created is successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};

export const GET = async () => {
  try {
    const getContacts = await Contacts.find();
    return NextResponse.json({
      data: getContacts,
      success: false,
      message: "error fetch get",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};
