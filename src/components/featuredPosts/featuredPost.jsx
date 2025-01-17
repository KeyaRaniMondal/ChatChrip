import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material';
import { red } from '@mui/material/colors';
import { BiDownvote, BiSolidUpvote } from 'react-icons/bi';
import { FaCommentDots } from 'react-icons/fa';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

const FeaturedCard = () => {
  const [posts, setPosts] = useState([]); 
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/posts'); 
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="posts-container flex justify-center mx-auto mt-10" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {posts.map((post) => (
        <Card key={post._id} sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red }} aria-label="recipe">
                {post.authorname?.charAt(0)}
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
          <CardContent>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {post.postdescription}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="upvote">
              <BiSolidUpvote className="text-[#257425] hover:'upvote'" />
            </IconButton>
            <IconButton aria-label="downvote">
              <BiDownvote className="text-[#922424]"/>
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
      ))}
    </div>
  );
};

export default FeaturedCard;
