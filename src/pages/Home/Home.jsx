import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import useAgent from "../../hooks/useAgent";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Home = () => {
  const [isAdmin] = useAdmin();
  const [isAgent] = useAgent();
  const axiosSecure = useAxiosSecure();
  const userEmailOrPhone = localStorage.getItem("userEmailOrPhone");
  const { data: user = {} } = useQuery({
    queryKey: ["user", userEmailOrPhone],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${userEmailOrPhone}`);
      return res.data;
    },
  });
  return (
    <div>
      <div className="navbar bg-pink-500 text-primary-content rounded">
        <p className=" btn-ghost text-xl">FlyCash</p>
      </div>
      <div className="flex min-h-screen">
        <div className="bg-pink-500 min-w-40">
          {isAdmin ? (
            <>
              <li>Admin</li>
            </>
          ) : isAgent ? (
            <>
              <li>Agent</li>
            </>
          ) : (
            <>
              <li>User</li>
            </>
          )}
        </div>
        <div className="flex-grow border">
          <Outlet></Outlet>
          <p>
            {user.name} {user.role}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
