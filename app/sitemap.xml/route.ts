import { supabase } from '@/libs/supabase';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_ROUTE}`;

const timeElapsed = Date.now();
const today = new Date(timeElapsed);

// https://kentcdodds.com/sitemap.xml
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
  </url>
  <url>
    <loc>${BASE_URL}/books</loc>
    <lastmod>${today.toISOString()}</lastmod>
  </url>
  <url>
    <loc>${BASE_URL}/authors</loc>
    <lastmod>${today.toISOString()}</lastmod>
  </url>
  <url>
    <loc>${BASE_URL}/genres</loc>
    <lastmod>${today.toISOString()}</lastmod>
  </url>
  <url>
    <loc>${BASE_URL}/browse</loc>
    <lastmod>${today.toISOString()}</lastmod>
  </url>
  <url>
    <loc>${BASE_URL}/login</loc>
    <lastmod>${today.toISOString()}</lastmod>
  </url>
  ${books
    .map((book: any) => {
      return `
        <url>
          <loc>${`${BASE_URL}/books/${book.slug}`}</loc>
          <lastmod>${today.toISOString()}</lastmod>
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
