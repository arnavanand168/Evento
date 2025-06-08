import React from "react";

const plans = [
  {
    name: "Birthday",
    price: 32000,
    color: "bg-white",
    textColor: "text-gray-800/80",
    button: "bg-primary text-white hover:bg-primary-dull",
    features: [
      "30+ Guests",
      "Prime Location",
      "Customised Decor",
      "Catering",
      "Photography",
      "Fun and games",
    ],
    highlight: false,
  },
  {
    name: "Corporate",
    price: 125000,
    color: "bg-primary",
    textColor: "text-white",
    button: "bg-white text-primary hover:bg-gray-200",
    features: [
        "120+ Guests",
        "Prime Location",
        "Catering + Bartender",
        "Music Performance",
        "Comedy Show",
        "Award Ceremony",
        "Photography",
    ],
    highlight: true,
    highlightText: "Most Popular",
  },
  {
    name: "Anniversary",
    price: 39000,
    color: "bg-white",
    textColor: "text-gray-800/80",
    button: "bg-primary text-white hover:bg-primary-dull",
    features: [
        "30+ Guests",
        "Prime Location",
        "Customised Decor",
        "Re-wedding Function",
        "Catering + Bartender",
        "Music Show",
        "Photography",
    ],
    highlight: false,
  },
];

const CheckIcon = ({ color = "#ff3131" }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z"
      fill={color}
    />
  </svg>
);

function Prices() {
  return (
    <div className="my-16 px-2">
      <h2 className="text-4xl font-extrabold mb-12 text-gray-800 text-center">Our Prices</h2>
      <div className="flex flex-wrap items-stretch justify-center gap-10">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`w-80 ${plan.color} ${plan.textColor} border border-gray-500/30 p-8 rounded-lg flex flex-col ${plan.highlight ? "relative" : ""} ${plan.highlight ? "pb-16" : "pb-20"} h-[540px]`}
          >
            {plan.highlight && (
              <p className="absolute px-3 text-sm -top-3.5 left-3.5 py-1 bg-primary-dull text-white rounded-full">
                {plan.highlightText}
              </p>
            )}
            <p className={`font-semibold ${plan.highlight ? "pt-2" : ""}`}>
              {plan.name}
            </p>
            <h1 className="text-3xl font-semibold mt-2">
              <span className="font-bold text-2xl align-middle">₹</span>
              {plan.price.toLocaleString("en-IN")}
            </h1>
            <ul
              className={`list-none text-sm mt-8 space-y-2 flex-1 ${
                plan.highlight ? "text-white" : "text-gray-500"
              }`}
            >
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <CheckIcon color={plan.highlight ? "white" : "#ff3131"} />
                  <p>{feature}</p>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className={`${plan.button} text-sm w-full py-2 rounded font-medium mt-8 transition-all`}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Prices;
