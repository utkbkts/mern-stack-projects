import React, { useState } from "react";
import { Card, Pagination, PopularPosts, PopularWriters } from "../components";
import { popular, posts } from "../utils/Data.jsx";

const CategoriesPage = () => {
  const query = new URLSearchParams(window.location.search).get("cat");
  const numOfPages = 1;
  const [page, setPage] = useState(1);

  const randomIndex = Math.floor(Math.random() * posts.length);

  const handlePageChange = (val) => {
    setPage(val);

    console.log(val);
  };
  return (
    <div className="px-0 2xl:px-20">
      <div className="py-5">
        <h2 className="text-4xl 2xl:text-5xl font-semibold text-slate-800 dark:text-white">
          {query}
        </h2>
      </div>

      <div className="w-full flex flex-col md:flex-row gap-10 2xl:gap-20">
        <div className="w-full md:w-2/3 flex flex-col gap-y-28 md:gap-y-14">
          {posts?.map((post, index) => (
            <Card key={post?._id} post={post} index={index} />
          ))}

          <div className="w-full flex items-cemter justify-center">
            <Pagination
              totalPages={numOfPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-1/4 flex flex-col gap-y-12">
          {/* POPULAR POSTS */}
          <PopularPosts posts={popular?.posts} />

          {/* POPULAR WRITERS */}
          <PopularWriters data={popular?.writers} />
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
