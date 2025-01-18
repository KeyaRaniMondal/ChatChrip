import { useState } from 'react';
import useAxiosSecure from '../../shared/useAxiosSecure';
import { IconButton } from '@mui/material';
import { BiDownvote, BiSolidUpvote } from 'react-icons/bi';

const VoteSystem = ({ postId, upvote, downvote }) => {
  const [votes, setVotes] = useState({ upvote: upvote || 0, downvote: downvote || 0 });
  const axiosSecure = useAxiosSecure();

  const handleVote = async (voteType) => {
    setVotes((prev) => ({
      ...prev,
      [voteType]: prev[voteType] + 1,
    }));

    try {
      await axiosSecure.patch(`/posts/${postId}/vote`, { voteType });
    } catch (error) {
      console.error('Error updating vote:', error);
      alert('Failed to update vote. Rolling back...');
      setVotes((prev) => ({
        ...prev,
        [voteType]: prev[voteType] - 1,
      }));
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <IconButton aria-label="upvote" onClick={() => handleVote('upvote')}>
        <BiSolidUpvote className="text-[#257425]" />
        <span className="ml-1 text-sm">{votes.upvote}</span>
      </IconButton>
      <IconButton aria-label="downvote" onClick={() => handleVote('downvote')}>
        <BiDownvote className="text-[#922424]" />
        <span className="ml-1 text-sm">{votes.downvote}</span>
      </IconButton>
    </div>
  );
};

export default VoteSystem;
