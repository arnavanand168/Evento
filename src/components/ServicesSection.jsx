import React from "react";
import { useNavigate } from "react-router-dom";

const services = [
  {
    name: "Wedding",
    image: "/icons/marriage.png",
    path: "/event-packages/wedding",
  },
  {
    name: "Anniversary",
    image: "/icons/couple.png",
    path: "/event-packages/anniversary",
  },
  {
    name: "Birthday",
    image: "/icons/birthday-cake.png",
    path: "/event-packages/birthday",
  },
  {
    name: "Corporate",
    image: "/icons/briefcase.png",
    path: "/event-packages/corporate",
  },
];

const ServicesSection = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col items-center py-6">
      <h2 style={{
        textAlign: 'center',
        marginBottom: '56px',
        fontWeight: 600,
        fontSize: '2.3rem',
        letterSpacing: '-1px'
      }}>Our Services</h2>
      <div className="flex flex-row justify-center gap-8 w-full max-w-7xl">
        {services.map((service) => (
          <button
            key={service.name}
            onClick={() => navigate(service.path)}
            className="flex items-center bg-white bg-opacity-60 hover:bg-opacity-90 border-2 border-gray-300 rounded-2xl px-10 py-6 w-[330px] h-[120px] transition-all duration-200 shadow-md hover:-translate-y-2 focus:outline-none"
            style={{
              backdropFilter: "blur(2px)",
            }}
          >
            <img
              src={service.image}
              alt={service.name}
              className="w-10 h-10 object-cover-xl mr-6"
            />
            <span className="text-2xl font-semibold text-gray-800">{service.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;

