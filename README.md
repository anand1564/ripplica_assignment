
`` How to Run this project locally ``
1. Clone the repo
2. Run npm install to install the dependencies. 
3. Get free Groq api key and fill it in the env
4. Run npm run dev to start the development server 

`` Approach to the project ``

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

`` Following SEO Concepts are applied `` 
1. Meta Tags : snippets of text in the HTML code of a webpage that describe its content to search engines and web browsers
2. Opengraph : It controls how your website looks when someone shares your link on social media, letting you choose the exact image, title, and description that displays.
3. Sitemap : An XML file (usually sitemap.xml) that lists all the important pages, videos, and files on your website, its a roadmap for search engines.
4. Cannonical Urls: It tells search engines which version of a page is the master copy when you have multiple pages with identical or very similar content.
5. href Language : An HTML attribute (rel="alternate" hreflang="x") used to specify the language and geographical targeting of a webpage.
6. Robots : It tells search engine crawlers (like Googlebot) which pages or folders they are allowed or not allowed to visit.
7. JSON LD : a lightweight format used to add structured data to web pages so search engines can easily understand the content.


`` Problems Faced and How i overcame them ``
1. First Problem was deciding on how to translate the pages from english to Hindi.
I was thinking between using Google cloud translate api and Groq api but ended up using Groq api due to time constraint as i have worked with Groq api before, it was the easier choice.
2. Deploying with CloudFlare: 
I hadn't used cloudlfare for deploying before this project, I had only used vercel so it was something new to me. I had some problems navigating the website at first i accidentally deployed the project as worker instead of static pages.
3. After adding English posts and deploying the project, the hindi page was showing page not found error, running the build command locally was showing the expected result, the error was with the build command configuration in cloudflare.



`` AI Tools and Prompts used ``
AI tools were used to better the UI of the project and debug deployment on cloudflare pages, and learn about SEO techniques.

Prompts Used : 
1. Explain the following SEO concepts : meta tags, canonical URLs, Open Graph, sitemap.xml, robots.txt, hreflang.
2. Difference between hreflang and cannonical URLs
3. When i run npm run build locally i can see the hindi translated file but in production i see "page not found" error for the hindi translated file, what could be wrong?
4. what other seo concepts i can add apart from : meta tags, canonical URLs, Open Graph, sitemap.xml, robots.txt, hreflang.
5. Best Translation tools or LLM APIs for English to Hindi Translation

`` Potential Tradeoffs ``

1. Translation Quality vs Development Speed:
I chose Groq for its ease of integration and fast development compared to setting up a dedicated translation service. Even in LLM APIs, Groq isn't the best option if we want to scale this website or include larger posts.
2. Simplicity vs Extensibility:
Storing posts in JSON keeps the project simple and easy to understand, but it would become less suitable as the number of posts grows. A database or CMS would be more appropriate for a larger production blog with frequent content updates.

 `` How I would improve ? ``
I would handle the cases where images are involved in the posts, currently i have only considered the purely textual posts, but i would want to work upon different combination of posts.