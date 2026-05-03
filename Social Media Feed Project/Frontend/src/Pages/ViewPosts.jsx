import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const ViewPosts = () => {
  const [posts, setPosts] = useState([
    {
      _id: "1",
      image:
        "https://images.unsplash.com/photo-1776715139572-ae3d62ce6f6c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
      caption: "city skyline",
    },
  ]);

  useEffect(() => {
    axios.get('http://localhost:3000/posts')
    .then((response) => {
      console.log(response.data.posts);
      
      setPosts(response.data.posts);
    })
    .catch((error) => {
      console.log(error);
    })

  }, [])
  

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <div className="mx-auto min-h-screen max-w-5xl px-6 py-12">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium tracking-wide text-neutral-500">Feed</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Latest posts</h1>
            <p className="mt-2 text-sm text-neutral-500">
              Discover what people are sharing right now.
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center rounded-xl border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
          >
            Create Post
          </Link>
        </div>

        {posts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2">
            {posts.map((post) => (
              <article
                key={post._id}
                className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                  <img
                    src={post.image}
                    alt={post.caption}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm font-medium text-neutral-800">{post.caption}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-neutral-200 bg-white p-8 text-center shadow-sm">
            <p className="text-sm font-medium text-neutral-800">
              No posts available right now!
            </p>
            <p className="mt-2 text-xs text-neutral-500">
              Create your first post to see it here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewPosts;
