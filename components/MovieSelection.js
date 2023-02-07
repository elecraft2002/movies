import { imageSize } from '@/globals'
import { FastAverageColor } from 'fast-average-color'
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import SearchBar from './SearchBar'

const StyledImg = styled.img`
    width:100%;
    height: 100%;
    object-fit:cover;
    object-position:center;
`
const StyledImgContainer = styled.div`
    width:40vw;
    max-width:300px;
    aspect-ratio:1;
    position:relative;
    &::after{
        position:absolute;
        content:"";
        background:url(${(props) => props.url});
        left:0;
        top:0;
        width:100%;
        height:100%;
        border-radius:50%;
        filter:blur(35px);
        transform:scale(1.5);
        z-index:-1;
    }
`
const StyledContainer = styled.div`
`

export default function MovieSelection({ selectedMovies, setSelectedMovies }) {

    const imgUrl = imageSize.medium + selectedMovies.poster_path;
    return (
        <div>
            <StyledImgContainer url={imgUrl}>
                <StyledImg src={imgUrl} />
            </StyledImgContainer>
            <SearchBar selectedMovies={selectedMovies} setSelectedMovies={setSelectedMovies}/>
        </div>
    )
}
