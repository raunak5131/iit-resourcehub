import React from "react";
import { useNavigate } from "react-router-dom";

const ClubCard = ({ club }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white shadow-md p-4 rounded cursor-pointer hover:shadow-lg"
      onClick={() => navigate(`/dashboard/clubs/${club.id}`)}
    >
      <img src={club.logo} alt={club.name} className="w-full h-32 object-cover rounded" />
      <h2 className="text-xl font-bold mt-2">{club.name}</h2>
      <p className="text-sm text-gray-600">{club.description}</p>
    </div>
  );
};

export default ClubCard;
