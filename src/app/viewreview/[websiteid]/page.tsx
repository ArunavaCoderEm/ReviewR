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
import { Menu, Star } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Command, CommandDialog } from "@/components/ui/command";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

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
  const [open, setOpen] = useState<boolean>(false);
  const [sentimentFilter, setSentimentFilter] = useState<string>("all");
  const [embedSentiment, setEmbedSentiment] = useState<string>("all");
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

  const [totalRevs, setTotalRevs] = useState<number>(100);
  const [ratingAbove, setRatingAbove] = useState<number>(0);

  const fetchReviewsData = async () => {
    setLoading(true);
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

      const responserev = await axios.get(`/api/getreview/${websiteid}`, {
        params: {
          totalRevs: totalRevs,
          ratingAbove: ratingAbove,
          sentiment: sentimentFilter,
        },
      });
      setReview(responserev?.data?.webReviews || []);
    } catch (err: any) {
      setError("Website not found or invalid link");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviewsData();
  }, [websiteid, totalRevs, ratingAbove, sentimentFilter]);

  if (error) {
    return (
      <div className="text-center text-red-500 font-semibold mt-10">
        <p>{error}</p>
      </div>
    );
  }

  const [tot, setTot] = useState<string>("20");
  const [minrat, setMinrat] = useState<string>("0");
  const [theme, setTheme] = useState<string>("light");

  const [emblink, setEmblink] =
    useState<string>(`<script src="https://review-r.godutta.tech/embed.js" 
    data-website-id=${websiteid} 
    data-theme=${theme}
    data-min-rating=${minrat} 
    data-total-rev=${tot}
    data-sentiment=${embedSentiment}
    async>
  </script>`);

  useEffect(() => {
    setEmblink(`
      <script src="https://review-r.godutta.tech/embed.js" 
        data-website-id="${websiteid}" 
        data-theme="${theme}" 
        data-min-rating="${minrat}" 
        data-total-rev="${tot}"
        data-sentiment="${embedSentiment}"
        async>
      </script>
    `);
  }, [theme, minrat, tot, embedSentiment]);

  const copyLink = (link: string): void => {
    if (!navigator.clipboard) {
      toast.error("Clipboard API not supported in this browser.");
      return;
    }

    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast.success(`Script copied to clipboard`);
      })
      .catch((error) => {
        toast.error("Failed to copy link");
        alert("Failed to copy the script. Please try again.");
      });
  };

  return (
    <div className="md:container mt-6 md:mx-auto p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">
          User Reviews for {website.name}
        </h1>
        <Button onClick={() => setOpen(true)} variant={"default"}>
          <Menu /> Widget
        </Button>
      </div>
      <Command>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <DialogTitle>Create an embedded link</DialogTitle>
          <DialogContent>
            <DialogTitle>Create an embedded link</DialogTitle>
            <DialogDescription>
              Here you can customize and create a direct access embedded link
            </DialogDescription>

            <div className="mb-4">
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger>
                  <span>Theme: {theme}</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-4">
              <Select value={minrat} onValueChange={setMinrat}>
                <SelectTrigger>
                  <span>Min Rating: {minrat}</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">All</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-4">
              <Select value={tot} onValueChange={setTot}>
                <SelectTrigger>
                  <span>Total: {tot}</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                  <SelectItem value="40">40</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-4">
              <Select value={embedSentiment} onValueChange={setEmbedSentiment}>
                <SelectTrigger>
                  <span>Sentiment: {embedSentiment}</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="positive">Positive</SelectItem>
                  <SelectItem value="negative">Negative</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={() => copyLink(emblink)}>Copy HTML Script</Button>
          </DialogContent>
        </CommandDialog>
      </Command>

      <div className="flex md:flex-row flex-col gap-4 mb-6">
        <div className="p-1">
          <label
            htmlFor="totalRevs"
            className="block text-sm mb-3 font-medium text-muted-foreground"
          >
            Number of Reviews
          </label>
          <Select
            value={totalRevs.toString()}
            onValueChange={(value) => {
              setTotalRevs(Number(value));
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Reviews" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="p-1">
          <label
            htmlFor="ratingAbove"
            className="block text-sm mb-3 font-medium text-muted-foreground"
          >
            Minimum Rating
          </label>
          <Select
            value={ratingAbove.toString()}
            onValueChange={(value) => {
              setRatingAbove(Number(value));
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="p-1">
          <label
            htmlFor="ratingAbove"
            className="block text-sm mb-3 font-medium text-muted-foreground"
          >
            Sentiment
          </label>
          <Select
            value={sentimentFilter}
            onValueChange={(value) => setSentimentFilter(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select sentiment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="positive">Positive</SelectItem>
              <SelectItem value="negative">Negative</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading && (
        <div className="flex items-cecnter flex-col gap-5 relative">
          <Skeleton className="w-full h-32" />
          <Skeleton className="w-full h-32" />
        </div>
      )}

      {!loading && !error && (
        <>
          {reviews.length > 0 ? (
            <div className="grid mt-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {reviews.map((item, index) => (
                <Card
                  key={item.id || index}
                  className="flex flex-col border p-4 rounded-lg shadow-md hover:shadow-xl transition-all h-72"
                >
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground font-semibold">
                      {item.reviewer}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      {item.profession}
                    </CardDescription>
                    <CardDescription className="text-sm text-muted-foreground">
                      {item.sentiment}
                    </CardDescription>
                    <CardDescription className="text-sm text-muted-foreground">
                      {new Date(item.createdAt || "").toLocaleString()}
                    </CardDescription>
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
        </>
      )}
    </div>
  );
}
