import { useState, useEffect } from "react";

const AudioModule = (props) => {
  const { fileUrl, play, done } = props
  const [audio] = useState(new Audio(fileUrl));
  const [playing, setPlaying] = useState(false);


  useEffect(() => {   
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
  }, []);

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