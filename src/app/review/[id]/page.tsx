"use client";

import React, { useState, useEffect } from "react";
import { use } from "react";
import axios from "axios";
import { websitesProps } from "@/Types/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function ReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}):React.ReactNode {
  const { id } = use(params);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [website, setWebsite] = useState<websitesProps>({
    id: "",
    url: "",
    reviewLink: "",
    createdById: "",
    name: "",
    creatorFullName: "",
  });
  const [formData, setFormData] = useState({
    content: "",
    rating: 0,
    reviewer: "",
    profession: "",
  });


  useEffect(() => {
    const fetchWebsite = async () => {
      try {
        const response = await axios.get(`/api/website/${id}`);
        setWebsite({
          id: response.data.yourWebsite.id,
          url: response.data.yourWebsite.url,
          reviewLink: response.data.yourWebsite.reviewLink,
          createdById: response.data.yourWebsite.createdById,
          name: response.data.yourWebsite.name,
          creatorFullName: response.data.yourWebsite.creatorFullName,
        });
        setLoading(false);
      } catch (err: any) {
        setError("Website not found or invalid link");
        setLoading(false);
      }
    };
    fetchWebsite();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        if (formData.rating === 0) {
            toast.error("Minimum rating is 1");
            return;
        }
      const response = await axios.post(`/api/review`, {
        ...formData,
        websiteId: website.id,
      });
      setFormData({ content: "", rating: 0, reviewer: "", profession: "" });
      toast.success("Review submitted successfully!");
    } catch (err) {
        console.error(err);
        toast.error("Failed to submit the review. Please try again.");
    }
  };

  if (loading)
    return (
      <div className="relative h-80 gap-5 flex flex-col items-center justify-center">
        <Skeleton className="w-full h-32" />
        <Skeleton className="w-full h-32" />
      </div>
    );

  if (error)
    return (
      <div className="relative h-80 flex flex-col items-center justify-center">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Leave a Review</h1>
      <p className="mb-4 text-foreground">
        You are reviewing: <strong>{website.name}</strong>
      </p>
      <p className="mb-4 text-foreground">
        Review conducted by: <strong>{website.creatorFullName}</strong>
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label
            htmlFor="reviewer"
            className="block text-sm font-medium text-muted-foreground"
          >
            Your Name 
            <span className="text-red-600 ml-1 font-semibold">*</span>
          </Label>
          <Input
            type="text"
            id="reviewer"
            name="reviewer"
            value={formData.reviewer}
            onChange={handleInputChange}
            required
            placeholder="God Ard"
            className="mt-1 block w-full placeholder:text-gray-400"
          />
        </div>
        <div>
          <Label
            htmlFor="profession"
            className="block text-sm font-medium text-muted-foreground"
          >
            Your Profession 
            <span className="text-red-600 ml-1 font-semibold">*</span>
          </Label>
          <Input
            type="text"
            id="profession"
            name="profession"
            placeholder="Teacher"
            value={formData.profession}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full placeholder:text-gray-400"
          />
        </div>
        <div>
          <Label
            htmlFor="content"
            className="block text-sm font-medium text-muted-foreground"
          >
            Review Content 
            <span className="text-red-600 ml-1 font-semibold">*</span>
          </Label>
          <Textarea
            id="content"
            name="content"
            placeholder="I found this website very helpful"
            value={formData.content}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full placeholder:text-gray-400"
          />
        </div>
        <div>
          <Label
            htmlFor="rating"
            className="block text-sm mb-2 font-medium text-muted-foreground"
          >
            Rating (1-5) 
            <span className="text-red-600 ml-1 font-semibold">*</span>
          </Label>
          <div className="flex mt-1">
            {[1, 2, 3, 4, 5].map((value) => {
              return (
                <div
                  key={value}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, rating: value }))
                  }
                  className="cursor-pointer"
                >
                  {formData.rating >= value ? (
                    <Star
                      className="text-yellow-500 fill-current mx-1"
                      size={24}
                    />
                  ) : (
                    <Star className="dark:text-gray-300 text-gray-500 mx-1" size={24} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <Button
          type="submit"
          variant={"destructive"}
          className="px-4 py-2 mt-5 bg-gradient-to-b from-teal-500 to-teal-600"
        >
          Submit Review
        </Button>
      </form>
    </div>
  );
}
