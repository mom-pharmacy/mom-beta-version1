import { useContext, useEffect, useState } from 'react';
import { router, usePathname } from 'expo-router';
import { AuthContext } from '../context/authContext';
import LoadingScreen from './LoadingScreen';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, userDetails, loading } = useContext(AuthContext);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // set mounted true after first render
  }, []);

  useEffect(() => {
    if (mounted && !loading) { 
      if (userDetails && userDetails.isRegistered === false) {
        if (pathname !== '/Signup') {
          router.replace('/Signup');
        }
      }
    }
  }, [mounted, loading, isLoggedIn, userDetails, pathname]);

  if (!mounted || loading) {
    return <LoadingScreen />; // show loading while mounting or fetching
  }

  if (!isLoggedIn || (userDetails && userDetails.isRegistered === false)) {
    return null; // prevent showing children before redirect happens
  }

  return children;
};

export default ProtectedRoute;
