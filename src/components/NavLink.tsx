import { Link, useLocation } from 'react-router-dom';
import { forwardRef } from "react";
import { cn } from '@/lib/utils';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ to, children, className, onClick }, ref) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
      <Link
        ref={ref}
        to={to}
        onClick={onClick}
        className={cn(
          'relative text-sm font-medium transition-colors duration-300',
          isActive
            ? 'text-primary'
            : 'text-muted-foreground hover:text-foreground',
          className
        )}
      >
        {children}
        {isActive && (
          <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
        )}
      </Link>
    );
  }
);

NavLink.displayName = "NavLink";

export default NavLink;
