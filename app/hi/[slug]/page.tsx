
import posts from "../../../data/posts-hi.json";

export function generateStaticParams() {
     return posts.map((post) => ({
          slug : post.slug
     }));
}

export default async function Post({ params }: { params: { slug: string } }) {
     const {slug} = await params;
     const post = posts.find((post) => post.slug === slug);
     if(!post){
          return <div>Post not found</div>
     }
     return(
          <div>
               <h1>{post.title}</h1>
               <p>{post.content}</p>
          </div>
     )
}