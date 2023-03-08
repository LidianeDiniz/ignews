import styles from './styles.module.scss';

interface SubscribeButtonProps {
    priceId: string;
}

export function SubscribeButton({priceId}: SubscribeButtonProps) {  

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      
    >
      Subscribe now
    </button>
  );
}


  {/*https://github.com/murilo-souza/Ignews-Web-NextJS/blob/main/src/pages/api/auth/%5B...nextauth%5D.ts*/}