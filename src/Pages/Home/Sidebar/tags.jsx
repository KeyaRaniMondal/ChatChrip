import { useState, useEffect } from "react";
import axios from "axios";
import { CardActions, CardContent, CardMedia, IconButton, Pagination, Typography } from "@mui/material";
import { FaCommentDots } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import { BiDownvote, BiSolidUpvote } from "react-icons/bi";

const Tags = ({ setSearch }) => {
  const handleTagClick = (tag) => {
    setSearch(tag);
  };

  return (
    <div className="mt-28 ">
      <ul className="steps steps-vertical">
        <li className="btn bg-black text-white" onClick={() => handleTagClick("Programming")}> Programming</li>
        <li className="btn bg-black text-white" onClick={() => handleTagClick("Languages")}> Languages</li>
        <li className="btn bg-black text-white" onClick={() => handleTagClick("Gaming")}> Gaming</li>
        <li className="btn bg-black text-white" onClick={() => handleTagClick("Business")}> Business</li>
        <li className="btn bg-black text-white" onClick={() => handleTagClick("Animals")}> Animals</li>
        <li className="btn bg-black text-white" onClick={() => handleTagClick("Books")}> Books</li>
        <li className="btn bg-black text-white" onClick={() => handleTagClick("Music")}> Music</li>
        <li className="btn bg-black text-white" onClick={() => handleTagClick("Cloths")}> Cloths</li>
        <li className="btn bg-black text-white" onClick={() => handleTagClick("Health")}> Health</li>
        <li className="btn bg-black text-white" onClick={() => handleTagClick("Startups")}> Startups</li>
      </ul>
    </div>
  );
};

const TagsRelatedCard = ({ search }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("https://y-gamma-rouge.vercel.app/posts", {
          params: {
            search,
          },
        });
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    if (search) {
      fetchPosts();
    }
  }, [search]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedPosts = posts.slice((page - 1) * postsPerPage, page * postsPerPage);

  return (
    <div className="posts-container mt-20 w-96 ml-20 -mr-10">
      <h2 className="text-lg font-bold mb-5 text-center">Tags Related Search results</h2>
      {paginatedPosts.map((post) => (
        <div key={post._id}>
          <CardMedia
            component="img"
            height="194"
            image={post.image}
            alt={post.posttitle}
          />
          <CardContent>

            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {post.postdescription}
            </Typography>
          </CardContent>

          <CardActions disableSpacing className="bg-[#fcf9f9]">
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
        </div>
      ))}
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

const PostPage = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="flex ">
      <Tags setSearch={setSearch} />
      <TagsRelatedCard search={search} />
    </div>
  );
};

export default PostPage;
