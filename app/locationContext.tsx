import React, { createContext, useContext, useState, useEffect } from "react";
import * as Location from "expo-location";

type LocationType = {
  latitude: number;
  longitude: number;
};

type LocationContextType = {
  location: LocationType | null;
  address: string;
  setLocation: (location: LocationType) => void;
  updateAddress: (lat: number, lon: number) => Promise<void>;
};

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: React.ReactNode }) => {
  const [location, setLocation] = useState<LocationType | null>(null);
  const [address, setAddress] = useState("Fetching location...");

  const updateAddress = async (latitude: number, longitude: number) => {
    try {
      const res = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (res.length > 0) {
        const loc = res[0];
        const addr = `${loc.name || ""}, ${loc.street || ""}, ${loc.city || ""}, ${loc.region || ""}, ${loc.country || ""},${loc.postalCode || ""}`;
        setAddress(addr);
      }
    } catch (err) {
      console.error("Error updating address", err);
      setAddress("Error fetching address");
    }
  };

  const fetchInitialLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") return;

    const loc = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    };
    setLocation(coords);
    await updateAddress(coords.latitude, coords.longitude);
  };

  useEffect(() => {
    fetchInitialLocation();
  }, []);

  return (
    <LocationContext.Provider value={{ location, address, setLocation, updateAddress }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (!context) throw new Error("useLocationContext must be used within LocationProvider");
  return context;
};
