import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";
import { useRef } from "react";

const Coverage = () => {
  const position = [23.685, 90.3563];
  const serviceCenters = useLoaderData();
  const mapRef = useRef(null);

  //   console.log(serviceCenters);
  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const district = serviceCenters.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );
    if (district) {
      const coord = [district.latitude, district.longitude];
      //   console.log(district, coord, ".................");
      mapRef.current.flyTo(coord, 14);
    }
  };
  return (
    <div className="bg-[#FFFFFF] mt-6 p-2.5 md:p-20 md:rounded-4xl">
      <h2 className="text-xl md:text-5xl font-extrabold">
        we are available in {serviceCenters.length} districts
      </h2>
      <div className="padding-top">
        <form onSubmit={handleSearch}>
          <label className="input w-48">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              name="location"
              required
              placeholder="Search by district"
            />
          </label>
          <button className="btn bg-primary ml-1.5" type="submit">Search</button>
        </form>
      </div>
      <div className="divider pt-5"></div>
      <h2 className="md:text-3xl font-extrabold pt-4 md:pt-10">
        We deliver almost all over Bangladesh
      </h2>
      <div className="w-full h-[800px] pt-3.5 md:pt-8">
        <MapContainer
          center={position}
          zoom={8}
          scrollWheelZoom={false}
          className=" h-full"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {serviceCenters.map((center, i) => (
            <Marker key={i} position={[center.latitude, center.longitude]}>
              <Popup>
                <strong>{center?.district}</strong> <br /> Service Area:{" "}
                {center.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
