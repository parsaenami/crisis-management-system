import { useEffect, useState } from 'react';
import { messages } from "../assets/messages";

export const usePosition = permission => {
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
    } else if (permission) {
      navigator.permissions
          .query({name: "geolocation"})
          .then(function (result) {
            if (result.state === "denied") {
              alert(messages.ERR_LOCATION_DENIED);
            }
          });
    }

    const watcher = permission ? geo.watchPosition(onChange, onError) : null;
    return watcher ? () => geo.clearWatch(watcher) : null;
  }, [permission]);
  return {...position, error};
}