import React, { useState } from 'react';
import SimpleNavbar from './SimpleNavbar';
const cityOptions = [
  { value: "Delhi", label: "Delhi" },
  { value: "Gurugram", label: "Gurugram" },
  { value: "Noida", label: "Noida" },
  { value: "Hyderabad", label: "Hyderabad" },
];

const PartnerDashboard = () => {
  const [activeSection, setActiveSection] = useState('addHall');
  const [banquetHalls, setBanquetHalls] = useState([]);
  const [currentHall, setCurrentHall] = useState({
    name: '',
    address: '',
    guests: '',
    phone: '',
    rating: 4.0,
    priceVeg: '',
    priceNonVeg: '',
    image: '',
    tags: ["Banquet Halls"],
    description: '',
    city: 'Delhi',
    menu: [],
    venueType: 'Banquet Hall'
  });
  const [currentDish, setCurrentDish] = useState({
    name: '',
    tag: 'Starters',
    veg: true,
    image: '',
    hallName: ''
  });
  const [bookings, setBookings] = useState([
    {
      user: "John Doe",
      date: "2024-03-15",
      guests: "600-800",
      hall: "Crossroads Banquets",
      menu: ["Hara Bhara Kebab", "Chicken Tandoori"]
    }
  ]);

  // Add Venue
  const handleAddHall = (e) => {
    e.preventDefault();
    const tags = currentHall.venueType === "Banquet Hall" ? ["Banquet Halls"] : ["Wedding Lawns"];
    setBanquetHalls([...banquetHalls, { ...currentHall, tags }]);
    setCurrentHall({
      name: '',
      address: '',
      guests: '',
      phone: '',
      rating: 4.0,
      priceVeg: '',
      priceNonVeg: '',
      image: '',
      tags: ["Banquet Halls"],
      description: '',
      city: 'Delhi',
      menu: [],
      venueType: 'Banquet Hall'
    });
  };

  // Add Menu Item
  const handleAddDish = (e) => {
    e.preventDefault();
    const hallIndex = banquetHalls.findIndex(hall => hall.name === currentDish.hallName);
    if (hallIndex === -1) {
      alert('Please select a valid venue for the menu item.');
      return;
    }
    const updatedHalls = [...banquetHalls];
    updatedHalls[hallIndex] = {
      ...updatedHalls[hallIndex],
      menu: [...(updatedHalls[hallIndex].menu || []), {
        name: currentDish.name,
        tag: currentDish.tag,
        veg: currentDish.veg,
        image: currentDish.image
      }]
    };
    setBanquetHalls(updatedHalls);
    setCurrentDish({
      name: '',
      tag: 'Starters',
      veg: true,
      image: '',
      hallName: ''
    });
  };

  // Delete Dish
  const handleDeleteDish = (hallName, dishIndex) => {
    const updatedHalls = banquetHalls.map(hall => {
      if (hall.name !== hallName) return hall;
      return {
        ...hall,
        menu: hall.menu.filter((_, idx) => idx !== dishIndex)
      };
    });
    setBanquetHalls(updatedHalls);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-4">
        <h1 className="text-2xl font-bold mb-8 text-primary text-center">Partner Dashboard</h1>
        <nav className="space-y-2">
          <button
            onClick={() => setActiveSection('addHall')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg ${
              activeSection === 'addHall' ? 'bg-primary text-white' : 'hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Venue
          </button>
          <button
            onClick={() => setActiveSection('addMenu')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg ${
              activeSection === 'addMenu' ? 'bg-primary text-white' : 'hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Menu Items
          </button>
          <button
            onClick={() => setActiveSection('dishList')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg ${
              activeSection === 'dishList' ? 'bg-primary text-white' : 'hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Dish List
          </button>
          <button
            onClick={() => setActiveSection('viewBookings')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg ${
              activeSection === 'viewBookings' ? 'bg-primary text-white' : 'hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            View Bookings
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Add Venue Form */}
        {activeSection === 'addHall' && (
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Add New Venue</h2>
            <form onSubmit={handleAddHall} className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Venue Name"
                  className="w-full border rounded-lg px-4 py-2"
                  value={currentHall.name}
                  onChange={e => setCurrentHall({...currentHall, name: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full border rounded-lg px-4 py-2"
                  value={currentHall.address}
                  onChange={e => setCurrentHall({...currentHall, address: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Guest Capacity (e.g. 600-800)"
                  className="w-full border rounded-lg px-4 py-2"
                  value={currentHall.guests}
                  onChange={e => setCurrentHall({...currentHall, guests: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="w-full border rounded-lg px-4 py-2"
                  value={currentHall.phone}
                  onChange={e => setCurrentHall({...currentHall, phone: e.target.value})}
                />
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="venueType"
                      value="Banquet Hall"
                      checked={currentHall.venueType === "Banquet Hall"}
                      onChange={e => setCurrentHall({...currentHall, venueType: e.target.value})}
                    />
                    Banquet Hall
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="venueType"
                      value="Wedding Lawn"
                      checked={currentHall.venueType === "Wedding Lawn"}
                      onChange={e => setCurrentHall({...currentHall, venueType: e.target.value})}
                    />
                    Wedding Lawn
                  </label>
                </div>
              </div>
              <div className="space-y-4">
                <select
                  className="w-full border rounded-lg px-4 py-2"
                  value={currentHall.city}
                  onChange={e => setCurrentHall({...currentHall, city: e.target.value})}
                >
                  {cityOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Veg Price per Plate"
                  className="w-full border rounded-lg px-4 py-2"
                  value={currentHall.priceVeg}
                  onChange={e => setCurrentHall({...currentHall, priceVeg: e.target.value})}
                />
                <input
                  type="number"
                  placeholder="Non-Veg Price per Plate"
                  className="w-full border rounded-lg px-4 py-2"
                  value={currentHall.priceNonVeg}
                  onChange={e => setCurrentHall({...currentHall, priceNonVeg: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  className="w-full border rounded-lg px-4 py-2"
                  value={currentHall.image}
                  onChange={e => setCurrentHall({...currentHall, image: e.target.value})}
                />
                <textarea
                  placeholder="Venue Description"
                  className="w-full border rounded-lg px-4 py-2"
                  value={currentHall.description}
                  onChange={e => setCurrentHall({...currentHall, description: e.target.value})}
                />
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-2 rounded-lg font-medium"
                >
                  Add Venue
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Add Menu Items Form */}
        {activeSection === 'addMenu' && (
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Add Menu Items</h2>
            <form onSubmit={handleAddDish} className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Dish Name"
                  className="w-full border rounded-lg px-4 py-2"
                  value={currentDish.name}
                  onChange={e => setCurrentDish({...currentDish, name: e.target.value})}
                />
                <select
                  className="w-full border rounded-lg px-4 py-2"
                  value={currentDish.tag}
                  onChange={e => setCurrentDish({...currentDish, tag: e.target.value})}
                >
                  <option>Starters</option>
                  <option>Main Course</option>
                  <option>Dessert</option>
                </select>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={currentDish.veg}
                    onChange={e => setCurrentDish({...currentDish, veg: e.target.checked})}
                  />
                  Vegetarian
                </label>
                <select
                  className="w-full border rounded-lg px-4 py-2"
                  value={currentDish.hallName}
                  onChange={e => setCurrentDish({...currentDish, hallName: e.target.value})}
                >
                  <option value="">Select Venue</option>
                  {banquetHalls.map(hall => (
                    <option key={hall.name} value={hall.name}>{hall.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Image URL"
                  className="w-full border rounded-lg px-4 py-2"
                  value={currentDish.image}
                  onChange={e => setCurrentDish({...currentDish, image: e.target.value})}
                />
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-2 rounded-lg font-medium"
                >
                  Add Dish
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Dish List Section */}
        {activeSection === 'dishList' && (
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Dish List</h2>
            {banquetHalls.length === 0 ? (
              <p className="text-gray-500">No venues added yet.</p>
            ) : (
              banquetHalls.map(hall => (
                <div key={hall.name} className="mb-8">
                  <h3 className="text-xl font-semibold mb-2">{hall.name}</h3>
                  {(!hall.menu || hall.menu.length === 0) ? (
                    <p className="text-gray-400 italic mb-4">No dishes added for this venue.</p>
                  ) : (
                    <div className="grid gap-3">
                      {hall.menu.map((dish, idx) => (
                        <div key={dish.name + idx} className="flex items-center gap-4 bg-gray-50 rounded p-3">
                          <img src={dish.image} alt={dish.name} className="w-12 h-12 rounded object-cover" />
                          <div className="flex-1">
                            <p className="font-medium">{dish.name}</p>
                            <p className="text-xs text-gray-500">{dish.tag} • {dish.veg ? "Veg" : "Non-Veg"}</p>
                          </div>
                          <button
                            className="text-red-500 hover:text-red-700 text-lg"
                            title="Delete Dish"
                            onClick={() => handleDeleteDish(hall.name, idx)}
                          >
                            &#10006;
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* View Bookings Section */}
        {activeSection === 'viewBookings' && (
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Current Bookings</h2>
            <div className="space-y-4">
              {bookings.map((booking, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{booking.user}</h3>
                      <p className="text-gray-600">{booking.date}</p>
                    </div>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      {booking.guests} guests
                    </span>
                  </div>
                  <div className="mt-2">
                    <h4 className="font-medium">Menu Selected:</h4>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {booking.menu.map((item, i) => (
                        <span key={i} className="bg-gray-100 px-2 py-1 rounded text-sm">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  
  );
};

export default PartnerDashboard;
