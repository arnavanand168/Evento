import React from "react";

const steps = [
  {
    title: "Select Your Location",
    icon: (
      <svg width="64" height="64" fill="none" stroke="#ff3131" strokeWidth="2.5" viewBox="0 0 48 48">
        <circle cx="24" cy="20" r="8" stroke="#ff3131" strokeWidth="2.5" fill="none" />
        <path d="M24 44s14-15.36 14-24A14 14 0 1 0 10 20c0 8.64 14 24 14 24z" stroke="#ff3131" strokeWidth="2.5" fill="none" />
      </svg>
    ),
  },
  {
    title: "Customize Menu, Decor & Theme",
    icon: (
      <svg width="64" height="64" fill="none" stroke="#ff3131" strokeWidth="2.5" viewBox="0 0 48 48">
        <rect x="8" y="20" width="32" height="16" rx="4" stroke="#ff3131" strokeWidth="2.5" fill="none" />
        <circle cx="24" cy="16" r="6" stroke="#ff3131" strokeWidth="2.5" fill="none" />
        <path d="M16 36v4M32 36v4" stroke="#ff3131" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    title: "Pay Advance to Confirm",
    icon: (
      <svg width="64" height="64" fill="none" stroke="#ff3131" strokeWidth="2.5" viewBox="0 0 48 48">
        <rect x="8" y="16" width="32" height="20" rx="4" stroke="#ff3131" strokeWidth="2.5" fill="none" />
        <circle cx="16" cy="26" r="3" fill="#ff3131" />
        <path d="M8 22h32" stroke="#ff3131" strokeWidth="2.5" />
      </svg>
    ),
  },
];

function BookInThreeSteps() {
  return (
    <div className="w-full flex flex-col items-center my-16 px-2">
      <div
        className="w-full max-w-6xl bg-[#f5f5f5] rounded-3xl px-8 py-16 flex flex-col items-center"
        style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.05)" }}
      >
       <h1 style={{
        textAlign: 'center',
        marginBottom: '56px',
        fontWeight: 600,
        fontSize: '2.9rem',
        letterSpacing: '-1px'
      }}>
        Book in 3 Easy Steps
      </h1>
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-10 w-full">
          {steps.map((step, idx) => (
            <div
              key={step.title}
              className="flex flex-col items-center bg-white/95 rounded-2xl shadow-lg p-10 w-full md:w-96 transition-transform duration-200 hover:-translate-y-2"
            >
              <div className="mb-7">{step.icon}</div>
              <span className="text-2xl font-semibold text-gray-700 text-center mb-2">
                {`${idx + 1}. ${step.title}`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookInThreeSteps;
