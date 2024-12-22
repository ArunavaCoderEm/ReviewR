import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
  const FAQ = () => {
    return (
      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-center text-foreground mb-6">
          Frequently Asked Questions
        </h1>
  
        <Accordion type="single" className="mt-7 p-1" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Is the app free to use?</AccordionTrigger>
            <AccordionContent>
              Yes, the app is completely free to use. You can access all the features without any cost.
            </AccordionContent>
          </AccordionItem>
  
          <AccordionItem value="item-2">
            <AccordionTrigger>Can I add multiple websites?</AccordionTrigger>
            <AccordionContent>
              Yes, you can add multiple websites to track reviews and other relevant information.
            </AccordionContent>
          </AccordionItem>
  
          <AccordionItem value="item-3">
            <AccordionTrigger>How do I share the review link?</AccordionTrigger>
            <AccordionContent>
              After copying the link, you can easily share it via email or social media.
            </AccordionContent>
          </AccordionItem>
  
          <AccordionItem value="item-4">
            <AccordionTrigger>What kind of reviews can I filter?</AccordionTrigger>
            <AccordionContent>
              You can filter reviews based on various criteria such as rating, how many reviews to get.
            </AccordionContent>
          </AccordionItem>
  
          <AccordionItem value="item-5">
            <AccordionTrigger>Can I embed a review widget on my website?</AccordionTrigger>
            <AccordionContent>
              Yes, you can create a customized embedded script to display reviews directly on your website.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  };
  
  export default FAQ;
  