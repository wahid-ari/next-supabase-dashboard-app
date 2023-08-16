import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
  children: ReactNode;
  className?: string;
  activeClassName?: string;
};

export default function ActiveLink({ children, className, activeClassName, ...props }: Props) {
  const pathname = usePathname();
  const childClassName = className || '';

  // pages/index.js will be matched via props.href
  // pages/[slug].js will be matched via props.as
  const classNames =
    pathname === props.href || pathname === props.as ? `${childClassName} ${activeClassName}`.trim() : className;

  return (
    <Link {...props} href={props.href} className={classNames}>
      {children}
    </Link>
  );
}
