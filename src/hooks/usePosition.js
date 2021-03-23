import { useState, useEffect } from 'react';
import { messages } from "../assets/messages";

export const usePosition = () => {
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  const onChange = ({coords}) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };
  const onError = (error) => {
    setError(error.message);
  };
  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError('Geolocation is not supported');
      return;
    } else {
      navigator.permissions
          .query({name: "geolocation"})
          .then(function (result) {
            if (result.state === "prompt") {
              alert(messages.INFO_ALLOW_LOCATION);
            } else if (result.state === "denied") {
              alert(messages.ERR_LOCATION_DENIED)
            }
          });

    }
    const watcher = geo.watchPosition(onChange, onError);
    return () => geo.clearWatch(watcher);
  }, []);
  return {...position, error};
}