import { NextRequest } from 'next/server';
import { or, ilike } from 'drizzle-orm';

import db from '@/db';
import { advocates } from '@/db/schema';

import { SEARCH_PARAM_KEY } from './data';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const searchString = searchParams.get(SEARCH_PARAM_KEY);

  if (searchString) {
    const query = `%${searchString}%`;
    console.log(`Running a GET with search query: ${query}`);

    const data = await db
      .select()
      .from(advocates)
      .where(
        or(
          ilike(advocates.firstName, query),
          ilike(advocates.lastName, query),
          ilike(advocates.city, query),
        ),
      );

    return Response.json({ data });
  }

  console.log('Running a GET against the first 5 records');
  const data = await db.select().from(advocates).limit(5);
  return Response.json({ data });
}
