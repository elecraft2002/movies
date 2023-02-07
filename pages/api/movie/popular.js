export default async function handler(req, res) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${req.query.api_key}&language=${req.query.language}`)
    const data = await response.json();
    res.status(response.status).json(data)
}