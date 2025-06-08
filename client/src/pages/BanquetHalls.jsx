import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import banquetHalls from "../assets/BanquetHalls.js";

// --- Filter Sidebar (unchanged) ---
const FilterSidebar = () => (
  <aside className="w-full md:w-64 bg-white border border-gray-200 rounded-xl p-4 mb-6 md:mb-0">
    {/* ...keep your sidebar code unchanged... */}
    <div className="mb-6">
      <h4 className="font-semibold text-gray-700 mb-2">Locality <span className="text-xs text-primary cursor-pointer ml-2">Clear</span></h4>
      <input className="w-full border border-gray-200 rounded px-2 py-1 mb-2 text-sm" placeholder="Search Locality" />
      <div className="flex flex-col gap-1">
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> Dwarka <span className="text-gray-400 ml-auto">124</span></label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> Rohini <span className="text-gray-400 ml-auto">105</span></label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> Shahdara <span className="text-gray-400 ml-auto">67</span></label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> Chattarpur <span className="text-gray-400 ml-auto">67</span></label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> Connaught Place <span className="text-gray-400 ml-auto">62</span></label>
        <span className="text-primary text-xs cursor-pointer mt-1">+ Show More</span>
      </div>
    </div>
    <div>
      <h4 className="font-semibold text-gray-700 mb-2">Venue Budget <span className="text-xs text-primary cursor-pointer ml-2">Clear</span></h4>
      {/* Add your budget filter here */}
    </div>
  </aside>
);

// --- ChoiceBar with full filtering functionality ---
const cityOptions = [
  { value: "", label: "All Cities" },
  { value: "delhi", label: "Delhi" },
  { value: "gurugram", label: "Gurugram" },
  { value: "noida", label: "Noida" },
  { value: "hyderabad", label: "Hyderabad" },
];

const guestOptions = [
  { value: "0-150", label: "0-150" },
  { value: "150-250", label: "150-250" },
  { value: "250-400", label: "250-400" },
  { value: "400+", label: "400+" },
];

