import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'waitlist.json');
const NOTIFY_EMAIL = 'scofield@olyxee.com';

async function ensureDataDir() {
  const dir = path.dirname(DATA_FILE);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function readEntries(): Promise<unknown[]> {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    await ensureDataDir();
    const entries = await readEntries();

    const existingIndex = entries.findIndex((e: unknown) => (e as { email: string }).email === email);
    if (existingIndex !== -1) {
      return NextResponse.json({ success: true, message: 'Already on the list' });
    }

    entries.push({
      email,
      timestamp: new Date().toISOString(),
      source: 'waitlist',
      notifyTo: NOTIFY_EMAIL,
    });

    await fs.writeFile(DATA_FILE, JSON.stringify(entries, null, 2));

    return NextResponse.json({ success: true, message: "You're on the list" });
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
