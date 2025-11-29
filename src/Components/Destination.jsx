import React from 'react';
import {useState }from 'react';
const destination = [
    {
        name:'Alexandria',
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScYTqNYaP0uFUPsKSP3YV3WHSUYB7F9x4OuQ&s"
    },
    {
        name: 'Luxor',
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM-6ERxjfqMX2xEHtuEIS0Jj6sUKpi_epZKw&s"
    },
    {
        name: 'Aswan',
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2tnLSqU3R4U06orOEmEOKMgbeaE71MwO5HA&s"
    }
    {
        name: 'Marsa Alam',
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFL0TuRkuTgBuLTVdLyfi2vFUcVS2oqJp-xw&s"
    },
    {
        name : 'Sharm EL Sheikh',
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCQM4vD6K2QUCd1Kq0ddvvM2SgyMvYIdY6zg&s"
    },
    {
        name: 'Dahab'
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5O7Jby_-tnj04p-4FSD1msgfUSibTeby4lw&s"

    }
];

return (
    <div className ="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
                Explore Top Destinations
                </h2>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {destinations.map((dest, index) => (
        <div
        Key={index}
        className="relative h-72 rounded-xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 "
        >
            <img
            src={dest.image}
            alt={dest.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
            <div className="absolute inset-0 flex items-end">
                <h3 className="text-white text-3xl font-bold p-6 transform group-hover:translate-y-[-8px] transition-transform duration-300">
                    {dest.name}
                    </h3>
                    </div>
                    </div>
    ))}
    </div>
    </div>
    </div>
);
}
