import { supabase } from '@/libs/supabase';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_ROUTE}`;

// TODO Docs https://kentcdodds.com/blog/rss.xml
// TODO Docs https://stackoverflow.com/questions/2784183/what-does-cdata-in-xml-mean

export const dynamic = 'force-dynamic';

export async function GET() {
  const { data: books } = await supabase.from('book_books').select(`title, description, slug, created_at`).order('id');
  // const { data: authors } = await supabase.from('book_authors').select(`name, bio, slug, created_at`).order('id');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8" ?>
<rss xmlns:blogChannel="${BASE_URL}/books" version="2.0">
 
<channel>
  <title>Next.js App Router</title>
  <link>${BASE_URL}/books</link>
  <description>Next.js App Router Description</description>
  <language>en-us</language>
  <generator>Next.js App Router</generator>
  <lastBuildDate>${new Date()}</lastBuildDate>
  <docs>https://validator.w3.org/feed/docs/rss2.html</docs>
  <ttl>40</ttl>
  <image>
  <title>Next.js App Router</title>
  <url>${BASE_URL}/icon.svg</url>
  <link>${BASE_URL}/books</link>
  </image>
  <copyright>Copyright © 2023 Next.js App Router</copyright>
  ${books
    .map((book: any) => {
      return `
        <item>
          <title>
            <![CDATA[ ${book.title} ]]>
          </title>
          <description>
            <![CDATA[ ${book.description.slice(0, 100)} ]]>
          </description>
          <pubDate>${book.created_at.split('T')[0]}</pubDate>
          <link>${BASE_URL}/books/${book.slug}</link>
          <guid>${BASE_URL}/books/${book.slug}</guid>
        </item>
      `;
    })
    .join('')}
</channel>
 
</rss>`,
    {
      status: 200,
      headers: { 'Content-Type': 'text/xml' },
    },
  );
}
