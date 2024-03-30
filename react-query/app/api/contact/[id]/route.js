import { Contacts } from "@/model/ContactModel";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  const { id } = params;

  try {
    await Contacts.findByIdAndDelete(id);
    return NextResponse.json({ msg: "Contact is deleted", status: 200 });
  } catch (error) {
    console.log(error);
  }
};
export async function PUT(req, { params }) {
  try {
    const { id } = params;

    const body = await req.json();
    await Contacts.findByIdAndUpdate(id, {
      ...body,
    });

    return NextResponse.json({ message: "Data updated" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
