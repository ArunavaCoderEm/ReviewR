"use client";

import { websitesProps } from "@/Types/types";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { use } from "react";

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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWebsite = async () => {
      try {
        const response = await axios.get(`/api/website/${websiteid}`);
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
  }, [websiteid]);

  useEffect(() => {
    const fetchWebsite = async () => {
      try {
        const response = await axios.get(`/api/website/${websiteid}`);
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
  }, [websiteid]);

  return (
    <>

    </>
  );
}
