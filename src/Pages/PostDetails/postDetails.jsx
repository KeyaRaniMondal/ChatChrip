import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { CardActions, CardContent } from "@mui/material";
import { red } from "@mui/material/colors";
import VoteSystem from "./voteSystem";
import Comment from "./comment";
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";

const PostDetails = () => {
  const [comments, setComments] = useState([]);

  const handleCommentAdded = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const post = useLoaderData();
  const {
    _id,
    authorname,
    authorImage,
    postdescription,
    image,
    authoremail,
    posttitle,
    tags,
    upvote,
    downvote,
  } = post;

  const shareUrl = `https://forum-client-c31be.web.app/posts/${_id}`;
  const shareMessage = `Check out this post by ${authorname} titled "${posttitle}"!`;

  return (
    <div className="flex flex-col justify-center mx-auto w-full md:w-[600px] px-4 md:px-0 pt-20 md:pt-28">
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red }}
            src={authorImage}
            alt={authorname || "User Avatar"}
          />
        }
        title={authorname}
        subheader={authoremail}
      />
      <h2 className="text-xl font-bold text-left mb-5">{posttitle}</h2>
      <img src={image} alt={posttitle} className="w-full h-auto" />
      <div className="my-2 flex flex-wrap">
        {tags.map((tag, index) => (
          <button
            key={index}
            className="border border-black rounded-full px-3 py-1 m-1 text-sm md:px-4 md:py-2 md:text-base"
          >
            {tag}
          </button>
        ))}
      </div>
      <p className="text-base md:text-lg">{postdescription}</p>
      <CardActions disableSpacing className="border border-black mt-5 flex flex-wrap justify-center md:justify-start">
        <VoteSystem postId={_id} upvote={upvote} downvote={downvote} />
        <div className="flex justify-end  ml-5">
          <WhatsappShareButton url={shareUrl} title={shareMessage}>
            <WhatsappIcon size={32} round={true} className="md:size-10" />
          </WhatsappShareButton>
        </div>
        <div className="flex justify-end mr-3 ml-5">
          <FacebookShareButton url={shareUrl} title={shareMessage}>
            <FacebookIcon size={32} round={true} className="md:size-10" />
          </FacebookShareButton>
        </div>
        <TwitterShareButton url={shareUrl} title={shareMessage}>
          <TwitterIcon size={32} round={true} className="md:size-10"></TwitterIcon>
        </TwitterShareButton>
      </CardActions>

      <Comment postId={_id} onCommentAdded={handleCommentAdded} />
    </div>
  );
};

export default PostDetails;