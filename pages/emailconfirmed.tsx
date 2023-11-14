import React, { useEffect } from "react";

const Emailconfirmed = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.location.href = "/"; // Redirect to the desired URL after 5 seconds
    }, 5000);

    return () => clearTimeout(timeout); // Clear the timeout if the component unmounts
  }, []);

  return (
    <div className="h-screen text-center">
      <div className="text-white text-4xl mt-40">
        Your email has been confirmed!
      </div>
      <br />
      <p className="text-white text-xl">Redirecting you in 5 seconds!</p>
    </div>
  );
};

export default Emailconfirmed;
