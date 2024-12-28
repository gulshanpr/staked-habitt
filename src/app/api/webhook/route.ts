import { NextResponse } from 'next/server';
import crypto from 'crypto';

const SECRET = process.env.WEBHOOK_SECRET || "";

export async function POST(req: Request) {
    const signature = req.headers.get('x-hub-signature-256');
    const body = await req.text();

    const computedSignature =
        'sha256=' + 
        crypto.createHmac('sha256', SECRET).update(body).digest('hex');

    if (signature !== computedSignature) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const payload = JSON.parse(body);
    console.log('Webhook event received:', payload);

    const repository = payload.repository;
    const commits = payload.commits;

    let totalLocAdded = 0;
    let totalLocRemoved = 0;
    let modifiedFiles: any[] = [];
    let addedFiles: any[] = [];
    let removedFiles: any[] = [];

    commits.forEach((commit: any) => {
        commit.added.forEach((file: any) => {
            addedFiles.push(file);
            totalLocAdded += 1;
        });

        commit.removed.forEach((file: any) => {
            removedFiles.push(file);
            totalLocRemoved += 1;
        });

        commit.modified.forEach((file: any) => {
            modifiedFiles.push(file);
        });
    });

    console.log(`Repository: ${repository.name}`);
    console.log(`Total LOC added in this push: ${totalLocAdded}`);
    console.log(`Total LOC removed in this push: ${totalLocRemoved}`);
    console.log(`Modified files: ${modifiedFiles.join(', ')}`);
    console.log(`Added files: ${addedFiles.join(', ')}`);
    console.log(`Removed files: ${removedFiles.join(', ')}`);

    return NextResponse.json({ 
        message: 'Webhook processed successfully!', 
        totalLocAdded: totalLocAdded,
        totalLocRemoved: totalLocRemoved,
        addedFiles: addedFiles,
        removedFiles: removedFiles,
        modifiedFiles: modifiedFiles 
    });
}
