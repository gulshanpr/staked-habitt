import { NextResponse } from 'next/server';
import crypto from 'crypto';

const SECRET = process.env.WEBHOOK_SECRET || "";

export async function POST(req: Request) {
    const signature = req.headers.get('x-hub-signature-256');
    const body = await req.text();

    // Compute the HMAC using your Webhook Secret to verify the webhook's authenticity
    const computedSignature =
        'sha256=' + 
        crypto.createHmac('sha256', SECRET).update(body).digest('hex');

    // Check if the computed signature matches the one GitHub sent in the header
    if (signature !== computedSignature) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const payload = JSON.parse(body);
    console.log('Webhook event received:', payload);

    // Extract relevant data from the payload
    const repository = payload.repository;
    const commits = payload.commits;

    // Initialize total LOC counters
    let totalLocAdded = 0;
    let totalLocRemoved = 0;
    let modifiedFiles: any[] = [];
    let addedFiles: any[] = [];
    let removedFiles: any[] = [];

    // Iterate over each commit in the payload
    commits.forEach((commit: any) => {
        // Handle added files
        commit.added.forEach((file: any) => {
            addedFiles.push(file);  // Add added file to the list
            // Assume each added file contributes 1 LOC (this is an estimate, you can modify it)
            totalLocAdded += 1;
        });

        // Handle removed files
        commit.removed.forEach((file: any) => {
            removedFiles.push(file);  // Add removed file to the list
            // Assume each removed file contributes 1 LOC (this is an estimate, you can modify it)
            totalLocRemoved += 1;
        });

        // Handle modified files
        commit.modified.forEach((file: any) => {
            modifiedFiles.push(file);  // Add modified file to the list
        });
    });

    // Log relevant information
    console.log(`Repository: ${repository.name}`);
    console.log(`Total LOC added in this push: ${totalLocAdded}`);
    console.log(`Total LOC removed in this push: ${totalLocRemoved}`);
    console.log(`Modified files: ${modifiedFiles.join(', ')}`);
    console.log(`Added files: ${addedFiles.join(', ')}`);
    console.log(`Removed files: ${removedFiles.join(', ')}`);

    // Return a success response with detailed information
    return NextResponse.json({ 
        message: 'Webhook processed successfully!', 
        totalLocAdded: totalLocAdded,
        totalLocRemoved: totalLocRemoved,
        addedFiles: addedFiles,
        removedFiles: removedFiles,
        modifiedFiles: modifiedFiles 
    });
}
