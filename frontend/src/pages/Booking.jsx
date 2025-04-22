import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const [trains, setTrains] = useState([]);
  const [error, setError] = useState(null);

  const queryParams = new URLSearchParams(location.search);
  const from = queryParams.get("from");
  const to = queryParams.get("to");
  const date = queryParams.get("date");

  useEffect(() => {
    const fetchTrains = async () => {
      console.log('Fetching trains with params:', { from, to, date }); // Debug log
      try {
        const response = await axios.get('http://localhost:5000/api/trains/search', {
          params: { from, to, date }
        });
        console.log('API Response:', response.data); // Debug log
        if (response.data.length === 0) {
          console.log('No trains found for the given parameters');
          setError('No trains available for the selected route and date.');
        }
        setTrains(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching trains:', error.message, error.response?.data || error.response?.status); // Detailed error log
        setError(`Failed to load trains. Error: ${error.message}. Status: ${error.response?.status || 'Unknown'}`);
      }
    };
    fetchTrains();
  }, [from, to, date]);

  const handleBooking = async (train) => {
    const ticket = {
      id: `TCKT${Date.now()}`,
      train: train.name,
      from: from,
      to: to,
      date: date,
      time: train.departure,
      seat: "S3 - 24",
      price: train.price,
    };
    try {
      await axios.post('http://localhost:5000/api/tickets', ticket);
      alert(`Ticket booked for ${train.name}!`);
      navigate('/tickets');
    } catch (error) {
      console.error('Error booking ticket:', error.message);
      setError('Failed to book ticket. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">
          Trains from <span className="text-blue-600">{from}</span> to{" "}
          <span className="text-blue-600">{to}</span> on{" "}
          <span className="text-blue-600">{date}</span>
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {trains.length === 0 && !error ? (
          <p className="text-gray-500">Searching trains...</p>
        ) : (
          <div className="grid gap-6 mt-6">
            {trains.map((train) => (
              <div
                key={train._id}
                className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {train.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {train.departure} → {train.arrival} ({train.duration})
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                  <span className="text-lg font-bold text-green-600">
                    {train.price}
                  </span>
                  <button
                    onClick={() => handleBooking(train)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Booking;