"use client";

import { websitesProps, websitesreviewProps } from "@/Types/types";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { use } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";

const getStars = (rating: number) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<Star key={i} className="text-yellow-400 fill-current" />);
    } else {
      stars.push(<Star key={i} className="text-yellow-400" />);
    }
  }

  return stars;
};

export default function ViewReview({
  params,
}: {
  params: Promise<{ websiteid: string }>;
}): React.ReactNode {
  const { websiteid } = use(params);
  const [loading, setLoading] = useState<boolean>(true);
  const [website, setWebsite] = useState<websitesProps>({
    id: "",
    url: "",
    reviewLink: "",
    createdById: "",
    name: "",
    creatorFullName: "",
  });

  const [reviews, setReview] = useState<websitesreviewProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWebsiteData = async () => {
      try {
        const response = await axios.get(`/api/getwebid/${websiteid}`);
        setWebsite({
          id: response.data.yourWebsite.id,
          url: response.data.yourWebsite.url,
          reviewLink: response.data.yourWebsite.reviewLink,
          createdById: response.data.yourWebsite.createdById,
          name: response.data.yourWebsite.name,
          creatorFullName: response.data.yourWebsite.creatorFullName,
        });

        const responserev = await axios.get(`/api/getreview/${websiteid}`);
        setReview(responserev?.data?.webReviews || []);
      } catch (err: any) {
        setError("Website not found or invalid link");
      } finally {
        setLoading(false);
      }
    };
    fetchWebsiteData();
  }, [websiteid]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="relative h-80 gap-5 flex flex-col items-center justify-center">
          <Skeleton className="w-full h-32" />
          <Skeleton className="w-full h-32" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 font-semibold mt-10">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mt-6 mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Reviews for {website.name}</h1>
      {reviews.length > 0 ? (
        <div className="grid mt-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((item, index) => (
            <Card
              key={item.id || index}
              className="flex flex-col border p-4 rounded-lg shadow-md hover:shadow-xl transition-all h-72"
            >
              <CardHeader>
                <CardTitle className="text-lg text-foreground font-semibold">{item.reviewer}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">{item.profession}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-secondary-foreground overflow-y-auto h-36">
                <p>{item.content}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="flex gap-1 items-center">
                  {getStars(item.rating)}
                </div>
                <p className="text-sm text-gray-500">{item.rating} / 5</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <p>No reviews available for this website.</p>
      )}
    </div>
  );
}
