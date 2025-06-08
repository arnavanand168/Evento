import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ProductCard from "../components/ProductCard";
import { useAppContext } from "../context/AppContext";

export default function VenueDetailPage({ banquetHalls }) {
  const navigate = useNavigate();
  const { products, searchQuery } = useAppContext();

  // Optional: product search logic (if you use it elsewhere)
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    if (searchQuery && searchQuery.length > 0) {
      setFilteredProducts(
        products.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchQuery]);

  const { venueId } = useParams();
  const hall = banquetHalls.find(
    h => h.name.replace(/\s/g, '-').toLowerCase() === venueId
  );
  const [selectedGuests, setSelectedGuests] = useState("");
  const [eventDate, setEventDate] = useState(null);

  // Track which menu items are selected (by name)
  const [selectedItems, setSelectedItems] = useState({});

  if (!hall) return <div className="text-center p-10">Venue not found</div>;
  const menu = hall.menu || [];

  // Toggle "added" state for a dish
  const handleToggleItem = (dishName) => {
    setSelectedItems(prev => ({
      ...prev,
      [dishName]: !prev[dishName]
    }));
  };

  // Only send selected menu items to FinalBooking
  const selectedMenu = menu.filter(item => selectedItems[item.name]);

  // Parse guest capacity
  const guestsRange = hall.guests.split(" ")[0];
  const [minStr, maxStr] = guestsRange.split("-");
  const minGuests = parseInt(minStr);
  const maxGuests = maxStr ? parseInt(maxStr) : minGuests;

  // Generate guest options
  const guestOptions = [];
  let current = minGuests;
  const step = 100;
  while (current <= maxGuests && current <= 500) {
    guestOptions.push(current);
    current += step;
  }
  if (maxGuests > 500) guestOptions.push("500+");

  // Render menu rows horizontally
  const renderMenuRow = (label, tag) => (
    <>
      <h3 className="text-xl font-semibold mt-8 mb-4">{label}</h3>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {menu.filter(item => item.tag.toLowerCase().includes(tag)).length === 0 ? (
          <span className="text-gray-400 italic">No items</span>
        ) : (
          menu
            .filter(item => item.tag.toLowerCase().includes(tag))
            .map(item => (
              <ProductCard
                key={item.name}
                product={item}
                added={!!selectedItems[item.name]}
                onToggle={() => handleToggleItem(item.name)}
              />
            ))
        )}
      </div>
    </>
  );

  return (
    <div className="bg-[#f5f5f5] min-h-screen pb-8">
      <div className="max-w-7xl mx-auto pt-6 px-4 flex flex-col md:flex-row gap-6">
        {/* Left: Gallery and Details */}
        <div className="flex-1">
          {/* Gallery */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 h-[340px] md:h-[420px]">
            <div className="col-span-2 row-span-2 md:col-span-2 md:row-span-2 h-full">
              <img src={hall.image} alt={hall.name} className="w-full h-full object-cover rounded-xl" />
            </div>
            <img src={hall.image} alt={hall.name} className="w-full h-full object-cover rounded-xl" />
            <img src={hall.image} alt={hall.name} className="w-full h-full object-cover rounded-xl" />
          </div>
          {/* Ratings and Badge */}
          <div className="flex items-center gap-2 mt-4">
            <button className="flex items-center gap-1 bg-white px-3 py-1 rounded shadow text-sm">
              <svg width="18" height="18" fill="none" stroke="#0CAE5A" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
              <span className="text-[#0CAE5A] font-semibold">{hall.rating}</span>
              <span className="text-gray-500">/5</span>
              <span className="text-gray-600 ml-2">{hall.ratingCount}</span>
            </button>
            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">Evento Certified</span>
          </div>
          {/* Name, Address, Tags */}
          <h1 className="text-2xl md:text-3xl font-bold mt-4">{hall.name}</h1>
          <p className="text-gray-600 mt-1">{hall.address}</p>
          <a href="#" className="text-blue-500 text-sm mt-1 inline-block">View on map</a>
          <div className="flex flex-wrap gap-2 mt-4">
            {hall.tags.map((tag, i) => (
              <span key={tag} className="bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs">{tag}</span>
            ))}
          </div>
          {/* About */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-2">About this venue</h2>
            <p className="text-gray-700">{hall.description}</p>
          </div>
          {/* Call Venue */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-2">Call {hall.name}</h2>
            <div className="flex items-center gap-2 text-green-600 font-medium">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92V19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2.08"/><path d="M16 3.13v4.36a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V3.13"/><circle cx="12" cy="12" r="3.5"/></svg>
              <a href={`tel:${hall.phone}`}><span>{hall.phone}</span></a>
            </div>
          </div>
          {/* Demand Banner */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-700 text-sm">
            <strong>Hurry UP!</strong> This Venue is In High Demand
          </div>
        </div>
        {/* Right: Sticky Price Card */}
        <div className="w-full md:w-80 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-xl p-4 mt-4 md:mt-0 relative">
            <div className="flex items-center gap-2 mb-3 mt-2">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Vegetarian
              <span className="ml-auto font-semibold text-gray-900">₹{hall.priceVeg}</span>
              <span className="text-xs text-gray-400 ml-1">/Plate</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              Non Vegetarian
              <span className="ml-auto font-semibold text-gray-900">₹{hall.priceNonVeg}</span>
              <span className="text-xs text-gray-400 ml-1">/Plate</span>
            </div>
            <button className="w-full bg-primary text-white py-2 rounded-full font-semibold mb-2 hover:bg-primary-dull transition">Venue Tour</button>
            <div className="flex items-center justify-center gap-2 text-primary font-medium mb-2">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92V19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2.08"/><path d="M16 3.13v4.36a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V3.13"/><circle cx="12" cy="12" r="3.5"/></svg>
              <a href={`tel:${hall.phone}`}><span>{hall.phone}</span></a>
            </div>
            <div className="bg-gradient-to-r from-[#ffd1d1] to-[#ffacac] rounded-xl p-3 text-xs mt-2">
              <div className="font-semibold text-primary-dull mb-1">Book an Evento Certified Venue for</div>
              <ul className="text-gray-700 space-y-1 pl-4 list-disc">
                <li>Great Event Guaranteed</li>
                <li>One Stop Shop</li>
                <li>100% Transparency</li>
              </ul>
              <span className="inline-block mt-2 bg-primary text-white px-2 py-1 rounded text-xs">Evento Certified</span>
            </div>
          </div>
        </div>
      </div>
      {/* Booking Section (menu inside) */}
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Book Your Event</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Guests
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                value={selectedGuests}
                onChange={(e) => setSelectedGuests(e.target.value)}
              >
                <option value="">Select number of guests</option>
                {guestOptions.map((guests, index) => (
                  <option key={index} value={guests}>
                    {typeof guests === 'number'
                      ? `${guests}${guests+step <= maxGuests ? `-${guests+step}` : '+'} Guests`
                      : '500+ Guests'}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Date
              </label>
              <DatePicker
                selected={eventDate}
                onChange={(date) => setEventDate(date)}
                minDate={new Date()}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholderText="Select a date"
                dateFormat="dd/MM/yyyy"
                isClearable
              />
            </div>
          </div>
          {/* MENU SECTION INSIDE BOOKING CARD */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Menu</h2>
            {renderMenuRow("Starters", "starter")}
            {renderMenuRow("Main Course", "main course")}
            {renderMenuRow("Desserts", "dessert")}
          </div>
          <button 
            className={`w-full py-3 rounded-lg font-bold text-lg transition-all ${
              selectedGuests && eventDate 
                ? 'bg-primary text-white hover:bg-primary-dull'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!selectedGuests || !eventDate}
            onClick={() => navigate("/FinalBooking", {
              state: {
                hall,
                guests: selectedGuests,
                date: eventDate,
                menu: selectedMenu
              }
            })}
          >
            Proceed to Booking
          </button>
        </div>
      </div>
    </div>
  );
}
