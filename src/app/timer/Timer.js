'use client'
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import styles from "./timer.module.css";

const Timer = (props) => {
    const { started, endGame, gameEnded } = props
    const timer = useRef()

    useEffect(() => {
        if (started) {
            timer.current = setTimeout(() => {
                endGame && endGame();
            }, 5000)
        }
    }, [started])

    useEffect(() => {
        if (gameEnded) {
            clearTimeout(timer.current)
        }
    }, [gameEnded])

    useEffect(() => {
        // clear on component unmount
        return () => {
            clearTimeout(timer.current);
        };
    }, [])
    
    return (
        <div className={styles.container}>
            <div className={styles.timer}>
                {!gameEnded &&
                    <Image
                        src="/flame.png"
                        alt="pixelated candle flame"
                        className={`${styles.flame}`}
                        priority
                        width={76}
                        height={57}
                    />
                }
                {!gameEnded &&
                    <Image
                        src="/candle.png"
                        alt="pixelated candle"
                        className={`${styles.candle}`}
                        priority
                        width={150}
                        height={930}
                    />
                }
            </div>
        </div>
    )
}

export default Timer