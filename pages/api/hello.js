// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// Import Dependencies
import { ChatGPTAPI } from "chatgpt";
const api = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY,
});
const findMovie = async (sellected, excluded) => {
  return await api.sendMessage(`What is a compromise popular movie from these movies: ${sellected.join(
    ","
  )}. ${excluded && `That is not ${excluded.join(",")}`}
  On first line, tell me name of that movie.
  On second line, send mi a IMDB link, to that movie.
  Nothing more.
  `);
  movie.split("\n");
  return movie
  return { name: movie[0], url: movie[1], text: movie[2] }
};


export default async function handler(req, res) {
  if (req.method === "GET") {
    const { text: movie } = await findMovie(["Harry Pother", "Avengers"]);
    
    console.log(movie.split("\n"))
    res.status(200).json(movie.split("\n"));
  }
  // console.log("Ahoj")
  // res.status(200).json({ name: 'John Doe' })
}
