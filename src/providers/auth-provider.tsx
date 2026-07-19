"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import type { AuthSession } from "@/types";

// ─── Context Shape ─────────────────────────────────────────────────────────────

interface AuthContextValue {
  user: FirebaseUser | null;
  session: AuthSession | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// ─── Context ───────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ──────────────────────────────────────────────────────────────────

interface AuthProviderProps {
  children: ReactNode;
  /** Optional initial session from Server Components (avoids flash of unauthenticated state) */
  initialSession?: AuthSession | null | undefined;
}

export function AuthProvider({ children, initialSession = null }: AuthProviderProps) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [session, setSession] = useState<AuthSession | null>(initialSession);
  const [isLoading, setIsLoading] = useState(!initialSession);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
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

  return (
    <AuthContext.Provider value={{ user, session, isLoading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ──────────────────────────────────────────────────────────────────────

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext must be used within an <AuthProvider>");
  }
  return ctx;
}
