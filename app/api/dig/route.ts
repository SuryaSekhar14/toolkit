import { NextResponse } from 'next/server';
import dns from 'node:dns/promises';

const supportedRecordTypes = ['A', 'AAAA', 'ANY', 'CAA', 'CNAME', 'DNSKEY', 'DS', 'MX', 'NS', 'PTR', 'TXT', 'SOA', 'SPF', 'SRV', 'TLSA', 'TSIG'];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');
 
  if (!domain) {
    return NextResponse.json(
      { error: 'Domain is required to fetch DNS records.' },
      { status: 400 }
    );
  }

  const results: { [key: string]: any } = {};

  try {
    for (const type of supportedRecordTypes) {
      try {
        const records = await dns.resolve(domain, type);
        results[type] = records;
      } catch (error) {
        results[type] = `Error: ${(error as Error).message}`;
      }
    }
    return NextResponse.json({ domain, results });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch DNS records: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
