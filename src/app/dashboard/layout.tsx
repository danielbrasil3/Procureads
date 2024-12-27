import Navbar from './navbar';
import db from '@/lib/db';
import { redirect } from 'next/navigation';
import { Subscription } from '@/lib/subscription';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {session, subscription} = await Subscription();
  const user = await db.user.findUnique({
    where: {
      email: session?.user?.email ?? '',
    },
  });

  if (!session || !user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen ">
      <Navbar subscription={subscription} user={user} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}