import { useEffect, useState } from 'react'
import styles from './overlay.module.css'
import BouncingText from '../bouncingText/BouncingText.js'

const Overlay = (props) => {
    const { text, seconds, countdown } = props
    const [showing, setShowing] = useState(true)
    const [countdownTime, setCountdownTime] = useState(3)

    useEffect(() => {
        setTimeout(() => {
            setShowing(false)
        }, seconds * 1000)

        if (countdown) {
            setTimeout(() => {
                setCountdownTime(2)
            }, 1000)
            setTimeout(() => {
                setCountdownTime(1)
            }, 2000)
            setTimeout(() => {
                setCountdownTime('GO!')
            }, 3000)
        }
    }, [])

    return (
        <div className={`${styles.overlay} ${!showing && styles.hidden}`}>
            <span className={styles.text}>
                <BouncingText text={text} />
            </span>
            {countdown && <span className={styles.countdown}>
                {countdownTime}
            </span>}
        </div>
    )
}

export default Overlay