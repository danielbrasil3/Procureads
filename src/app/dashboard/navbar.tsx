'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { UserIcon, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Form from 'next/form';
import logoutAction from '../(auth)/(logout)/logoutAction';
import PaymentButton from '@/components/payment-button';
import type { User } from '@/lib/user';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Navbar({
  user,
  subscription,
}: {
  user: User;
  subscription: any;
}) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const NavLink = ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <Link href={href} className={cn("block", className)}>
      <Button
        variant="ghost"
        className={cn(
          'w-full justify-start text-left',
          pathname === href ? 'bg-accent' : ''
        )}
      >
        {children}
      </Button>
    </Link>
  );

  return (
    <header className="shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/" className="flex items-center justify-center">
            <span className="font-bold text-lg md:text-2xl">Procure Ads</span>
          </Link>
          <ThemeToggle />
        </div>
        
        <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
          {!subscription && (
            <PaymentButton isLoggedIn={true}>
              <span className="text-sm">Assine Agora</span>
            </PaymentButton>
          )}

          <NavLink href="/dashboard">Dashboard</NavLink>
          <NavLink href="/dashboard/minha-assinatura">Minha Assinatura</NavLink>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2" aria-label="Menu do usuário">
                <UserIcon size={20} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4">
              <DropdownMenuLabel className="font-light uppercase text-xs">
                {user.name}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Form action={logoutAction}>
                  <button className="w-full text-left">Logout</button>
                </Form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <button
          className="md:hidden p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 py-4 space-y-3 bg-background shadow-md">
          {!subscription && (
            <PaymentButton isLoggedIn={true} className="w-full justify-center">
              <span className="text-sm font-medium">Assine Agora</span>
            </PaymentButton>
          )}
          <div className="space-y-2">
            <NavLink href="/dashboard" className="w-full justify-start text-left px-3 hover:bg-accent rounded-md">
              Dashboard
            </NavLink>
            <NavLink href="/dashboard/minha-assinatura" className="w-full justify-start text-left px-3 hover:bg-accent rounded-md">
              Minha Assinatura
            </NavLink>
          </div>
          <Form action={logoutAction} className="pt-2 border-t border-border">
            <button className="w-full text-left py-2 px-3 hover:bg-accent rounded-md text-sm font-medium text-destructive">
              Logout
            </button>
          </Form>
        </div>
      )}
    </header>
  );
}

