// import { API_BASE_URL } from "./urls";
// import { appendAuthHeader } from "@/utils";

export const AUTH_CACHE_KEY = "posts" as const;

// export async function getPosts(): Promise<Post[]> {
//   const headers = await appendAuthHeader(new Headers());
//   const res = await fetch(`${API_BASE_URL}/post`, { method: "GET", headers });

//   if (!res.ok) {
//     throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
//   }

//   return res.json();
// }

// export async function createPost(post: Post): Promise<Post> {
//   const headers = await appendAuthHeader(new Headers());
//   const res = await fetch(`${API_BASE_URL}/post`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json", ...headers },
//     body: JSON.stringify(post),
//   });

//   if (!res.ok) {
//     throw new Error(`Failed to create post: ${res.status} ${res.statusText}`);
//   }

//   return res.json();
// }
