import Link from "next/link";
import posts from "../data/posts.json";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export default function Home() {
  return (
    <main className="site-shell">
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Medium Tech">
          <span className="brand-mark">I</span>
          Medium Tech
        </Link>
        <span className="header-label">Thoughtful reads</span>
      </header>

      <section className="hero" aria-labelledby="page-title">
        <p className="eyebrow">The latest</p>
        <h1 id="page-title">Ideas worth taking a moment with.</h1>
        <p className="hero-copy">
          Clear, practical notes on the tools and concepts shaping the web.
        </p>
      </section>

      <section className="article-list" aria-label="Latest articles">
        {posts.map((post, index) => (
          <article className="article-card" key={post.slug}>
            <p className="article-number">0{index + 1}</p>
            <div className="article-card-content">
              <p className="article-meta">
                {post.author} <span aria-hidden="true">·</span>{" "}
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </p>
              <h2>{post.title}</h2>
              <p className="article-excerpt">{post.content}</p>
              <Link className="text-link" href={`/${post.slug}`}>
                Read article <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
