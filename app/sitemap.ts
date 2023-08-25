async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/sitemap`);
  return res.json();
}

// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
// https://claritydev.net/blog/nextjs-dynamic-sitemap-pages-app-directory
export default async function sitemap() {
  const data = await getData();
  const books = data.books.map((book: any) => ({
    url: `${process.env.NEXT_PUBLIC_API_ROUTE}/books/${book.slug}`,
    lastModified: new Date(),
  }));
  const authors = data.authors.map((author: any) => ({
    url: `${process.env.NEXT_PUBLIC_API_ROUTE}/authors/${author.slug}`,
    lastModified: new Date(),
  }));
  const genres = data.genres.map((genre: any) => ({
    url: `${process.env.NEXT_PUBLIC_API_ROUTE}/genres/${genre.slug}`,
    lastModified: new Date(),
  }));
  return [
    {
      url: `${process.env.NEXT_PUBLIC_API_ROUTE}`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_API_ROUTE}/books`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_API_ROUTE}/authors`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_API_ROUTE}/genres`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_API_ROUTE}/browse`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_API_ROUTE}/login`,
      lastModified: new Date(),
    },
    ...books,
    ...authors,
    ...genres,
  ];
}
