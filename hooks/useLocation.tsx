import { useEffect, useState } from "react";
import * as Location from "expo-location";

export type LocationType = {
  latitude: number;
  longitude: number;
};

type UseLocationReturnType = {
  location: LocationType | null;
  address: string;
};

export const useLocation = (): UseLocationReturnType => {
  const [location, setLocation] = useState<LocationType | null>(null);
  const [address, setAddress] = useState<string>("");

  const getUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.error("Permission denied!");
        return;
      }

      const locationData = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = locationData.coords;

      setLocation({ latitude, longitude });

      const geoCode = await Location.reverseGeocodeAsync({ latitude, longitude });

      if (geoCode.length > 0) {
        const place = geoCode[0];
        const fullAddress = `${place.name ?? place.street ?? place.city ?? place.region ?? place.country ?? "Unknown"}`;
        setAddress(fullAddress);
      }
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return { location, address };
};
