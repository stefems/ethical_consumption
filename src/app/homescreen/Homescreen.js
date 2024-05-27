'use client'
import { useEffect, useState } from "react";
import Overlay from "@/app/overlay/Overlay";

import styles from "./homescreen.module.css";
import Image from "next/image";
import BouncingText from "../bouncingText/BouncingText";
import DayEnd from "../dayEnd/DayEnd";

const gameOverlayText = [
    'Find the Bad Numbers!',
    'Like 3 Posts!',
    'Buy What You Need!'
]

const overlayTime = 4000

const Homescreen = (props) => {
    const { appAlert, setActiveGame, day, showDayEnd } = props;

    const [handVisible, setHandVisible] = useState(false)
    const [handMoving, setHandMoving] = useState(false)
    const [handClick, setHandClick] = useState(false)
    const [showOverlay, setShowOverlay] = useState(false)

    const reset = () => {
        setHandMoving(false)
        setHandClick(false)
        setHandVisible(false)
        setShowOverlay(false)
    }

    useEffect(() => {
        if (!handMoving && appAlert != null && !showDayEnd) {
            setHandVisible(true);
            setTimeout(() => setHandMoving(true), 1000);
            setTimeout(() => setHandClick(true), 2000);
        }
    }, [appAlert])

    useEffect(() => {
        if (handClick) {
            setTimeout(() => {
                setShowOverlay(true)
            }, 400);
            setTimeout(() => {
                setActiveGame(appAlert)
                reset()
            }, overlayTime + 400);
        }
    }, [handClick])

    return (
        <div className={styles.container}>
            {showDayEnd && <DayEnd /> }
            {showOverlay && <Overlay countdown={true} seconds={overlayTime/1000} text={gameOverlayText[appAlert]} />}
            <div className={`${styles.workApp} ${handClick && appAlert === 0 && styles.click}`}>
                <div className={styles.color}>
                    {appAlert === 0 && <span className={styles.alert}>
                        !!!
                    </span>}
                    <Image
                        src="/hammer.png"
                        alt="hammer app icon"
                        className={styles.workIcon}
                        priority
                        width={90}
                        height={80}
                    />
                </div>
                {appAlert === 0 ? <BouncingText text="WORK" /> : <span>WORK</span>}
            </div>
            <div className={`${styles.socialApp} ${handClick && appAlert === 1 && styles.click}`}>
                <div className={styles.color}>
                    {appAlert === 1 && <span className={styles.alert}>
                        !!!
                    </span>}
                    <Image
                        src="/social.png"
                        alt="social smile face app icon"
                        className={styles.socialIcon}
                        priority
                        width={90}
                        height={90}
                    />
                </div>
                {appAlert === 1 ? <BouncingText text="SOCIAL" /> : <span>SOCIAL</span>}
            </div>
            <div className={`${styles.buyApp} ${handClick && appAlert === 2 && styles.click}`}>
                <div className={styles.color}>
                    {appAlert === 2 && <span className={styles.alert}>
                        !!!
                    </span>}
                    <Image
                        src="/cart.png"
                        alt="shopping cart icon"
                        className={styles.buyIcon}
                        priority
                        width={80}
                        height={65}
                    />
                </div>
                {appAlert === 2 ? <BouncingText text="BUY" /> : <span>BUY</span>}
            </div>
            {handVisible && <div
                className={`
                    ${styles.hand}
                    ${handMoving && styles['app'+appAlert]}
                `}
            >
                <Image
                    src="/hand.png"
                    alt="realistic hand"
                    className={`${styles.handImage} ${handClick && styles.handClick}`}
                    priority
                    width={516}
                    height={736}
                />
            </div>}
            <div className={styles.day}>
                Day {day}
            </div>
        </div>
    )
}

export default Homescreen