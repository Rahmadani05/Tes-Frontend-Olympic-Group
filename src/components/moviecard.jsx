import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full border border-gray-200 transition-transform hover:scale-105 duration-300">
      <div className="relative h-[300px] bg-gray-300 overflow-hidden">
        <img 
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"} 
          alt={movie.Title} 
          className="w-full h-full object-cover"
          cite_startloading="lazy" //Lazy Loading
        />
        <div className="absolute top-2 right-2 bg-secondary text-black font-ace px-2 py-1 text-xs rounded shadow">
          {movie.Type.toUpperCase()}
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow bg-gradient-to-b from-white to-gray-50">
        <h3 className="text-lg font-ace text-primary-dark mb-1 line-clamp-2 leading-tight">
          {movie.Title}
        </h3>
        <p className="text-sm font-brigade text-gray-600 mb-4">{movie.Year}</p>
        
        {/* Tombol CTA ke Detail */}
        <Link 
          to={`/detail/${movie.imdbID}`} 
          className="mt-auto bg-primary-light hover:bg-primary-dark text-white font-ace py-2 px-4 rounded text-center transition-colors shadow-md"
        >
          LIHAT DETAIL
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;