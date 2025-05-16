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
        if (width >= 1280) return 5;        // xl
        else if (width >= 1024) return 3;   // lg
        else if (width >= 768) return 2;    // md
        else return 1;                      // sm
    };

    useEffect(() => {
        const handleResize = () => {
            const count = updateVisibleCount();
            setVisibleCount(count);
            setCurrentIndex(0);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const maxIndex = Math.max(0, latest.length - visibleCount);
    const nextSlide = () => setCurrentIndex((i) => Math.min(i + 1, maxIndex));
    const prevSlide = () => setCurrentIndex((i) => Math.max(i - 1, 0));

    return (
        <div className="relative w-full py-6 px-2 sm:px-6 overflow-hidden">
            {latest.length > 0 ? (
                <div className="relative flex items-center w-full">
                    {/* Left Arrow */}
                    {currentIndex > 0 && (
                        <button
                            onClick={prevSlide}
                            className="absolute z-10 left-0 bg-black/60 hover:bg-black text-white p-2 rounded-full"
                        >
                            <FaChevronLeft />
                        </button>
                    )}

                    {/* Slider */}
                    <div className="w-full overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{
                                width: `${(100 / visibleCount) * latest.length}%`,
                                transform: `translateX(-${(100 / latest.length) * currentIndex}%)`,
                            }}
                        >
                            {latest.map((post) => (
                                <Link
                                    key={post._id}
                                    to={`/postDetail/${post._id}`}
                                    className="flex-shrink-0"
                                    style={{
                                        width: `${100 / latest.length}%`,
                                        padding: '0 8px',
                                    }}
                                >
                                    <div
                                        className="h-52 bg-gray-200 rounded-md shadow"
                                        style={{
                                            backgroundImage: `url(${post.image || "/placeholder.jpg"})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                        }}
                                    ></div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right Arrow */}
                    {currentIndex < maxIndex && (
                        <button
                            onClick={nextSlide}
                            className="absolute z-10 right-0 bg-black/60 hover:bg-black text-white p-2 rounded-full"
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
