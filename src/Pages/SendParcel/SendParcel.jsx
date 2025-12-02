import { useForm, useWatch } from "react-hook-form";
import { FaRegFileAlt, FaRegFile } from "react-icons/fa";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const SendParcel = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  // console.log(user);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  const senderWatchRegion = useWatch({ name: "senderRegion", control });
  const receiverWatchRegion = useWatch({ name: "receiverRegion", control });
  const watchParcelType = useWatch({ name: "parcelType", control });

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const handleParcelSubmit = (data) => {
    // console.log(data);
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);
    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight <= 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        cost = isSameDistrict
          ? 110 + (parcelWeight - 3) * 40
          : 150 + (parcelWeight - 3) * 40 + 40;
      }
    }

    // console.log(cost);

    // add cost in the the data
    data.cost = cost;

    Swal.fire({
      title: "Agree with the Cost?",
      text: `You will be charged ${cost} taka!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "I agree!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/parcels", data).then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen flex justify-center">
      <div className="bg-white w-full max-w-6xl rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Send A Parcel</h1>

        <form onSubmit={handleSubmit(handleParcelSubmit)}>
          <p className="font-semibold text-gray-700 mb-4">
            Enter your parcel details
          </p>

          {/* Radio Parcel Type */}
          <div className="flex items-center gap-6 mb-6">
            <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-700">
              <input
                type="radio"
                {...register("parcelType", { required: true })}
                className="radio"
                value="document"
                defaultChecked
              />
              <FaRegFile className="text-primary" /> Document
            </label>

            <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-700">
              <input
                type="radio"
                {...register("parcelType", { required: true })}
                className="radio"
                value="non-document"
              />
              <FaRegFileAlt className="text-primary" /> Non-Document
            </label>
          </div>

          {/* Parcel Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div>
              <label className="font-medium text-gray-700 mb-1 block">
                Parcel Name
              </label>
              <input
                type="text"
                placeholder="Parcel Name"
                className="input input-bordered w-full"
                {...register("parcelName", { required: true })}
              />
              {errors.parcelName && (
                <p className="text-red-500 text-sm">Required</p>
              )}
            </div>

            {watchParcelType === "non-document" && (
              <div>
                <label className="font-medium text-gray-700 mb-1 block">
                  Parcel Weight (KG)
                </label>
                <input
                  type="number"
                  placeholder="Weight in KG"
                  className="input input-bordered w-full"
                  {...register("parcelWeight", { required: true })}
                />

                {errors.parcelWeight && (
                  <p className="text-red-500 text-sm">Required</p>
                )}
              </div>
            )}
          </div>

          {/* Sender & Receiver */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Sender */}
            <div>
              <h2 className="font-semibold text-xl text-gray-700 mb-4">
                Sender Details
              </h2>
              {/* name  */}
              <div className="space-y-4">
                <div>
                  <label className="font-medium text-gray-700 mb-1 block">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Sender Name"
                    className="input input-bordered w-full"
                    {...register("senderName", { required: true })}
                    defaultValue={user?.displayName}
                    readOnly
                  />
                  {errors.senderName && (
                    <p className="text-red-500 text-sm">Required</p>
                  )}
                </div>
                {/* email  */}
                <div>
                  <label className="font-medium text-gray-700 mb-1 block">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Sender email"
                    className="input input-bordered w-full"
                    {...register("senderEmail", { required: true })}
                    defaultValue={user?.email}
                    readOnly
                  />
                  {errors.senderName && (
                    <p className="text-red-500 text-sm">Required</p>
                  )}
                </div>
                <div>
                  <label className="font-medium text-gray-700 mb-1 block">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="Sender Address"
                    className="input input-bordered w-full"
                    {...register("senderAddress", { required: true })}
                  />
                  {errors.senderAddress && (
                    <p className="text-red-500 text-sm">Required</p>
                  )}
                </div>

                <div>
                  <label className="font-medium text-gray-700 mb-1 block">
                    Phone No
                  </label>
                  <input
                    type="text"
                    placeholder="Sender Phone No"
                    className="input input-bordered w-full"
                    {...register("senderPhone", { required: true })}
                  />
                  {errors.senderPhone && (
                    <p className="text-red-500 text-sm">Required</p>
                  )}
                </div>

                {/* sender region */}
                <div>
                  <label className="font-medium text-gray-700 mb-1 block">
                    Region
                  </label>
                  <select
                    className="select select-bordered w-full"
                    {...register("senderRegion", { required: true })}
                  >
                    <option value="" disabled>
                      Pick your region
                    </option>
                    {regions.map((r, i) => (
                      <option key={i} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  {errors.senderRegion && (
                    <p className="text-red-500 text-sm">Required</p>
                  )}
                </div>

                {/* sender district */}
                <div>
                  <label className="font-medium text-gray-700 mb-1 block">
                    District
                  </label>
                  <select
                    className="select select-bordered w-full"
                    {...register("senderDistrict", { required: true })}
                  >
                    <option disabled value="">
                      Select your District
                    </option>
                    {districtsByRegion(senderWatchRegion).map((d, i) => (
                      <option key={i} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  {errors.senderDistrict && (
                    <p className="text-red-500 text-sm">Required</p>
                  )}
                </div>

                <div>
                  <label className="font-medium text-gray-700 mb-1 block">
                    Pickup Instruction
                  </label>
                  <textarea
                    placeholder="Pickup Instruction"
                    className="textarea textarea-bordered w-full h-24"
                    {...register("pickupInstruction", { required: true })}
                  />
                  {errors.pickupInstruction && (
                    <p className="text-red-500 text-sm">Required</p>
                  )}
                </div>
              </div>
            </div>

            {/* Receiver */}
            <div>
              <h2 className="font-semibold text-xl text-gray-700 mb-4">
                Receiver Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="font-medium text-gray-700 mb-1 block">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Receiver Name"
                    className="input input-bordered w-full"
                    {...register("receiverName", { required: true })}
                  />
                  {errors.receiverName && (
                    <p className="text-red-500 text-sm">Required</p>
                  )}
                </div>

                <div>
                  <label className="font-medium text-gray-700 mb-1 block">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="Receiver Address"
                    className="input input-bordered w-full"
                    {...register("receiverAddress", { required: true })}
                  />
                  {errors.receiverAddress && (
                    <p className="text-red-500 text-sm">Required</p>
                  )}
                </div>

                <div>
                  <label className="font-medium text-gray-700 mb-1 block">
                    Phone No
                  </label>
                  <input
                    type="text"
                    placeholder="Receiver Contact No"
                    className="input input-bordered w-full"
                    {...register("receiverPhone", { required: true })}
                  />
                  {errors.receiverPhone && (
                    <p className="text-red-500 text-sm">Required</p>
                  )}
                </div>

                {/* receiver region */}
                <div>
                  <label className="font-medium text-gray-700 mb-1 block">
                    Region
                  </label>
                  <select
                    className="select select-bordered w-full"
                    {...register("receiverRegion", {
                      required: "Region is required",
                    })}
                  >
                    <option value="" disabled>
                      Pick receiver region
                    </option>

                    {regions.map((r, i) => (
                      <option key={i} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  {errors.receiverRegion && (
                    <p className="text-red-500 text-sm">Required</p>
                  )}
                </div>

                {/* receiver district */}
                <div>
                  <label className="font-medium text-gray-700 mb-1 block">
                    District
                  </label>
                  <select
                    className="select select-bordered w-full"
                    {...register("receiverDistrict", { required: true })}
                  >
                    <option value="" disabled>
                      Select receiver district
                    </option>

                    {districtsByRegion(receiverWatchRegion).map((d, i) => (
                      <option key={i} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  {errors.receiverDistrict && (
                    <p className="text-red-500 text-sm">Required</p>
                  )}
                </div>

                <div>
                  <label className="font-medium text-gray-700 mb-1 block">
                    Delivery Instruction
                  </label>
                  <textarea
                    placeholder="Delivery Instruction"
                    className="textarea textarea-bordered w-full h-24"
                    {...register("deliveryInstruction", { required: true })}
                  />
                  {errors.deliveryInstruction && (
                    <p className="text-red-500 text-sm">Required</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <p className="text-gray-500 text-sm mt-6">
            * PickUp Time 4pm–7pm Approx.
          </p>

          <button
            className="btn btn-primary text-black  mt-6 px-10"
            type="submit"
          >
            Proceed to Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendParcel;
