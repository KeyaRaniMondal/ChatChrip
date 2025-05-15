import LatestPosts from "../../../components/featuredPosts/latestPost";
import {
  FaGamepad,
  FaBook,
  FaMusic,
  FaTshirt,
  FaHeartbeat,
  FaLaptopCode,
  FaLanguage,
  FaBriefcase,
  FaMicrochip,
  FaStar,
  FaQuestionCircle,
  FaChevronDown,
} from "react-icons/fa";

const categoryIcons = {
  Game: <FaGamepad />,
  Business: <FaBriefcase />,
  Animals: <FaHeartbeat />,
  Technology: <FaMicrochip />,
  Programming: <FaLaptopCode />,
  Languages: <FaLanguage />,
  Books: <FaBook />,
  Music: <FaMusic />,
  Clothes: <FaTshirt />,
  Health: <FaHeartbeat />,
  Startups: <FaStar />,
};

const Banner = ({ search, setSearch }) => {
  return (
    <div className="pt-28 w-full min-h-[150px] md:min-h-[250px] bg-cover bg-center flex flex-col items-center">
      {/* Search Input */}
      <section className="w-full px-4">
        <input
          type="text"
          placeholder="Search by tags or text..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full max-w-[90%] sm:max-w-[70%] md:max-w-[50%] lg:max-w-[30%] px-4 py-2 text-black bg-white rounded-full mx-auto block shadow-md"
        />
      </section>

      {/* Featured Posts Carousel */}
      <div className="mt-8 w-full px-4 sm:px-8">
        <LatestPosts />
      </div>

      {/* Category Sidebar Look */}
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mt-6 px-4 text-left lg:-ml-[70%]">
        <h3 className=" text-sm font-semibold mb-2 tracking-wide">TOPICS</h3>
        <ul className="flex flex-col gap-2">
          {Object.keys(categoryIcons).map((category, index) => (
            <li
              key={index}
              onClick={() => setSearch(category)}
              className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-100 hover:text-black cursor-pointer"
            >
              <div className="flex items-center gap-3 ">
                <span className="text-xl">{categoryIcons[category]}</span>
                <span className="text-sm font-medium">{category}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Banner;
