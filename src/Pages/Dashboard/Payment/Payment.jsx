import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../Components/Loader/Loader";

const Payment = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();

  // getting parcel data
  const { isLoading, data: parcel = {} } = useQuery({
    queryKey: [parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res?.data;
    },
  });
  console.log(parcel);

  // stripe payment 
  const handlePayment = async () => {
    const paymentInfo = {
      cost: parcel?.cost,
      parcelName: parcel?.parcelName,
      senderEmail: parcel?.senderEmail,
      parcelId: parcel?._id,
    };
    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    window.open(res.data.url, "_blank");
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <h2>
        Payment <span className="font-bold">({parcel.cost})</span> for your{" "}
        <span className="font-black">({parcel.parcelName} )</span> parcel
      </h2>
      <button onClick={handlePayment} className="btn btn-primary text-black">
        Pay
      </button>
    </div>
  );
};

export default Payment;
