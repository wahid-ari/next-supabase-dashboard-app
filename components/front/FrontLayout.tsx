import { cn } from '@/libs/utils';

import BackToTop from '@/components/front/BackToTop';
import Footer from '@/components/front/Footer';
import FrontNavbar from '@/components/front/FrontNavbar';

type Props = {
  children: React.ReactNode;
  className?: string;
  [props: string]: any;
};

export default function FrontLayout({ children, className, ...props }: Props) {
  return (
    <div {...props} className='relative dark:bg-neutral-900'>
      <FrontNavbar className='bg-white/50 backdrop-blur-md backdrop-filter dark:bg-neutral-900/30' />
      <main className={cn('mx-auto min-h-screen w-full max-w-7xl p-4', className)}>{children}</main>
      <Footer />
      <BackToTop />
    </div>
  );
}
