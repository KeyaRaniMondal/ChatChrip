import { useEffect, useState } from "react"

const LatestPosts = () => {
    const [latest, setLatest] = useState([])
    useEffect(() => {
        fetch('https://y-gamma-rouge.vercel.app/posts')
            .then(res => res.json(latest))
            .then(data => setLatest(data))
    }, [])
    return (
        <div>

            {
                (latest.length > 0) ?
                    (<div className="flex justify-between">
                        {
                            latest.slice(0, 5).map((latest) => (
                                <div
                                    className="mt-28 h-[200px] card w-80 bg-base-100 card-xl shadow-sm"
                                    style={{
                                        backgroundImage: `url(${latest.image})`,
                                        backgroundSize: "cover", 
                                        backgroundPosition: "center",
                                    }}
                                >
                                    <li key={latest._id}></li>
                                    <div className="card-body">
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    ) :
                    (
                        <p>No posts available</p>
                    )

            }
        </div >
    )
}
export default LatestPosts