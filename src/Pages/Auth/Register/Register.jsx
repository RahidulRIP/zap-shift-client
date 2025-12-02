import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FiImage, FiLock, FiMail, FiUser } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import SocialGoogleLogin from "../SocialLogin/SocialGoogleLogin";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const [eyes, setEyes] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location);

  const handleRegister = (data) => {
    // console.log(data);
    // register a user
    createUser(data?.email, data?.password)
      .then(() => {
        // console.log(result.user);

        // upload photo using api in imgBB start
        const file = data.photo[0];
        const formData = new FormData();
        formData.append("image", file);
        const apiKey = import.meta.env.VITE_ImgBB_api;
        const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;
        try {
          axios.post(url, formData).then((res) => {
            const imgURL = res?.data?.data?.display_url;
            const profile = {
              displayName: data?.name,
              photoURL: imgURL,
            };

            // update user profile
            updateUserProfile(profile)
              .then(() => {
                navigate(location?.state || "/");
              })
              .catch((err) => {
                setError(err.message);
              });
          });
        } catch (err) {
          console.log(err);
        }
        // upload photo using api in imgBB end
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  return (
    <div className="flex items-center justify-center my-12 md:my-28 p-3.5">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Register your account
        </h2>
        <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
          {/* name  */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Your Name
            </label>
            <div className="relative">
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Enter your name"
                className="input input-bordered w-full pl-10 outline-none"
                required
              />
              <FiUser className="absolute top-3.5 left-3 z-1  text-gray-400" />
            </div>
          </div>
          {/* photo  file*/}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Photo
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full"
                {...register("photo", { required: true })}
              />
              <FiImage className="absolute top-3.5 right-5 z-1 text-gray-400" />
            </div>

            {errors.photo && (
              <p className="text-red-500 text-sm mt-1">Photo is required</p>
            )}
          </div>
          {/* email  */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="Enter your email address"
                className="input input-bordered w-full pl-10"
                required
              />
              <FiMail className="absolute top-3.5 left-3 z-1  text-gray-400" />
            </div>
          </div>
          {/* password  */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/,
                    message:
                      "Must be 6+ chars and include letters, numbers & special characters",
                  },
                })}
                type={eyes ? "text" : "password"}
                placeholder="Enter your password"
                className="input input-bordered w-full pl-10"
              />
              {/* errors  */}
              {errors.password && (
                <p className="text-red-500 text-sm pt-1.5">
                  {errors.password.message}
                </p>
              )}
              <FiLock className="absolute top-3.5 left-3 z-1  text-gray-400" />
              <button type="button" onClick={() => setEyes(!eyes)}>
                {eyes ? (
                  <FaRegEye className="absolute right-6 top-3 z-1" />
                ) : (
                  <FaRegEyeSlash className="absolute right-6 top-3 z-1" />
                )}
              </button>
            </div>
          </div>
          {/* checkBox  */}
          <div className="flex items-center gap-2">
            <input
              name="terms"
              type="checkbox"
              className="checkbox checkbox-sm"
            />
            <h2 className="text-sm text-gray-700">Accept Terms & Conditions</h2>
          </div>

          {/* error  */}
          {error && <h2 className="text-red-600">{error}</h2>}

          <button
            type="submit"
            className="btn btn-block bg-black text-white hover:bg-gray-800"
          >
            Register
          </button>
        </form>
        <div>
          <SocialGoogleLogin />
        </div>

        <h2>
          Have an account? Please{" "}
          <Link
            to={"/login"}
            className=" btn-link tex-lg font-medium text-accent"
          >
            Sign In
          </Link>
        </h2>
      </div>
    </div>
  );
};

export default Register;
