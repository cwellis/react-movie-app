import React, { useState, useEffect } from "react";

// importing the movie card component
import MovieCard from "./MovieCard";
// importing the search icon
import SearchIcon from "./Search.svg";
// importing the css
import "./App.css";

// taking the api so we can use the info in our map
const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

const App = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);

    // use effect starts the page off with whatever is placed in the quotes for this site
    useEffect(() => {
        searchMovies("Batman");
      }, []);

    //   using title as a prop/ parameter to search through the api with titles that have a matching word
      const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
    
        // retrieves data from searching through the api
        setMovies(data.Search);
      };

    return (
        // html to create the look of the webpage
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input 
                    // using the input to run the searchMovies function when pressing enter
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for Movies"
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            searchMovies(searchTerm)
                        }
                    }}
                />
                
                <img 
                    // using the img as another method to be able to search on click
                    src={SearchIcon} 
                    alt="search" 
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {movies.length > 0 ? (
                // if movies are found, then map through the API to get their info and place them onto the webpage
                <div className="container">
                    {movies.map((movie) => (
                        <MovieCard movie={movie} />
                    ))}
                </div>
            ) : (
                // if no movies are found, then display the page as empty and "No Movies Found"
                <div className="empty">
                    <h2>No Movies Found</h2>
                </div>
            )}
        </div>
    );
}

export default App;