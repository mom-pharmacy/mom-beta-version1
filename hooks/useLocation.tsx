import { useEffect, useState } from "react";
import * as Location from "expo-location";

type UseLocationReturnType = {
  latitude: string;
  longitude: string;
  locationName: string;
  errorMsg: string;
};

const useLocation = (): UseLocationReturnType => {
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");
  const [locationName, setLocationName] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const getUserLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was not granted");
        return;
      }

      let location = await Location.getCurrentPositionAsync();

      if (location?.coords) {
        const { latitude, longitude } = location.coords;
        setLatitude(latitude.toString());
        setLongitude(longitude.toString());

        const response = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        if (response?.length > 0) {
          const loc = response[0];
          const name = `${loc.name || ""}, ${loc.city || loc.region || ""}`;
          setLocationName(name);
        }
      }
    } catch (error) {
      setErrorMsg("Something went wrong while fetching location");
      console.error("Location Error:", error);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return { latitude, longitude, locationName, errorMsg };
};

export default useLocation;
