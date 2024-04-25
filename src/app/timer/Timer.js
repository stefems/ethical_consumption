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
        <div className={styles.timer}>

        </div>
    )
}

export default Timer