import { ConnectDB } from "@/connect/db/mongoDb";
import { Contact } from "@/models/contact/ContactSchema";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  await ConnectDB();
  const { fullName, email, address, phoneNumber } = await req.json();
  try {
    const newContact = await Contact.create({
      fullName,
      email,
      address,
      phoneNumber,
    });
    return NextResponse.json(newContact);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const GET = async () => {
  await ConnectDB();
  try {
    const count = await Contact.find().countDocuments();
    const getContacts = await Contact.find();
    return NextResponse.json({ count, getContacts });
  } catch (error) {
    throw new Error(error.message);
  }
};
