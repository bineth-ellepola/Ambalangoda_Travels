// Fills an empty database with sample tours and destinations.
// Usage: npm run seed            (only seeds collections that are empty)
//        npm run seed -- --reset (replaces existing tours and destinations)
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const connectDB = require("./config/db");
const Tour = require("./models/tourModel");
const Discription = require("./models/discriptionModel");

const tours = [
  {
    title: "Madu River Boat Safari",
    category: "Excursion",
    duration: "Half Day",
    price: 35,
    location: "Balapitiya",
    featured: true,
    summary:
      "Glide through mangrove tunnels and visit the island cinnamon farms of the Madu Ganga wetland.",
    description:
      "The Madu Ganga is one of the last pristine mangrove forests in Sri Lanka, dotted with more than 60 small islands. Our boatmen take you through narrow mangrove tunnels, past fishing villages and to Kothduwa temple island. Stop at a family-run cinnamon island to see how Ceylon cinnamon is peeled and rolled by hand.",
    highlights: [
      "Mangrove tunnels and bird watching",
      "Cinnamon peeling demonstration",
      "Kothduwa island temple",
      "Traditional stilt fishing villages",
    ],
    includes: ["Hotel pick-up and drop-off", "Boat ride with guide", "Fresh king coconut"],
    itinerary: [
      { day: 1, title: "Morning boat safari", details: "Pick-up from your hotel, 2.5 hours on the river, return by lunch." },
    ],
  },
  {
    title: "Galle Fort & Southern Coast Day Tour",
    category: "Day Tour",
    duration: "1 Day",
    price: 65,
    location: "Galle",
    featured: true,
    summary:
      "Walk the ramparts of the UNESCO-listed Dutch fort and stop at the best beaches of the south coast.",
    description:
      "Start with a walk through the cobbled streets of Galle Fort: the lighthouse, Dutch Reformed Church, and boutique cafes. Continue along the coast to watch the famous stilt fishermen at Koggala and relax on Unawatuna beach before heading back to Ambalangoda at sunset.",
    highlights: [
      "Galle Fort ramparts and lighthouse",
      "Stilt fishermen of Koggala",
      "Swim at Unawatuna beach",
      "Sunset drive along the coast",
    ],
    includes: ["Air-conditioned vehicle", "English-speaking driver guide", "Bottled water"],
    itinerary: [
      { day: 1, title: "Galle Fort walking tour", details: "Two hours exploring the fort with your guide." },
    ],
  },
  {
    title: "Ambalangoda Mask Museum & Workshop",
    category: "Excursion",
    duration: "3 Hours",
    price: 20,
    location: "Ambalangoda",
    featured: true,
    summary:
      "Discover the centuries-old tradition of Sri Lankan devil-dance masks in their hometown.",
    description:
      "Ambalangoda is the home of Sri Lanka's traditional mask carving. Visit the mask museum to learn about Kolam and Sanni dance masks, then watch master carvers shape and paint masks from kaduru wood. Try painting a small mask of your own to take home.",
    highlights: ["Mask museum visit", "Live carving demonstration", "Paint your own mini mask"],
    includes: ["Entrance fees", "Painting materials", "Tuk-tuk transfer"],
  },
  {
    title: "Kosgoda Turtle Hatchery Visit",
    category: "Excursion",
    duration: "2 Hours",
    price: 18,
    location: "Kosgoda",
    summary:
      "Meet rescued sea turtles and learn how local conservationists protect nesting beaches.",
    description:
      "Kosgoda beach is a nesting ground for five of the world's seven sea turtle species. The hatchery collects eggs from the beach to protect them from poachers and releases hatchlings back into the ocean.",
    highlights: ["See five species of sea turtles", "Conservation talk", "Hatchling release (seasonal)"],
    includes: ["Hatchery entrance", "Hotel transfer"],
  },
  {
    title: "Mirissa Whale Watching",
    category: "Day Tour",
    duration: "1 Day",
    price: 85,
    location: "Mirissa",
    summary:
      "Head out to sea at dawn to spot blue whales, sperm whales and spinner dolphins.",
    description:
      "Between November and April the waters off Mirissa are one of the best places in the world to see blue whales. We collect you before sunrise, and after the boat trip you can relax on Mirissa beach before returning.",
    highlights: ["Blue whale sightings (Nov - Apr)", "Spinner dolphin pods", "Mirissa beach and Coconut Tree Hill"],
    includes: ["Early morning transfer", "Boat ticket", "Breakfast on board"],
  },
  {
    title: "Classic Sri Lanka Round Tour",
    category: "Round Tour",
    duration: "7 Days",
    price: 690,
    location: "Island-wide",
    featured: true,
    summary:
      "A week through the cultural triangle, the hill country tea estates and a wildlife safari in Yala.",
    description:
      "This private round tour starts and ends in Ambalangoda. Climb Sigiriya rock fortress, visit the Temple of the Tooth in Kandy, ride the scenic train to Ella and finish with a jeep safari in Yala National Park, home to the highest density of leopards in the world.",
    highlights: [
      "Sigiriya Lion Rock",
      "Temple of the Sacred Tooth Relic, Kandy",
      "Kandy to Ella scenic train",
      "Yala leopard safari",
    ],
    includes: [
      "Private vehicle with driver guide",
      "6 nights accommodation with breakfast",
      "Train tickets",
      "Yala jeep safari",
    ],
    itinerary: [
      { day: 1, title: "Ambalangoda to Sigiriya", details: "Drive north to the cultural triangle." },
      { day: 2, title: "Sigiriya & Dambulla", details: "Climb Lion Rock at sunrise and visit the Dambulla cave temple." },
      { day: 3, title: "Kandy", details: "Spice garden, Temple of the Tooth and a cultural dance show." },
      { day: 4, title: "Nuwara Eliya", details: "Tea factory visit and the misty hill country." },
      { day: 5, title: "Train to Ella", details: "One of the most beautiful train journeys in the world." },
      { day: 6, title: "Yala safari", details: "Afternoon jeep safari in Yala National Park." },
      { day: 7, title: "Return to Ambalangoda", details: "Drive back along the southern coast." },
    ],
  },
  {
    title: "Airport Transfer",
    category: "Transfer",
    duration: "2 - 3 Hours",
    price: 60,
    location: "Colombo Airport (BIA)",
    summary:
      "Comfortable private transfer between Bandaranaike International Airport and Ambalangoda.",
    description:
      "Your driver waits at arrivals with a name board and takes you directly to your hotel via the Southern Expressway.",
    highlights: ["Meet and greet at arrivals", "Expressway route", "Available 24/7"],
    includes: ["Private air-conditioned car", "Highway tolls", "Bottled water"],
  },
];

