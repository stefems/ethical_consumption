'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Homescreen from "./homescreen/Homescreen";
import Work from './games/work/Work';
import Social from './games/social/Social';
import Buy from './games/buy/Buy';

export default function Home() {
  const [started, setStarted] = useState(false);
  const [onHome, setOnHome] = useState(false);
  const [activeGame, setActiveGame] = useState(null);
  const [appAlert, setAppAlert] = useState(null);

  useEffect(() => {
    if (started) {
      setOnHome(true);
      setAppAlert(2);
    }
  }, [started])

  useEffect(() => {
    if (activeGame != null) {
      setOnHome(false)
    }
  }, [activeGame])

  const goNext = () => {
    setOnHome(true)
    setAppAlert(appAlert == 2 ? 0 : appAlert + 1)
  }

  return (
    <main>
      {!started && 
        <button onClick={() => setStarted(true)}>
          START
        </button>
      }
      {started && onHome && <Homescreen appAlert={appAlert} setActiveGame={setActiveGame}/>}
      {!onHome && activeGame === 0 && <Work goNext={goNext} />}
      {!onHome && activeGame === 1 && <Social goNext={goNext} />}
      {!onHome && activeGame === 2 && <Buy goNext={goNext} />}
    </main>
  );
}
