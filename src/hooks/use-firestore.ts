import { useEffect, useState } from "react";
import { collection, doc, onSnapshot, query, orderBy, limit, where } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { createConverter } from "@/lib/firebase/converters";
import { COLLECTIONS } from "@/constants";
import type { Stadium, Match, Incident, Alert } from "@/types";

interface UseFirestoreReturn<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

// ─── Converters ───────────────────────────────────────────────────────────────

const stadiumConverter = createConverter<Stadium>();
const matchConverter = createConverter<Match>();
const incidentConverter = createConverter<Incident>();
const alertConverter = createConverter<Alert>();

// ─── Hooks ────────────────────────────────────────────────────────────────────

/**
 * Subscribes to a single stadium document in real-time.
 */
export function useStadium(stadiumId: string): UseFirestoreReturn<Stadium> {
  const [data, setData] = useState<Stadium | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!stadiumId) {
      setLoading(false);
      return;
    }

    const ref = doc(db, COLLECTIONS.STADIUMS, stadiumId).withConverter(stadiumConverter);

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.data());
        } else {
          setData(null);
        }
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching stadium:", err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [stadiumId]);

  return { data, isLoading: loading, error };
}

/**
 * Subscribes to the active match for a stadium in real-time.
 * For simplicity, we just grab the most recent match for the stadium.
 */
export function useActiveMatch(stadiumId: string): UseFirestoreReturn<Match> {
  const [data, setData] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!stadiumId) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, COLLECTIONS.MATCHES),
      where("stadiumId", "==", stadiumId),
      orderBy("scheduledAt", "desc"),
      limit(1)
    ).withConverter(matchConverter);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          setData(snapshot.docs[0]?.data() ?? null);
        } else {
          setData(null);
        }
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching match:", err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [stadiumId]);

  return { data, isLoading: loading, error };
}

/**
 * Subscribes to incidents for a given stadium in real-time.
 */
export function useIncidents(stadiumId: string): UseFirestoreReturn<Incident[]> {
  const [data, setData] = useState<Incident[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!stadiumId) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, COLLECTIONS.INCIDENTS),
      where("stadiumId", "==", stadiumId),
      orderBy("createdAt", "desc"),
      limit(50)
    ).withConverter(incidentConverter);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const incidents = snapshot.docs.map((doc) => doc.data());
        setData(incidents);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching incidents:", err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [stadiumId]);

  return { data, isLoading: loading, error };
}

/**
 * Subscribes to alerts for a given stadium in real-time.
 */
export function useStadiumAlerts(stadiumId: string): UseFirestoreReturn<Alert[]> {
  const [data, setData] = useState<Alert[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!stadiumId) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, COLLECTIONS.ALERTS),
      where("stadiumId", "==", stadiumId),
      orderBy("createdAt", "desc"),
      limit(50)
    ).withConverter(alertConverter);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const alerts = snapshot.docs.map((doc) => doc.data());
        setData(alerts);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching alerts:", err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [stadiumId]);

  return { data, isLoading: loading, error };
}

/**
 * @deprecated Use useStadiumAlerts instead
 */
export function useAlerts(stadiumId: string): UseFirestoreReturn<Alert[]> {
  return useStadiumAlerts(stadiumId);
}
