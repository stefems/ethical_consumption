'use client'

import { useState, useEffect } from "react";

const AudioModule = (props) => {
  const { fileUrl, play, done } = props
  const [audio, setAudio] = useState(null);
  const [playing, setPlaying] = useState(false);


  useEffect(() => {   
    setAudio(new Audio(fileUrl))
    if (audio) {
      audio.addEventListener('ended', () => {
        audio.pause()
        setPlaying(false)
      });
      return () => {
        audio.removeEventListener('ended', () => {
          audio.pause()
          setPlaying(false)
       });
      };
    }
  }, []);

  useEffect(() => {
    if (audio) {
      audio.addEventListener('ended', () => {
        audio.pause()
        setPlaying(false)
      });
      return () => {
        audio.removeEventListener('ended', () => {
          audio.pause()
          setPlaying(false)
       });
      };
    }
  }, [audio]);
  

  useEffect(() => {
    if (playing === false) {
      done()
    }
  }, [playing])

  useEffect(() => {
    if (play && playing === false) {
      audio.play()
      setPlaying(true)
    }
  }, [play])

  return null;
};

export default AudioModule