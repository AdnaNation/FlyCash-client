import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const userEmailOrPhone = localStorage.getItem("userEmailOrPhone");
  const axiosSecure = useAxiosSecure();
  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: [userEmailOrPhone, "isAdmin"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${userEmailOrPhone}`);
      return res.data?.admin;
    },
  });
  return [isAdmin, isAdminLoading];
};

export default useAdmin;
