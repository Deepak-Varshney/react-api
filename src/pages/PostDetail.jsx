import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Header from '../components/Header';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => response.json())
      .then((data) => setPost(data));
  }, [id]);

  if (!post) {
    return (
      <div>
        <Header />
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
        <Link
          to="/"
          className="text-purple-500 hover:underline mb-4 inline-block"
        >
          &larr; Back to Posts
        </Link>
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-5xl font-bold mb-6 text-purple-800">
            {post.title}
          </h1>
          <p className="text-gray-700 text-xl leading-relaxed">{post.body}</p>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
