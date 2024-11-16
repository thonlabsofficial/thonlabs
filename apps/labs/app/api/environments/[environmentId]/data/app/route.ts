import ServerEnvironmentAppDataService from '@/_services/server-environment-app-data';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { environmentId: string } },
) {
  try {
    const data = await ServerEnvironmentAppDataService.getAppData(
      params.environmentId,
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error('api.data.GET', error);
    return NextResponse.json(
      { message: 'Error fetching thonlabs data' },
      { status: 500 },
    );
  }
}
