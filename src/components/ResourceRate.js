import { useEffect } from "react";

const ResourceRate = ({ rate, setResource }) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      setResource((prevResource) => prevResource + rate);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [rate, setResource]);
  return null;
};

export default ResourceRate;
