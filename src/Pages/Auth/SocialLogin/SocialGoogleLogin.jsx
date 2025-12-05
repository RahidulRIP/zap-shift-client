import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SocialGoogleLogin = ({ linkTOGo }) => {
  const navigate = useNavigate();
  const { googleSignIn } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        const userInfo = {
          email: result?.user?.email,
          displayName: result?.user?.displayName,
          photoURL: result?.user?.photoURL,
        };
        axiosSecure.post("/users", userInfo).then((res) => {
          console.log(res.data);
          if (res?.data?.insertedId) {
            // post successful
          }
          navigate(linkTOGo || "/");
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <p className="text-center pb-3 font-medium">Or</p>
      <button
        onClick={handleGoogleLogin}
        className="btn btn-outline w-full gap-2 border-gray-300 hover:bg-gray-100"
      >
        <FcGoogle className="text-2xl" />
        Continue with Google
      </button>
    </div>
  );
};

export default SocialGoogleLogin;
