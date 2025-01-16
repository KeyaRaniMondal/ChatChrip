import { useState } from "react";
import useAxiosPublic from "../../shared/useAxiosPublic";
import useAxiosSecure from "../../shared/useAxiosSecure";
import { useForm } from "react-hook-form";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const AddPost = () => {
  const { register, handleSubmit } = useForm();
  const axiosPublic = useAxiosPublic()
  const axiosSecure = useAxiosSecure()
  const [data, setData] = useState("");
  const onSubmit = async (data) => {
    console.log(data)
    const imageFile = { image: data.image[0] }
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    if (res.data.success) {
      const addPost = {
        authorname: data.authorname,
        postdescription: data.postdescription,
        image: res.data.data.display_url
      }
      // const postRes=await axiosSecure.post('/addPost',addPost)
      // console.log(postRes.data)
      // if(menuRes.data.insertedId)
      // {

      // }
    }
    console.log(res.data)
  }
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <label>Author Image</label>
            <input {...register("image")}
              type="file"
              className="file-input file-input-bordered file-input-warning w-full max-w-xs" />
            <label>Author Name</label>
            <input {...register("authorname")} placeholder="Author name" />
            <textarea {...register("postdescription")} placeholder="Post Description" />
            {/* <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Authore Image </span>
              </div>
              <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </label> */}
            <p>{data}</p>
            <input type="submit" />
          </form>
        </div>
      </div>
    </div>
  )
}
export default AddPost




