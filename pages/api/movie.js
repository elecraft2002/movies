import { ChatGPTAPI } from "chatgpt";

const api = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY,
});
const findMovie = async (selected, excluded) => {
  return await api.sendMessage(`What is a compromise popular movie from these movies: ${selected.join(
    ","
  )}. ${excluded && `That is not ${excluded.join(",")}`}
  On first line, send mi a IMDB link, to that movie.
  On second line, tell me a good reason, why should I watch it.`);
};

export default async function handler(req, res) {

  const selected = req.query.selected?.split("+")
  const excluded = req.query.selected?.split("+")
  console.log(selected)
  if (!selected) {
    res.status(404).json("error")
  }
  if (req.method === "GET") {

    const { text: movie } = await findMovie(selected, excluded);

    console.log(movie.split("\n"))
    res.status(200).json(movie.split("\n"));
  }
  // console.log("Ahoj")
  // res.status(200).json({ name: 'John Doe' })
}
