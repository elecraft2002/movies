import React, { useState, useEffect } from "react";
import { TMDB_API_KEY } from "../globals";



const SearchBar = (selectedMovies, setSelectedMovies) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // const response = await fetch(
            //   `https://v3.sg.media-imdb.com/suggestion/titles/x/${encodeURIComponent(searchTerm)}.json?includeVideos=1`
            // );
            const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${searchTerm}`
            );
            const data = await response.json();
            setResults(data.results);
            console.log(results)
        };
        if (searchTerm) {
            fetchData();
        }
    }, [searchTerm]);

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };
    return (
        <div>
            <input
                type="text"
                placeholder={selectedMovies.selectedMovies.title}
                value={searchTerm}
                onChange={handleSearchTermChange}
            />
            <ul>
                {results.map((movie) => (
                    <li key={movie.id}>{movie.title}, id: {movie.id}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchBar;