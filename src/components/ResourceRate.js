import { useEffect } from "react";

const ResourceRate = ({ rate, setResource, resourceMultiplier }) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      setResource((prevResource) => resourceMultiplier * (prevResource + rate));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [rate, setResource, resourceMultiplier]);
  return null;
};

export default ResourceRate;
