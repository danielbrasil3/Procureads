import { auth } from '@/auth';
import { fetchSubscriptionByEmail } from './stripe';


export async function Subscription(){
    const session = await auth();

    if (!session || !session.user) {
        throw new Error('Session or user is not defined');
      }

    const email = session.user.email;
    const subscription = await fetchSubscriptionByEmail(email ?? '');
    
    return subscription;
}
