(function () {
  const script = document.currentScript;
  const websiteId = script.getAttribute("data-website-id");
  const theme = script.getAttribute("data-theme") || "dark";
  const minrating = script.getAttribute("data-min-rating") || undefined;
  const totalrev = script.getAttribute("data-total-rev") || undefined;
  const sentiment = script.getAttribute("data-sentiment") || "all";

  const themes = {
    dark: {
      bg: "#1a1a2e",
      card: "#16213e",
      text: "#e0e0e0",
      accent: "#ffd369",
    },
    light: {
      bg: "#f9f9f9",
      card: "#ffffff",
      text: "#222222",
      accent: "#f59e0b",
    },
  };
  const colors = themes[theme] || themes.dark;

  const container = document.createElement("div");
  container.id = "review-widget-container";
  container.style.maxWidth = "1000px";
  container.style.margin = "20px auto";
  container.style.padding = "16px";
  container.style.backgroundColor = colors.bg;
  container.style.borderRadius = "12px";
  container.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
  container.style.color = colors.text;
  document.body.appendChild(container);

  container.innerHTML = `<p style="text-align:center;">Loading ReviewR reviews...</p>`;

  const fetchURL = new URL(
    `https://review-r.godutta.tech/api/getreview/${websiteId}`
  );
  if (totalrev) fetchURL.searchParams.set("totalRevs", totalrev);
  if (minrating) fetchURL.searchParams.set("ratingAbove", minrating);
  if (sentiment) fetchURL.searchParams.set("sentiment", sentiment);

  fetch(fetchURL.toString())
    .then((res) => res.json())
    .then((data) => {
      let reviews = data.webReviews || [];

      // Filter client-side if sentiment specified
      if (sentiment && sentiment !== "all") {
        reviews = reviews.filter((r) => r.sentiment === sentiment);
      }

      if (reviews.length === 0) {
        container.innerHTML = `<p style="text-align:center;">No reviews available.</p>`;
        return;
      }

      container.innerHTML = "";

      // ---------- Carousel or Grid ----------
      if (reviews.length > 3) {
        let currentPage = 0;
        let visibleCount = getVisibleCount();
        const wrapper = document.createElement("div");
        wrapper.style.overflow = "hidden";
        wrapper.style.position = "relative";
        wrapper.style.width = "100%";

        const track = document.createElement("div");
        track.style.display = "flex";
        track.style.gap = "12px";
        track.style.willChange = "transform";
        track.style.transition = "transform 0.6s ease-in-out";
        wrapper.appendChild(track);

        reviews.forEach((review) => {
          const card = buildReviewCard(review, colors, true);
          track.appendChild(card);
        });

        container.appendChild(wrapper);

        // Buttons
        const prevBtn = document.createElement("button");
        const nextBtn = document.createElement("button");
        [prevBtn, nextBtn].forEach((btn) => {
          btn.style.position = "absolute";
          btn.style.top = "50%";
          btn.style.transform = "translateY(-50%)";
          btn.style.background = colors.accent;
          btn.style.border = "none";
          btn.style.color = colors.bg;
          btn.style.padding = "6px 12px";
          btn.style.borderRadius = "50%";
          btn.style.cursor = "pointer";
          btn.style.fontSize = "16px";
          btn.style.fontWeight = "bold";
          btn.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
        });
        prevBtn.style.left = "10px";
        nextBtn.style.right = "10px";
        prevBtn.textContent = "‹";
        nextBtn.textContent = "›";
        wrapper.appendChild(prevBtn);
        wrapper.appendChild(nextBtn);

        const GAP = 12;
        function getVisibleCount() {
          const w = window.innerWidth;
          if (w >= 1024) return 3;
          if (w >= 640) return 2;
          return 1;
        }
        function totalPages() {
          return Math.max(1, Math.ceil(reviews.length / visibleCount));
        }
        function setCardSizes() {
          visibleCount = getVisibleCount();
          const innerWidth = wrapper.clientWidth;
          const totalGap = GAP * (visibleCount - 1);
          const cardWidth = (innerWidth - totalGap) / visibleCount;

          Array.from(track.children).forEach((card) => {
            card.style.margin = "0";
            card.style.flex = `0 0 ${cardWidth}px`;
            card.style.maxWidth = `${cardWidth}px`;
          });

          updatePosition();
        }
        function updatePosition() {
          const shiftPx = currentPage * wrapper.clientWidth;
          track.style.transform = `translateX(-${shiftPx}px)`;
        }
        function slide(dir) {
          const pages = totalPages();
          currentPage = (currentPage + dir + pages) % pages;
          updatePosition();
        }

        prevBtn.onclick = () => slide(-1);
        nextBtn.onclick = () => slide(1);

        let timer = setInterval(() => slide(1), 4000);
        wrapper.addEventListener("mouseenter", () => clearInterval(timer));
        wrapper.addEventListener("mouseleave", () => {
          timer = setInterval(() => slide(1), 4000);
        });

        const onResize = () => window.requestAnimationFrame(setCardSizes);
        setCardSizes();
        window.addEventListener("resize", onResize);
      } else {
        // ---------- Grid for ≤3 reviews ----------
        const grid = document.createElement("div");
        grid.style.display = "grid";
        grid.style.gap = "16px";

        function updateGridCols() {
          const width = window.innerWidth;
          if (width >= 1024) grid.style.gridTemplateColumns = "repeat(3, 1fr)";
          else if (width >= 640)
            grid.style.gridTemplateColumns = "repeat(2, 1fr)";
          else grid.style.gridTemplateColumns = "repeat(1, 1fr)";
        }
        updateGridCols();
        window.addEventListener("resize", updateGridCols);

        reviews.forEach((review) => {
          const card = buildReviewCard(review, colors, false);
          grid.appendChild(card);
        });
        container.appendChild(grid);
      }

      // Footer
      const footer = document.createElement("div");
      footer.style.textAlign = "center";
      footer.style.marginTop = "20px";
      footer.innerHTML = `
        <a href="https://review-r.godutta.tech" target="_blank"
          style="
            display:inline-block;
            padding:6px 14px;
            font-size:12px;
            border-radius:20px;
            background:${colors.accent};
            color:${colors.bg};
            font-weight:500;
            text-decoration:none;
            box-shadow:0 2px 6px rgba(0,0,0,0.15);
            transition:all 0.3s ease;
          "
          onmouseover="this.style.opacity=0.85"
          onmouseout="this.style.opacity=1"
        >⚡ Powered by ReviewR</a>`;
      container.appendChild(footer);
    })
    .catch((err) => {
      console.error("Error loading reviews:", err);
      container.innerHTML = `<p style="text-align:center; color:red;">Failed to load reviews.</p>`;
    });

  function buildReviewCard(review, colors, inCarousel) {
    const card = document.createElement("div");
    card.style.background = colors.card;
    card.style.padding = "12px";
    card.style.borderRadius = "10px";
    card.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
    card.style.textAlign = "center";
    card.style.display = "flex";
    card.style.flexDirection = "column";
    card.style.gap = "4px";
    card.style.height = "auto";
    card.style.justifyContent = "flex-start";

    if (!inCarousel) card.style.margin = "8px";

    const formattedDate = new Date(review.createdAt).toLocaleDateString(
      "en-US",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );

    const stars = Array.from({ length: 5 }, (_, i) =>
      i < review.rating ? "★" : "☆"
    ).join("");

    card.innerHTML = `
      <div style="margin-bottom:2px;">
        <p style="font-weight:bold; color:${
          colors.text
        }; font-size:14px; margin:0;">
          ${review.reviewer || "Anonymous"}
        </p>
        <p style="font-size:11px; opacity:0.7; color:${colors.text}; margin:0;">
          ${review.profession || "Not Specified"}
        </p>
        <p style="font-weight:bold; font-size:13px; color:${
          colors.accent
        }; margin:2px 0 0 0;">
          ${stars} ${review.rating || "0"}/5
        </p>
      </div>
      <div>
        <p style="font-size:10px; opacity:0.6; margin:0; color:${colors.text};">
          ${formattedDate}
        </p>
        <p style="font-size:12px; margin:2px 0 0 0; line-height:1.25; color:${
          colors.text
        };">
          ${review.content || "No content available."}
        </p>
      </div>
    `;

    return card;
  }
})();
