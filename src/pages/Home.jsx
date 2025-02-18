import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Header from "../components/Header";

function Home() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userFilter, setUserFilter] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  if (posts.length === 0) {
    return (
      <div>
        <Header />
        <Loader />
      </div>
    );
  }

  // Filter posts by title and userId
  const filteredPosts = posts.filter((post) => {
    const matchesTitle = post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesUser = userFilter
      ? post.userId === parseInt(userFilter, 10)
      : true;
    return matchesTitle && matchesUser;
  });

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
        <h1 className="text-5xl font-extrabold mb-8 text-center text-purple-800">
          Posts
        </h1>
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Search posts by title..."
            className="border border-gray-300 rounded-lg p-3 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="border border-gray-300 rounded-lg p-3 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
          >
            <option value="">All Users</option>
            {[...new Set(posts.map((post) => post.userId))].map((userId) => (
              <option key={userId} value={userId}>
                User {userId}
              </option>
            ))}
          </select>
        </div>
        {filteredPosts.length === 0 ? (
          <p className="text-center text-xl text-gray-500">
            No posts match your criteria.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1"
              >
                <Link to={`/post/${post.id}`}>
                  <h2 className="font-bold text-2xl mb-3 text-purple-800">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-gray-600 mb-4">
                  {post.body.substring(0, 100)}...
                </p>
                <Link
                  to={`/post/${post.id}`}
                  className="text-purple-500 hover:text-purple-700 font-semibold"
                >
                  Read More
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
