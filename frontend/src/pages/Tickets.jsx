import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import axios from 'axios';

function Tickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tickets');
        setTickets(response.data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };
    fetchTickets();
  }, []);

  const deleteTicket = async (ticketId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tickets/${ticketId}`);
      setTickets(tickets.filter(ticket => ticket._id !== ticketId));
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">My Tickets</h2>

        {tickets.length === 0 ? (
          <p className="text-gray-500 text-lg">No tickets booked yet.</p>
        ) : (
          <div className="grid gap-6">
            {tickets.map((ticket) => (
              <div
                key={ticket._id}
                className="p-6 bg-gray-50 rounded-xl shadow-md border border-gray-200"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold text-blue-800">
                    {ticket.train}
                  </h3>
                  <span className="text-sm text-gray-500">{ticket.id}</span>
                </div>
                <div className="text-gray-700">
                  <p>
                    <span className="font-medium">From:</span> {ticket.from}
                  </p>
                  <p>
                    <span className="font-medium">To:</span> {ticket.to}
                  </p>
                  <p>
                    <span className="font-medium">Date:</span> {ticket.date}
                  </p>
                  <p>
                    <span className="font-medium">Departure:</span> {ticket.time}
                  </p>
                  <p>
                    <span className="font-medium">Seat:</span> {ticket.seat}
                  </p>
                  <p className="mt-2 font-bold text-green-600">
                    Fare: {ticket.price}
                  </p>
                </div>

                <button
                  onClick={() => deleteTicket(ticket._id)}
                  className="mt-4 flex items-center px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  <MdDelete className="mr-2" /> Delete Ticket
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Tickets;