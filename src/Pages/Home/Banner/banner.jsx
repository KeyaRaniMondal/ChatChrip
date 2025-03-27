import LatestPosts from "../../../components/featuredPosts/latestPost";

const Banner = ({ search, setSearch }) => {
  return (
    <div
      className="mt-10 w-full h-[40vw] min-h-[150px] md:min-h-[250px] bg-cover bg-center flex items-center justify-center">
      <div className="text-center">
        <section className="w-full px-4">
          <input
            type="text"
            placeholder="Search by tags or text..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 py-2 text-black bg-white rounded-full mx-auto block"
          />
        </section>
        <LatestPosts></LatestPosts>
        {/* Search Category Buttons */}
        <ul className="flex flex-wrap justify-center gap-2 mt-6 w-11/12 -ml-5">
          {[
            "Technology",
            "Programming",
            "Languages",
            "Game",
            "Business",
            "Animals",
            "Books",
            "Music",
            "Clothes",
            "Health",
            "Startups",
          ].map((category, index) => (
            <li key={index}>
              <button
                className="btn bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800"
                onClick={() => setSearch(category)}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Banner;
