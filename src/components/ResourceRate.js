import { useEffect } from "react";

const ResourceRate = ({
  rate,
  setResource,
  resourceMultiplier,
  coolDown,
  boost,
}) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      setResource(
        (prevResource) => prevResource + rate * resourceMultiplier * boost
      );
    }, coolDown);

    return () => clearInterval(intervalId);
  }, [rate, setResource, resourceMultiplier, coolDown, boost]);
  return null;
};

export default ResourceRate;
