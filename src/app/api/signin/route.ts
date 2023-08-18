import { db } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET (request : NextRequest) {
    const client = await db.connect();

try {
    await client.sql`CREATE TABLE User
      ( Email varchar(255), Password varchar(255) );`

} catch (error) {
    return NextResponse.json({ error }, {
        status: 500,
      });
}
  const user = await client.sql`SELECT * FROM User;`;
  return NextResponse.json({user});
}

export async function POST (request : NextRequest) {
    const client = await db.connect();
    const req = request.json();
    
    console.log("req iss", req);

  await client.sql`INSERT INTO User (Email , Password) VALUES (${req.userEmail}, ${req.userPassword});`;
  return NextResponse.json({req});
}