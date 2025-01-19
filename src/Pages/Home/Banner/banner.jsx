import banner1 from "../../../assets/banner.jpg";

const Banner = ({ search, setSearch }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${banner1})`,
        width: "100vw",
        height: "28vw",
      }}
    >
      <section className="form-control">
        <input
          type="text"
          placeholder="Search by tags or text..."
          value={search}
          onChange={(e) => setSearch(e.target.value)} 
          className="input input-bordered mt-14 bg-[#302d2d] w-24 md:w-1/2 flex justify-center mx-auto rounded-full"
        />
      </section>
    </div>
  );
};

export default Banner;
