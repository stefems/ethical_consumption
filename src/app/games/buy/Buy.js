'use client'

import styles from './buy.module.css'
import { useEffect, useState } from "react";
import Image from "next/image";

import Timer from "@/app/timer/Timer";
import Overlay from "@/app/overlay/Overlay";
import shuffle from '@/app/utils/shuffle';

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
    { name:  'cleaning supplies', cost: '15.00', cheaper: '8.00' },
    { name:  'vitamins', cost: '10.00', cheaper: '5.00' },
    { name:  'toilet paper', cost: '8.00', cheaper: '4.00' },
    { name:  'shampoo', cost: '7.00', cheaper: '3.00' },
    { name:  'light bulbs', cost: '20.00', cheaper: '10.00' },
    { name:  'shower curtain', cost: '10.00', cheaper: '5.00' },
    { name:  'plunger', cost: '20.00', cheaper: '10.00' },
    { name:  'rug', cost: '40.00', cheaper: '20.00' }
]

const badDescriptions = [
    'opposes unions',
    'lobbies for bad stuff',
    'has a monopoly',
    'mistreats workers'
]
const goodDescriptions = [
    'union-made',
    'recycled materials',
    'independently ownded',
    'low-waste packaging',
    'uses fair wages'
]
const Buy = (props) => {
    const { goNext } = props;
    const [started, setStarted] = useState(false)
    const [gameEnded, setGameEnded] = useState(false)
    const [checkingOut, setCheckingOut] = useState(false)
    const [gameWon, setGameWon] = useState(null)
    const [items, setItems] = useState([])
    const [mainItems, setMainItems] = useState([])
    const [cart, setCart] = useState([])

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
                    key: Math.random()
                })
                prepItems.push({
                    ...item,
                    cost: item.cost,
                    stars: Math.floor(Math.random() * 3) + 3,
                    description: goodDescriptions[Math.floor(Math.random() * goodDescriptions.length)],
                    key: Math.random()
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
                        key: Math.random()
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
            // if (gameWon == null) setGameWon(false)
            // setTimeout(() => goNext(), 2000)
        }
    }, [gameEnded])

    useEffect(() => {
        if (gameWon) {
            // game win noise
        } else if (gameWon === false) {
            // game lose noise
        }
    }, [gameWon])

    const inCart = (_key) => {
        return Boolean(cart.find(({ key }) => key === _key))
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

    return (
        <div className={styles.buy}>
            <Timer started={started} gameEnded={gameEnded} endGame={() => setGameEnded(true)}/>
            <div className={styles.logo}>
                amacon
                <Image
                    src="/amacon.png"
                    alt="amacon arrow logo"
                    className={`${styles.logo}`}
                    priority
                    width={188}
                    height={48}
                />
            </div>
            <div className={styles.items}>
                {items.map((item, i) => (
                    <div key={item.key} className={styles.item}>
                        <div className={styles.top}>
                            <span>{item.name}!</span>
                            <span>{item.cost}</span>
                        </div>
                        <div className={styles.stars}>
                            {[...Array(5)].map((value, index) => (
                                <Image
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
                            src={'/px/px1.png'}
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
            </div>
            <div className={styles.note}>
                <div className={styles.topBar} />
                <div className={styles.text}>
                    <span>NEed!</span>
                    <ul>
                        <li>new {mainItems[0]}</li>
                        <li>new {mainItems[1]}</li>
                    </ul>
                </div>
            </div>
            <div className={styles.checkout}>
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
                    onClick={() => setCheckingOut(true)}
                    className={styles.itemButton}
                >
                    CHECKOUT!
                </button>
            </div>
            {gameEnded && gameWon != null && <Overlay seconds={2} text={gameWon === true ? 'Buying feels good!' : 'HMM'}/>}
        </div>
    )
}

export default Buy