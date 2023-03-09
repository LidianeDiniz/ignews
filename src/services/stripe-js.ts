import {loadStripe} from '@stripe/stripe-js'

export async function getStripeJs(){
    const StripeJs = await loadStripe(process.env.STRIPE_PLUBIC_KEY)

    return StripeJs
}