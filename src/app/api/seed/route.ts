import db from '../../../db';
import { advocates } from '../../../db/schema';
import { advocateData } from '../../../db/seed/advocates';
import { NextRequest } from 'next/server';
export async function POST(request: NextRequest, params: any) {
  console.log('Running a POST! Request:', { request });
  console.log('Running a POST! Params:', { params });
  console.log('Example insert: ', { advocateDataZero: advocateData[0] });

  const records = await db.insert(advocates).values(advocateData).returning();

  //

  return Response.json({ advocates: records });
}
