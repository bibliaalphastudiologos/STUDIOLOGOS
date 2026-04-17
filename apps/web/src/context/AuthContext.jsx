import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

const AuthContext = createContext(null);

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || '';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);
  const [userStatus, setUserStatus] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setUserStatus(null);
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      const adminEmails = ADMIN_EMAIL.split(',').map(e => e.trim().toLowerCase());
      const userIsAdmin = adminEmails.includes(firebaseUser.email?.toLowerCase());

      if (userIsAdmin) {
        setUser(firebaseUser);
        setIsAdmin(true);
        setUserStatus('approved');
        setLoading(false);
        return;
      }

      const userRef = doc(db, 'users', firebaseUser.uid);
      const snap = await getDoc(userRef);

      if (!snap.exists()) {
        await setDoc(userRef, {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || '',
          photoURL: firebaseUser.photoURL || '',
          status: 'pending',
          createdAt: serverTimestamp(),
        });
        setUserStatus('pending');
      } else {
        setUserStatus(snap.data().status);
      }

      setUser(firebaseUser);
      setIsAdmin(false);
      setLoading(false);
    });
    return unsub;
  }, []);

  return (
    <AuthContext.Provider value={{ user, userStatus, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
