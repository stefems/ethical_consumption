'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Homescreen from "./homescreen/Homescreen";
import Work from './games/work/Work';
import Social from './games/social/Social';
import Buy from './games/buy/Buy';
import BouncingText from "./bouncingText/BouncingText";

export default function Home() {
  const [started, setStarted] = useState(false);
  const [onHome, setOnHome] = useState(false);
  const [activeGame, setActiveGame] = useState(null);
  const [appAlert, setAppAlert] = useState(null);
  const [points, setPoints] = useState(100)

  useEffect(() => {
    if (started) {
      setOnHome(true);
      setAppAlert(0)
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
      {!started && (
        <div className={styles.titleInfo}>
          <div className={styles.caption}>
            An entry for the <i>Fuck Capitalism</i> Game Jam titled...
          </div>
          <div className={styles.title}>
            Undivided Attention
          </div>
          <div className={styles.subtitle}>
            A game about our attention economy...
          </div>
          <div className={styles.info}>
            Get the new high score! Click start to begin!
          </div>
          <button className={styles.startGame} onClick={() => setStarted(true)}>
            START GAME
          </button>
        </div>
      )}
      {started && onHome && <Homescreen appAlert={appAlert} setActiveGame={setActiveGame}/>}
      {!onHome && activeGame === 0 && <Work goNext={goNext} points={points} setPoints={setPoints} />}
      {!onHome && activeGame === 1 && <Social goNext={goNext} points={points} setPoints={setPoints} />}
      {!onHome && activeGame === 2 && <Buy goNext={goNext} points={points} time={10000} setPoints={setPoints} />}
    </main>
  );
}
