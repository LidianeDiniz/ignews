import Image from 'next/image'
import styles from './styles.module.scss';

export function Header(){
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
               <Image src= "/images/logo.svg" alt="ig.news" width={60} height={30}/>
               <nav>
                <a className={styles.acitive}>Home</a>
                <a>Posts</a>
               </nav>
            </div>
        </header>
    )
}