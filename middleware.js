import { NextResponse } from 'next/server';

export function middleware() {
  console.log('🔥 MIDDLEWARE WORKING');
  return NextResponse.next();
}
