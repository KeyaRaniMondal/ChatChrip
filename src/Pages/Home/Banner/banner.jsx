import banner from "../../../assets/banner.jpg";

const Banner = ({ search, setSearch }) => {
  return (
    <div
      className="w-full h-[40vw] min-h-[150px] md:min-h-[250px] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <section className="w-full px-4">
        <input
          type="text"
          placeholder="Search by tags or text..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered  w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 py-2 text-white rounded-full mx-auto block"
        />
      </section>
    </div>
  );
};

export default Banner;
