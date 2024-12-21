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

export default function ReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [websiteUrl, setWebsiteUrl] = useState<string | null>(null);
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
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchWebsite = async () => {
      try {
        const response = await axios.get(`/api/website/${id}`);
        setWebsiteUrl(response.data.yourWebsite.url);
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
      const response = await axios.post(`/api/review`, {
        ...formData,
        websiteId: id,
      });
      setSubmissionMessage("Review submitted successfully!");
      setFormData({ content: "", rating: 0, reviewer: "", profession: "" });
    } catch (err) {
      console.error(err);
      setSubmissionMessage("Failed to submit the review. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Leave a Review</h1>
      <p className="mb-4">
        You are reviewing: <strong>{website.name}</strong>
      </p>
      <p className="mb-4">
        Review conducted by: <strong>{website.creatorFullName}</strong>
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label
            htmlFor="reviewer"
            className="block text-sm font-medium text-gray-700"
          >
            Your Name
          </Label>
          <Input
            type="text"
            id="reviewer"
            name="reviewer"
            value={formData.reviewer}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full"
          />
        </div>
        <div>
          <Label
            htmlFor="profession"
            className="block text-sm font-medium text-gray-700"
          >
            Your Profession
          </Label>
          <Input
            type="text"
            id="profession"
            name="profession"
            value={formData.profession}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full"
          />
        </div>
        <div>
          <Label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Review Content
          </Label>
          <Textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full"
          />
        </div>
        <div>
          <Label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-700"
          >
            Rating (1-5)
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
                    <Star className="text-yellow-500 fill-current mx-1" size={24} />
                  ) : (
                    <Star className="text-gray-300 mx-1" size={24} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <Button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Submit Review
        </Button>
      </form>
    </div>
  );
}
