import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center py-24">
        <Link href="/" className="text-center">
            <span className="font-bold text-2xl ">Procure Ads</span>
        </Link>
      {children}
    </section>
  );
}