let points = 0;
let badges = [];
let selectedPlace = null;

const POIS = [
  { id: "taj", name: "Taj Mahal", lat: 27.1751, lon: 78.0421, points: 50 },
  { id: "jaipur", name: "Jaipur City Palace", lat: 26.9258, lon: 75.8267, points: 40 },
  { id: "goa", name: "Baga Beach, Goa", lat: 15.5527, lon: 73.7517, points: 30 }
];

// Map setup
const map = L.map("map").setView([22, 79], 5);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
}).addTo(map);

// Add markers
POIS.forEach(p => {
  const marker = L.marker([p.lat, p.lon]).addTo(map);
  marker.on("click", () => {
    selectedPlace = p;
    document.getElementById("placeInfo").innerHTML = `
      <b>${p.name}</b><br>
      Reward: ${p.points} points
    `;
    document.getElementById("checkInBtn").disabled = false;
  });
});

// Handle check-in
document.getElementById("checkInBtn").addEventListener("click", () => {
  if (!selectedPlace) return;
  
  points += selectedPlace.points;
  document.getElementById("points").innerText = points;

  // Add badges dynamically
  if (points >= 50 && !badges.includes("Explorer")) {
    badges.push("Explorer");
  }
  if (points >= 100 && !badges.includes("Traveller")) {
    badges.push("Traveller");
  }

  const badgeContainer = document.getElementById("badges");
  badgeContainer.innerHTML = badges.length
    ? badges.map(b => `<div class="badge">${b}</div>`).join("")
    : "No badges yet.";

  alert(`Check-in successful at ${selectedPlace.name}! 🎉`);
  document.getElementById("checkInBtn").disabled = true;
});
