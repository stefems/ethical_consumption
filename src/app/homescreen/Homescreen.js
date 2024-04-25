'use client'
import { useEffect, useState } from "react";
import Overlay from "@/app/overlay/Overlay";

import styles from "./homescreen.module.css";
import Image from "next/image";

const gameOverlayText = [
    'Find the Bad Numbers!',
    'Buy What You Need!',
    'Like 3 Posts!'
]

const Homescreen = (props) => {
    const { appAlert, setActiveGame } = props;

    const [handVisible, setHandVisible] = useState(false)
    const [handMoving, setHandMoving] = useState(false)
    const [handClick, setHandClick] = useState(false)
    const [showOverlay, setShowOverlay] = useState(false)

    const reset = () => {
        setHandMoving(false)
        setHandClick(false)
        setHandVisible(false)
    }

    useEffect(() => {
        if (!handMoving && appAlert != null) {
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
            }, 1400);
        }
    }, [handClick])

    return (
        <div className={styles.container}>
            {showOverlay && <Overlay seconds={1} text={gameOverlayText[appAlert]}/>}
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
                <span>WORK</span>
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
                <span>SOCIAL</span>
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
                <span>BUY</span>
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
        </div>
    )
}

export default Homescreen