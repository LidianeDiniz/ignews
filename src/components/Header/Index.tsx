import Link from 'next/link'
import { ActiveLink } from '../../components/ActiveLink';
import styles from './styles.module.scss';
import { SignInButton } from '../../components/SignInButton';
import Image from 'next/image';

export  function Header(){
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
              <Image height={120} width={120} src="/images/logo.svg" alt="ig.news" />
               <nav>
               <ActiveLink activeClassName={styles.active} href="/">
            <a>Home</a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/posts">
            <a>Posts</a>
          </ActiveLink>
               </nav>

               <SignInButton/>
            </div>
        </header>
    )
}