import React from 'react';

const Blogs = () => {
  const blogData = [
    {
      title: "The Importance of Regular Exercise",
      content: "Regular physical activity is crucial for maintaining good health and well-being.  It can help prevent chronic diseases, improve mood, and boost energy levels.  Aim for at least 30 minutes of moderate-intensity exercise most days of the week.  Find activities you enjoy, whether it's walking, running, swimming, or dancing, and make it a part of your routine.",
      author: "Fitness Enthusiast",
      date: "October 26, 2023"
    },
    {
      title: "Exploring the World of Culinary Arts",
      content: "From simple home-cooked meals to gourmet restaurant creations, the world of culinary arts is vast and exciting.  Experiment with new recipes, learn different cooking techniques, and discover the diverse flavors of cuisines from around the globe.  Cooking can be a creative outlet and a rewarding experience.",
      author: "Foodie Adventures",
      date: "October 25, 2023"
    },
    {
      title: "The Benefits of Mindfulness Meditation",
      content: "In today's fast-paced world, it's easy to feel overwhelmed and stressed.  Mindfulness meditation can help you cultivate inner peace and reduce anxiety.  By focusing on the present moment and observing your thoughts and feelings without judgment, you can develop a greater sense of calm and well-being.",
      author: "Mindfulness Coach",
      date: "October 24, 2023"
    },
    {
      title: "The Power of Reading for Personal Growth",
      content: "Reading is a powerful tool for personal growth and development.  It can expand your knowledge, broaden your perspectives, and inspire you to achieve your goals.  Make time for reading each day, whether it's fiction, non-fiction, or self-help books.  You'll be amazed at the positive impact it can have on your life.",
      author: "Bookworm Insights",
      date: "October 23, 2023"
    },
    {
      title: "Tips for Effective Time Management",
      content: "Effective time management is essential for productivity and success.  Prioritize your tasks, set realistic goals, and avoid procrastination.  Use tools like calendars, to-do lists, and time-blocking techniques to stay organized and focused.  By managing your time wisely, you can achieve more and reduce stress.",
      author: "Productivity Guru",
      date: "October 22, 2023"
    }
  ];

  return (
    <div className='mt-32'>
      {blogData.map((blog, index) => (
        <div key={index} className="blog-post">
          <h3 className='font-bold text-xl text-[#c0932a]'>{blog.title}</h3>
          <p>{blog.content}</p>
          <div className="blog-meta">
            <span className="author">{blog.author}</span> | <span className="date">{blog.date}</span>
          </div>
          <hr /> 
        </div>
      ))}
    </div>
  );
};

export default Blogs;