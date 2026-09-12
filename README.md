
`` How to Run this project locally ``
1. Clone the repo
2. Run npm install to install the dependencies. 
3. Get free Groq api key and fill it in the env


The posts are described in the posts.json file
Adding a new post in the file and building the project would automatically 
build the hindi translated page of the post.
The hindi translation is done through an LLM api call using Groq api.
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
