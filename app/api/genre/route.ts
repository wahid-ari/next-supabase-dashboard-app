import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import slug from 'slug';

import { getAppHeader, getAppSessionToken, supabase, writeLogs } from '@/libs/supabase';

export const dynamic = 'force-dynamic';

// /api/genre?id=1&slug=title&seo=true
export async function GET(request: NextRequest) {
  // Get Request Query
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const slug = searchParams.get('slug');
  const seo = searchParams.get('seo');

  if (!id && !slug) {
    const { data } = await supabase.from('book_genres').select(`*`).order('id');
    return NextResponse.json(data, { status: 200 });
  } else if (slug && seo) {
    const { data } = await supabase.from('book_genres').select(`name`).eq('slug', slug).single();
    return NextResponse.json(data, { status: 200 });
  } else {
    let column = id ? 'id' : 'slug';
    let param = id ? id : slug;
    const { data: genres, error } = await supabase.from('book_genres').select(`*`).eq(column, param).order('id');
    if (error || genres.length < 1) {
      return NextResponse.json({ error: 'Not Found' }, { status: 404 });
    }
    const { data: books_genres } = await supabase
      .from('book_books_genres')
      .select(`*`)
      .eq('genre_id', genres[0].id)
      .order('id');
    const { data: books } = await supabase
      .from('book_books')
      .select(`id, slug, title, published, image, book_authors (id, slug, name, image)`)
      .order('id');

    const books_by_genres = [];
    for (const book of books) {
      for (const genre of books_genres) {
        if (genre.book_id == book.id) {
          books_by_genres.push({
            ...book,
          });
        }
      }
    }
    return NextResponse.json({ ...genres[0], books_by_genres }, { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  // Get Request Header Token
  const { authorization, token } = getAppHeader();
  if (!authorization) return NextResponse.json({ error: 'Please provide bearer token in headers' }, { status: 401 });
  // Get Request Body, Extract the body of the request
  const { name, link } = await request.json();
  // Check Session if Token is Valid
  const session = await getAppSessionToken(token);
  if (session) {
    if (!name) {
      return NextResponse.json({ error: 'Name required' }, { status: 422 });
    } else {
      let nameSlug = slug(name);
      const { data: isSlugExist } = await supabase.from('book_genres').select(`*`).eq('slug', nameSlug).order('id');
      // if slug already exist, add genres.length + 1 to slug to make it unique
      if (isSlugExist.length > 0) {
        const { data: genres } = await supabase.from('book_genres').select(`id`, { count: 'exact' });
        nameSlug = `${nameSlug}-${genres.length + 1}`;
      }
      const { error } = await supabase.from('book_genres').insert([
        {
          slug: nameSlug,
          name: name,
          link: link,
        },
      ]);
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 422 });
      }
      // Write logs
      // const errorLogs = await writeLogs(session.user_id, 'create', 'genre');
      // if (errorLogs) {
      //   return NextResponse.json({ error: error.message }, { status: 422 });
      // }
      revalidatePath(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/genre`);
      return NextResponse.json({ message: 'Success add genre' }, { status: 200 });
    }
  } else {
    return NextResponse.json({ error: 'Token invalid' }, { status: 401 });
  }
}

export async function PUT(request: NextRequest) {
  // Get Request Header Token
  const { authorization, token } = getAppHeader();
  if (!authorization) return NextResponse.json({ error: 'Please provide bearer token in headers' }, { status: 401 });
  // Get Request Body, Extract the body of the request
  const { id, name, link } = await request.json();
  // Check Session if Token is Valid
  const session = await getAppSessionToken(token);
  if (session) {
    if (!name) {
      return NextResponse.json({ error: 'Name required' }, { status: 422 });
    } else {
      const { error } = await supabase
        .from('book_genres')
        .update({
          name: name,
          link: link,
        })
        .eq('id', id);
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 422 });
      }
      // Write logs
      // const errorLogs = await writeLogs(session.user_id, 'update', 'genre', id);
      // if (errorLogs) {
      //   return NextResponse.json({ error: error.message }, { status: 422 });
      // }
      revalidatePath(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/genre`);
      return NextResponse.json({ message: 'Success update genre' }, { status: 201 });
    }
  } else {
    return NextResponse.json({ error: 'Token invalid' }, { status: 401 });
  }
}

// /api/genre?id=1
export async function DELETE(request: NextRequest) {
  // Get Request Header Token
  const { authorization, token } = getAppHeader();
  if (!authorization) return NextResponse.json({ error: 'Please provide bearer token in headers' }, { status: 401 });
  // Get Request Query
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  // Check Session if Token is Valid
  const session = await getAppSessionToken(token);
  if (session) {
    if (!id) {
      return NextResponse.json({ error: 'Id required' }, { status: 422 });
    } else {
      const { error } = await supabase.from('book_genres').delete().eq('id', id);
      if (error) {
        return NextResponse.json({ error: error.message, detail: error.details }, { status: 422 });
      }
      // Write logs
      // const errorLogs = await writeLogs(session.user_id, 'delete', 'genre', id);
      // if (errorLogs) {
      //   return NextResponse.json({ error: error.message }, { status: 422 });
      // }
      revalidatePath(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/genre`);
      return NextResponse.json({ message: 'Success delete genre' }, { status: 200 });
    }
  } else {
    return NextResponse.json({ error: 'Token invalid' }, { status: 401 });
  }
}
