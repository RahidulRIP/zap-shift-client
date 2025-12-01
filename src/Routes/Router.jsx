import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import Loader from "../Components/Loader/Loader";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    HydrateFallback: Loader,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "coverage",
        Component: Coverage,
        loader: () => fetch("warehouses.json").then((res) => res.json()),
      },
    ],
  },
]);

export default router;
