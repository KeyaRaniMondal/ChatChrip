import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const LatestPosts = () => {
    const [latest, setLatest] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(5);

    useEffect(() => {
        fetch("https://y-gamma-rouge.vercel.app/posts")
            .then((res) => res.json())
            .then((data) => setLatest(data.slice(0, 10)))
            .catch((error) => console.error("Error fetching posts:", error));
    }, []);

    const updateVisibleCount = () => {
        const width = window.innerWidth;
        if (width >= 1024) return 5; // lg
        else if (width >= 768) return 3; // md
        else return 1; // sm
    };

    useEffect(() => {
        const handleResize = () => {
            const count = updateVisibleCount();
            setVisibleCount(count);
            setCurrentIndex(0); // reset index on resize
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const maxIndex = Math.max(0, latest.length - visibleCount);
    const nextSlide = () => setCurrentIndex((i) => Math.min(i + 1, maxIndex));
    const prevSlide = () => setCurrentIndex((i) => Math.max(i - 1, 0));

    const showArrows = visibleCount < 5;

    return (
        <div className="relative w-full overflow-hidden">
            {latest.length > 0 ? (
                <div className="flex items-center justify-center relative">
                    {showArrows && currentIndex > 0 && (
                        <button
                            onClick={prevSlide}
                            className="absolute left-0 z-10 p-2 mx-2 text-white bg-black rounded-full opacity-70 hover:opacity-100"
                        >
                            <FaChevronLeft />
                        </button>
                    )}

                    <div className="w-full overflow-hidden px-4">
                        <div
                            className="flex gap-4 transition-transform duration-500"
                            style={{
                                transform: `translateX(-${(100 / visibleCount) * currentIndex}%)`,
                                width: `${(100 / visibleCount) * latest.length}%`,
                            }}
                        >
                            {latest.map((post) => (
                                <Link
                                    key={post._id}
                                    to={`/postDetail/${post._id}`}
                                    style={{ width: `${100 / latest.length}%`, flexShrink: 0 }}
                                >
                                    <div
                                        className="h-[200px] card bg-base-100 shadow-sm list-none"
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
                    </div>

                    {showArrows && currentIndex < maxIndex && (
                        <button
                            onClick={nextSlide}
                            className="absolute right-0 z-10 p-2 mx-2 text-white bg-black rounded-full opacity-70 hover:opacity-100"
                        >
                            <FaChevronRight />
                        </button>
                    )}
                </div>
            ) : (
                <p className="text-center">No posts available</p>
            )}
        </div>
    );
};

export default LatestPosts;
