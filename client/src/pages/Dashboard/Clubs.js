import React from "react";
import clubs from "../../data/clubsData";
import { Link } from "react-router-dom";

const Clubs = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">IIT Clubs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {clubs.map((club) => (
          <div key={club.id} className="bg-white rounded-lg shadow p-4">
            <img
              src={club.logo}
              alt={club.name}
              className="h-24 mx-auto mb-3"
            />
            <h3 className="text-xl font-bold text-center">{club.name}</h3>
            <p className="text-sm text-gray-600 text-center">
              {club.description}
            </p>
            <Link
              to={`/dashboard/clubs/${club.id}`}
              className="block mt-4 text-center text-blue-600 hover:underline"
            >
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clubs;
