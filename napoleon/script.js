// selectors
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("nav ul");
const statNumbers = document.querySelectorAll(".stat-number");
const mainContent = document.querySelector('[role="main"]');

// Toggle navigation menu for mobile (check css for more info)
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("nav-active");
    navToggle.classList.toggle("active");
  });
}

// stats go up
function animateStats() {
  statNumbers.forEach((stat) => {
    const target = parseInt(stat.textContent);
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        stat.textContent = target;
        clearInterval(timer);
      } else {
        stat.textContent = Math.round(current);
      }
    }, 20);
  });
}

// Trigger animation when stats are in view
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
if (statNumbers.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        animateStats();
        observer.disconnect();
      }
    },
    { threshold: 0.5 }
  );

  observer.observe(document.querySelector(".stats-container"));
}

// Day of the week theme changes
function applyDailyTheme() {
  const day = new Date().getDay();
  const themes = {
    0: {
      backgroundColor: "#f0f7ff",
      borderColor: "#b3d9ff",
      headingColor: "#2c5282",
    },
    1: {
      backgroundColor: "#f7fafc",
      borderColor: "#cbd5e0",
      headingColor: "#2d3748",
    },
    2: {
      backgroundColor: "#fff5f5",
      borderColor: "#feb2b2",
      headingColor: "#c53030",
    },
    3: {
      backgroundColor: "#faf5ff",
      borderColor: "#d6bcfa",
      headingColor: "#553c9a",
    },
    4: {
      backgroundColor: "#f0fff4",
      borderColor: "#9ae6b4",
      headingColor: "#276749",
    },
    5: {
      backgroundColor: "#fffff0",
      borderColor: "#faf089",
      headingColor: "#744210",
    },
    6: {
      backgroundColor: "#fdf2f8",
      borderColor: "#fbb6ce",
      headingColor: "#97266d",
    },
  };

  const theme = themes[day];

  // apply theme to campaign cards and legacy cards
  document.querySelectorAll(".campaign-card, .legacy-item").forEach((card) => {
    card.style.backgroundColor = theme.backgroundColor;
    card.style.borderLeft = `4px solid ${theme.borderColor}`;
  });

  // Update headings colors
  document.querySelectorAll("h1, h2").forEach((heading) => {
    heading.style.color = theme.headingColor;
  });
}

// Apply daily theme when page loads
document.addEventListener("DOMContentLoaded", applyDailyTheme);

// Interactive hover effect on campaign cards
document.querySelectorAll(".campaign-card, .legacy-item").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "scale(1.02)";
    card.style.transition = "transform 0.3s ease";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "scale(1)";
  });
});



const napoleonFacts = [
  "Napoleon was actually of average height (5'6\") for his time period.",
  "He wrote a romance novel called 'Clisson et Eugénie' in 1795.",
  "Napoleon was once attacked by thousands of rabbits at a hunting event.",
  "He created the Bank of France, which still exists today.",
  "His last word was reportedly 'Joséphine', his first wife's name.",
];

// Get the Napoleon portrait image
const napoleonImage = document.querySelector(".nap-image");
// Create a paragraph for the fact below the image
const factText = document.createElement("p");
factText.className = "fact-text";
factText.style.textAlign = "center";
factText.style.padding = "10px";
factText.style.color = "#c41e3a";
factText.style.fontStyle = "italic";

// Insert the paragraph after the image
if (napoleonImage) {
  napoleonImage.parentNode.appendChild(factText);

  // Add click event listener to the image
  napoleonImage.addEventListener("click", () => {
    // Get random fact
    const randomFact =
      napoleonFacts[Math.floor(Math.random() * napoleonFacts.length)];
    // Update the text
    factText.textContent = randomFact;
    // Add a brief scale animation to the image
    napoleonImage.style.transform = "scale(1.05)";
    setTimeout(() => {
      napoleonImage.style.transform = "scale(1)";
    }, 200);
  });

  // Add cursor pointer to show it's clickable
  napoleonImage.style.cursor = "pointer";
  // Add smooth transition for the scale effect
  napoleonImage.style.transition = "transform 0.2s ease";
}
