import styles from './bouncingText.module.css'

const BouncingText = (props) => {
    const { text } = props
    if (!text || text === '') return null

    return (
        <div className={styles.bouncingText}>
            {text.split('').map((char, i) => (
                <span
                    key={text + '_' + char + '_' + i}
                    style={{
                        'animationDuration': '400ms',
                        'animationDelay': `calc(${i*.01}s)`
                    }}
                    className={`${styles.char} ${i % 2 === 0 ? styles.up : styles.down} ${char === ' ' && styles.space}`}
                >
                    {char}
                </span>
            ))}
        </div>
    )   
}

export default BouncingText