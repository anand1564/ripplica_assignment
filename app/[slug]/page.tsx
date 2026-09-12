
import { Metadata } from "next";
import posts from "../../data/posts.json";

export function generateStaticParams() {
     return posts.map((post) => ({
          slug: post.slug
     }));
}
 async function generateMetdata({params} : {params: {slug: string}}
) : Promise<Metadata>{
     const {slug} = params;
     const post = posts.find((post) => post.slug === slug);
     if(!post){
          return {
               title: "Post not found"
          }
     }
     return{
          title: post.title,
          description: post.content.substring(0, 160)
     }
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