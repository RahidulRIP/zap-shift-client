import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const [paymentInfo, setPaymentInfo] = useState({});

  const session_id = searchParams.get("session_id");

  useEffect(() => {
    if (session_id) {
      axiosSecure
        .patch(`/payment-success/?session_id=${session_id}`)
        .then((res) =>
          setPaymentInfo({
            transactionId: res?.data?.transactionId,
            trackingId: res?.data?.trackingId,
          })
        );
    }
  }, [session_id, axiosSecure]);

  return (
    <div>
      <h2>Payment successful</h2>
      <h2>
        Transaction ID :{" "}
        <span className="text-green-500">{paymentInfo?.transactionId}</span>
      </h2>
      <h2>
        Parcel Tracking ID :{" "}
        <span className="text-green-500">{paymentInfo?.trackingId}</span>
      </h2>
    </div>
  );
};

export default PaymentSuccess;
