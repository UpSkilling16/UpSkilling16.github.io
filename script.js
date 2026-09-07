// ============================================================
// ABC Tutoring — shared logic
// Handles tutor data, booking state (localStorage), and
// PostHog event tracking used across all pages.
// ============================================================

// ---------- Tutor data ----------
const TUTORS = [
  {
    id: "t1",
    name: "Maria Chen",
    subject: "Math",
    grades: "3-5",
    rate: 35,
    photo: "https://i.pravatar.cc/200?img=47",
    slots: ["Mon 4:00 PM", "Wed 4:00 PM", "Fri 3:00 PM"]
  },
  {
    id: "t2",
    name: "James Okafor",
    subject: "Math",
    grades: "6-8",
    rate: 40,
    photo: "https://i.pravatar.cc/200?img=12",
    slots: ["Tue 5:00 PM", "Thu 5:00 PM"]
  },
  {
    id: "t3",
    name: "Priya Nair",
    subject: "Math",
    grades: "Algebra I-II",
    rate: 45,
    photo: "https://i.pravatar.cc/200?img=32",
    slots: ["Mon 6:00 PM", "Wed 6:00 PM", "Sat 10:00 AM"]
  },
  {
    id: "t4",
    name: "Daniel Reyes",
    subject: "Math",
    grades: "6-8",
    rate: 38,
    photo: "https://i.pravatar.cc/200?img=15",
    slots: ["Tue 4:00 PM", "Fri 4:00 PM"]
  },
  {
    id: "t5",
    name: "Sophie Turner",
    subject: "Science",
    grades: "3-8",
    rate: 40,
    photo: "https://i.pravatar.cc/200?img=25",
    slots: ["Mon 5:00 PM", "Thu 4:00 PM", "Sat 11:00 AM"]
  },
  {
    id: "t6",
    name: "Amara Whitfield",
    subject: "Reading",
    grades: "K-5",
    rate: 32,
    photo: "https://i.pravatar.cc/200?img=44",
    slots: ["Tue 3:00 PM", "Wed 3:00 PM", "Fri 2:00 PM"]
  }
];

// ---------- Booking state (persisted so booked slots stay gone) ----------
function getBookedSlots() {
  return JSON.parse(localStorage.getItem("bookedSlots") || "{}");
}

function isSlotBooked(tutorId, slot) {
  const booked = getBookedSlots();
  return !!(booked[tutorId] && booked[tutorId].includes(slot));
}

function bookSlot(tutorId, slot) {
  const booked = getBookedSlots();
  if (!booked[tutorId]) booked[tutorId] = [];
  booked[tutorId].push(slot);
  localStorage.setItem("bookedSlots", JSON.stringify(booked));
}

function getTutorById(id) {
  return TUTORS.find((t) => t.id === id);
}

function getAvailableSlots(tutor) {
  return tutor.slots.filter((s) => !isSlotBooked(tutor.id, s));
}

// ---------- PostHog helper (safe no-op if PostHog isn't loaded) ----------
function track(eventName, props) {
  if (typeof posthog !== "undefined" && posthog.capture) {
    posthog.capture(eventName, props || {});
  } else {
    console.log("[track]", eventName, props);
  }
}

// ---------- Read a query param ----------
function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}