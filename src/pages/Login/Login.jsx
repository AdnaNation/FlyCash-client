import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Login = () => {
  const navigation = useNavigate();
  const [error, setError] = useState(" ");
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setError(" ");
    try {
      // Hash the PIN before submission
      // const hashedPIN = await bcrypt.hash(data.pin, 10);
      const userInfo = {
        emailOrPhone: data.emailOrPhone,
        hashedPin: data.pin,
      };
      await localStorage.setItem("userEmailOrPhone", data.emailOrPhone);
      await axiosPublic.post("/user", userInfo).then((res) => {
        if (res.status === 200) {
          const userEmailOrPhone = localStorage.getItem("userEmailOrPhone");
          const userInfo = { emailOrPhone: userEmailOrPhone };
          if (userEmailOrPhone) {
            axiosPublic.post("/jwt", userInfo).then((res) => {
              if (res.data.token) {
                localStorage.setItem("access-token", res.data.token);
                setLoading(false);
              }
            });
          }
          setError(res.data.message);
          navigation("/home");
        }
      });
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const validateEmailOrPhone = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^01\d{9}$/;

    if (!emailRegex.test(value) && !phoneRegex.test(value)) {
      return "Please enter a valid email or phone number";
    }

    return undefined;
  };

  return (
    <div className="bg-pink-500 min-h-screen">
      <div className="text-right p-4">
        <Link to="/register" className="btn btn-outline text-white">
          Register
        </Link>
      </div>
      <div className="flex justify-center items-center">
        <div className="flex flex-col w-full max-w-md p-12 space-y-4 text-center dark:bg-gray-50 dark:text-gray-800">
          <h1 className="text-3xl font-semibold">Welcome To FlyCash</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email/Phone Number</span>
              </label>
              <input
                {...register("emailOrPhone", {
                  required: true,
                  validate: validateEmailOrPhone,
                })}
                placeholder="Your Email/Number"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
              />
              {errors.emailOrPhone && (
                <span className="text-gray-200">
                  {errors.emailOrPhone.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Pin</span>
              </label>
              <input
                type="password"
                {...register("pin", {
                  required: true,
                  pattern: /^\d{5}$/,
                })}
                placeholder="pin"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
              />
              {errors.pin && (
                <span className="text-gray-200">
                  Pin must have 5 numaric digits{" "}
                </span>
              )}
              {error && <p>{error}</p>}
            </div>

            <div className="form-control mt-6">
              <input
                className="btn btn-primary"
                type="submit"
                value={loading ? "Logging" : "Login"}
              />
            </div>
            <p className="text-white">
              Haven't registered yet?
              <Link to="/register" className="btn btn-link">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
