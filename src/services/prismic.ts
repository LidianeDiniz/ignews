import Prismic from '@prismicio/client';

//essas variaveis pegan os seus valores das variaveis de ambiente
//const prismicAccessToken = process.env.PRISMIC_ACCESS_TOKEN ?? "";
//const prismicEndpoint = process.env.PRISMIC_ENDPOINT ?? "";

/* Estamos verificando se o token de acesso do Prismic foi fornecido.
 Se não tiver sido fornecido (ou seja, a variável prismicAccessToken 
está vazia), lançamos um erro informando que o token não foi fornecido.*/

//if (!prismicAccessToken) {
//  throw new Error("Error: PRISMIC_ACCESS_TOKEN not provided.");
//}

export function getPrismicClient(req?: unknown) {
  const prismic = Prismic.client(
      process.env.PRISMIC_ENDPOINT,
      {
          req,
          accessToken: process.env.PRISMIC_ACCESS_TOKEN
      }
  )

  return prismic;
}