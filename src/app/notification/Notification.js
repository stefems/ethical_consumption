import { useEffect, useState } from 'react'
import { getOnlyName } from '../utils/usernameMaker'
import styles from './notification.module.css'
import Image from "next/image";

const messages = [
    'Hey! Join us for that protest today?',
    'You want to get coffee and vent about stuff?',
    'Join me at the march today!',
    'we gotta do something, right?',
    'why is the news so misleading wtf',
    'why do our jobs suck so much ughh',
    'meet soon to discuss unionizing??',
    'i know youre exhausted but lets chat soon?',
    'we should start a buy nothing group',
    'i wish our town had a food co op',
    'the weather is great today, come outside??',
    'what? they havent promoted you yet??!',
    'you should join our book club!',
    'you there? yooooo',
    'yo did you see the news??',
    'Im so angry ughhh this sucks',
    'yo i just watched a great doc you got to see it',
    'Yo! How are you holding up?',
    'Stop lurking lol lets hang irl?',
    'i met some chill neighbors today!',
    'Where were you yesterday?',
    'Sad I missed you yesterday.',
    'yooo I miss you. see me soon?',
    'you never answer my texts anymore',
    'i miss youuuuu',
    'we gotta organize, we gotta do something',
    'i felt stuck but this honestly helped'
]

const Notification = (props) => {

    const { day } = props
    const [showing, setShowing] = useState(false)
    const name = getOnlyName()
    const message = messages[Math.floor(Math.random() * messages.length)]

    useEffect(() => {
        if (day <= 2) {
            const chance = ((Math.floor(Math.random() * 2) + 1) % 2) === 0
            setShowing(chance)
        } else if (day >= 3) {
            setShowing(true)
        }
    }, [])

    useEffect(() => {
        if (showing) {
            setTimeout(() => {
                setShowing(false)
            }, 2000) 
        }
    }, [showing])

    if (!showing) return null

    return (
        <div className={styles.notification}>
            <div className={styles.bubble}>
                <Image
                    src={'/messages.png'}
                    alt="pixelated image of message app logo"
                    className={`${styles.image}`}
                    priority
                    width={90}
                    height={90}
                />
                <div className={styles.text}>
                    <span className={styles.name}>
                        {name}
                    </span>
                    <span className={styles.message}>
                        {message}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Notification