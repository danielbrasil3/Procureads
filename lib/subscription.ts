
import { auth } from '@/auth';
import { fetchSubscriptionByEmail } from './stripe';

export async function Subscription() {
  const session = await auth();

  let subscription = null;
  if (session?.user?.email) {
    subscription = await fetchSubscriptionByEmail(session.user.email);
  }

  return { session, subscription };
}
