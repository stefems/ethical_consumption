import styles from './social.module.css'
import usernameMaker from '../../utils/usernameMaker'
import PixelGrid from '@/app/pixelGrid/PixelGrid';
import { useEffect, useState } from "react";
import Image from "next/image";
import shuffle from '@/app/utils/shuffle';
import Timer from '@/app/timer/Timer';

const adText = [
    'Limited time offer!',
    '20 percent off!',
    'Wow! look at these deals!',
    'Seasonal Sale! Hooray!',
    'Create your new look today!',
    'Free shipping on offers above one hundred dollars!',
    'You want to see these deals!'

]

const companyNames = [
    'Noke has the best shoes.',
    'Feel new in the new 4 camera photo mode plus, by Blipple.',
    'These aprons by Wheatly are green and GMO free.',
    'Rainjackets from BEI that are affordable and mostly waterproof!',
    'Furniture from Bayfair that definitely stays together!',
    'Get the classic Tommy shelf from Iqea!',
    'Download more RAM from Amacon today!',
    'Plants plants plants! You need houseplants!',
    'No one makes suits like us, and the tailoring makes you look GREAT.',
    'Chapstick that will never get lost in the laundry!',
    'Buy an entire house for 20000 small payments!',
    'Our tracking cookies have been following your scent!',
    'Buy this thing and then get your friends to do it too!',
    'Your social credit will be improved if you wear our brand!'
]

const Social = (props) => {
    const [started, setStarted] = useState(false)
    const [posts, setPosts] = useState([])
    const [gameEnded, setGameEnded] = useState(false)
    const [gameWon, setGameWon] = useState(null)
    const [showingAd, setShowingAd] = useState(false)


    useEffect(() => {
        if (!started) {
            setStarted(true);
            let prepPosts = [];
            for (let i = 0; i < 9; i++) {
                const isAdvertisement = Math.floor(Math.random() * 2) === 1;
                prepPosts.push({ username: usernameMaker(), isAd: isAdvertisement, liked: false, image: `/px/px${i+1}.png` })
            }
            shuffle(prepPosts);
            setPosts(prepPosts);
        }
    }, [])

    const like = (post) => {
        const newPosts = posts.map((p) => {
            if (post.username === p.username) {
              return {...p, liked: true};
            }
            return p;
          });
        setPosts(newPosts);
        if (post.isAd) {
            setShowingAd(true);
        }
    }

    return (
        <div className={styles.social}>
            <Timer started={started} gameEnded={gameEnded} endGame={() => setGameEnded(true)}/>
            {showingAd && <div className={styles.advertisement}>
                <button onClick={() => setShowingAd(false)} className={styles.close}>
                    X
                </button>
                <span className={styles.ad1}>
                    {adText[Math.floor(Math.random() * adText.length)]}
                </span>
                <Image
                    src={`/px/px${Math.floor(Math.random() * 10)}.png`}
                    alt="vague pixelated image"
                    className={`${styles.image}`}
                    priority
                    width={400}
                    height={400}
                />
                <span className={styles.ad2}>
                    {companyNames[Math.floor(Math.random() * companyNames.length)]}
                </span>
            </div>}
            <div className={styles.posts}>
                {posts.map((post, i) => (
                    <div key={post.username} className={styles.post}>
                        <div className={styles.topBar}>
                            <span className={styles.profileCircle}/>
                            <span className={styles.profileName}>
                                {post.username}
                            </span>
                            {post.isAd && <span className={styles.ad}>
                                sponsored
                            </span>}
                        </div>
                        <Image
                            src={post.image}
                            alt="vague pixelated image"
                            className={`${styles.image}`}
                            priority
                            width={400}
                            height={400}
                        />
                        <div className={styles.bottom}>
                            <button onClick={() => like(post)} className={styles.like}>
                                <Image
                                    src="/heart.png"
                                    alt="heart icon"
                                    className={`${styles.heart} ${post.liked && styles.liked}`}
                                    priority
                                    width={50}
                                    height={50}
                                />
                            </button>
                            <span className={styles.likeStatus}>
                                {post.liked ? 'Liked!': 'Not liked yet...'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Social