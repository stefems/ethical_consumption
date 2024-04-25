import { useEffect, useState } from 'react'
import styles from './overlay.module.css'

const Overlay = (props) => {
    const { text, seconds } = props
    const [showing, setShowing] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setShowing(false)
        }, seconds * 1000);
    }, [])

    return (
        <div className={`${styles.overlay} ${!showing && styles.hidden}`}>
            <span className={styles.text}>{text}</span>
        </div>
    )
}

export default Overlay