'use client'

import styles from './buy.module.css'
import { useEffect, useState } from "react";
import Image from "next/image";

import Timer from "@/app/timer/Timer";
import Overlay from "@/app/overlay/Overlay";
import shuffle from '@/app/utils/shuffle';
import BouncingText from '@/app/bouncingText/BouncingText';

const itemNames = [
    { name: 'blender', cost: '70.00', cheaper: '30.00' },
    { name: 'tv', cost: '150.00', cheaper: '70.00' },
    { name: 'desk', cost: '80.00', cheaper: '40.00' },
    { name: 'lamp', cost: '30.00', cheaper: '15.00' },
    { name: 'kettle', cost: '20.00', cheaper: '10.00' },
    { name: 'plant', cost: '30.00', cheaper: '15.00' },
    { name: 'coasters', cost: '10.00', cheaper: '5.00' },
    { name: 'shoes', cost: '60.00', cheaper: '30.00' },
    { name: 'side table', cost: '70.00', cheaper: '35.00' },
    { name: 'suitcase', cost: '80.00', cheaper: '40.00' },
    { name: 'belt', cost: '20.00', cheaper: '10.00' },
    { name: 'backpack', cost: '70.00', cheaper: '35.00' },
    { name: 'sweater', cost: '20.00', cheaper: '10.00' },
    { name: 'cleaning supplies', cost: '15.00', cheaper: '8.00' },
    { name: 'vitamins', cost: '10.00', cheaper: '5.00' },
    { name: 'toilet paper', cost: '8.00', cheaper: '4.00' },
    { name: 'shampoo', cost: '7.00', cheaper: '3.00' },
    { name: 'light bulbs', cost: '20.00', cheaper: '10.00' },
    { name: 'shower curtain', cost: '10.00', cheaper: '5.00' },
    { name: 'plunger', cost: '20.00', cheaper: '10.00' },
    { name: 'rug', cost: '40.00', cheaper: '20.00' }
]

