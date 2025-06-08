import React from 'react';
import { useNavigate } from "react-router-dom";

const PlanEventSection = () => {
  const navigate = useNavigate();

  const cities = [
    { name: 'Delhi', onClick: () => navigate('/banquet-halls/delhi'), icon: <img src="icons/delhi.svg" alt="Delhi" width={60} height={60} />},
    { name: 'Gurugram', onClick: () => navigate('/banquet-halls/gurugram'), icon: <img src="icons/gurugram.svg" alt="Gurugram" width={60} height={60} />},
    { name: 'Noida', onClick: () => navigate('/banquet-halls/noida'), icon: <img src="icons/noida.svg" alt="Noida" width={60} height={60} />},
    { name: 'Hyderabad', onClick: () => navigate('/banquet-halls/hyderabad'), icon: <img src="icons/charminar.svg" alt="Hyderabad" width={60} height={60} />},
  ];

  return (
    <div style={{
      background: '#f5f5f5',
      padding: '20px 0',
      borderRadius: '18px',
      maxWidth: '1400px',
      margin: '20px auto',
      boxSizing: 'border-box'
    }}>
      <h1 style={{
        textAlign: 'center',
        marginBottom: '56px',
        fontWeight: 600,
        fontSize: '2.9rem',
        letterSpacing: '-1px'
      }}>
        Plan your Event
      </h1>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '48px',
        flexWrap: 'wrap'
      }}>
        {cities.map((city) => (
          <button
            key={city.name}
            onClick={city.onClick}
            className="bg-white border-2 border-gray-200 rounded-[14px] w-[220px] h-[220px] flex flex-col items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.04)] cursor-pointer font-semibold text-[1.45rem] transition-transform transition-shadow duration-200 ease-[cubic-bezier(.4,2,.6,1)] hover:-translate-y-3 hover:shadow-[0_12px_32px_rgba(0,0,0,0.10)]"
            style={{
              background: '#fff',
              border: '2px solid #e0e0e0',
              borderRadius: '14px',
              width: '220px',
              height: '220px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
              cursor: 'pointer',
              transition: 'box-shadow 0.2s, border-color 0.2s',
              fontSize: '1.45rem',
              fontWeight: 600
            }}
          >
            <div style={{ marginBottom: '20px' }}>
              {city.icon}
            </div>
            <span>{city.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlanEventSection;
  