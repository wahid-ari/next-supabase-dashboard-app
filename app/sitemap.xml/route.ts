import { supabase } from '@/libs/supabase';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_ROUTE}`;

const timeElapsed = Date.now();
const today = new Date(timeElapsed);

// TODO Docs https://nextjs.org/docs/app/building-your-application/routing/route-handlers#non-ui-responses
// https://kentcdodds.com/sitemap.xml

export const dynamic = 'force-dynamic';

export async function GET() {
  const { data: books } = await supabase.from('book_books').select(`slug`).order('id');
  const { data: authors } = await supabase.from('book_authors').select(`slug`).order('id');
  const { data: genres } = await supabase.from('book_genres').select(`slug`).order('id');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <url>
    <loc>${BASE_URL}</loc>
    <lastmod>${today.toISOString()}</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${BASE_URL}/books</loc>
    <lastmod>${today.toISOString()}</lastmod>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${BASE_URL}/authors</loc>
    <lastmod>${today.toISOString()}</lastmod>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${BASE_URL}/genres</loc>
    <lastmod>${today.toISOString()}</lastmod>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${BASE_URL}/browse</loc>
    <lastmod>${today.toISOString()}</lastmod>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${BASE_URL}/login</loc>
    <lastmod>${today.toISOString()}</lastmod>
    <priority>0.5</priority>
  </url>
  ${books
    .map((book: any) => {
      return `
        <url>
          <loc>${`${BASE_URL}/books/${book.slug}`}</loc>
          <lastmod>${today.toISOString()}</lastmod>
          <priority>0.7</priority>
        </url>
      `;
    })
    .join('')}
  ${authors
    .map((author: any) => {
      return `
    <url>
      <loc>${`${BASE_URL}/authors/${author.slug}`}</loc>
      <lastmod>${today.toISOString()}</lastmod>
      <priority>0.7</priority>
    </url>
  `;
    })
    .join('')}
  ${genres
    .map((genre: any) => {
      return `
    <url>
      <loc>${`${BASE_URL}/genres/${genre.slug}`}</loc>
      <lastmod>${today.toISOString()}</lastmod>
      <priority>0.6</priority>
    </url>
  `;
    })
    .join('')}
</urlset>`,
    {
      status: 200,
      headers: { 'Content-Type': 'text/xml' },
    },
  );
}

// app/sitemap.ts
// async function getData() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/sitemap`);
//   return res.json();
// }

// export default async function sitemap() {
//   const data = await getData();
//   const books = data.books.map((book: any) => ({
//     url: `${process.env.NEXT_PUBLIC_API_ROUTE}/books/${book.slug}`,
//     lastModified: new Date(),
//   }));
//   const authors = data.authors.map((author: any) => ({
//     url: `${process.env.NEXT_PUBLIC_API_ROUTE}/authors/${author.slug}`,
//     lastModified: new Date(),
//   }));
//   const genres = data.genres.map((genre: any) => ({
//     url: `${process.env.NEXT_PUBLIC_API_ROUTE}/genres/${genre.slug}`,
//     lastModified: new Date(),
//   }));
//   return [
//     {
//       url: `${process.env.NEXT_PUBLIC_API_ROUTE}`,
//       lastModified: new Date(),
//     },
//     {
//       url: `${process.env.NEXT_PUBLIC_API_ROUTE}/books`,
//       lastModified: new Date(),
//     },
//     {
//       url: `${process.env.NEXT_PUBLIC_API_ROUTE}/authors`,
//       lastModified: new Date(),
//     },
//     {
//       url: `${process.env.NEXT_PUBLIC_API_ROUTE}/genres`,
//       lastModified: new Date(),
//     },
//     {
//       url: `${process.env.NEXT_PUBLIC_API_ROUTE}/browse`,
//       lastModified: new Date(),
//     },
//     {
//       url: `${process.env.NEXT_PUBLIC_API_ROUTE}/login`,
//       lastModified: new Date(),
//     },
//     ...books,
//     ...authors,
//     ...genres,
//   ];
// }
