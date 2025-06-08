import React, { useState } from "react";

// Example data: Add as many packages as you need per city
const WEDDING_PACKAGES = {
  Delhi: [
    {
      icon: "/icons/marriage.png",
      title: "Lotus Banquet Wedding",
      features: [
        "30+ Guests",
        "Prime Location",
        "Customised Decor",
        "Re-wedding Function",
        "Catering + Bartender",
        "Music Show",
        "Photography"
      ]
    },
    {
      icon: "/icons/marriage.png",
      title: "Royal Palace Wedding",
      features: [
        "100+ Guests",
        "Luxury Decor",
        "Live Band",
        "Premium Catering"
      ]
    }
  ],
  Gurugram: [
    {
      icon: "/icons/marriage.png",
      title: "Golf View Wedding",
      features: [
        "50+ Guests",
        "Golf Course Road",
        "Designer Decor",
        "DJ Night",
        "Catering"
      ]
    }
  ],
  Noida: [
    {
      icon: "/icons/marriage.png",
      title: "Noida Grand Wedding",
      features: [
        "80+ Guests",
        "Central Noida Venue",
        "Theme Decor",
        "Live Music",
        "Photography"
      ]
    }
  ],
  Hyderabad: [
    {
      icon: "/icons/marriage.png",
      title: "Hyderabad Heritage Wedding",
      features: [
        "120+ Guests",
        "Heritage Venue",
        "Royal Decor",
        "Hyderabadi Cuisine"
      ]
    }
  ]
};

const CITY_OPTIONS = ["Delhi", "Gurugram", "Noida", "Hyderabad"];

const WeddingPackages = () => {
  const [city, setCity] = useState(CITY_OPTIONS[0]);
  const packages = WEDDING_PACKAGES[city] || [];

  return (
    <div className="min-h-screen bg-white py-8 px-4 flex flex-col items-center">
      <div className="max-w-md w-full mb-8">
        <div className="flex items-center gap-4 justify-center">
          <span className="font-medium text-lg">Choose City:</span>
          <select
            className="border border-gray-300 rounded-full px-5 py-2 text-base outline-none focus:ring-2 focus:ring-primary"
            value={city}
            onChange={e => setCity(e.target.value)}
          >
            {CITY_OPTIONS.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-8 text-center">Wedding Packages in {city}</h1>
      <div className="w-full max-w-lg flex flex-col gap-6">
        {packages.length === 0 ? (
          <div className="text-center text-gray-400">No packages available for this city.</div>
        ) : (
          packages.map((pkg, idx) => (
            <div
              key={pkg.title + idx}
              className="flex items-center bg-white border border-gray-300 rounded-xl px-8 py-6 transition shadow-sm"
            >
              <img src={pkg.icon} alt={pkg.title} className="w-14 h-14 object-contain mr-6" />
              <div>
                <div className="text-lg font-semibold mb-2">{pkg.title}</div>
                <ul className="text-gray-700 text-base space-y-1">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-primary">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WeddingPackages;
