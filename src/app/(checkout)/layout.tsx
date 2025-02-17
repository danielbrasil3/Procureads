import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center py-40">
      <Link href="/" className="flex items-center justify-center">
        <span className="font-bold text-2xl ">Procure Ads</span>
      </Link>
      {children}
    </section>
  );
}