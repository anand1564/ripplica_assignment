import posts from "../data/posts.json";
import hiPosts from "../data/posts-hi.json";

import dotenv from "dotenv";
import Groq from "groq-sdk";
import fs from "fs/promises";
import path from "path";

dotenv.config();

type Post = {
  id: number;
  slug: string;
  title: string;
  author: string;
  content: string;
  date: string;
};

type TranslatedContent = {
  title: string;
  content: string;
};

type HindiPost = Post;

const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  throw new Error("GROQ_API_KEY is not defined");
}

const groq = new Groq({
  apiKey,
});


async function translatePost(post: Post): Promise<TranslatedContent> {
  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",

    messages: [
      {
        role: "system",
        content: `
You are a professional English to Hindi translator.

Translate the provided blog post from English to natural, readable Hindi.

Rules:
- Preserve the original meaning.
- Do not add or remove information.
- Translate both the title and content.
- Keep technical terms such as Next.js, React, JavaScript, TypeScript, API,
  HTML, CSS, etc. in English when appropriate.
- Keep the writing natural rather than translating word-for-word.
- Return ONLY valid JSON.
- The JSON must contain exactly two fields:
  "title" and "content".
        `.trim(),
      },

      {
        role: "user",
        content: JSON.stringify({
          title: post.title,
          content: post.content,
        }),
      },
    ],

    response_format: {
      type: "json_object",
    },
  });

  const result = response.choices[0]?.message?.content;

  if (!result) {
    throw new Error(`Translation failed for post: ${post.slug}`);
  }

  try {
    const translated = JSON.parse(result);

    if (
      typeof translated.title !== "string" ||
      typeof translated.content !== "string"
    ) {
      throw new Error("Invalid translation format");
    }

    return translated;
  } catch {
    throw new Error(
      `Groq returned invalid JSON for post: ${post.slug}`
    );
  }
}


async function main() {
  const updatedHiPosts = [...hiPosts];

  for (const post of posts) {
    const existingHiPost = updatedHiPosts.find(
      (hiPost) => hiPost.slug === post.slug
    );

    if (existingHiPost) {
      console.log(`Skipping: ${post.slug}`);
      continue;
    }

    const translated = await translatePost(post);

    const hiPost: HindiPost = {
      id: post.id,
      slug: post.slug,
      title: translated.title,
      author: post.author,
      content: translated.content,
      date: post.date,
    };

    updatedHiPosts.push(hiPost);

    console.log(`✓ Translated: ${post.slug}`);
  }

  const outputPath = path.join(
    process.cwd(),
    "data",
    "posts-hi.json"
  );
  await fs.writeFile(
    outputPath,
    JSON.stringify(updatedHiPosts, null, 2),
    "utf-8"
  );

  console.log("✓ posts-hi.json updated successfully");
}
