import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const workflowUrl = process.env.UIPATH_WORKFLOW_URL;
    const apiKey = process.env.UIPATH_SECRET_KEY;

    if (!workflowUrl || !apiKey) {
      console.error('Missing configuration: UIPATH_WORKFLOW_URL or UIPATH_SECRET_KEY');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Construct the payload matching the UiPath Workflow Input Schema
    // The workflow expects "headers" inside the inputs to check the key.
    const payload = {
      name,
      email,
      message,
      headers: {
        "X-API-Key": apiKey
      }
    };

    console.log('Sending request to UiPath Workflow...');

    // Call the UiPath Workflow
    const response = await fetch(workflowUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // We also add it as a real header just in case, though the schema implies body
        'X-API-Key': apiKey 
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('UiPath Workflow Error:', response.status, errorText);
      return NextResponse.json(
        { error: 'Failed to send message to workflow.' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data });

  } catch (error) {
    console.error('API Handler Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
