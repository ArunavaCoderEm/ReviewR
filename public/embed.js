(function () {
    const script = document.currentScript;
    const websiteId = script.getAttribute("data-website-id");
    const theme = script.getAttribute("data-theme") || "light";
    const minrating = script.getAttribute("data-min-rating") || undefined;
    const totalrev = script.getAttribute("data-total-rev") || undefined;
  
    const container = document.createElement("div");
    container.id = "review-widget-container";
    container.style.maxWidth = "1200px";
    container.style.margin = "0 auto";
    container.style.padding = "24px";
    container.style.backgroundColor = theme === "dark" ? "#1f2937" : "#ffffff"; 
    container.style.borderRadius = "8px";
    container.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
    container.style.border = theme === "dark" ? "1px solid #374151" : "1px solid #e5e7eb"; 
    document.body.appendChild(container);
  
    container.innerHTML = `<p style="text-align: center; color: ${theme === "dark" ? "#d1d5db" : "#6b7280"};">Loading reviews...</p>`;
  
    fetch(`http://localhost:3000/api/getreview/${websiteId}?totalRevs=${totalrev}&ratingAbove=${minrating}`)
      .then((response) => response.json())
      .then((data) => {
        const reviews = data.webReviews || [];
  
        if (reviews.length === 0) {
          container.innerHTML = `<p style="text-align: center; color: ${theme === "dark" ? "#d1d5db" : "#6b7280"};">No reviews available.</p>`;
          return;
        }
  
        const gridWrapper = document.createElement("div");
        gridWrapper.style.display = "grid";
        gridWrapper.style.gap = "24px";
        gridWrapper.style.padding = "12px";
        gridWrapper.style.transition = "all 0.3s ease";
        container.innerHTML = ""; 
        container.appendChild(gridWrapper);
  
        function updateGridColumns() {
          const width = window.innerWidth;
          if (width >= 1024) {
            gridWrapper.style.gridTemplateColumns = "repeat(4, 1fr)";
          } else if (width >= 640) {
            gridWrapper.style.gridTemplateColumns = "repeat(3, 1fr)";
          } else {
            gridWrapper.style.gridTemplateColumns = "repeat(2, 1fr)";
          }
        }
  
        updateGridColumns();
  
        window.addEventListener("resize", updateGridColumns);
  
        reviews.forEach((review) => {
          const formattedDate = new Date(review.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          });
  
          const stars = Array.from({ length: 5 }, (_, i) => i < review.rating ? "★" : "☆").join("");
  
          const reviewCard = `
            <div style="background-color: ${theme === "dark" ? "#374151" : "#f9fafb"}; padding: 16px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); border: 1px solid ${theme === "dark" ? "#4b5563" : "#e5e7eb"};">
              <div style="text-align: center;">
                <p style="font-weight: bold; color: ${theme === "dark" ? "#d1d5db" : "#2d3748"};">${review.reviewer || "Anonymous"}</p>
                <p style="font-size: 12px; color: ${theme === "dark" ? "#9ca3af" : "#6b7280"};">${review.profession || "Not Specified"}</p>
                <p style="font-weight: bold; color: #48bb78; font-size: 18px;">${stars} ${review.rating || "0"}/5</p>
              </div>
              <div style="margin-top: 8px;">
                <p style="font-size: 10px; color: ${theme === "dark" ? "#9ca3af" : "#9ca3af"};">${formattedDate}</p>
                <p style="font-size: 14px; color: ${theme === "dark" ? "#e5e7eb" : "#4b5563"}; margin-top: 8px;">${review.content || "No content available."}</p>
              </div>
            </div>
          `;
  
          gridWrapper.innerHTML += reviewCard;
        });
  
        const footer = document.createElement("div");
        footer.style.textAlign = "center";
        footer.style.marginTop = "16px";
        footer.innerHTML = `<a href="http://localhost:3000" target="_blank" style="font-size: 12px; color: ${theme === "dark" ? "#3b82f6" : "#3b82f6"}; text-decoration: underline;">Powered by ReviewR</a>`;
        container.appendChild(footer);
      })
      .catch((error) => {
        console.error("Error loading reviews:", error);
        container.innerHTML = `<p style="text-align: center; color: ${theme === "dark" ? "#ef4444" : "#ef4444"};">Failed to load reviews.</p>`;
      });
  })();
  