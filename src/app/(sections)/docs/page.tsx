import React from "react";

const DocsPage = () => {
  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-center text-foreground mb-6">
        ReviewR Documentation
      </h1>

      <p className="text-muted-foreground text-lg mb-6">
        This guide walks you through the key actions within the app. Follow these steps to get started and make the most of its features.
      </p>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold text-foreground mb-4">Step 1: Navigate to Dashboard</h2>
        <p className="text-muted-foreground text-lg mb-4">
          After logging in, you will land on the Dashboard page. This is where you can view an overview of your activity, stats, and more.
        </p>
        <div className="mb-6">
          <img
            src="/Images/5.png"
            alt="Dashboard view"
            className="w-full rounded-lg shadow-lg"
          />
          <p className="text-muted-foreground text-sm mt-2">Figure 1: Dashboard</p>
        </div>
        <p className="text-muted-foreground text-lg mb-4">
          On the dashboard, you'll see various options, such as adding a new website or navigating to other sections.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold text-foreground mb-4">
          Step 2: Click "Get Reviews for New Website"
        </h2>
        <p className="text-muted-foreground text-lg mb-4">
          To add a new website, click the <strong>"Get Reviews for New Website"</strong> button located at the top right corner of your dashboard.
        </p>
        <div className="mb-6">
          <img
            src="/Images/4.png"
            alt="Get Reviews for New Website button"
            className="w-full rounded-lg shadow-lg"
          />
          <p className="text-muted-foreground text-sm mt-2">
            Figure 2: "Get Reviews for New Website" Button
          </p>
        </div>
        <p className="text-muted-foreground text-lg mb-4">
          This will take you to a modal where you can enter details about the website you want to add.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold text-foreground mb-4">Step 3: Enter Website Details</h2>
        <p className="text-muted-foreground text-lg mb-4">
          On the "Add New Website" page, you'll need to fill in the following details:
        </p>
        <ul className="list-disc pl-5 text-muted-foreground mb-4">
          <li>Website Name</li>
          <li>URL</li>
        </ul>
        <p className="text-muted-foreground text-lg mb-4">
          After filling out the form, click the <strong>"Submit"</strong> button to save your new website.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold text-foreground mb-4">Step 4: Share Link</h2>
        <p className="text-muted-foreground text-lg mb-4">
          After copying the link, you can share the review link among users.
        </p>
        <div className="mb-6">
          <img
            src="/Images/1.png"
            alt="Share Link"
            className="w-full rounded-lg shadow-lg"
          />
          <p className="text-muted-foreground text-sm mt-2">Figure 3: Share Link</p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold text-foreground mb-4">Step 5: View & Filter Reviews</h2>
        <p className="text-muted-foreground text-lg mb-4">
          By clicking on a particular website, you can view and filter the reviews.
        </p>
        <div className="mb-6">
          <img
            src="/Images/2.png"
            alt="View and Filter Reviews"
            className="w-full rounded-lg shadow-lg"
          />
          <p className="text-muted-foreground text-sm mt-2">Figure 4: Reviews</p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold text-foreground mb-4">Step 6: Create Customized Embedded Script</h2>
        <p className="text-muted-foreground text-lg mb-4">
          You can customize and create an embedded script by clicking the "Menu" button on the top right corner.
        </p>
        <div className="mb-6">
          <img
            src="/Images/3.png"
            alt="Create Embedded Script"
            className="w-full rounded-lg shadow-lg"
          />
          <p className="text-muted-foreground text-sm mt-2">Figure 5: Create Script</p>
        </div>
      </section>
    </div>
  );
};

export default DocsPage;
