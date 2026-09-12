import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import posts from "../../../data/posts-hi.json";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("hi-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/hi/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    return {
      title: "लेख नहीं मिला",
    };
  }

  const description = post.content.slice(0, 200);

  return {
    title: `${post.title} | Medium Tech`,
    description,
    authors: [{ name: post.author }],

    openGraph: {
      title: post.title,
      description,
      url: `${baseUrl}/hi/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      locale: "hi_IN",
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [`${baseUrl}/og-image.png`],
    },

    alternates: {
      canonical: `${baseUrl}/hi/${post.slug}`,
      languages: {
        en: `${baseUrl}/${post.slug}`,
        hi: `${baseUrl}/hi/${post.slug}`,
        "x-default": `${baseUrl}/${post.slug}`,
      },
    },
  };
}

export default async function HindiPost({
  params,
}: PageProps<"/hi/[slug]">) {
  const { slug } = await params;

  const post = posts.find((item) => item.slug === slug);

  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",

    headline: post.title,
    description: post.content.slice(0, 200),

    datePublished: post.date,

    inLanguage: "hi-IN",

    author: {
      "@type": "Person",
      name: post.author,
    },

    publisher: {
      "@type": "Organization",
      name: "Medium Tech",
    },

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/hi/${post.slug}`,
    },

    image: [`${baseUrl}/og-image.png`],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <main className="site-shell article-page" lang="hi">
        <header className="site-header">
          <Link
            className="brand"
            href="/"
            aria-label="इंकवेल होम पर वापस जाएँ"
          >
            <span className="brand-mark">I</span>
            Medium Tech
          </Link>

          <Link
            className="language-link"
            href={`/${post.slug}`}
          >
            Read in English <span aria-hidden="true">→</span>
          </Link>
        </header>

        <article className="article-detail hindi-article">
          <Link className="back-link" href="/">
            <span aria-hidden="true">←</span> सभी लेख
          </Link>

          <p className="eyebrow">हिंदी संस्करण</p>

          <h1>{post.title}</h1>

          <div className="article-byline">
            <span>{post.author}</span>
            <span aria-hidden="true">•</span>

            <time dateTime={post.date}>
              {formatDate(post.date)}
            </time>
          </div>

          <div className="article-body">
            <p>{post.content}</p>
          </div>
        </article>
      </main>
    </>
  );
}