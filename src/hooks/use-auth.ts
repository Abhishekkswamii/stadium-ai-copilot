"use client";

import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  type User as FirebaseUser,
} from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import type { AuthSession } from "@/types";

interface UseAuthReturn {
  user: FirebaseUser | null;
  session: AuthSession | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

/**
 * Hook for Firebase Auth state.
 * Reads the auth state from the AuthContext (provided by AuthProvider).
 * Use this in client components that need auth state.
 */
export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        // Get custom claims from the ID token for role-based access
        const idTokenResult = await firebaseUser.getIdTokenResult();
        setSession({
          uid: firebaseUser.uid,
          email: firebaseUser.email ?? "",
          role: (idTokenResult.claims["role"] as AuthSession["role"]) ?? "viewer",
          stadiumId: (idTokenResult.claims["stadiumId"] as string) ?? null,
        });
      } else {
        setSession(null);
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string): Promise<void> => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signOut = async (): Promise<void> => {
    await firebaseSignOut(auth);
    // Clear server-side session cookie
    await fetch("/api/auth/session", { method: "DELETE" });
  };

  return {
    user,
    session,
    isLoading,
    isAuthenticated: !!user,
    signIn,
    signOut,
  };
}
