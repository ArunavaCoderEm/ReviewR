// ContactUs.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const ContactUs = (): React.ReactNode => {
  return (
    <div className="md:max-w-4xl mx-auto p-8 rounded-lg shadow-lg bg-muted">
      <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-foreground to-muted-foreground mb-6">
        Contact Us
      </h1>

      <p className="text-muted-foreground text-lg mb-4">
        We would love to hear from you! Please fill out the form below with any
        questions or feedback.
      </p>

      <form>
        <div className="mb-4">
          <label className="block text-muted-foreground" htmlFor="name">
            Your Name
          </label>
          <Input
            type="text"
            id="name"
            name="name"
            className="w-full p-3 mt-2 border border-muted-foreground bg-muted rounded-lg text-foreground"
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-muted-foreground" htmlFor="email">
            Your Email
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            className="w-full p-3 mt-2 border border-muted-foreground bg-muted rounded-lg text-foreground"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-6">
          <label className="block text-muted-foreground" htmlFor="message">
            Your Message
          </label>
          <Textarea
            id="message"
            name="message"
            rows={4}
            className="w-full p-3 mt-2 border border-muted-foreground bg-muted rounded-lg text-foreground"
            placeholder="Write your message here"
          />
        </div>

        <Button
          variant="default"
          type="submit"
          className="w-full py-3 hover:opacity-95 rounded-lg transition"
        >
          Send Message
        </Button>
      </form>
    </div>
  );
};

export default ContactUs;
