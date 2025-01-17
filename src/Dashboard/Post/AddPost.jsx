import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../shared/useAxiosPublic";
import useAxiosSecure from "../../shared/useAxiosSecure";
import { useForm } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { AuthContext } from "../../Providers/AuthProvider";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const animatedComponents = makeAnimated();
const options = [
  { value: "programming", label: "programming" },
  { value: "Math", label: "Math" },
  { value: "physics", label: "physics" },
  { value: "plants", label: "plants" },
  { value: "Animals", label: "Animals" },
  { value: "Business", label: "Business" },
];

const AddPost = () => {
  const {user}=useContext(AuthContext)
  const { register, handleSubmit, setValue } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [selectedTags, setSelectedTags] = useState([]); 

  const handleTagChange = (selectedOptions) => {
    setSelectedTags(selectedOptions || []); 
  };

  useEffect(() => {
    if (user) {
      setValue("authorname", user.username || ""); 
      setValue("authoremail", user.email || ""); 
    }
  }, [user, setValue]);
  const onSubmit = async (data) => {
    console.log("Form Data:", data);

    const tags = selectedTags.map((tag) => tag.value);
    console.log("Selected Tags:", tags);

    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const addPost = {
        authorname: data.authorname,
        postdescription: data.postdescription,
        image: res.data.data.display_url,
        authoremail: data.authoremail,
        posttitle: data.posttitle,
        tags,
      };
      const postRes=await axiosSecure.post('/posts',addPost)
      console.log("Post Data:",postRes.data);
      console.log("Post Data:", addPost);
      console.log(res.data);

    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <label>Author Image</label>
            <input
              {...register("image")}
              type="file"
              className="file-input file-input-bordered file-input-warning w-full max-w-xs"
            />
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Author Name </span>
              </div>
              <input
                {...register("authorname")}
                type="text"
                placeholder="Author Name"
                className="input input-warning input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Author Email </span>
              </div>
              <input
                {...register("authoremail")}
                type="email"
                placeholder="Author Email"
                className="input input-warning input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Post Title</span>
              </div>
              <input
                {...register("posttitle")}
                type="text"
                placeholder="Post Title"
                className="input input-warning input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Post Description</span>
              </div>
              <textarea
                {...register("postdescription")}
                type="text"
                placeholder="Post Description"
                className="input input-warning input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Tags</span>
              </div>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={options}
                onChange={handleTagChange} 
              />
            </label>
            <input type="submit" className="btn btn-warning mt-4" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPost;





