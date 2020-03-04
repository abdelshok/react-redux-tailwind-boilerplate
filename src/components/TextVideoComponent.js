// TextVideoComponent
// Re-usable text that will have and display a video as it's "fill-in" / background

// External Packages
import React, { Component } from 'react';
import styled from 'styled-components'
// Internal Files
// import djVideo from '../assets/videos/djVideo.mp4';

const VideoWrapper = styled.div`
    height: 200px;
    width: 200px;
    margin-top: 20px;
`
const TextVideoComponent = () => (
    <VideoWrapper>
        <video autoplay muted loop>
            {/* <source src={djVideo} type="video/mp4" /> */}
        </video>
    </VideoWrapper>
)

export default TextVideoComponent