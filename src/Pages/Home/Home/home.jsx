import { useState } from "react";
import FeaturedCard from "../../../components/featuredPosts/featuredPost"
import Banner from "../Banner/banner"
import Tags from "../Sidebar/tags"

const Home = () => {
    const [search, setSearch] = useState(""); 
    return (
        <div>
            <Banner search={search} setSearch={setSearch}></Banner>
            <div className="flex justify-evenly">
                <Tags></Tags>
                <FeaturedCard  search={search}></FeaturedCard>
            </div>
        </div>
    )
}
export default Home

// import React, { useState } from "react";
// import Banner from "./Banner";
// import FeaturedCard from "./FeaturedCard";

// const Home = () => {
//   const [search, setSearch] = useState(""); // Lifted state

//   return (
//     <div>
//       <Banner search={search} setSearch={setSearch} />
//       <FeaturedCard search={search} />
//     </div>
//   );
// };

// export default Home;
