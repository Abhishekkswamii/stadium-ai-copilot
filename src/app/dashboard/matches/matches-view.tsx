"use client";

import { useActiveMatch } from "@/hooks/use-firestore";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { format } from "date-fns";

export function MatchesView() {
  const { data: match, isLoading, error } = useActiveMatch("northgate-arena");

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-32 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Error Loading Match</CardTitle>
          <CardDescription>{error.message}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!match) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Active Match</CardTitle>
          <CardDescription>
            There are no scheduled matches at this time.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Match Header */}
      <Card className="border-2 border-primary">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-3xl">
                {match.homeTeam} {match.awayTeam ? `vs ${match.awayTeam}` : ""}
              </CardTitle>
              <CardDescription className="text-base">{match.sport}</CardDescription>
            </div>
            <Badge
              variant={match.status === "live" ? "destructive" : "secondary"}
              className="h-8 px-4 text-sm capitalize"
            >
              {match.status === "live" && (
                <span className="mr-2 flex h-2 w-2">
                  <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                </span>
              )}
              {match.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Date</p>
              <p className="text-sm text-muted-foreground">
                {match.scheduledAt instanceof Date
                  ? format(match.scheduledAt, "PPP")
                  : "TBD"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Time</p>
              <p className="text-sm text-muted-foreground">
                {match.scheduledAt instanceof Date
                  ? format(match.scheduledAt, "p")
                  : "TBD"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Expected</p>
              <p className="text-sm text-muted-foreground">
                {match.expectedAttendance?.toLocaleString() ?? "N/A"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Stadium</p>
              <p className="text-sm text-muted-foreground">Northgate Arena</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Match Statistics */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Expected Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {match.expectedAttendance?.toLocaleString() ?? "N/A"}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Capacity: 68,274
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Match Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold capitalize">{match.status}</div>
            <p className="mt-2 text-xs text-muted-foreground">
              {match.status === "live"
                ? "Match in progress"
                : match.status === "scheduled"
                  ? "Upcoming"
                  : "Completed"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Sport</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold capitalize">{match.sport}</div>
            <p className="mt-2 text-xs text-muted-foreground">
              {match.title}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Match Details */}
      <Card>
        <CardHeader>
          <CardTitle>Match Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium">Home Team</p>
              <p className="text-2xl font-bold">{match.homeTeam}</p>
            </div>
            {match.awayTeam && (
              <div>
                <p className="text-sm font-medium">Away Team</p>
                <p className="text-2xl font-bold">{match.awayTeam}</p>
              </div>
            )}
          </div>
          <div>
            <p className="text-sm font-medium">Match Title</p>
            <p className="text-lg">{match.title}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Match ID</p>
            <p className="font-mono text-sm text-muted-foreground">{match.id}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
