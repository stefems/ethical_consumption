'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Homescreen from "./homescreen/Homescreen";
import Work from './games/work/Work';

export default function Home() {
  const [started, setStarted] = useState(false);
  const [onHome, setOnHome] = useState(false);
  const [activeGame, setActiveGame] = useState(null);
  const [appAlert, setAppAlert] = useState(null);

  useEffect(() => {
    if (started) {
      setOnHome(true);
      setAppAlert(0);
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
      {/* {activeGame === 0 && <Buy />} */}
      {/* {activeGame === 0 && <Social />} */}
    </main>
  );
}
