import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieDetail } from '../api';

const Detail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetail(id).then(setMovie);
  }, [id]);

  if (!movie) return <div className="text-center p-20 font-ace text-2xl">Loading Details...</div>;

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4 flex items-center justify-center">
      <div className="max-w-5xl w-full bg-white rounded-xl overflow-hidden shadow-2xl">
        
        {/* Header Ungu Muda */}
        <div className="bg-primary-light/20 p-8 border-b border-primary-light/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-ace text-primary-dark mb-2">{movie.Title}</h1>
            <div className="flex flex-wrap gap-4 text-gray-700 font-brigade text-sm md:text-base">
              <span className="bg-gray-200 px-2 py-1 rounded">{movie.Year}</span>
              <span className="bg-gray-200 px-2 py-1 rounded">{movie.Rated}</span>
              <span className="bg-gray-200 px-2 py-1 rounded">{movie.Runtime}</span>
            </div>
          </div>
          <div className="text-right bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">IMDB Rating</p>
            <div className="text-4xl font-ace text-primary-dark">
              {movie.imdbRating}<span className="text-lg text-gray-400">/10</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex flex-col md:flex-row p-8 gap-8 bg-white">
          {/* Poster Kiri */}
          <div className="w-full md:w-1/3 shrink-0">
            <img 
              src={movie.Poster} 
              alt={movie.Title} 
              className="w-full rounded-lg shadow-xl border-4 border-secondary"
            />
          </div>

          {/* Info Kanan */}
          <div className="w-full md:w-2/3 flex flex-col gap-6">
            {/* Plot Box */}
            <div className="bg-gray-100 p-6 rounded-lg border-l-4 border-primary-light">
              <h3 className="font-ace text-xl mb-2 text-primary-dark">Plot</h3>
              <p className="font-brigade text-lg leading-relaxed text-gray-800">
                {movie.Plot}
              </p>
            </div>

            {/* Details Grid */}
            <div className="bg-green-50 p-6 rounded-lg space-y-3 border border-green-100">
              <div className="grid grid-cols-[100px_1fr] gap-2">
                <span className="font-ace text-primary-dark">Director</span>
                <span className="font-brigade">{movie.Director}</span>
              </div>
              <div className="grid grid-cols-[100px_1fr] gap-2">
                <span className="font-ace text-primary-dark">Writers</span>
                <span className="font-brigade">{movie.Writer}</span>
              </div>
              <div className="grid grid-cols-[100px_1fr] gap-2">
                <span className="font-ace text-primary-dark">Actors</span>
                <span className="font-brigade">{movie.Actors}</span>
              </div>
            </div>

            <Link 
              to="/" 
              className="self-start mt-auto flex items-center gap-2 text-primary-dark font-ace hover:text-secondary transition"
            >
              ← KEMBALI KE PENCARIAN
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;