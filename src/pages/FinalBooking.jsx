import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// --- Payment Calculation Logic ---
function calculatePayable(menu, priceVeg, priceNonVeg, guestsRange) {
  const starters = menu.filter(item => item.tag.toLowerCase() === "starters").length;
  const mains = menu.filter(item => item.tag.toLowerCase() === "main course").length;
  const desserts = menu.filter(item => item.tag.toLowerCase() === "dessert").length;
  const anyNonVeg = menu.some(item => item.veg === false);

  let lowerGuests = 0, upperGuests = 0;
  if (typeof guestsRange === "string") {
    if (guestsRange.includes("-")) {
      lowerGuests = parseInt(guestsRange.split("-")[0]);
      upperGuests = parseInt(guestsRange.split("-")[1]);
    } else if (guestsRange.includes("+")) {
      lowerGuests = upperGuests = parseInt(guestsRange);
    } else {
      lowerGuests = upperGuests = parseInt(guestsRange);
    }
  } else {
    upperGuests = guestsRange || 0;
  }

  let perPlate = anyNonVeg ? priceNonVeg : priceVeg;
  let extraDishes = 0;
  extraDishes += Math.max(0, starters - 2);
  extraDishes += Math.max(0, mains - 3);
  extraDishes += Math.max(0, desserts - 2);
  perPlate += Math.floor(extraDishes / 2) * 400;

  const total = perPlate * upperGuests;
  const bookingFee = Math.round(total * 0.10);

  return { perPlate, total, bookingFee, lowerGuests, upperGuests };
}

// --- Utility for LocalStorage ---
const getBookings = () => {
  const saved = localStorage.getItem('eventoBookings');
  return saved ? JSON.parse(saved) : [];
};
const saveBooking = (bookingData) => {
  const bookings = getBookings();
  localStorage.setItem('eventoBookings', JSON.stringify([...bookings, bookingData]));
};

