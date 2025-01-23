import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../shared/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Pagination } from "@mui/material";

const ManageUsers = () => {
  const [page, setPage] = useState(1);
  const usersPerPage = 10;
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    }
  });

  const handleMakeAdmin = (user) => {
    axiosSecure
      .patch(`/users/admin/${user._id}`)
      .then((res) => {
        if (res.data) {
          refetch();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${user.name} is an Admin Now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: `Failed to make ${user.name} an admin: ${error.response?.data?.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const handleMembershipUpdate = (user) => {
    axiosSecure.post('/update-membership', { email: user.email })
      .then((res) => {
        if (res.data.success) {
          refetch();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${user.name}'s membership updated to ${res.data.user.membership}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: `Failed to update membership: ${error.response.data.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };


  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "User has been deleted.",
                icon: "success"
              });
            }
          });
      }
    });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Paginate users
  const paginatedUsers = users.slice(
    (page - 1) * usersPerPage,
    page * usersPerPage
  );

  return (
    <div>
      <div className="flex justify-evenly my-4">
        <h2 className="text-3xl">All Users</h2>
        <h2 className="text-3xl">Total Users: {users.length}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Make Admin</th>
              <th>Action</th>
              <th>Subscription Status</th>
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.map((user, index) => (
              <tr key={user._id}>
                <td>{(page - 1) * usersPerPage + index + 1}</td>

                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === 'admin' ? 'Admin' : (
                    <button onClick={() => handleMakeAdmin(user)} className="btn btn-lg bg-orange-500">
                      <FaUsers className="text-white text-2xl" />
                      <h1 className="text-xs -mt-5">Make Admin</h1>
                    </button>
                  )}
                </td>
                <td>
                  <button onClick={() => handleDeleteUser(user)} className="btn btn-ghost btn-lg">
                    <FaTrashAlt className="text-red-600" />
                  </button>
                </td>
                <td>{user.membership || 'None'}</td>
                <td>
                  <button
                    onClick={() => handleMembershipUpdate(user)}
                    className="btn btn-lg bg-green-500 text-white"
                  >
                    Update Membership
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      <div className="pagination flex justify-center mt-5">
        <Pagination
          count={Math.ceil(users.length / usersPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </div>
  );
};

export default ManageUsers;
// import { useQuery } from "@tanstack/react-query";
// import { FaTrashAlt, FaUsers } from "react-icons/fa";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../../shared/useAxiosSecure";
// import { useState } from "react";
// import { Pagination } from "@mui/material";

// const ManageUsers = () => {
//   const [page, setPage] = useState(1);
//   const usersPerPage = 10;
//   const axiosSecure = useAxiosSecure();

//   // Fetch all users
//   const { data: users = [], refetch } = useQuery({
//     queryKey: ['users'],
//     queryFn: async () => {
//       const res = await axiosSecure.get('/users');
//       return res.data;
//     }
//   });

//   //promote a user to admin
//   const handleMakeAdmin = (user) => {
//     axiosSecure
//       .patch(`/users/admin/${user._id}`)
//       .then((res) => {
//         if (res.data.modifiedCount > 0) {
//           refetch();
//           Swal.fire({
//             position: 'top-end',
//             icon: 'success',
//             title: `${user.name} is now an Admin!`,
//             showConfirmButton: false,
//             timer: 1500,
//           });
//         }
//       })
//       .catch((error) => {
//         Swal.fire({
//           position: 'top-end',
//           icon: 'error',
//           title: `Failed to make ${user.name} an admin.`,
//           showConfirmButton: false,
//           timer: 1500,
//         });
//       });
//   };

//   //  delete a user
//   const handleDeleteUser = (user) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "This action cannot be undone!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!"
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axiosSecure.delete(`/users/${user._id}`)
//           .then((res) => {
//             if (res.data.deletedCount > 0) {
//               refetch();
//               Swal.fire({
//                 title: "Deleted!",
//                 text: "User has been deleted.",
//                 icon: "success",
//               });
//             }
//           });
//       }
//     });
//   };

//   const handleMembershipUpdate = (user) => {
//     axiosSecure.post('/update-membership', { email: user.email })
//       .then((res) => {
//         if (res.data.success) {
//           refetch();
//           Swal.fire({
//             position: 'top-end',
//             icon: 'success',
//             title: `${user.name}'s membership updated to ${res.data.user.membership}`,
//             showConfirmButton: false,
//             timer: 1500,
//           });
//         }
//       })
//       .catch((error) => {
//         Swal.fire({
//           position: 'top-end',
//           icon: 'error',
//           title: `Failed to update membership: ${error.response.data.message}`,
//           showConfirmButton: false,
//           timer: 1500,
//         });
//       });
//   };

//   const handlePageChange = (event, value) => {
//     setPage(value);
//   };

//   // Paginate users
//   const paginatedUsers = users.slice(
//     (page - 1) * usersPerPage,
//     page * usersPerPage
//   );

//   return (
//     <div>
//       <div className="flex justify-between my-4">
//         <h2 className="text-3xl">Manage Users</h2>
//         <h2 className="text-3xl">Total Users: {users.length}</h2>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="table table-zebra w-full">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Role</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedUsers.map((user, index) => (
//               <tr key={user._id}>
//                 <td>{(page - 1) * usersPerPage + index + 1}</td>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//                 <td className="bg-slate-500">
//                   {user.role === 'admin' ? <span className="bg-[white] p-2 ml-8 rounded-full">Admin</span> : (
//                     <button
//                       onClick={() => handleMakeAdmin(user)}
//                       className="btn btn-sm bg-[#6e6920] text-white"
//                     >
//                       <FaUsers className="inline" /> Make Admin
//                     </button>
//                   )}
//                 </td>
//                 <td>
//                   <button
//                     onClick={() => handleDeleteUser(user)}
//                     className="btn btn-sm btn-ghost"
//                   >
//                     <FaTrashAlt className="text-red-600" />
//                   </button>
//                 </td>
//                                 <td>{user.membership || 'None'}</td>
//                  <td>
//                    <button
//                      onClick={() => handleMembershipUpdate(user)}
//                      className="btn btn-sm bg-green-500 text-white"
//                    >
//                      Update Membership
//                   </button>
//                  </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>


//       <div className="pagination flex justify-center mt-5">
//         <Pagination
//           count={Math.ceil(users.length / usersPerPage)}
//           page={page}
//           onChange={handlePageChange}
//           color="primary"
//         />
//       </div>
//     </div>
//   );
// };

// export default ManageUsers;
