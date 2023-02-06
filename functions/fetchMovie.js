import { API_URL } from "@/global";

const fetchMovie = async (selected, excluded) => {
    console.log("Fetching")
    let url = API_URL + "api/movie";
    url += "?selected=" + selected.join("+");
    url += excluded ? "&excluded=" + excluded.join("+") : "";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    // `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${searchTerm}`
}

export default fetchMovie