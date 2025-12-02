import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { BiEdit } from "react-icons/bi";
import Swal from "sweetalert2";

const MyParcels = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/?email=${user?.email}`);
      return res.data;
    },
  });
  console.log(parcels);
  const handleDeleteParcels = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your parcel has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <h2>My total sending parcels are {parcels.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Cost</th>
              <th>Payment Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{parcel?.parcelName}</td>
                <td>{parcel?.cost}</td>
                <td>Blue</td>
                <td className="space-x-1.5">
                  <button className="btn btn-square">
                    <FiSearch size={20} />
                  </button>
                  <button className="btn btn-square">
                    <BiEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteParcels(parcel?._id)}
                    className="btn btn-square"
                  >
                    <RiDeleteBin5Fill size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
