import Link from "next/link";
import { notFound } from "next/navigation";
import posts from "../../../data/posts-hi.json";

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

export default async function HindiPost({ params }: PageProps<"/hi/[slug]">) {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);

  if (!post) notFound();

  return (
    <main className="site-shell article-page" lang="hi">
      <header className="site-header">
        <Link className="brand" href="/" aria-label="इंकवेल होम पर वापस जाएँ">
          <span className="brand-mark">I</span>
          Medium Tech
        </Link>
        <Link className="language-link" href={`/${post.slug}`}>
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
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
        <div className="article-body">
          <p>{post.content}</p>
        </div>
      </article>
    </main>
  );
}
