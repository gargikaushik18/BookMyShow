import React, { useState, useEffect } from 'react';

const seatsArray = Array.from({ length: 36 }, (_, i) => i + 1);

const BookMyShowClone = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bookedSeats, setBookedSeats] = useState(() => {
    const saved = localStorage.getItem('bookedSeats');
    return saved ? JSON.parse(saved) : [];
  });
  const [mySeats, setMySeats] = useState([]);

  useEffect(() => {
    localStorage.setItem('bookedSeats', JSON.stringify(bookedSeats));
  }, [bookedSeats]);

  const handleLogin = () => {
    if (email && password) {
      setUser({ email });
    }
  };

  const handleSeatClick = (seat) => {
    if (bookedSeats.includes(seat)) return;
    if (mySeats.includes(seat)) {
      setMySeats(mySeats.filter(s => s !== seat));
    } else {
      setMySeats([...mySeats, seat]);
    }
  };

  const handleBooking = () => {
    const latestBooked = JSON.parse(localStorage.getItem('bookedSeats')) || [];
    const conflict = mySeats.some(seat => latestBooked.includes(seat));
    if (conflict) {
      alert("One or more selected seats have already been booked. Please refresh and try again.");
      setBookedSeats(latestBooked);
      setMySeats([]);
      return;
    }
    const newBooked = [...latestBooked, ...mySeats];
    setBookedSeats(newBooked);
    setMySeats([]);
  };

  if (!user) {
    return (
      <div className="p-6 max-w-sm mx-auto bg-white shadow rounded-xl space-y-4">
        <h2 className="text-xl font-bold text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          className="w-full bg-blue-600 text-white py-2 rounded"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-center">BookMyShow Clone</h2>
      <div className="grid grid-cols-6 gap-3">
        {seatsArray.map((seat) => (
          <div
            key={seat}
            onClick={() => handleSeatClick(seat)}
            className={`cursor-pointer rounded-xl w-12 h-12 flex items-center justify-center border 
              ${bookedSeats.includes(seat) ? 'bg-red-500 text-white cursor-not-allowed' : 
              mySeats.includes(seat) ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          >
            {seat}
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <div>Selected Seats: {mySeats.join(', ')}</div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={handleBooking}
          disabled={mySeats.length === 0}
        >
          Book
        </button>
      </div>
    </div>
  );
};

export default BookMyShowClone;