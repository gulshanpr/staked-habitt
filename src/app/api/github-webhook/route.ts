import { NextResponse } from 'next/server';
import { json } from 'stream/consumers';

// GET request handler
export async function GET(request: Request) {
  try {
    // Your logic for handling GET requests, e.g., fetching data
    const response = {
      message: 'Hello from the GitHub API route',
    };

    // Respond with JSON data
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.error();
  }
}

// POST request handler
export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Handle POST request logic, such as saving or processing the data
    console.log('Received data:', data);

    const response = {
      message: 'Data successfully received',
      receivedData: data,
    };

    // Return a response with status 200 (OK)
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
