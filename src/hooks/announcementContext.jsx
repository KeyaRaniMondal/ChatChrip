import { createContext, useContext, useState, useEffect } from "react";
import useAxiosSecure from "../shared/useAxiosSecure";

const AnnouncementContext = createContext();
export const AnnouncementProvider = ({ children }) => {
  const axiosSecure = useAxiosSecure();
  const [announcementCount, setAnnouncementCount] = useState(0);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axiosSecure.get("/announcements");
        setAnnouncementCount(response.data.length);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, [axiosSecure]);

  return (
    <AnnouncementContext.Provider value={{ announcementCount, setAnnouncementCount }}>
      {children}
    </AnnouncementContext.Provider>
  );
};

export const useAnnouncement = () => useContext(AnnouncementContext);

