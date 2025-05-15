import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import { styled } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { BiDownvote, BiSolidUpvote } from "react-icons/bi";
import { FaCommentDots } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoSparkles } from "react-icons/io5";
import { IoIosShareAlt } from "react-icons/io";

const FeaturedCard = ({ search }) => {
  const [posts, setPosts] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [sortByPopularity, setSortByPopularity] = useState(false);
  const [page, setPage] = useState(1);
  const postsPerPage = 5;

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("https://y-gamma-rouge.vercel.app/posts", {
          params: {
            search,
            tags: selectedTags.join(","),
            sortByPopularity,
          },
        });
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [search, selectedTags, sortByPopularity]);

  const toggleSortByPopularity = () => {
    setSortByPopularity(!sortByPopularity);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedPosts = posts.slice(
    (page - 1) * postsPerPage,
    page * postsPerPage
  );

  return (
    <div className="posts-container mt-10 items-center mx-auto w-full max-w-4xl px-4 lg:px-6 lg:-mt-[30%]">
      <div className="flex justify-end  ">
        <button
          onClick={toggleSortByPopularity}
          className="flex items-center gap-2 bg-gradient-to-r from-[#726f24] to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white text-sm px-4 py-2 rounded-full shadow"
        >
          <IoSparkles className="text-lg" />
          {sortByPopularity ? "Sort by Newest" : "Sort by Popularity"}
        </button>
      </div>

      {paginatedPosts.map((post) => (
        <Link key={post._id} to={`/postDetail/${post._id}`}>
          <Card sx={{ maxWidth: 700 }} className="mb-5 mx-auto">

            <CardHeader

              avatar={
                <Avatar sx={{ bgcolor: red }} aria-label="recipe">
                  {post.authoremail.charAt(0).toUpperCase()}
                </Avatar>
              }
              title={post.posttitle}
              // subheader={post.authoremail}
              subheader={new Date(post.createdAt).toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            />
            <CardMedia
              component="img"
              height="194"
              image={post.image}
              alt={post.posttitle}
            />
            <CardContent>
              <div className="my-2">
                {post.tags.map((tag, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTagSelect(tag);
                    }}
                    className={`${selectedTags.includes(tag) ? "bg-green-500" : "bg-black"
                      } text-white rounded-full px-4 py-2 m-1`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {post.postdescription}
              </Typography>
            </CardContent>

            <CardActions disableSpacing >
              <IconButton aria-label="upvote">
                <BiSolidUpvote className="text-[#257425]" />
              </IconButton>
              <Typography>{post.upvote - post.downvote}</Typography>
              <IconButton aria-label="downvote">
                <BiDownvote className="text-[#922424]" />
              </IconButton>
              <IconButton aria-label="comment">
                <FaCommentDots />
              </IconButton>
              <IconButton aria-label="share">
                <IoIosShareAlt />
              </IconButton>
            </CardActions>
          </Card>
        </Link>
      ))}


      {/* Pagination */}
      <div className="pagination flex justify-center mt-5">
        <Pagination
          count={Math.ceil(posts.length / postsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </div>
  );
};

export default FeaturedCard;



