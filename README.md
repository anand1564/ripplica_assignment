
`` How to Run this project locally ``
1. Clone the repo
2. Run npm install to install the dependencies. 
3. Get free Groq api key and fill it in the env
4. Run npm run dev to start the development server 

The blog posts are stored in data/posts.json. Each post is automatically handled through a dynamic [slug] route, so adding a new post does not require creating a new route manually.

Build-Time English → Hindi Translation

Hindi translations are generated automatically during the production build using the Groq API.

The build process is configured as:

npm run build → npm run translate → next build

The translation script reads the English posts from posts.json and checks posts-hi.json for existing translations. Only posts that do not already have a Hindi translation are sent to the Groq API. The translated title and content are then written to posts-hi.json.

Next.js subsequently reads the updated Hindi data during next build and uses generateStaticParams() to statically generate both:

/slug
/hi/slug

Therefore, adding a new English post to posts.json and deploying automatically produces its Hindi translation and corresponding static page without any manual route creation.

Following SEO Concepts are applied : 
1. Metadata : 
2. Opengraph : 
3. Sitemap : 
4. Cannonical Urls and hreflang : 
5. Robots : 


`` Problems Faced and How i overcame them ``
1. First Problem was deciding on how to translate the pages from english to Hindi.
I was thinking between using Google cloud translate api and Groq api but ended up using Groq api due to time constraint as i have worked with Groq api before, it was the easier choice.
2. Deploying with CloudFlare: 
I hadn't used cloudlfare for deploying before this project, I had only used vercel so it was something new to me.



`` AI Tools and Prompts used ``
AI tools were used to better the UI of the project and debug deployment on cloudflare pages, and learn about SEO techniques.

Prompts Used : 

Difference between hreflang and cannonical URLs
When i run npm run build locally i can see the hindi translated file but in production i see "page not found" error for the hindi translated file, what could be wrong?
what other seo concepts i can add apart from : meta tags, canonical URLs, Open Graph, sitemap.xml, robots.txt, hreflang.

Potential Tradeoffs: 


How I would improve ? 
I would handle the cases where images are involved in the posts, currently i have only considered the purely textual posts, but i would want to work upon different combination of posts.