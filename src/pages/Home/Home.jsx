import { useQuery } from "@tanstack/react-query";
import useAdmin from "../../hooks/useAdmin";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Home = () => {
  const [isAdmin] = useAdmin();
  const axiosSecure = useAxiosSecure();
  const userEmailOrPhone = localStorage.getItem("userEmailOrPhone");
  const { data: user = {} } = useQuery({
    queryKey: ["user", userEmailOrPhone],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${userEmailOrPhone}`);
      return res.data;
    },
  });
  console.log(user);
  return (
    <div>
      <div className="navbar bg-pink-500 text-primary-content rounded">
        <button className="btn btn-ghost text-xl">FlyCash</button>
      </div>
      <p className="">{isAdmin ? "you are admin" : "you are user"}</p>
    </div>
  );
};

export default Home;
