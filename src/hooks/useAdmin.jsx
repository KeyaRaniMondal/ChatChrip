import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "../shared/useAxiosSecure";

const useAdmin = () => {
    const { user, loading } = useContext(AuthContext); 
    const axiosSecure = useAxiosSecure();

    const { data: isAdmin = false, isLoading: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading && !!user?.email, 
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            return res.data?.admin; 
        }
    });

    return [isAdmin, isAdminLoading];
};

export default useAdmin;
