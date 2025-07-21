// src/data/clubsData.js

const clubs = [
  {
    id: "coding-club",
    name: "Coding Club",
    logo: "https://cdn-icons-png.flaticon.com/512/4320/4320337.png",
    description: "For all coders, from Leetcode lovers to CP freaks!",
    events: [
      {
        id: "dsa-contest",
        name: "Weekly DSA Contest",
        date: "2025-07-13",
        description: "Compete and win goodies!"
      }
    ],
    gallery: [
      "https://source.unsplash.com/featured/?coding",
      "https://source.unsplash.com/featured/?computer"
    ]
  },
  {
    id: "robotics-club",
    name: "Robotics Club",
    logo: "https://cdn-icons-png.flaticon.com/512/2203/2203461.png",
    description: "Build, break, and bot again.",
    events: [
      {
        id: "arduino-workshop",
        name: "Arduino Workshop",
        date: "2025-07-17",
        description: "Basics of Arduino + Live Project"
      }
    ],
    gallery: [
      "https://source.unsplash.com/featured/?robotics",
      "https://source.unsplash.com/featured/?arduino"
    ]
  }
];

export default clubs;
