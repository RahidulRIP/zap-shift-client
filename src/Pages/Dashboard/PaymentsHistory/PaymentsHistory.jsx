import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentsHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res?.data;
    },
  });

  console.log(payments);
  return (
    <div>
      You have{" "}
      <span className="text-green-500 font-medium text-lg">
        {payments?.length}
      </span>{" "}
      Payments history
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Parcel Name</th>
              <th>Amount</th>
              <th>Payment Time</th>
              <th>Transaction Id</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {payments.map((payment, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{payment?.parcelName}</td>
                <td>{payment?.amount}</td>
                <td>{new Date(payment?.paidAt).toLocaleString()}</td>
                <td>{payment?.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentsHistory;
