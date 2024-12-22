"use client";

import React, { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import "prismjs";
import "prismjs/themes/prism-tomorrow.min.css";

const FeaturesPage = () => {
  useEffect(() => {
    import("prismjs").then((Prism) => {
      Prism.highlightAll();
    });
  }, []);

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-t from-foreground to-muted-foreground mb-6">
          ReviewR Features
        </h1>

        <div className="space-y-8">
          <Card className="bg-muted shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Features
            </h2>
            <ul className="list-disc pl-6 text-muted-foreground">
              <li>
                <strong>Easy Embed:</strong> Seamlessly embed the review widget
                into your website with just a few lines of code.
              </li>
              <li>
                <strong>Customizable:</strong> Customize themes, ratings, and
                review counts directly via data attributes.
              </li>
              <li>
                <strong>Fast Load:</strong> Lightweight script that loads
                asynchronously to ensure fast page load times.
              </li>
              <li>
                <strong>Responsive:</strong> Automatically adjusts the display
                based on the screen size for optimal user experience.
              </li>
              <li>
                <strong>Real-time Reviews:</strong> Provides authentic,
                real-time reviews directly from users.
              </li>
            </ul>
          </Card>

          <Card className="bg-muted shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Code Snippet
            </h2>
            <div className="overflow-x-auto">
              <pre className="bg-foreground text-white p-4 rounded-lg whitespace-nowrap">
                <code className="language-html">
                  {"<!DOCTYPE html>\n" +
                    '<html lang="en">\n' +
                    "<head>\n" +
                    '  <meta charset="UTF-8">\n' +
                    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
                    "  <title>Review Widget Test</title>\n" +
                    "</head>\n" +
                    "<body>\n" +
                    "  <h1>Review Widget Test</h1>\n" +
                    "\n" +
                    '  <script src="http://localhost:3000/embed.js"\n' +
                    '  data-website-id="WILL BE PROVIDED BY US"\n' +
                    '  data-theme="WILL BE PROVIDED BY US"\n' +
                    '  data-min-rating="WILL BE PROVIDED BY US"\n' +
                    '  data-total-rev="WILL BE PROVIDED BY US"\n' +
                    "  async>\n" +
                    "</script>\n" +
                    "\n" +
                    "</body>\n" +
                    "</html>"}
                </code>
              </pre>
            </div>
          </Card>
        </div>

        <Alert variant="default" className="mt-8">
          <span className="font-bold">Try it out:</span> Embed the widget in
          your website to display real user reviews!
        </Alert>
      </div>
    </div>
  );
};

export default FeaturesPage;
