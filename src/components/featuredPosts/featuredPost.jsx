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
import { styled } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { BiDownvote, BiSolidUpvote } from "react-icons/bi";
import { FaCommentDots } from "react-icons/fa";
import { Link } from "react-router-dom";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

const FeaturedCard = ({ search }) => {
  const [posts, setPosts] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const handleTagSelect = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log("Search:", search);
        console.log("Tags:", selectedTags.join(","));

        const response = await axios.get("http://localhost:5000/posts", {
          params: {
            search: search,
            tags: selectedTags.join(","),
          },
        });

        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [search, selectedTags]);


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="posts-container mt-10">
      {posts.map((post) => (
        <Link key={post._id} to={`/postDetail/${post._id}`}>
          <Card sx={{ maxWidth: 700 }} className="ml-40 mb-5">
            <CardHeader
              className="bg-[#1D1616] text-white"
              avatar={
                <Avatar sx={{ bgcolor: red }} aria-label="recipe">
                  {post.authoremail.charAt(0).toUpperCase()}
                </Avatar>
              }
              title={post.posttitle}
              subheader={post.authoremail}
            />
            <CardMedia
              component="img"
              height="194"
              image={post.image}
              alt={post.posttitle}
            />
            <CardContent className="">
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

            <CardActions disableSpacing className="bg-[#eee8e8]">
              <IconButton aria-label="upvote">
                <BiSolidUpvote className="text-[#257425] hover:'upvote'" />
              </IconButton>
              <IconButton aria-label="downvote">
                <BiDownvote className="text-[#922424]" />
              </IconButton>
              <IconButton aria-label="comment">
                <FaCommentDots />
              </IconButton>

              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              ></ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography>Additional Post Details</Typography>
              </CardContent>
            </Collapse>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default FeaturedCard;
