import React from "react";
import "./Destination.css"

const destinations = [
    {
        name: "Alexandria",
        image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScYTqNYaP0uFUPsKSP3YV3WHSUYB7F9x4OuQ&s",
    },
    {
        name: "Luxor",
        image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM-6ERxjfqMX2xEHtuEIS0Jj6sUKpi_epZKw&s",
    },
    {
        name: "Aswan",
        image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2tnLSqU3R4U06orOEmEOKMgbeaE71MwO5HA&s",
    },
    {
        name: "Marsa Alam",
        image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFL0TuRkuTgBuLTVdLyfi2vFUcVS2oqJp-xw&s",
    },
    {
        name: "Sharm EL Sheikh",
        image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCQM4vD6K2QUCd1Kq0ddvvM2SgyMvYIdY6zg&s",
    },
    {
        name: "Dahab",
        image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5O7Jby_-tnj04p-4FSD1msgfUSibTeby4lw&s",
    },
];
function Destination() {
  return (
    <>
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Explore Top Destinations
      </h2>
      <div className="destinations-container">
        {destinations.map((dest, index) => (
          <div className="destination-card" key={index}>
            <img src={dest.image} alt={dest.name} />
            <h3>{dest.name}</h3>
          </div>
        ))}
      </div>
    </>
  );
}
export default Destination;
