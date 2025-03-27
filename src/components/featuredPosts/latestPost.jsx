import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LatestPosts = () => {
    const [latest, setLatest] = useState([]);

    useEffect(() => {
        fetch("https://y-gamma-rouge.vercel.app/posts")
            .then((res) => res.json())
            .then((data) => setLatest(data.slice(0, 5)))
            .catch((error) => console.error("Error fetching posts:", error));
    }, []);

    return (
        <div>
            {latest.length > 0 ? (
                <div className="flex justify-between gap-5 mx-20">
                    {latest.map((post) => (
                        <Link key={post._id} to={`/postDetail/${post._id}`}>
                            <div
                                className="mt-14 h-[200px] card w-60 bg-base-100 card-xl shadow-sm list-none"
                                style={{
                                    backgroundImage: `url(${post.image})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            >
                                <div className="card-body"></div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <p>No posts available</p>
            )}
        </div>
    );
};

export default LatestPosts;
