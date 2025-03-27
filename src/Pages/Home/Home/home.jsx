import { useState } from "react";
import FeaturedCard from "../../../components/featuredPosts/featuredPost"
import Banner from "../Banner/banner"
import LatestPosts from "../../../Dashboard/Post/latestPost";

const Home = () => {
    const [search, setSearch] = useState("");

    return (
        <div>
 <LatestPosts></LatestPosts>
            <Banner search={search} setSearch={setSearch}></Banner>
           
            {/* <div className="flex justify-evenly"> */}
            <FeaturedCard search={search} ></FeaturedCard>
            {/* <Tags search={search}></Tags>
            </div> */}
        </div>
    )
}
export default Home

