import { useAnnouncement } from "../../hooks/announcementContext";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../shared/useAxiosSecure";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";

const Announcement = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, setValue } = useForm();
  const axiosSecure = useAxiosSecure();
  const [announcements, setAnnouncements] = useState([]);
  const { setAnnouncementCount } = useAnnouncement();

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axiosSecure.get("/announcements");
        setAnnouncements(response.data);
        setAnnouncementCount(response.data.length); 
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();

    if (user) {
      setValue("authorName", user.username || "");
      setValue("authorImage", user.photoURL || "");
    }
  }, [user, axiosSecure, setValue]);

  const onSubmit = async (data) => {
    try {
      const newAnnouncement = {
        authorImage: data.authorImage,
        authorName: data.authorName,
        title: data.title,
        description: data.description,
      };

      const response = await axiosSecure.post("/announcements", newAnnouncement);

      Swal.fire({
        title: "Success",
        text: "Announcement created successfully!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      setAnnouncements([...announcements, response.data]);
      setAnnouncementCount(setAnnouncementCount  + 1); 
    } catch (error) {
      console.error("Error creating announcement:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to create announcement. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <div>
      <div className="hero  min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              <label>Author Image</label>
              <input
                {...register("authorImage")}
                type="text"
                placeholder="Author Image URL"
                className="input input-warning input-bordered w-full max-w-xs"
              />
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Author Name</span>
                </div>
                <input
                  {...register("authorName")}
                  type="text"
                  placeholder="Author Name"
                  className="input input-warning input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Title</span>
                </div>
                <input
                  {...register("title")}
                  type="text"
                  placeholder="Title"
                  className="input input-warning input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Description</span>
                </div>
                <textarea
                  {...register("description")}
                  placeholder="Description"
                  className="textarea textarea-warning textarea-bordered w-full max-w-xs"
                />
              </label>
              <input type="submit" className="btn btn-warning mt-4" />
            </form>
          </div>
          <div className="flex flex-col w-full max-w-lg">
            {setAnnouncementCount > 0 ? (
              <div>
                <h2 className="text-2xl font-bold mb-4">Announcements</h2>
                {setAnnouncementCount.map((announcement, index) => (
                  <div key={index} className="card bg-base-100 shadow-md mb-4">
                    <div className="card-body">
                      <h3 className="card-title">{announcement.title}</h3>
                      <p>{announcement.description}</p>
                      <div className="flex items-center mt-2">
                        <img
                          src={announcement.authorImage}
                          alt="Author"
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <span>{announcement.authorName}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Create Announcements Here !!</h2>
                <p>Be the first to create an announcement!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Announcement;

