import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import slug from 'slug';

import { getAppHeader, getAppSessionToken, supabase, writeLogs } from '@/libs/supabase';

export const dynamic = 'force-dynamic';

// /api/author?id=1&slug=title&seo=true
export async function GET(request: NextRequest) {
  // Get Request Query
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const slug = searchParams.get('slug');
  const seo = searchParams.get('seo');

  if (!id && !slug) {
    const { data } = await supabase.from('book_authors').select(`*`).order('id');
    return NextResponse.json(data, { status: 200 });
  } else if (slug && seo) {
    const { data } = await supabase.from('book_authors').select(`name, bio`).eq('slug', slug).single();
    return NextResponse.json(data, { status: 200 });
  } else {
    let column = id ? 'id' : 'slug';
    let param = id ? id : slug;
    const { data } = await supabase
      .from('book_authors')
      .select(
        `*, book_quotes (id, quote), book_books (id, slug, title, pages, language, published, link, image, image_small)`,
      )
      .eq(column, param)
      .order('id');
    const { book_books, book_quotes } = data[0];
    delete data[0].book_books;
    delete data[0].book_quotes;
    const ready = {
      ...data[0],
      books: book_books,
      quotes: book_quotes,
    };
    return NextResponse.json(ready, { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  // Get Request Header Token
  const { authorization, token } = getAppHeader();
  if (!authorization) return NextResponse.json({ error: 'Please provide bearer token in headers' }, { status: 401 });
  // Get Request Body, Extract the body of the request
  const { name, link, image, born, web, bio } = await request.json();
  // Check Session if Token is Valid
  const session = await getAppSessionToken(token);
  if (session) {
    if (!name) {
      return NextResponse.json({ error: 'Name required' }, { status: 422 });
    } else {
      let nameSlug = slug(name);
      const { data: isSlugExist } = await supabase.from('book_authors').select(`*`).eq('slug', nameSlug).order('id');
      // if slug already exist, add authors.length + 1 to slug to make it unique
      if (isSlugExist.length > 0) {
        const { data: authors } = await supabase.from('book_authors').select(`id`, { count: 'exact' });
        nameSlug = `${nameSlug}-${authors.length + 1}`;
      }
      const { error } = await supabase.from('book_authors').insert([
        {
          slug: nameSlug,
          name: name,
          link: link,
          image: image,
          born: born,
          web: web,
          bio: bio,
        },
      ]);
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 422 });
      }
      // Write logs
      // const errorLogs = await writeLogs(session.user_id, 'create', 'author');
      // if (errorLogs) {
      //   return NextResponse.json({ error: error.message }, { status: 422 });
      // }
      revalidatePath(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/author`);
      return NextResponse.json({ message: 'Success add author' }, { status: 200 });
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
  const { id, name, link, image, born, web, bio } = await request.json();
  // Check Session if Token is Valid
  const session = await getAppSessionToken(token);
  if (session) {
    if (!name) {
      return NextResponse.json({ error: 'Name required' }, { status: 422 });
    } else {
      const { error } = await supabase
        .from('book_authors')
        .update({
          name: name,
          link: link,
          image: image,
          born: born,
          web: web,
          bio: bio,
        })
        .eq('id', id);
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 422 });
      }
      // Write logs
      // const errorLogs = await writeLogs(session.user_id, 'update', 'author', id);
      // if (errorLogs) {
      //   return NextResponse.json({ error: error.message }, { status: 422 });
      // }
      revalidatePath(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/author`);
      return NextResponse.json({ message: 'Success update author' }, { status: 201 });
    }
  } else {
    return NextResponse.json({ error: 'Token invalid' }, { status: 401 });
  }
}

// /api/author?id=1
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
      const { error } = await supabase.from('book_authors').delete().eq('id', id);
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 422 });
      }
      // Write logs
      // const errorLogs = await writeLogs(session.user_id, 'delete', 'author', id);
      // if (errorLogs) {
      //   return NextResponse.json({ error: error.message }, { status: 422 });
      // }
      revalidatePath(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/author`);
      return NextResponse.json({ message: 'Success delete author' }, { status: 200 });
    }
  } else {
    return NextResponse.json({ error: 'Token invalid' }, { status: 401 });
  }
}
