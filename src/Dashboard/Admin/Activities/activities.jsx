import { useEffect, useState } from "react";
import useAxiosSecure from "../../../shared/useAxiosSecure";

const ActivityPage = () => {
  const [reportedComments, setReportedComments] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchReportedComments = async () => {
      try {
        const response = await axiosSecure.get("/reportedActivities");
        setReportedComments(response.data); 
      } catch (error) {
        console.error("Error fetching reported comments:", error);
      }
    };

    fetchReportedComments();
  }, []);

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-2xl font-bold mb-4 text-center">Activity: Reported Comments</h1>
      {reportedComments.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Comment</th>
              <th className="border px-4 py-2">Feedback</th>
              <th className="border px-4 py-2">Reported At</th>
            </tr>
          </thead>
          <tbody>
            {reportedComments.map((report) => (
              <tr key={report.commentId}>
                <td className="border px-4 py-2">{report.authorEmail}</td>
                <td className="border px-4 py-2">{report.text}</td>
                <td className="border px-4 py-2">{report.feedback}</td>
                <td className="border px-4 py-2">
                  {new Date(report.reportedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No reported comments.</p>
      )}
    </div>
  );
};

export default ActivityPage;