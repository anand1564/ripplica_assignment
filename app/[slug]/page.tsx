import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import posts from "../../data/posts.json";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
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
}: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);

  if (!post) return { title: "Article not found" };

  const description = post.content.slice(0, 200);
  return {
    title: `${post.title} | Medium Tech`,
    description,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description,
      url: `${baseUrl}/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
    alternates: {
      canonical: `${baseUrl}/${post.slug}`,
      languages: {
        en: `${baseUrl}/${post.slug}`,
        hi: `${baseUrl}/hi/${post.slug}`,
      },
    },
  };
}

export default async function Post({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);

  if (!post) notFound();

  return (
    <main className="site-shell article-page">
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Back to Medium Tech home">
          <span className="brand-mark">I</span>
          Medium Tech
        </Link>
        <Link className="language-link" href={`/hi/${post.slug}`}>
          हिंदी में पढ़ें <span aria-hidden="true">→</span>
        </Link>
      </header>

      <article className="article-detail">
        <Link className="back-link" href="/">
          <span aria-hidden="true">←</span> All articles
        </Link>
        <p className="eyebrow">English edition</p>
        <h1>{post.title}</h1>
        <div className="article-byline">
          <span>{post.author}</span>
          <span aria-hidden="true">•</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
        <div className="article-body">
          <p>{post.content}</p>
        </div>
      </article>
    </main>
  );
}
