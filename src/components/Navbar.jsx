import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
const Dropdown = ({ title, items, isOpen, onOpen, onClose, onItemClick }) => {
  const dropdownRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="flex items-center gap-1 hover:text-gray-600 transition-colors"
        onClick={() => isOpen ? onClose() : onOpen()}
      >
        {title}
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-200">
          {items.map((item) => (
            <div
              key={item.name}
              onClick={() => {
                if (onItemClick) onItemClick(item);
                onClose();
              }}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

function ProfileDropdown({ onLogout }) {
  const [open, setOpen] = React.useState(false);
  const dropdownRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white hover:bg-primary-dull transition"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Profile"
        type="button"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 16-4 16 0" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-200">
          <NavLink
            to="/my-bookings"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            My Bookings
          </NavLink>
          <button
            onClick={() => { setOpen(false); onLogout(); }}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

const Navbar = ({ onLoginClick }) => {
  const [openMobileMenu, setOpenMobileMenu] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState(null);
  const [search, setSearch] = useState("");
  const { user, setuser, navigate: contextNavigate } = useAppContext();
  const navigate = contextNavigate || useNavigate();

  const logout = () => {
    setuser(null);
    navigate('/');
  };

  const eventsDropdown = [
    { name: "Wedding", path: "/event-packages/wedding" },
    { name: "Anniversary", path: "/event-packages/anniversary" },
    { name: "Birthday", path: "/event-packages/birthday" },
    { name: "Corporate", path: "/event-packages/corporate" },
  ];
  

  // Plan dropdown with city slugs for URL
  const planDropdown = [
    { name: 'Delhi', city: 'delhi' },
    { name: 'Gurugram', city: 'gurugram' },
    { name: 'Noida', city: 'noida' },
    { name: 'Hyderabad', city: 'hyderabad' }
  ];

  // Correct handler: navigates to /banquet-halls/:city
  const handlePlanClick = (item) => {
    if (item.city) {
      navigate(`/banquet-halls/${item.city}`);
    } else {
      navigate('/banquet-halls');
    }
    setActiveDropdown(null);
  };

  // Search handler: navigates to /banquet-halls?search=...
  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/banquet-halls?search=${encodeURIComponent(search.trim())}`);
      setSearch(""); // Optional: clear search after navigating
    }
  };

  const [eventsOpen, setEventsOpen] = useState(false);

  const events = [
    { name: "Wedding", path: '/event-packages/wedding' },
    { name: "Anniversary", path: '/event-packages/anniversary' },
    { name: "Birthday", path: "/event-packages/birthday" },
    { name: "Corporate", path: "/event-packages/corporate" },
  ];

  const handleEventClick = (item) => {
    navigate(item.path);
    setActiveDropdown(null);
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <NavLink to='/'>
        <img className="h-9" src="/Evento_logo-horizontal.svg" alt="Evento Logo" />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to='/'>Home</NavLink>
        <Dropdown
        title="Events"
        items={eventsDropdown}
        isOpen={activeDropdown === 'events'}
        onOpen={() => setActiveDropdown('events')}
        onClose={() => setActiveDropdown(null)}
        onItemClick={handleEventClick}
      />
        <Dropdown
          title="Plan"
          items={planDropdown}
          isOpen={activeDropdown === 'plan'}
          onOpen={() => setActiveDropdown('plan')}
          onClose={() => setActiveDropdown(null)}
          onItemClick={handlePlanClick}
        />
        <NavLink to='/contact'>Help</NavLink>

        {/* SEARCH BAR */}
        <form onSubmit={handleSearch} className="flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search by name, city, or address"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="flex items-center justify-center text-primary hover:text-primary-dull"
            aria-label="Search"
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </form>

        {/* Profile or Login */}
        {!user ? (
          <button
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
            onClick={onLoginClick}
          >
            Login
          </button>
        ) : (
          <ProfileDropdown onLogout={logout} />
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <button onClick={() => setOpenMobileMenu(!openMobileMenu)} aria-label="Menu" className="sm:hidden">
        <svg width="21" height="15" viewBox="0 0 21 15" fill="none">
          <rect width="21" height="1.5" rx=".75" fill="#426287" />
          <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
          <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
        </svg>
      </button>
      {/* Mobile Menu */}
      <div className={`${openMobileMenu ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
        <NavLink to='/' className="block">Home</NavLink>
        <NavLink to='/events/wedding' className="block">Wedding</NavLink>
        <NavLink to='/events/anniversary' className="block">Anniversary</NavLink>
        <NavLink to='/events/birthday' className="block">Birthday</NavLink>
        <NavLink to='/events/corporate' className="block">Corporate</NavLink>
        {/* Plan options: always go to /banquet-halls/:city */}
        {planDropdown.map(item => (
          <div
            key={item.city}
            onClick={() => { setOpenMobileMenu(false); navigate(`/banquet-halls/${item.city}`); }}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer w-full"
          >
            {item.name}
          </div>
        ))}
        <NavLink to='/contact' className="block">Help</NavLink>
        {/* Mobile Search Bar */}
        <form onSubmit={handleSearch} className="flex items-center w-full mt-2 mb-2 border border-gray-300 px-3 rounded-full">
          <input
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search by name, city, or address"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="flex items-center justify-center text-primary hover:text-primary-dull"
            aria-label="Search"
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </form>
        {!user ? (
          <button
            className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm w-full"
            onClick={onLoginClick}
          >
            Login
          </button>
        ) : (
          <>
            <NavLink to="/products" className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              My Bookings
            </NavLink>
            <button
              onClick={logout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
