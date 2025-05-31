// Mobile menu toggle
document
  .querySelector('[aria-controls="mobile-menu"]')
  .addEventListener("click", function () {
    const mobileMenu = document.getElementById("mobile-menu");
    mobileMenu.classList.toggle("hidden");
  });

// FAQ toggle functionality
document.querySelectorAll(".faq-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const content = button.nextElementSibling;
    const icon = button.querySelector("i");

    content.classList.toggle("hidden");
    icon.classList.toggle("transform");
    icon.classList.toggle("rotate-180");
  });
});

// Modal toggle functions
function toggleLoginModal() {
  const modal = document.getElementById("loginModal");
  modal.classList.toggle("modal-active");
  document.body.classList.toggle("overflow-hidden");
}

function togglePaymentModal() {
  const modal = document.getElementById("paymentModal");
  modal.classList.toggle("modal-active");
  document.body.classList.toggle("overflow-hidden");
}

// Close modals when clicking outside
window.addEventListener("click", function (event) {
  const loginModal = document.getElementById("loginModal");
  const paymentModal = document.getElementById("paymentModal");

  if (event.target === loginModal) {
    toggleLoginModal();
  }

  if (event.target === paymentModal) {
    togglePaymentModal();
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// Sending Form Data to Airtable Base
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");

  const AIRTABLE_BASE_ID = "app2MnDge8FFHgz3W";
  const AIRTABLE_TABLE_NAME = "tekcertprep"; // Replace with your table name
  const AIRTABLE_PAT =
    "patB5bCPj5UTqvpaC.79bf4c8975cc34fd518fb0ee6eeb58a64572fd3894d66006398e077c9b6f4602"; // Replace with your actual PAT

  const AIRTABLE_ENDPOINT = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(
    AIRTABLE_TABLE_NAME
  )}`;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const fields = {};
    formData.forEach((value, key) => {
      fields[key] = value;
    });

    try {
      const response = await fetch(AIRTABLE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AIRTABLE_PAT}`,
        },
        body: JSON.stringify({ fields }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Airtable error:", result);
        alert(
          `Submission failed: ${result.error?.message || response.statusText}`
        );
        return;
      }

      alert("Thank you! Your message has been sent.");
      form.reset();
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Network error. Please check your connection.");
    }
  });
});
