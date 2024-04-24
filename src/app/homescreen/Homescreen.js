import styles from "./homescreen.module.css";
import Image from "next/image";

export default function Homescreen() {
    return (
        <div className={styles.container}>
            <div className={styles.workApp}>
                <div className={styles.color}>
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
            <div className={styles.socialApp}>
                <div className={styles.color}>
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
            <div className={styles.buyApp}>
                <div className={styles.color}>
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
        </div>
    )
}