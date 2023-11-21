import React, { useEffect } from "react";

const Emailconfirmed = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.location.href = "/login";
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="h-screen text-center">
      <div className="text-white text-4xl mt-40">
        Your email has been confirmed!
      </div>
      <br />
      <p className="text-white text-xl">Redirecting you in 3 seconds!</p>
    </div>
  );
};

export default Emailconfirmed;