const destinations = [
  {
    title: "Ambalangoda",
    description:
      "A laid-back coastal town famous for its traditional masks, puppetry and quiet golden beaches, just 90 km south of Colombo.",
  },
  {
    title: "Madu River",
    description:
      "A vast mangrove wetland with over 60 islands, home to cinnamon farms, monitor lizards and hundreds of bird species.",
  },
  {
    title: "Hikkaduwa",
    description:
      "Coral reefs, surf breaks and turtles swimming in the shallows. The liveliest beach town on the south-west coast.",
  },
  {
    title: "Galle Fort",
    description:
      "A 17th-century Dutch fort and UNESCO World Heritage Site filled with colonial streets, boutiques and ocean views.",
  },
  {
    title: "Kosgoda",
    description:
      "A long, wild beach where sea turtles come ashore to nest, protected by community-run turtle hatcheries.",
  },
  {
    title: "Bentota",
    description:
      "Calm lagoon waters and wide beaches, perfect for water sports, river cruises and relaxing resort stays.",
  },
];

const seed = async () => {
  const reset = process.argv.includes("--reset");

  await connectDB();

  if (reset) {
    await Tour.deleteMany({});
    await Discription.deleteMany({});
    console.log("Cleared existing tours and destinations");
  }

  if ((await Tour.countDocuments()) === 0) {
    await Tour.insertMany(tours);
    console.log(`Added ${tours.length} tours`);
  } else {
    console.log("Tours already exist - skipped (use --reset to replace)");
  }

  if ((await Discription.countDocuments()) === 0) {
    await Discription.insertMany(destinations);
    console.log(`Added ${destinations.length} destinations`);
  } else {
    console.log("Destinations already exist - skipped (use --reset to replace)");
  }
};

seed()
  .catch((error) => {
    console.error("Seeding failed:", error.message);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
