
import { Metadata } from "next";
import posts from "../../data/posts.json";

export function generateStaticParams() {
     return posts.map((post) => ({
          slug: post.slug
     }));
}
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
 async function generateMetdata({params} : {params: {slug: string}}
) : Promise<Metadata>{
     const {slug} = params;
     const post = posts.find((post) => post.slug === slug);
     if(!post){
          return {
               title: "Post not found"
          }
     }
     const metadata : Metadata = {
          title : post.title,
          description : post.content.slice(0,200),
          keywords : [post.title, post.author],
          authors : [{name : post.author}],
          creator : post.author,
          openGraph : {
               title : post.title,
               description : post.content.slice(0,200),
               url : `${baseUrl}/${post.slug}`,
               type : "article",
               publishedTime : post.date,
               authors : [post.author]
          },
          alternates : {
               canonical : `${baseUrl}/${post.slug}`,
               languages : {
                    "hi" : `${baseUrl}/hi/${post.slug}`,
                    "en" : `${baseUrl}/${post.slug}`
               }
          }
     }
     return metadata;
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