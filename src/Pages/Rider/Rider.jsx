import { useForm } from "react-hook-form";
import riderImg from "../../assets/agent-pending.png";
import { useLoaderData } from "react-router";

const Rider = () => {
  const allData = useLoaderData();
  console.log(allData);
  const regions = allData.map((r) => r.region);
  const noDoubleRegions = [...new Set(regions)];
  console.log(noDoubleRegions);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRiderInfo = (data) => {
    console.log("Rider Form Data:", data);
  };

  return (
    <div className="bg-[#f2f5f7] min-h-screen flex items-center justify-center py-10">
      <div className="bg-white max-w-6xl w-full mx-4 rounded-xl shadow p-10">
        {/* Title */}
        <h2 className="text-4xl font-bold text-gray-800">Be a Rider</h2>
        <p className="mt-2 text-gray-600 max-w-lg">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>

        {/* FORM + IMAGE GRID */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-sta">
          {/* LEFT SIDE - FORM */}
          <form
            onSubmit={handleSubmit(handleRiderInfo)}
            className="space-y-4 self-start"
          >
            <h3 className="text-xl font-semibold mb-4">
              Tell us about yourself
            </h3>

            {/* NAME */}
            <div className="form-control">
              <label className="label pb-1">
                <span>Your Name</span>
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                className="input input-bordered w-full"
                placeholder="Your Name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* DL NUMBER */}
            <div className="form-control">
              <label className="label pb-1">
                <span>Driving License Number</span>
              </label>
              <input
                {...register("drivingLicense", {
                  required: "Driving license is required",
                })}
                type="text"
                className="input input-bordered w-full"
                placeholder="Driving License Number"
              />
              {errors.drivingLicense && (
                <p className="text-red-500 text-sm">
                  {errors.drivingLicense.message}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div className="form-control">
              <label className="label pb-1">
                <span>Your Email</span>
              </label>
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                className="input input-bordered w-full"
                placeholder="Your Email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* REGION */}
            <div className="form-control">
              <label className="label pb-1">
                <span>Your Region</span>
              </label>
              <select
                {...register("region", { required: "Region is required" })}
                className="select select-bordered w-full"
              >
                <option defaultValue="Select your Region" disabled selected>
                  Select your Region
                </option>

                {noDoubleRegions.map((r) => (
                  <option>{r}</option>
                ))}
              </select>
              {errors.region && (
                <p className="text-red-500 text-sm">{errors.region.message}</p>
              )}
            </div>

            {/* DISTRICT */}
            <div className="form-control">
              <label className="label pb-1">
                <span>Your District</span>
              </label>
              <select
                {...register("district", { required: "District is required" })}
                className="select select-bordered w-full"
              >
                <option value="" disabled selected>
                  Select your District
                </option>
                <option>Dhaka</option>
                <option>Gazipur</option>
                <option>Narayanganj</option>
              </select>
              {errors.district && (
                <p className="text-red-500 text-sm">
                  {errors.district.message}
                </p>
              )}
            </div>

            {/* NID */}
            <div className="form-control">
              <label className="label pb-1">
                <span>NID No</span>
              </label>
              <input
                {...register("nid", { required: "NID is required" })}
                type="text"
                className="input input-bordered w-full"
                placeholder="NID"
              />
              {errors.nid && (
                <p className="text-red-500 text-sm">{errors.nid.message}</p>
              )}
            </div>

            {/* PHONE */}
            <div className="form-control">
              <label className="label pb-1">
                <span>Phone Number</span>
              </label>
              <input
                {...register("phone", { required: "Phone is required" })}
                type="text"
                className="input input-bordered w-full"
                placeholder="Phone Number"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>

            {/* BIKE MODEL */}
            <div className="form-control">
              <label className="label pb-1">
                <span>Bike Brand Model and Year</span>
              </label>
              <input
                {...register("bikeModel", {
                  required: "Bike model is required",
                })}
                type="text"
                className="input input-bordered w-full"
                placeholder="Bike Brand Model and Year"
              />
              {errors.bikeModel && (
                <p className="text-red-500 text-sm">
                  {errors.bikeModel.message}
                </p>
              )}
            </div>

            {/* BIKE REG NO */}
            <div className="form-control">
              <label className="label pb-1">
                <span>Bike Registration Number</span>
              </label>
              <input
                {...register("bikeRegNo", {
                  required: "Registration number is required",
                })}
                type="text"
                className="input input-bordered w-full"
                placeholder="Bike Registration Number"
              />
              {errors.bikeRegNo && (
                <p className="text-red-500 text-sm">
                  {errors.bikeRegNo.message}
                </p>
              )}
            </div>

            {/* ABOUT */}
            <div className="form-control">
              <label className="label pb-1">
                <span>Tell Us About Yourself</span>
              </label>
              <input
                {...register("about")}
                type="text"
                className="input input-bordered w-full"
                placeholder="Tell Us About Yourself"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <button className="btn bg-lime-400 hover:bg-lime-500 w-full mt-4">
              Submit
            </button>
          </form>

          {/* RIGHT SIDE - IMAGE */}
          <div className="flex items-start justify-center self-start">
            <img
              src={riderImg}
              alt="Rider Illustration"
              className="w-[380px] lg:w-[420px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rider;
