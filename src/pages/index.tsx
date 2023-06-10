import { GetStaticProps} from 'next'
import Head from "next/head";
import styles from "./home.module.scss"
import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';

interface HomeProps{
  product:{
    priceId: string;
    amount: number;
  }
}

// Client-side - traz os dados depois que a página já foi carregada completamente.
// Sever-side -  traz dados dinâmicos para quem esta acessando, com informações em tempo real.
// Static Site Generation - Gera o HTML estático, páginas iguais para todos usuários.
// são as três maneiras principais que podemos usar para fazer chamadas a api com Next


export default function Home({product}: HomeProps) {
  return (
    <>
      <Head>
        <title> Home | ig.news </title>
      </Head>

     <main className={styles.contentContainer}>
      <section className={styles.hero}>
        <span>👋 Hey, welcome</span>
        <h1>News about the <span>React</span> world.</h1>
        <p>
          Get access to all the publications <br />
          <span>
            for {product.amount} month
          </span>
        </p>
        <SubscribeButton priceId={product.priceId} />
      </section>

        <img src="/images/avatar.svg" alt="Girl coding" />

     </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {

  const price = await stripe.prices.retrieve('price_1Mi1HyGELNUFwqMLtT0jQWFC',{ 
    expand:['product']
  })

  const product = {
    priceId : price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),

  }

  return{
    props:{
      product,
    },
    revalidate: 60 * 60 * 24,  // 24 hours
  }
}
