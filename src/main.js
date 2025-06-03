// main.js – Refactored DoubleBrain (Future is Now)

import './style.css';

document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash");

if (splash) {
  setTimeout(() => {
    splash.classList.add("fade-out");
    setTimeout(() => splash.remove(), 1000);
  }, 2800);
}
  const splashText = document.querySelector("#splash-text span");
  const obecnosc = document.querySelector(".identity-obecnosc");
  const toggleBtn = document.getElementById("toggleIdentity");
  const backBtn = document.getElementById("backButton");
  const nextBtn = document.getElementById("nextButton");
  const intro = document.getElementById("identityIntro");
  const manifest = document.getElementById("manifest");
  const dbrainIntro = document.getElementById("dbrainIntro");
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".main-nav");
  const header = document.querySelector(".site-header");
  const presenceButton = document.getElementById("presence-button");

  // Splash logic
  const splashDismissed = sessionStorage.getItem("splashDismissed");
  if (!splashDismissed && splash) {
    setTimeout(() => splash.classList.add("hide"), 2800);
    sessionStorage.setItem("splashDismissed", "true");
    setTimeout(() => {
      splash.classList.add("hide");
      document.getElementById("logo-intro")?.classList.add("visible");
    }, 2800);
  }

  if (splash && splashText) {
    splashText.style.cursor = "pointer";
    splashText.addEventListener("click", () => {
      splash.style.opacity = "0";
      document.getElementById("logo-intro")?.classList.add("visible");
      setTimeout(() => (splash.style.display = "none"), 1000);
    });
  }

  // Hamburger toggle
  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      nav.classList.toggle("open");
      hamburger.setAttribute("aria-expanded", nav.classList.contains("open") ? "true" : "false");
    });
  }

  // Close menu on outside click
  document.addEventListener("click", (e) => {
    if (nav && nav.classList.contains("open") && !nav.contains(e.target) && !hamburger.contains(e.target)) {
      nav.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    }
  });

  // Compact header
  window.addEventListener("scroll", () => {
    if (header) header.classList.toggle("scrolled", window.scrollY > 50);
  });

  // Toggle presence view
  if (toggleBtn && backBtn && intro && obecnosc) {
    toggleBtn.addEventListener("click", () => {
      intro.style.display = "none";
      obecnosc.classList.add("show");
      toggleBtn.style.display = "none";
      backBtn.style.display = "inline-block";
      if (nextBtn) nextBtn.style.display = "inline-block";
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    backBtn.addEventListener("click", () => {
      intro.style.display = "flex";
      obecnosc.classList.remove("show");
      toggleBtn.style.display = "inline-block";
      backBtn.style.display = "none";
      if (nextBtn) nextBtn.style.display = "none";
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (toggleBtn && manifest && dbrainIntro) {
    toggleBtn.addEventListener("click", () => {
      dbrainIntro.style.display = "none";
      manifest.classList.add("show");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Hover effects
  document.querySelectorAll(".identity-box").forEach((box) => {
    box.addEventListener("mouseenter", () => {
      box.style.setProperty("--bg-transform", "scale(1.05)");
    });

    box.addEventListener("mousemove", (e) => {
      const rect = box.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const moveX = ((x - rect.width / 2) / rect.width) * 20;
      const moveY = ((y - rect.height / 2) / rect.height) * 20;
      box.style.setProperty("--bg-transform", `translate(${moveX}px, ${moveY}px) scale(1.05)`);
    });

    box.addEventListener("mouseleave", () => {
      box.style.setProperty("--bg-transform", "scale(1)");
    });
  });

  // Detail view navigation
  document.querySelectorAll(".identity-box").forEach((box) => {
    box.addEventListener("click", () => {
      const id = box.getAttribute("data-id");
      const target = document.getElementById(`detail-${id}`);
      if (intro && target) {
        intro.style.display = "none";
        target.classList.add("active");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  });

  document.querySelectorAll(".back-to-boxes").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".detail-view").forEach((view) => view.classList.remove("active"));
      if (intro) {
        intro.style.display = "flex";
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  });

  document.querySelector(".presence-trigger")?.addEventListener("click", () => {
    if (obecnosc && intro) {
      intro.style.display = "none";
      obecnosc.classList.add("show");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  // Fade-in animation
  const fadeEls = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.2 }
  );
  fadeEls.forEach((el) => observer.observe(el));

  // Presence logic – unlock after 3 unique box clicks
  const clickedDivs = new Set();
  document.querySelectorAll(".identity-box").forEach((box) => {
    box.addEventListener("click", () => {
      const id = box.getAttribute("data-id");
      if (id) clickedDivs.add(id);
      if (clickedDivs.size >= 3 && presenceButton) {
        presenceButton.style.display = "block";
        presenceButton.classList.add("fade-in");
      }
    });
  });

  // Dynamic content loading for Poe mode
  const contentMap = {
    1: "SigmaPoe_01.html",
    2: "SigmaPoe_02.html",
    3: "SigmaPoe_03.html",
    4: "SigmaPoe_04.html",
    5: "SigmaPoe_05.html",
  };

  const select = document.getElementById("chapterSelect");
  const container = document.getElementById("poeContent");

  async function loadChapter(index) {
    try {
      const res = await fetch(contentMap[index]);
      if (!res.ok) throw new Error("Load error");
      const html = await res.text();
      if (container) container.innerHTML = html;
    } catch (err) {
      console.error("Loading chapter failed:", err);
    }
  }

  if (select && container) {
    select.addEventListener("change", (e) => loadChapter(e.target.value));
    loadChapter(select.value);
  }

  // Matrix canvas effect
  const canvas = document.getElementById("matrixCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    const chars = "01@#&*%$+=-";
    const fontSize = 16;
    let columns, drops;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(1);
    }

    function draw() {
      ctx.fillStyle = "rgba(10, 10, 10, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#5ef2e6";
      ctx.font = `${fontSize}px monospace`;

      drops.forEach((y, i) => {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, y * fontSize);
        drops[i] = y * fontSize > canvas.height && Math.random() > 0.975 ? 0 : y + 1;
      });
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    setInterval(draw, 60);
  }
});
