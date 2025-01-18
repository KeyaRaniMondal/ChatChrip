import FeaturedCard from "../../../components/featuredPosts/featuredPost"
import Banner from "../Banner/banner"
import Tags from "../Sidebar/tags"

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <div className="flex justify-evenly">
                <Tags></Tags>
                <FeaturedCard></FeaturedCard>
            </div>
        </div>
    )
}
export default Home