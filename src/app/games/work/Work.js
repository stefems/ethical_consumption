'use client'
import { useEffect, useState } from "react";
import Image from "next/image";

import styles from "./work.module.css";
import Timer from "@/app/timer/Timer";
import Overlay from "@/app/overlay/Overlay";

const Work = (props) => {
    const { goNext } = props;
    const [numbers, setNumbers] = useState(null);
    const [started, setStarted] = useState(false)
    const [corrections, setCorrections] = useState(0);
    const [errors, setErrors] = useState(0);
    const [gameEnded, setGameEnded] = useState(false)
    const [gameWon, setGameWon] = useState(null)

    useEffect(() => {
        if (!started) {
            setStarted(true);
            let prepNumbers = [];
            for (let i = 0; i < 2000; i++) {
                const isFlipped = Math.floor(Math.random() * 30) === 9;
                prepNumbers.push({ value: Math.floor(Math.random() * 10), flipped: isFlipped})
            }
            setNumbers(prepNumbers);
        }
    }, [])

    const clickNumber = (correctChoice, event) => {
        event.target.disabled = true;
        if (correctChoice) {
            // correct noise
            setCorrections(corrections+1);
        } else {
            // error noise
            setErrors(errors+1);
        }
    }

    useEffect(() => {
        if (errors === 3) {
            setGameWon(false)
            setGameEnded(true)
        } else if (corrections === 3) {
            setGameWon(true)
            setGameEnded(true)
        }
    }, [errors, corrections])

    useEffect(() => {
        if (gameEnded) {
            if (gameWon == null) setGameWon(false)
            // setTimeout(() => goNext(), 2000)
        }
    }, [gameEnded])

    useEffect(() => {
        if (gameWon) {
            // game win noise
        } else if (gameWon === false) {
            // game lose noise
        }
    }, [gameWon])

    return (
        <div className={styles.work}>
            {/* {started && <Overlay seconds={1} text={'Find the Bad Numbers!'}/>} */}
            <Timer started={started} gameEnded={gameEnded} endGame={() => setGameEnded(true)}/>
            {started && <div className={styles.numbers}>
                {numbers && numbers.map((number) => {
                    return (
                        <button
                            onClick={(event) => clickNumber(number.flipped, event)}
                            className={`${styles.number} ${number.flipped && styles.flipped}`}
                        >
                            {number.value}
                        </button>
                    )
                })}
            </div>}
            {started && <div className={styles.info}>
                <div className={styles.infoText}>
                    <span className={styles.title}>Corrections!</span>
                    {[...Array(3).keys()].map((i) => (
                        <span className={styles.correct}>
                            <Image
                                src="/check.png"
                                alt="check mark"
                                className={`${styles.check} ${corrections > i && styles.visible}`}
                                priority
                                width={50}
                                height={50}
                            />
                        </span>
                        )
                    )}
                </div>
                <div className={styles.infoText}>
                    <span className={styles.title}>Errors!</span>
                    {[...Array(3).keys()].map((i) => (
                        <span className={styles.error}>
                            <span
                                className={`${styles.x} ${errors > i && styles.visible}`}
                            >
                                X
                            </span>
                        </span>
                        )
                    )}
                </div>
            </div>}
            {gameEnded && gameWon != null && <Overlay seconds={2} text={gameWon === true ? 'Good Work!' : 'Poor Performance!'}/>}
        </div>
    )
}

export default Work