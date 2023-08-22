import { db } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

// Handle GET requests
export async function GET(request: NextRequest) {
  // Connect to the PostgreSQL database
  const client = await db.connect();

  try {
    // Create a table named "User" if it doesn't exist
    await client.sql`CREATE TABLE IF NOT EXISTS "User" (
      "id" serial PRIMARY KEY,
      "Email" varchar(255),
      "Password" varchar(255)
    );`;
  } catch (error) {
    // If there's an error, send a 500 status response
    return NextResponse.json({ error }, {
      status: 500,
    });
  }

  // Fetch all user data from the "User" table
  const user = await client.sql`SELECT * FROM "User"`;

  // Send the user data as a JSON response
  return NextResponse.json({ user });
}

// Handle POST requests
export async function POST(request: NextRequest) {
  // Connect to the PostgreSQL database
  const client = await db.connect();

  // Extract JSON data from the incoming request body
  const req = await request.json();

  // Log the extracted data for debugging purposes
  console.log("req is", req);
  console.log("email", req.userEmail);
  console.log("password", req.userPassword);

  // Insert a new user into the "User" table using the extracted data
  await client.sql`INSERT INTO "User" ("Email", "Password") VALUES (${req.userEmail}, ${req.userPassword});`;

  // Send the extracted data as a JSON response
  return NextResponse.json(req);
}
