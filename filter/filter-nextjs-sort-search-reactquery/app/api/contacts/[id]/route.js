import { ConnectDB } from "@/connect/db/mongoDb";
import { Contact } from "@/models/contact/ContactSchema";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const { id } = params;

    const { fullName, email, address, phoneNumber } = await request.json();
    await ConnectDB();
    const updated = await Contact.findByIdAndUpdate(id, {
      fullName,
      email,
      address,
      phoneNumber,
    });
    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    throw new Error(error.message);
  }
}

export const DELETE = async (req, { params }) => {
  const { id } = params;
  try {
    await ConnectDB();
    await Contact.findByIdAndDelete(id);
    return NextResponse.json({ msg: "Contact is Deleted" }, { status: 200 });
  } catch (error) {
    throw new Error(error.message);
  }
};
