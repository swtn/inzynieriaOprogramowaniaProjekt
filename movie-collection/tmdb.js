const axios = require("axios");

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

async function searchMovies(query) {
    const res = await axios.get(`${BASE_URL}/search/movie`, {
        params:{
            api_key: API_KEY,
            query,
            language: "pl-PL",
        },
    });
    return res.data.results;
}

async function getMovieDetails(id) {
    const res = await axios.get(`${BASE_URL}/movies/${id}`, {
        params: {
            api_key = API_KEY,
            language: "pl-PL",
        },
    });
    return res.data;    
}

module.exports = { searchMovies, getMovieDetails };