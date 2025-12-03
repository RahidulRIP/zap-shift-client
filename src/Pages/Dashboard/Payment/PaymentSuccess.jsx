import { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();

  const session_id = searchParams.get("session_id");

  useEffect(() => {
    if (session_id) {
      axiosSecure
        .patch(`/payment-success/?session_id=${session_id}`)
        .then((res) => console.log(res.data));
    }
  }, [session_id, axiosSecure]);

  return (
    <div>
      <h2>Payment successful</h2>
    </div>
  );
};

export default PaymentSuccess;
