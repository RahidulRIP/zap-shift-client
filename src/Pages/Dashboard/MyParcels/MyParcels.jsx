import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyParcels = () => {
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [] } = useQuery({
    queryKey: [],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels");
      return res.data;
    },
  });
  console.log(parcels);

  return (
    <div>
      <h2>this is my parcel {parcels.length}</h2>
    </div>
  );
};

export default MyParcels;
