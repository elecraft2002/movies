import Button from '@/components/Button';
import Category from '@/components/Category';
import MovieSelection from '@/components/MovieSelection';
import fetchMovie from '@/functions/fetchMovie';
import { imageSize, TMDB_API_KEY } from '@/globals';
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const COLORS = {
  dark: "#1A1A1A",
  red: "red",
  light: "white"
}

const StyledMain = styled.main`
min-height:100vh;
display:flex;
flex-direction:column;
`;

const StyledTopSection = styled.section`
height:100vh;
position:relative;
display:flex;
flex-direction:column;
align-items:center;
text-align:center;
`
const StyledTopBackground = styled.div`
  width:100vw;
  height:100vh;
  position:absolute;
  top:0;
  left:0;
  z-index:-1;
  display:flex;
  
`

const StyledImg = styled.img`
width:100%;
object-fit:cover;
object-position:center;
height:100%;
filter:blur(10px);
opacity:.4  ;
`

const StyledTopBackgroundImgContainer = styled.div`
height:100%;
overflow:hidden;
`

const StyledHeading = styled.h1`
  font-size:150px;
`

const StyledFloatingText = styled.p`
font-size:50px;
`
const StyledSelectionContainer = styled.div`
display:flex;
justify-content:space-evenly;
width:100%;
align-items:center;
`

const StyledPlus = styled.p`
font-size:50px;
`

export default function Home() {
  const LANG = "cs";

  const [selectedMovies, setSelectedMovies] = useState(null)

  useEffect(() => {
    const load = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=${LANG}`)
      const data = await response.json();
      setSelectedMovies(data.results.slice(0, 2))
    }
    load()
  }, [])
  
  const handleFetchButton=()=>{
    console.log("Fetch")
    fetchMovie(selectedMovies.map(movie=>movie.title))
  }

  return (
    <>
      <Head>
        <title>Najděte film</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledMain>
        <StyledTopSection>
          <div>
            <StyledHeading>PAIR IT</StyledHeading>
            <StyledFloatingText>Lepší než sex!</StyledFloatingText>
          </div>
          <StyledSelectionContainer>
            {selectedMovies?.map((movie, i) => {
              return <>
                <MovieSelection index={i} key={i} selectedMovies={movie} setSelectedMovies={setSelectedMovies} />
                {selectedMovies.length != i + 1 && <StyledPlus key={i + "x"}>+</StyledPlus>}
              </>
            })}
          </StyledSelectionContainer>
          <Category />
          <button  onClick={handleFetchButton}>Calculate</button>
          <StyledTopBackground>
            {selectedMovies?.map((movie, i) => {
              return (
                <StyledTopBackgroundImgContainer key={i}>
                  <StyledImg src={imageSize.medium + movie.backdrop_path} />
                </StyledTopBackgroundImgContainer>)
            })}
          </StyledTopBackground>
        </StyledTopSection>
        <section>
          <div>
            <figure><StyledImg /></figure>
          </div>
          <div>
            <div>
              <p>
                <span>
                  Kolečko
                </span>
                100% shoda
              </p>
            </div>
            <h2>Jméno</h2>
            <p>Lorem ipsum bráško</p>
          </div>
        </section>
      </StyledMain>
    </>
  )
}
