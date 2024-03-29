import { GetStaticProps } from 'next';

import { getPrismicClient } from '../../services/prismic';
import styles from './styles.module.scss';
import  Prismic from '@prismicio/client';
import Link from 'next/link';
import { RichText } from 'prismic-dom';


type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
};

interface PostsProps {
  posts: Post[];
}
export default function Posts({ posts }: PostsProps) {
  return(
     <>
  
    <main className={styles.container}>
      <div className={styles.posts}>
        {posts.map((post) => (
         <Link href={`/posts/${post.slug}`} key={post.slug} legacyBehavior>
            <a key={post.slug}>
            <time>{post.updatedAt}</time>
            <strong>{post.title}</strong>
            <p>{post.excerpt}</p>
            </a>
          </Link>
          )
        )}
      </div>
    </main>
  </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.query([
      Prismic.predicates.at('document.type', 'publication')
  ], {
      fetch: ['publication.title', 'publication.content'],
      pageSize: 100,
  })
  const posts = response.results.map((post) => {
    /*
     * DICA de desempenho
     * -> Quando precisar realizar tratamento de dados realizar
     *   logo que obter o retorno da requisição
     */
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt:
        post.data.content.find((content) => content.type === 'paragraph')
          ?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        'pt-BR',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        },
      ),
    };
  });
  /*
   * mode de consolar json completo DICA:
   * -> console.log(JSON.stringify(response, null, 2));
   */
  return {
    props: {
      posts,
    },
  };
};