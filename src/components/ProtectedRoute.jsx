import { Navigate, useLocation } from 'react-router-dom';
import { auth } from '../firebase.config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase.config';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const [hasUserFormData, setHasUserFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserFormData = async () => {
      if (auth.currentUser) {
        try {
          const q = query(
            collection(db, "userFormData")
          );
          const querySnapshot = await getDocs(q);
          setHasUserFormData(!querySnapshot.empty);
        } catch (error) {
          console.error("Error checking user form data:", error);
          setHasUserFormData(false);
        }
      }
      setLoading(false);
    };

    checkUserFormData();
  }, [auth.currentUser]);

  if (!auth.currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return <div>Loading...</div>; // Or your loading component
  }

  // Sequence logic
  if (location.pathname === '/home') {
    return children;
  }

  if (location.pathname.startsWith('/landing-page')) {
    if (!hasUserFormData) {
      return <Navigate to="/userform" replace />;
    }
    return children;
  }

  if (location.pathname === '/userform') {
    return children;
  }

  return children;
};

export default ProtectedRoute;
