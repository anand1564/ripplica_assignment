import Image from "next/image";
import Link from "next/link"; 
import posts from "../data/posts.json";
export default function Home() {
  return (
    <div>
      <h1>Blog Article</h1>
      <p>Latest Articles</p>
      {posts.map((post) => (
<article key = {post.slug}>
  <h2>
    <Link href={`${post.slug}`}>
      {post.title}
    </Link> 
  </h2>
</article>
      ))}
    </div>
  )
}
