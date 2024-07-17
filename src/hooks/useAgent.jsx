import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAgent = () => {
  const userEmailOrPhone = localStorage.getItem("userEmailOrPhone");
  const axiosSecure = useAxiosSecure();
  const { data: isAgent, isPending: isAgentLoading } = useQuery({
    queryKey: [userEmailOrPhone, "isAgent"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/agent/${userEmailOrPhone}`);
      return res.data?.agent;
    },
  });
  return [isAgent, isAgentLoading];
};

export default useAgent;
