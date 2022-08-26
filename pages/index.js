import Link from "next/link";
import { NextSeo } from 'next-seo'

export default function Home() {
  return (
    <>
    <NextSeo
        title="Page Meta Title"
        description="This will be the page meta description"
        canonical="https://www.canonicalurl.ie/"
        openGraph={{
          url: 'https://www.canonicalurl.ie/',
          title: 'Open Graph Title',
          description: 'Open Graph Description',
          images: [
            {
              url: 'https://www.example.ie/og-image-01.jpg',
              width: 800,
              height: 600,
              alt: 'Og Image Alt',
            },
            {
              url: 'https://www.example.ie/og-image-02.jpg',
              width: 900,
              height: 800,
              alt: 'Og Image Alt Second',
            },
            { url: 'https://www.example.ie/og-image-03.jpg' },
            { url: 'https://www.example.ie/og-image-04.jpg' },
          ],
        }}
      />
    <ul>
      <li>
        <Link href="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link href="/login">Login</Link>
      </li>
      <li>
        <Link href="/signup">Signup</Link>
      </li>
      <br />
      <hr />
      <br />
      <h1>SEO Added to Page</h1>
      <p>Take a look at the head to see what has been added.</p>
      <p>
        Or checkout how{' '}
        <Link href="/jsonld">
          <a>JSON-LD</a>
        </Link>{' '}
        (Structured Data) is added
      </p>
    </ul>
    </>
  );
}
