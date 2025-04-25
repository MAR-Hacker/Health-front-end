"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const NavLink = ({ href, children, className = '' }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link 
      href={href}
      className={`
        ${className}
        ${isActive ? 'text-blue-600 font-medium' : 'text-gray-700'}
      `}
    >
      {children}
    </Link>
  );
};

export default NavLink;