const ChoiceBar = ({
  city, setCity,
  locality, setLocality,
  guests, setGuests,
  budget, setBudget,
  handleFilter
}) => (
  <form
    className="bg-white rounded-xl shadow flex flex-wrap md:flex-nowrap gap-2 md:gap-4 items-center px-4 py-3 mb-6"
    onSubmit={e => { e.preventDefault(); handleFilter(); }}
  >
    {/* City Dropdown */}
    <select
      className="flex-1 border border-gray-200 rounded px-3 py-2 text-sm"
      value={city}
      onChange={e => setCity(e.target.value)}
    >
      {cityOptions.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
    {/* Locality Input */}
    <input
      className="flex-1 border border-gray-200 rounded px-3 py-2 text-sm"
      placeholder="Locality"
      value={locality}
      onChange={e => setLocality(e.target.value)}
    />
    {/* Guests Dropdown */}
    <select
      className="flex-1 border border-gray-200 rounded px-3 py-2 text-sm"
      value={guests}
      onChange={e => setGuests(e.target.value)}
    >
      <option value="">Guests</option>
      {guestOptions.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
    {/* Budget Input */}
    <input
      className="flex-1 border border-gray-200 rounded px-3 py-2 text-sm"
      type="number"
      min="0"
      placeholder="Budget"
      value={budget}
      onChange={e => setBudget(e.target.value)}
    />
    <button
      type="submit"
      className="bg-primary text-white px-6 py-2 rounded font-semibold"
    >
      Search
    </button>
  </form>
);

// --- Banquet Card (unchanged) ---
const BanquetCard = ({ hall }) => {
  const navigate = useNavigate();
  const venueId = hall.name.replace(/\s/g, '-').toLowerCase();

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6 flex flex-col md:flex-row cursor-pointer hover:shadow-lg transition">
      <div className="md:w-64 w-full h-48 md:h-40 rounded-lg overflow-hidden mb-4 md:mb-0 md:mr-6 flex-shrink-0">
        <img src={hall.image} alt={hall.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">Evento Certified</span>
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">{hall.name}</h2>
          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-semibold">
            ★ {hall.rating} / 5 | {hall.ratingCount}
          </span>
        </div>
        <div className="text-gray-500 text-sm mb-1">{hall.address}</div>
        <div className="flex flex-wrap gap-2 text-xs mb-2">
          <span className="bg-gray-100 px-2 py-1 rounded">{hall.guests}</span>
          <span className="bg-gray-100 px-2 py-1 rounded">{hall.phone}</span>
        </div>
        <div className="text-gray-700 text-sm mb-2">{hall.description}</div>
        <div className="flex flex-wrap gap-2 mb-2">
          {hall.tags.map(tag => (
            <span key={tag} className="bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs">{tag}</span>
          ))}
        </div>
        <div className="flex items-center gap-3 mt-auto">
          <div>
            <span className="text-xs text-gray-500">Non Vegetarian</span>
            <span className="ml-2 line-through text-gray-400 text-sm">₹{hall.priceNonVeg + 200}</span>
            <span className="ml-2 text-gray-900 font-semibold text-sm">₹{hall.priceNonVeg}</span>
          </div>
          <div>
            <span className="text-xs text-gray-500">Vegetarian</span>
            <span className="ml-2 line-through text-gray-400 text-sm">₹{hall.priceVeg + 200}</span>
            <span className="ml-2 text-gray-900 font-semibold text-sm">₹{hall.priceVeg}</span>
          </div>
          <button
            className="ml-auto bg-primary text-white px-4 py-2 rounded font-semibold text-sm"
            onClick={e => {
              e.stopPropagation();
              navigate(`/venue/${venueId}`);
            }}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Page ---
export default function BanquetHallsPage() {
  const { city: cityParam } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  // Choice bar state
  const [city, setCity] = useState(cityParam || "");
  const [locality, setLocality] = useState("");
  const [guests, setGuests] = useState("");
  const [budget, setBudget] = useState("");
  const [filteredHalls, setFilteredHalls] = useState(banquetHalls);

  // Filtering logic
  const handleFilter = () => {
    let halls = banquetHalls;

    // City filter
    if (city) {
      halls = halls.filter(hall => hall.city.toLowerCase() === city.toLowerCase());
    }

    // Locality (address) filter
    if (locality.trim()) {
      halls = halls.filter(hall =>
        hall.address.toLowerCase().includes(locality.trim().toLowerCase())
      );
    }

    // Guests filter (overlap logic)
    if (guests) {
      const [gMin, gMax] = guests === "400+" ? [400, Infinity] : guests.split("-").map(Number);
      halls = halls.filter(hall => {
        // Parse hall's guest range
        const hallRange = hall.guests.split(" ")[0];
        let [hallMin, hallMax] = hallRange.includes("-")
          ? hallRange.split("-").map(Number)
          : [parseInt(hallRange), parseInt(hallRange)];
        if (hallRange.includes("+")) hallMax = Infinity;
        // Overlap if ranges intersect
        return hallMin <= gMax && hallMax >= gMin;
      });
    }

    // Budget filter (budget / guests lower limit ≈ veg price)
    if (budget && guests) {
      const guestsLower = guests === "400+" ? 400 : parseInt(guests.split("-")[0]);
      const perPlateBudget = Math.floor(Number(budget) / guestsLower);
      halls = halls.filter(hall => hall.priceVeg === perPlateBudget);
    }

    setFilteredHalls(halls);
  };

  // Initial filter for city/search param on mount
  React.useEffect(() => {
    let halls = banquetHalls;
    if (cityParam) {
      halls = halls.filter(hall => hall.city.toLowerCase() === cityParam.toLowerCase());
      setCity(cityParam);
    }
    if (searchQuery) {
      halls = halls.filter(hall =>
        hall.name.toLowerCase().includes(searchQuery) ||
        (hall.city && hall.city.toLowerCase().includes(searchQuery)) ||
        (hall.address && hall.address.toLowerCase().includes(searchQuery))
      );
    }
    setFilteredHalls(halls);
    // eslint-disable-next-line
  }, [cityParam, searchQuery]);

  // Determine display title
  let displayTitle;
  if (searchQuery) {
    displayTitle = `Search Results for "${searchQuery}"`;
  } else if (city) {
    displayTitle = `Banquet Halls in ${city.charAt(0).toUpperCase() + city.slice(1)}`;
  } else {
    displayTitle = "All Banquet Halls";
  }

  return (
    <div className="bg-[#f5f5f5] min-h-screen py-8 px-2 md:px-8">
      <ChoiceBar
        city={city}
        setCity={setCity}
        locality={locality}
        setLocality={setLocality}
        guests={guests}
        setGuests={setGuests}
        budget={budget}
        setBudget={setBudget}
        handleFilter={handleFilter}
      />
      <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto">
        <FilterSidebar />
        <main className="flex-1">
          <h1 className="text-xl font-bold mb-3">
            {displayTitle}
            <span className="text-gray-500 font-normal"> ({filteredHalls.length} Venues)</span>
          </h1>
          {filteredHalls.length > 0 ? (
            filteredHalls.map(hall => (
              <BanquetCard key={hall.name} hall={hall} />
            ))
          ) : (
            <p className="text-gray-500 italic">No banquet halls found.</p>
          )}
        </main>
      </div>
    </div>
  );
}
