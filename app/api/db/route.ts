import fsPromises from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

const dbpath = path.join(process.cwd(), '/db.json');

export async function GET() {
    const readed = (await fsPromises.readFile(dbpath)).toString();

    const parsed = JSON.parse(readed);

    return NextResponse.json(parsed, {
        status: 200,
    });
}

export async function POST(req: Request) {
    const readed = (await fsPromises.readFile(dbpath)).toString();

    const parsed = JSON.parse(readed);

    parsed.push(await req.json());

    const updated = JSON.stringify(parsed);

    await fsPromises.writeFile(dbpath, updated);

    return NextResponse.json(updated, {
        status: 200,
    });
}
