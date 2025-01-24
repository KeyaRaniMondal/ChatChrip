import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../shared/useAxiosPublic";
import useAxiosSecure from "../../shared/useAxiosSecure";
import { useForm } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const animatedComponents = makeAnimated();
const options = [
  { value: "programming", label: "programming" },
  { value: "Math", label: "Math" },
  { value: "physics", label: "physics" },
  { value: "plants", label: "plants" },
  { value: "Animals", label: "Animals" },
  { value: "Music", label: "Music" },
  { value: "Health", label: "Health" },
  { value: "Business", label: "Business" },
  { value: "Gaming", label: "Gaming" },
];

const AddPost = () => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const { register, handleSubmit, setValue } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [selectedTags, setSelectedTags] = useState([]);
  const [postCount, setPostCount] = useState(0);
  const [isMemberView, setIsMemberView] = useState(false);

  const handleTagChange = (selectedOptions) => {
    setSelectedTags(selectedOptions || []);
  };

  useEffect(() => {
    const fetchPostCount = async () => {
      try {
        const response = await axiosSecure.get(`/posts/count?email=${user.email}`);
        setPostCount(response.data.count);
        setIsMemberView(response.data.subscription === 'gold');
      } catch (error) {
        console.error("Error fetching post count:", error);
      }
    };

    if (user) {
      fetchPostCount();
      setValue("authorname", user.username || "");
      setValue("authoremail", user.email || "");
      setValue("authorImage", user.photoURL || "");
    }
  }, [user, axiosSecure, setValue]);

  const onSubmit = async (data) => {
    if (!isMemberView && postCount >= 5) {
      Swal.fire({
        title: "Post Limit Reached",
        text: "You need to become a member to post more than 5 times.",
        icon: "warning",
        confirmButtonText: "Go to Membership",
      }).then(() => {
        navigate("/membership");
      });
      return;
    }

    try {
      // Upload image to the hosting service
      const imageFile = { image: data.image[0] };
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Image Upload Response:", res.data);

      if (res.data.success) {
        //  post data
        const currentDate = new Date().toISOString();
        const tags = selectedTags.map((tag) => tag.value);
        const addPost = {
          authorname: data.authorname,
          authorImage: data.authorImage,
          postdescription: data.postdescription,
          image: res.data.data.display_url,
          authoremail: data.authoremail,
          posttitle: data.posttitle,
          tags,
          createdAt: currentDate,
        };

        console.log("Payload to be sent to /posts:", addPost);

        // Save post to the backend
        const postRes = await axiosSecure.post("/posts", addPost);
        console.log("Post Response:", postRes.data);

        Swal.fire({
          title: "Success",
          text: "Posted successfully!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/");
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading post:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to create post. Please try again.",
        icon: "error",
      });
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



