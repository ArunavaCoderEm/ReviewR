"use client";

import React, { useState, useEffect } from "react";
import { use } from "react"; 
import axios from "axios";

export default function ReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // Unwrap params promise
  const [websiteUrl, setWebsiteUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    content: "",
    rating: 0,
    reviewer: "",
    profession: "",
  });

  const [submissionMessage, setSubmissionMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchWebsite = async () => {
      try {
        const response = await axios.get(`/api/website/${id}`);
        setWebsiteUrl(response.data.url);
        setLoading(false);
      } catch (err: any) {
        setError("Website not found or invalid link");
        setLoading(false);
      }
    };
    fetchWebsite();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        websiteId: id, // Associate review with the current website
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
        You are reviewing: <strong>{websiteUrl}</strong>
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="reviewer" className="block text-sm font-medium text-gray-700">
            Your Name
          </label>
          <input
            type="text"
            id="reviewer"
            name="reviewer"
            value={formData.reviewer}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="profession" className="block text-sm font-medium text-gray-700">
            Your Profession
          </label>
          <input
            type="text"
            id="profession"
            name="profession"
            value={formData.profession}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Review Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          ></textarea>
        </div>
        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
            Rating (1-5)
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
            min={1}
            max={5}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Submit Review
        </button>
      </form>
      {submissionMessage && (
        <p className="mt-4 text-green-500">{submissionMessage}</p>
      )}
    </div>
  );
}
