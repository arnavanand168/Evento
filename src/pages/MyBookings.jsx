import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Utility to get/set bookings from localStorage
const getBookings = () => {
  const saved = localStorage.getItem('eventoBookings');
  return saved ? JSON.parse(saved) : [];
};

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setBookings(getBookings());
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
      
      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No bookings found</p>
          <Link to="/" className="text-primary hover:underline">
            Book your first event
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Venue Details */}
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-2">{booking.hall.name}</h2>
                  <p className="text-gray-600 mb-2">{booking.hall.address}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                      {booking.guests} Guests
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      {new Date(booking.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Payment Summary */}
                <div className="md:w-64 w-full bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Per Plate:</span>
                      <span>₹{booking.perPlate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Amount:</span>
                      <span>₹{booking.total}</span>
                    </div>
                    <div className="flex justify-between font-bold border-t pt-2">
                      <span>Amount Paid:</span>
                      <span>₹{booking.bookingFee}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="mt-6">
                <h3 className="font-semibold mb-3">Selected Menu ({booking.menu.length} items)</h3>
                <div className="grid gap-3">
                  {booking.menu.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                      <div className="w-12 h-12 rounded overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.tag}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
