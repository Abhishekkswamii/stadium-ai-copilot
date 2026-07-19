"use client";

import { useStadium } from "@/hooks/use-firestore";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Building2, Users, MapPin, Mail, Phone } from "lucide-react";

export function StadiumsView() {
  const { data: stadium, isLoading, error } = useStadium("northgate-arena");

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
              <Skeleton className="h-24 w-full" />
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
          <CardTitle className="text-destructive">Error Loading Stadium</CardTitle>
          <CardDescription>{error.message}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!stadium) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Stadium Data</CardTitle>
          <CardDescription>Stadium information is not available.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const totalSections = stadium.sections?.length ?? 0;

  return (
    <div className="space-y-6">
      {/* Stadium Overview */}
      <Card className="border-2 border-primary">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-3xl">{stadium.name}</CardTitle>
              <CardDescription className="text-base">
                {stadium.location.city}, {stadium.location.country}
              </CardDescription>
            </div>
            <Badge variant="secondary" className="text-sm">
              {stadium.id}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-center gap-3">
            <Building2 className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Capacity</p>
              <p className="text-2xl font-bold">{stadium.capacity.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Sections</p>
              <p className="text-2xl font-bold">{totalSections}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Amenities</p>
              <p className="text-2xl font-bold">{stadium.amenities?.length ?? 0}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location Details */}
      <Card>
        <CardHeader>
          <CardTitle>Location Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Address</p>
            <p className="text-lg">{stadium.location.address}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-muted-foreground">City</p>
              <p className="text-lg">{stadium.location.city}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Country</p>
              <p className="text-lg">{stadium.location.country}</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Latitude</p>
              <p className="font-mono text-sm">{stadium.location.coordinates.latitude}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Longitude</p>
              <p className="font-mono text-sm">{stadium.location.coordinates.longitude}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Main Phone</p>
              <p className="text-lg">{stadium.contactInfo.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-destructive" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Emergency Phone</p>
              <p className="text-lg font-semibold text-destructive">
                {stadium.contactInfo.emergencyPhone}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="text-lg">{stadium.contactInfo.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sections Grid */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Stadium Sections</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {stadium.sections?.map((section) => (
            <Card key={section.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{section.name}</CardTitle>
                  <Badge variant="outline" className="capitalize">
                    {section.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Capacity</span>
                  <span className="font-medium">{section.capacity.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Amenities */}
      {stadium.amenities && stadium.amenities.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Amenities</CardTitle>
            <CardDescription>Available facilities and services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {stadium.amenities.map((amenity, index) => (
                <Badge key={index} variant="secondary">
                  {amenity}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