// --- Add Person Modal (defined outside to prevent re-creation) ---
const AddPersonForm = ({
  newPerson,
  setNewPerson,
  handleAddPerson,
  setShowAddPerson,
}) => {
  const modalRef = useRef(null);

  // Click-outside to close modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        setShowAddPerson(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowAddPerson]);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Person</h2>
        <form onSubmit={handleAddPerson} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border border-gray-300 rounded px-4 py-2"
            value={newPerson.name}
            onChange={e => setNewPerson(prev => ({ ...prev, name: e.target.value }))}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full border border-gray-300 rounded px-4 py-2"
            value={newPerson.email}
            onChange={e => setNewPerson(prev => ({ ...prev, email: e.target.value }))}
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full border border-gray-300 rounded px-4 py-2"
            value={newPerson.phone}
            onChange={e => setNewPerson(prev => ({ ...prev, phone: e.target.value }))}
            required
          />
          <div className="flex gap-4 mt-2">
            <button
              type="button"
              onClick={() => setShowAddPerson(false)}
              className="flex-1 bg-gray-200 text-gray-700 px-6 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-primary text-white px-6 py-2 rounded"
            >
              Add Person
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const FinalBooking = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAddPerson, setShowAddPerson] = useState(false);
  const [billedPersons, setBilledPersons] = useState([
    { name: "Arnav", email: "arnav@email.com", phone: "9999999999" }
  ]);
  const [selectedPerson, setSelectedPerson] = useState("Arnav");
  const [newPerson, setNewPerson] = useState({ name: "", email: "", phone: "" });

  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  const { state } = useLocation();
  const { hall, guests, date, menu: initialMenu } = state || {};
  const [menu, setMenu] = useState(initialMenu || []);

  const handleRemoveDish = (name) => {
    setMenu(menu.filter(item => item.name !== name));
  };

  const handleAddPerson = (e) => {
    e.preventDefault();
    if (newPerson.name && newPerson.email && newPerson.phone) {
      setBilledPersons(prev => [...prev, newPerson]);
      setSelectedPerson(newPerson.name);
      setNewPerson({ name: "", email: "", phone: "" });
      setShowAddPerson(false);
    }
  };

  // Dropdown click-outside logic
  useEffect(() => {
    if (!showDropdown) return;
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  const { perPlate, total, bookingFee, lowerGuests, upperGuests } = calculatePayable(
    menu,
    hall?.priceVeg || 0,
    hall?.priceNonVeg || 0,
    guests
  );

  // --- Billed To Dropdown ---
  const BilledToDropdown = () => (
    <div className="relative" ref={dropdownRef}>
      <button
        className="w-full flex items-center justify-between px-4 py-2 bg-white border rounded-lg"
        onClick={() => setShowDropdown((prev) => !prev)}
        type="button"
      >
        <span>{selectedPerson}</span>
        <svg
          className={`transform transition-transform ${showDropdown ? "rotate-180" : ""}`}
          width="16"
          height="16"
          viewBox="0 0 24 24"
        >
          <path fill="currentColor" d="M7 10l5 5 5-5z"/>
        </svg>
      </button>
      {showDropdown && (
        <div className="absolute w-full mt-2 bg-white border rounded-lg shadow-lg z-10">
          {billedPersons.map(person => (
            <div
              key={person.name}
              onClick={() => {
                setSelectedPerson(person.name);
                setShowDropdown(false);
              }}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {person.name}
            </div>
          ))}
          <button
            onClick={() => {
              setShowAddPerson(true);
              setShowDropdown(false);
            }}
            className="w-full p-2 text-primary hover:bg-primary/10 text-center border-t"
            type="button"
          >
            + Add New Person
          </button>
        </div>
      )}
    </div>
  );

  // --- Confirm Booking Handler ---
  const handleConfirmBooking = () => {
    saveBooking({
      hall,
      guests,
      date,
      menu,
      perPlate,
      total,
      bookingFee,
      billedTo: billedPersons.find(p => p.name === selectedPerson)
    });
    alert("Booking confirmed!");
    navigate("/my-bookings");
  };

  return (
    <>
      {showAddPerson && (
        <AddPersonForm
          newPerson={newPerson}
          setNewPerson={setNewPerson}
          handleAddPerson={handleAddPerson}
          setShowAddPerson={setShowAddPerson}
        />
      )}
      <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
        <div className='flex-1 max-w-4xl'>
          <h1 className="text-3xl font-medium mb-6">
            Final Booking Details
          </h1>

          <div className="mb-8 space-y-2">
            <p className="text-lg">
              <span className="font-semibold">Venue:</span> {hall?.name}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Address:</span> {hall?.address}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Guests:</span>{" "}
              {lowerGuests === upperGuests
                ? `${upperGuests}+`
                : `${lowerGuests} - ${upperGuests}`}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Event Date:</span>{" "}
              {date ? new Date(date).toLocaleDateString() : ""}
            </p>
          </div>

          <h2 className="text-2xl font-bold mb-6">Selected Menu Items</h2>
          <div className="space-y-6">
            {menu.length > 0 ? (
              menu.map((item, index) => (
                <div key={item.name + index} className="flex items-center gap-4 border-b pb-4">
                  <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      className="w-full h-full object-cover"
                      src={item.image}
                      alt={item.name}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-2 py-1 rounded ${
                        item.veg ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}>
                        {item.veg ? "Veg" : "Non-Veg"}
                      </span>
                      <span className="text-sm text-gray-500">{item.tag}</span>
                    </div>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-700 text-2xl transition-colors"
                    onClick={() => handleRemoveDish(item.name)}
                    title="Remove this dish"
                  >
                    &#10006;
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No menu items selected</p>
            )}
          </div>

          <button
            className="mt-8 flex items-center gap-2 text-primary hover:text-primary-dull transition-colors"
            onClick={() => navigate(-1)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Venue
          </button>
        </div>

        <div className="max-w-[360px] w-full bg-gray-50 p-6 rounded-xl border border-gray-200 mt-8 md:mt-0 md:ml-8">
          <h2 className="text-2xl font-bold mb-6">Payment Summary</h2>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium mb-1">Billed to:</span>
              <BilledToDropdown />
            </div>
            <div className="flex justify-between">
              <span>Per Plate:</span>
              <span>₹{perPlate}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Amount ({upperGuests} guests):</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between">
              <span>Booking Fee (10%):</span>
              <span>₹{bookingFee}</span>
            </div>
            <div className="flex justify-between font-bold border-t pt-4">
              <span>Total Payable Now:</span>
              <span>₹{bookingFee}</span>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <select className="w-full px-4 py-2 bg-white border rounded-lg">
              <option>Credit/Debit Card</option>
              <option>Net Banking</option>
              <option>UPI</option>
              <option>Cash on Delivery</option>
            </select>

            <button
              className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dull transition-colors"
              onClick={handleConfirmBooking}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FinalBooking;
