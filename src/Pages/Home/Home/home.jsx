import { useState } from "react";
import FeaturedCard from "../../../components/featuredPosts/featuredPost"
import Banner from "../Banner/banner"
import Tags from "../Sidebar/tags"

const Home = () => {
    const [search, setSearch] = useState(""); 

    return (
        <div>
            <Banner search={search} setSearch={setSearch}></Banner>
            {/* <div className="flex justify-evenly"> */}
                <FeaturedCard search={search} ></FeaturedCard>
                {/* <Tags search={search}></Tags>
            </div> */}
        </div>
    )
}
export default Home

