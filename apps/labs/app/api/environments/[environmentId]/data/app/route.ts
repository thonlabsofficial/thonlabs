import { getAppData } from '@/_services/server-environment-app-data-service';
import { NextRequest, NextResponse } from 'next/server';

type Params = Promise<{ environmentId: string }>;

export async function GET(
  request: NextRequest,
  { params }: { params: Params },
) {
  try {
    const { environmentId } = await params;
    const data = await getAppData(environmentId);

    return NextResponse.json(data);
  } catch (error) {
    console.error('api.data.GET', error);
    return NextResponse.json(
      { message: 'Error fetching thonlabs data' },
      { status: 500 },
    );
  }
}
