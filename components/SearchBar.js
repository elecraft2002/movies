import Glass from "@/assets/svgs/glass";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { imageSize, TMDB_API_KEY } from "../globals";

const StyledInput = styled.input`
border:none;
background:none;
outline: none;
&::placeholder{
    color:white;
}
`
const StyledSearch = styled.span`
display:inline-flex;
padding: 0.5rem;
gap: 0.5rem;
background: rgba(255, 255, 255, 0.2);
border-radius: 5px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(5px);
-webkit-backdrop-filter: blur(5px);
border: 1px solid rgba(255, 255, 255, 0.3);
`
const StyledRecomendation = styled.ul`
list-style:none;
position:absolute;
`
const SearchBar = ({ selectedMovies, setSelectedMovies, index }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // const response = await fetch(
            //   `https://v3.sg.media-imdb.com/suggestion/titles/x/${encodeURIComponent(searchTerm)}.json?includeVideos=1`
            // );
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${searchTerm}`);
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
    // console.log(selectedMovies)
    const handleSearchSelect = (movie) => {
        setSelectedMovies((oldMovies) => {
            console.log(oldMovies)
            let newMovies = oldMovies
            newMovies[index] = movie
            return [...newMovies];
        });
        setSearchTerm("")
        setResults([])
    };
    return (
        <div>
            <StyledSearch>
                <StyledInput
                    type="text"
                    placeholder={selectedMovies.title}
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                /><Glass />
            </StyledSearch>
            <StyledRecomendation>
                {searchTerm && results.map((movie) => (
                    <li key={movie.id}>
                        <button onClick={() => handleSearchSelect(movie)}  >
                            {movie.poster_path && <img src={imageSize.small + movie.poster_path} />}
                            <div>{movie.title}</div>
                        </button>
                    </li>
                ))}
            </StyledRecomendation>
        </div>
    );
};

export default SearchBar;