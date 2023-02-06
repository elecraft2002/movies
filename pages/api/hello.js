// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// Import Dependencies
import { ChatGPTAPI } from "chatgpt";
const api = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY,
});
const findMovie = async (sellected, excluded) => {
  const { text: movie } = await api.sendMessage(`What is a compromise popular movie from these movies: ${sellected.join(
    ","
  )}. ${excluded && `That is not ${excluded.join(",")}`}
  On first line, tell me name of that movie.
  On second line, send mi a IMDB link, to that movie.
  On third line, tell me a good reason, why should I watch it.`);
  movie.split("\n")
  return { name: movie[0], url: movie[1], text: movie[2] }
};


export default async function handler(req, res) {
  if (req.method === "GET") {
    const movie = await findMovie(["Harry Pother", "Avengers"]);

    console.log(movie)
    res.status(200).json(movie);
  }
  // console.log("Ahoj")
  // res.status(200).json({ name: 'John Doe' })
}