const badDescriptions = [
    'opposes unions',
    'lobbies for bad stuff',
    'has a monopoly',
    'mistreats workers'
]
const goodDescriptions = [
    'union made',
    'recycled materials',
    'independently ownded',
    'low waste packaging',
    'uses fair wages'
]
const Buy = (props) => {
    const { goNext, time, points, setPoints } = props;
    const [started, setStarted] = useState(false)
    const [gameEnded, setGameEnded] = useState(false)
    const [checkingOut, setCheckingOut] = useState(false)
    const [gameWon, setGameWon] = useState(null)
    const [items, setItems] = useState([])
    const [mainItems, setMainItems] = useState([])
    const [cart, setCart] = useState([])
    const [endMessage, setEndMessage] = useState('')

    useEffect(() => {
        if (!started) {
            setStarted(true);
            let prepItems = [];
            const desiredItems = [
                itemNames[Math.floor(Math.random() * Math.floor(itemNames.length/2))],
                itemNames[Math.floor(Math.random() * Math.floor(itemNames.length/2)) + Math.floor(itemNames.length/2)]
            ]
            setMainItems([desiredItems[0].name, desiredItems[1].name])
            desiredItems.forEach((item) => {
                prepItems.push({
                    ...item,
                    cost: item.cheaper,
                    stars: Math.floor(Math.random() * 2) + 1,
                    description: badDescriptions[Math.floor(Math.random() * badDescriptions.length)],
                    key: Math.random(),
                    ethical: false,
                    needed: true
                })
                prepItems.push({
                    ...item,
                    cost: item.cost,
                    stars: Math.floor(Math.random() * 3) + 3,
                    description: goodDescriptions[Math.floor(Math.random() * goodDescriptions.length)],
                    key: Math.random(),
                    ethical: true,
                    needed: true
                })
            })
            const unrelatedItems = []
            while (unrelatedItems.length < 4) {
                const newItem = itemNames[Math.floor(Math.random() * itemNames.length)]
                if (newItem.name !== desiredItems[0].name &&
                    newItem.name !== desiredItems[1].name &&
                    !unrelatedItems.find(({ name }) => name === newItem.name)
                ) {
                    unrelatedItems.push({
                        ...newItem,
                        cost: newItem.cheaper,
                        stars: Math.floor(Math.random() * 2) + 1,
                        description: badDescriptions[Math.floor(Math.random() * badDescriptions.length)],
                        key: Math.random(),
                        needed: false
                    })
                }
            }
            prepItems = [...prepItems, ...unrelatedItems];
            shuffle(prepItems);
            setItems(prepItems);
        }
    }, [])

    useEffect(() => {
        if (gameEnded) {
            if (gameWon === null) {
                setGameWon(false)
                setEndMessage('The sale ended! \n minus 10 score')
            }
            setTimeout(() => goNext(), 2000)
        }
    }, [gameEnded])

    useEffect(() => {
        if (gameWon) {
            // game win noise
            setPoints(points + 60)
        } else if (gameWon === false) {
            // game lose noise
            setPoints(points - 10)
        }
    }, [gameWon])

    const inCart = (_key) => {
        return Boolean(cart.find(({ key }) => key === _key))
    }

    const cartTotal = () => {
        return cart.reduce((reduction, item) => parseInt(item.cost) + reduction, 0)
    }

    const add = (item) => {
        const newCartItems = [...cart, item]
        setCart(newCartItems)
    }

    const remove = (_key) => {
        const newItems = cart.filter((p) => {
            return p.key !== _key
        });
        setCart(newItems);
    }

    const purchase = () => {
        let finalMessage = 'buying cheap stuff feels good! \n plus 60 score'
        let wonChange = true
        for(let i = 0; i < cart.length; i++){
            const item = cart[i]
            if (item.needed === false) {
                finalMessage = "Oops, why did we buy that? \n minus 10 score"
                wonChange = false
                break
            } else if (item.ethical === true) {
                wonChange = false
                finalMessage = "buying ethically is so expensive... \n minus 10 score"
            }
        }
        setEndMessage(finalMessage)
        setGameWon(wonChange)
        setGameEnded(true)
    }

    return (
        <div className={styles.buy}>
            <Timer
                points={points}
                started={started}
                gameEnded={gameEnded}
                endGame={() => setGameEnded(true)}
                time={time}
            />
            <div className={styles.logo}>
                <BouncingText text="amacon" />
                <Image
                    src="/amacon.png"
                    alt="amacon arrow logo"
                    className={`${styles.logo}`}
                    priority
                    width={188}
                    height={48}
                />
            </div>
            {!checkingOut && <div className={styles.items}>
                {items.map((item, i) => (
                    <div key={item.key} className={styles.item}>
                        <div className={styles.top}>
                            <span>{item.name}!</span>
                            <span>{item.cost}</span>
                        </div>
                        <div className={styles.stars}>
                            {[...Array(5)].map((value, index) => (
                                <Image
                                    key={item.name + '_star' + index}
                                    src={'/star.png'}
                                    alt="pixelated star icon"
                                    className={`${styles.star} ${index <= item.stars && styles.filled}`}
                                    priority
                                    width={40}
                                    height={40}
                                />
                            ))}
                        </div>
                        <Image
                            src={`/px/items/${item.name}.png`}
                            alt="vague pixelated image"
                            className={`${styles.image}`}
                            priority
                            width={185}
                            height={144}
                        />
                        {!inCart(item.key) ? (
                            <button 
                                onClick={() => add(item)}
                                className={`${styles.itemButton} ${styles.add}`}
                            >
                                add to cart
                            </button>
                        ) : (
                            <button
                                onClick={() => remove(item.key)}
                                className={`${styles.itemButton} ${styles.remove}`}
                            >
                                remove
                            </button>
                        )
                        }
                    </div>
                ))}
            </div>}
            <div className={styles.note}>
                <div className={styles.topBar} />
                <div className={styles.text}>
                    <BouncingText text="I Need!" />
                    <ul>
                        <li>new {mainItems[0]}</li>
                        <li>new {mainItems[1]}</li>
                    </ul>
                </div>
            </div>
            {!checkingOut && <div className={styles.checkout}>
                <div className={styles.cartWrapper}>
                    <Image
                        src="/cart.png"
                        alt="cart logo"
                        className={`${styles.cart}`}
                        priority
                        width={118}
                        height={90}
                    />
                    <span className={styles.cartNumber}>{cart.length}</span>
                </div>
                <button
                    disabled={cart.length < 2}
                    onClick={() => setCheckingOut(true)}
                    className={`${styles.itemButton}`}
                >
                    CHECKOUT!
                </button>
            </div>}
            {checkingOut && <div className={styles.checkoutPage}>
                {cart.map((item, i) => (
                    <div key={'cart_' + item.key} className={styles.item}>
                        <span className={styles.itemName}>{item.name}</span>
                        <div className={styles.itemRow}>
                            <Image
                                src={`/px/items/${item.name}.png`}
                                alt="amacon arrow logo"
                                className={`${styles.logo}`}
                                priority
                                width={188}
                                height={144}
                            />
                            <div className={styles.info}>
                                <span className={styles.extra}>Extra info</span>
                                <span>{item.description}</span>
                                <span>{item.stars} out of 5 stars</span>
                            </div>
                            <span className={styles.cost}>
                                {item.cost}
                            </span>
                        </div>
                    </div>
                ))}
                <div className={styles.total}>
                    <span>total</span>
                    <span>{cartTotal()}.00</span>
                    <button
                        onClick={purchase}
                        className={styles.itemButton}
                    >
                        <BouncingText text="purchase!" />
                    </button>
                </div>
            </div>
            }
            {gameEnded && gameWon != null && <Overlay seconds={200} text={endMessage}/>}
        </div>
    )
}

export default Buy