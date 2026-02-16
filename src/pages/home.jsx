import React, { useState } from "react";
import { searchMovies } from "../api";
import MovieCard from "../components/moviecard";

const Home = () => {
    const [keyword, setKeyword] = useState(
        () => sessionStorage.getItem("lastKeyword") || "",
    );
    const [series, setSeries] = useState(
        () => JSON.parse(sessionStorage.getItem("lastSeries")) || [],
    );
    const [movies, setMovies] = useState(
        () => JSON.parse(sessionStorage.getItem("lastMovies")) || [],
    );

    const [loading, setLoading] = useState(false);

    // Jika ada data di storage, anggap sudah pernah search
    const [hasSearched, setHasSearched] = useState(() => {
        return sessionStorage.getItem("lastKeyword") ? true : false;
    });

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!keyword) return;

        setLoading(true);
        setHasSearched(true);

        // Request API...
        const [seriesData, moviesData] = await Promise.all([
            searchMovies(keyword, 'series'),
            searchMovies(keyword, 'movie')
        ]);

        setSeries(seriesData);
        setMovies(moviesData);
        setLoading(false);

        // 2. TAMBAHKAN BAGIAN INI: Simpan ke sessionStorage agar tidak hilang
        sessionStorage.setItem('lastKeyword', keyword);
        sessionStorage.setItem('lastSeries', JSON.stringify(seriesData));
        sessionStorage.setItem('lastMovies', JSON.stringify(moviesData));
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header & Search */}
            <header className="bg-primary-dark p-8 shadow-lg">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl text-secondary font-ace mb-6 tracking-wide">
                        MOVIE DATABASE
                    </h1>
                    <form onSubmit={handleSearch} className="flex gap-2 max-w-xl mx-auto">
                        <input
                            type="text"
                            placeholder="Search movie title..."
                            className="flex-1 p-3 rounded-l-md font-brigade text-black outline-none border-2 border-transparent focus:border-secondary"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-secondary text-black font-ace text-lg px-8 py-3 rounded-r-md hover:bg-yellow-400 transition"
                        >
                            SEARCH
                        </button>
                    </form>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8 space-y-12">
                {loading && (
                    <div className="text-center font-ace text-2xl animate-pulse">
                        Loading data...
                    </div>
                )}

                {/* Section 1: Series Slider */}
                {!loading && series.length > 0 && (
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-8 w-2 bg-secondary"></div>
                            <h2 className="text-3xl text-primary-dark font-ace">
                                TV Series Results
                            </h2>
                        </div>
                        {/* Slider Horizontal menggunakan CSS Snap */}
                        <div className="grid grid-rows-2 grid-flow-col gap-4 overflow-x-auto pb-4 snap-x scrollbar-hide auto-cols-[80%] md:auto-cols-[45%]">
                            {series.map((item) => (
                                <div key={item.imdbID} className="snap-center h-full">
                                    {" "}
                                    {/* Pastikan ada h-full */}
                                    <MovieCard movie={item} />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Section 2: Movie Card Grid */}
                {!loading && movies.length > 0 && (
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-8 w-2 bg-primary-light"></div>
                            <h2 className="text-3xl text-primary-dark font-ace">
                                Movie Results
                            </h2>
                        </div>
                        {/* Grid: Mobile 1 kolom, Desktop 3 kolom */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {movies.map((item) => (
                                <MovieCard key={item.imdbID} movie={item} />
                            ))}
                        </div>
                    </section>
                )}

                {/* State Kosong */}
                {!loading &&
                    hasSearched &&
                    series.length === 0 &&
                    movies.length === 0 && (
                        <div className="text-center text-gray-500 font-ace text-xl mt-10">
                            Tidak ditemukan film atau series dengan kata kunci "{keyword}".
                        </div>
                    )}
            </main>
        </div>
    );
};

export default Home;
