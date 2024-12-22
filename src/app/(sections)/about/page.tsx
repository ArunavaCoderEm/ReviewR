"use client"

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardFooter, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import 'prismjs';
import 'prismjs/themes/prism-tomorrow.min.css';

export default function About(): React.ReactNode {

  const router = useRouter();
  

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">

        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-foreground to-muted-foreground mb-6">Welcome to ReviewR</h1>
        <p className="text-lg text-foreground mb-10">
          ReviewR is your one-stop platform for generating authentic, real reviews for your website with just a few clicks. Enhance your credibility and improve user trust in no time.
        </p>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <CardHeader>
              <h2 className="text-2xl font-semibold text-foreground">Why Choose Us ?</h2>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Generate real, authentic reviews to help increase the credibility and visibility of your website. Trusted by businesses worldwide!
              </p>
            </CardContent>
           
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <CardHeader>
              <h2 className="text-2xl font-semibold text-foreground">Fast & Easy</h2>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our platform simplifies the review generation process, saving you time and effort. It's designed to be quick and intuitive.
              </p>
            </CardContent>
       
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <CardHeader>
              <h2 className="text-2xl font-semibold text-foreground">Trusted by Many</h2>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Join thousands of satisfied users who trust ReviewR to generate reliable reviews, improving their online reputation.
              </p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => router.push("/sign-in")} variant="outline" className="w-full">
                Join Now
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}