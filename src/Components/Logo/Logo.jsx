import { Link } from "react-router";
import logo from "../../assets/logo.png";

const Logo = () => {
  return (
    <Link to={'/'} className="flex items-end">
      <img src={logo} alt="" />
      <h2 className="text-3xl font-bold -ms-3">ZAPSHIFT</h2>
    </Link>
  );
};

export default Logo;
