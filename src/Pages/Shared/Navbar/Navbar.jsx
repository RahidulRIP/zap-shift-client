import { Link, NavLink } from "react-router";
import Logo from "../../../Components/Logo/Logo";
import { FaArrowUp } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, signUserOut } = useAuth();
  // console.log(user);

  const links = (
    <>
      <li>
        <NavLink>Services</NavLink>
      </li>
      <li>
        <NavLink to={"/coverage"}>Coverage</NavLink>
      </li>
      <li>
        <NavLink to={"/send-parcel"}>Send Parcel</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to={"/dashboard/my-parcels"}>My Parcels</NavLink>
          </li>
        </>
      )}

      <li>
        <NavLink to={"/rider"}>Be a Rider</NavLink>
      </li>
    </>
  );

  const handleSignOutUser = () => {
    signUserOut()
      .then(() => {
        // signOut
      })
      .catch(() => {
        // An error happened.
      });
  };
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm md:rounded-2xl">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Logo />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          <div className="flex items-center gap-2 md:gap-4 ">
            {user ? (
              <button
                onClick={handleSignOutUser}
                className="border border-[#DADADA] rounded-xl font-bold text-lg px-2.5 py-1.5 md:px-8 md:py-3"
              >
                Sign out
              </button>
            ) : (
              <NavLink
                to={"/login"}
                className="border border-[#DADADA] rounded-xl font-bold text-lg px-2.5 py-1.5 md:px-8 md:py-3"
              >
                Sign in
              </NavLink>
            )}

            <div className="flex items-center">
              <NavLink
                to={"/rider"}
                className="border border-[#DADADA]  bg-primary font-bold rounded-xl text-lg  px-1.5 py-1.5 md:px-8 md:py-3 "
              >
                Be a Rider
              </NavLink>
              <span className="md:w-13 md:h-13 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center">
                <FaArrowUp size={22} className="rotate-45 text-primary" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
