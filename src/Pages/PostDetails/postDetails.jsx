
import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { CardActions, CardContent } from "@mui/material";
import { red } from "@mui/material/colors";
import VoteSystem from "./voteSystem";
import Comment from "./comment";
import { FacebookIcon, FacebookShareButton,  TwitterIcon,  TwitterShareButton,  WhatsappIcon, WhatsappShareButton } from "react-share";
import { BiLogoDiscord, BiLogoDiscordAlt } from "react-icons/bi";

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
    <div className="flex flex-col justify-center mx-auto w-[600px] pt-28">
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
      <img src={image} alt={posttitle} />
      <div className="my-2">
        {tags.map((tag, index) => (
          <button
            key={index}
            className="border border-black rounded-full px-4 py-2 m-1"
          >
            {tag}
          </button>
        ))}
      </div>
      <p>{postdescription}</p>
      <CardActions disableSpacing className="border border-black mt-5">
        <VoteSystem postId={_id} upvote={upvote} downvote={downvote} />
        <div className="flex justify-end  mr-3 ml-5">
          <WhatsappShareButton url={shareUrl} title={shareMessage}>
            <WhatsappIcon size={40} round={true} />
          </WhatsappShareButton>
        </div>
        <div className="flex justify-end ">
          <FacebookShareButton url={shareUrl} title={shareMessage}>
            <FacebookIcon size={40} round={true} />
          </FacebookShareButton>
        </div>
        <TwitterShareButton url={shareUrl} title={shareMessage}>
          <TwitterIcon size={40} round={true}></TwitterIcon>
        </TwitterShareButton>
        <BiLogoDiscord>
          <BiLogoDiscordAlt></BiLogoDiscordAlt>
        </BiLogoDiscord>
      </CardActions>


      <Comment postId={_id} onCommentAdded={handleCommentAdded} />
    </div>
  );
};

export default PostDetails;
