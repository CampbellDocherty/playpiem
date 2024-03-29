import { ReactNode, useEffect, useState } from 'react';
import useGetLocationByIp from '../../api/useGetLocation';
import { DEFAULT_LONDON_LOCATION } from '../constants';
import { Location } from '../schemas';
import LocationContext from './LocationContext';

const LocationProvider = ({ children }: { readonly children: ReactNode }) => {
  const [location, setLocation] = useState<Location>({
    city: '',
    lng: '',
    lat: '',
  });

  const {
    data,
    isLoading: isLocating,
    isSuccess: hasLocated,
    isError: errorLocating,
  } = useGetLocationByIp();

  useEffect(() => {
    if (hasLocated) {
      const [lat, lng] = data.loc.split(',');
      setLocation({ city: data.city, lat, lng });
    }
  }, [data, hasLocated]);

  useEffect(() => {
    if (errorLocating) {
      setLocation(DEFAULT_LONDON_LOCATION);
    }
  }, [errorLocating]);

  const providerData = {
    isLocating,
    errorLocating,
    hasLocated,
    location,
  };

  return (
    <LocationContext.Provider value={providerData}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
