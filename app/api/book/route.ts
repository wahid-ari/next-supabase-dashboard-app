import { NextRequest, NextResponse } from 'next/server';
import slug from 'slug';

import { getAppHeader, getAppSessionToken, supabase, writeLogs } from '@/libs/supabase';

export const dynamic = 'force-dynamic';

// /api/book?id=1&slug=title&seo=true
export async function GET(request: NextRequest) {
  // Get Request Query
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const slug = searchParams.get('slug');
  const seo = searchParams.get('seo');

  if (!id && !slug) {
    const { data } = await supabase
      .from('book_books')
      .select(`id, author_id, slug, title, language, pages, published, link, image, book_authors (id, slug, name)`)
      .order('id');
    return NextResponse.json(data, { status: 200 });
  } else if (slug && seo) {
    const { data } = await supabase.from('book_books').select(`title, description`).eq('slug', slug).single();
    return NextResponse.json(data, { status: 200 });
  } else {
    let column = id ? 'id' : 'slug';
    let param = id ? id : slug;
    const { data: genres } = await supabase.from('book_genres').select(`*`).order('id');
    const { data: books, error } = await supabase
      .from('book_books')
      .select(`*, book_authors (id, slug, name, image, bio, web)`)
      .eq(column, param)
      .order('id');
    if (error || books.length < 1) {
      return NextResponse.json({ message: 'Not Found' }, { status: 404 });
    }
    let bookId = books[0].id;
    const { data: books_genres } = await supabase
      .from('book_books_genres')
      .select(`*`)
      .eq('book_id', bookId)
      .order('id');

    const books_with_genres = [];
    for (const books_genre of books_genres) {
      for (const genre of genres) {
        if (books_genre.genre_id == genre.id) {
          books_with_genres.push({
            id: genre.id,
            name: genre.name,
            slug: genre.slug,
          });
        }
      }
    }
    return NextResponse.json({ ...books[0], genre_array: books_with_genres }, { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  // Get Request Header Token
  const { authorization, token } = getAppHeader();
  if (!authorization) return NextResponse.json({ message: 'Please provide bearer token in headers' }, { status: 401 });
  // Get Request Body, Extract the body of the request
  const { author_id, title, isbn, language, pages, published, link, image, description, genre } = await request.json();
  // Check Session if Token is Valid
  const session = await getAppSessionToken(token);
  if (session) {
    if (!title) {
      return NextResponse.json({ message: 'Title required' }, { status: 422 });
    } else {
      let nameSlug = slug(title);
      const { data: isSlugExist } = await supabase.from('book_books').select(`*`).eq('slug', nameSlug).order('id');
      // if slug already exist, add books.length + 1 to slug to make it unique
      if (isSlugExist.length > 0) {
        const { data: books } = await supabase.from('book_books').select(`id`, { count: 'exact' });
        nameSlug = `${nameSlug}-${books.length + 1}`;
      }
      // get genre string from array
      let genre_string = ',';
      genre?.forEach((item: any) => {
        genre_string = genre_string + ', ' + item.label;
      });
      let clean_genre_string = genre_string.replace(',,', '').replace(' ', '');
      // insert book
      const { data, error } = await supabase
        .from('book_books')
        .insert([
          {
            slug: nameSlug,
            author_id: author_id,
            title: title,
            isbn: isbn,
            language: language,
            pages: pages,
            published: published ? published : null,
            link: link,
            image: image,
            description: description,
            genre: clean_genre_string == ',' ? '' : clean_genre_string,
          },
        ])
        .select();
      if (error) {
        return NextResponse.json({ message: error.message }, { status: 422 });
      }
      // get book id after inserting
      const bookId = data[0].id;
      // if new book have genre
      if (genre?.length > 0) {
        // create array of genre of a book
        let genreToInsert = [];
        genre.forEach((item: any) => {
          genreToInsert.push({
            book_id: bookId,
            genre_id: item.value,
          });
        });
        // insert genre of a book to book_books_genres table
        const { error } = await supabase.from('book_books_genres').insert(genreToInsert);
        if (error) {
          return NextResponse.json({ message: error.message }, { status: 422 });
        }
      }
      // Write logs
      // const errorLogs = await writeLogs(session.user_id, 'create', 'book');
      // if (errorLogs) {
      //   return NextResponse.json({ message: error.message }, { status: 422 });
      // }
      return NextResponse.json({ message: 'Success add book' }, { status: 200 });
    }
  } else {
    return NextResponse.json({ message: 'Token invalid' }, { status: 401 });
  }
}

export async function PUT(request: NextRequest) {
  // Get Request Header Token
  const { authorization, token } = getAppHeader();
  if (!authorization) return NextResponse.json({ message: 'Please provide bearer token in headers' }, { status: 401 });
  // Get Request Body, Extract the body of the request
  const { id, author_id, title, isbn, language, pages, published, link, image, description, genre } =
    await request.json();
  // Check Session if Token is Valid
  const session = await getAppSessionToken(token);
  if (session) {
    if (!title) {
      return NextResponse.json({ message: 'Title required' }, { status: 422 });
    } else {
      // get genre string from array
      let genre_string = ',';
      genre?.forEach((item: any) => {
        genre_string = genre_string + ', ' + item.label;
      });
      let clean_genre_string = genre_string.replace(',,', '').replace(' ', '');
      // update book
      const { error } = await supabase
        .from('book_books')
        .update({
          author_id: author_id,
          title: title,
          isbn: isbn,
          language: language,
          pages: pages,
          published: published ? published : null,
          link: link,
          image: image,
          description: description,
          genre: clean_genre_string,
        })
        .eq('id', id);
      if (error) {
        return NextResponse.json({ message: error.message }, { status: 422 });
      }
      // delete genre related to edited book
      const { error: errorBooksGenres } = await supabase.from('book_books_genres').delete().eq('book_id', id);
      if (errorBooksGenres) {
        return NextResponse.json({ message: errorBooksGenres.message }, { status: 422 });
      }
      // if edited book have genre
      if (genre?.length > 0) {
        // create array of genre of a edited book
        let genreToInsert = [];
        genre.forEach((item: any) => {
          genreToInsert.push({
            book_id: id,
            genre_id: item.value,
          });
        });
        // insert genre of a edited book to book_books_genres table
        const { error } = await supabase.from('book_books_genres').insert(genreToInsert);
        if (error) {
          return NextResponse.json({ message: error.message }, { status: 422 });
        }
      }
      // Write logs
      // const errorLogs = await writeLogs(session.user_id, 'update', 'book', id);
      // if (errorLogs) {
      //   return NextResponse.json({ message: error.message }, { status: 422 });
      // }
      return NextResponse.json({ message: 'Success update book' }, { status: 201 });
    }
  } else {
    return NextResponse.json({ message: 'Token invalid' }, { status: 401 });
  }
}

// /api/book?id=1
export async function DELETE(request: NextRequest) {
  // Get Request Header Token
  const { authorization, token } = getAppHeader();
  if (!authorization) return NextResponse.json({ message: 'Please provide bearer token in headers' }, { status: 401 });
  // Get Request Query
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  // Check Session if Token is Valid
  const session = await getAppSessionToken(token);
  if (session) {
    if (!id) {
      return NextResponse.json({ message: 'Id required' }, { status: 422 });
    } else {
      // delete genre related to book in book_books_genres table
      const { error: errorBooksGenres } = await supabase.from('book_books_genres').delete().eq('book_id', id);
      const { error } = await supabase.from('book_books').delete().eq('id', id);
      if (error || errorBooksGenres) {
        return NextResponse.json({ message: error.message, detail: error.details }, { status: 422 });
      }
      // Write logs
      // const errorLogs = await writeLogs(session.user_id, 'delete', 'book', id);
      // if (errorLogs) {
      //   return NextResponse.json({ message: error.message }, { status: 422 });
      // }
      return NextResponse.json({ message: 'Success delete book' }, { status: 200 });
    }
  } else {
    return NextResponse.json({ message: 'Token invalid' }, { status: 401 });
  }
}
