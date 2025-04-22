import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  return (
    <div
      className="flex flex-col items-center justify-center text-center py-16 px-4"
      style={{
        background: "#FFFFFF", // Catppuccin Latte to Peach gradient
      }}
    >
      <motion.h1
        className="text-4xl md:text-6xl font-bold mb-6"
        style={{ color: "#3C3F58" }} // Mocha Base color for text
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Welcome to IRCTC Clone
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl mb-10 max-w-2xl"
        style={{ color: "#282A36" }} // Mocha Neutral Dark for the description
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Search trains, book tickets, and manage your journeys — all in one place. Experience lightning-fast booking with a smooth modern UI.
      </motion.p>

      <motion.div
        className="flex flex-col md:flex-row gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <Link
          to="/search"
          className="px-6 py-3 text-white rounded-xl text-lg font-medium transition"
          style={{
            backgroundColor: "#F28FAD", // Frappe Salmon color
          }}
        >
          Book a Train
        </Link>
        <Link
          to="/tickets"
          className="px-6 py-3 rounded-xl text-lg font-medium transition"
          style={{
            backgroundColor: "#F7C6C7", // Frappe Blush color
            color: "#3C3F58", // Mocha Base text color
          }}
        >
          View My Tickets
        </Link>
      </motion.div>

      <motion.img
        src="https://img.freepik.com/free-vector/high-speed-train-concept-illustration_114360-29786.jpg?t=st=1745216323~exp=1745219923~hmac=ea531f383886ca1c45924758bb1ecfc223c219433e06e87ffbae10b6afac9180&w=740"
        alt="Train Illustration"
        className="mt-16 w-full max-w-md md:max-w-lg"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      />
    </div>
  );
}

export default Home;