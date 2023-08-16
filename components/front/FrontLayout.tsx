import { cn } from '@/lib/utils';
import BackToTop from '@/components/front/BackToTop';
import Footer from '@/components/front/Footer';
import FrontNavbar from '@/components/front/FrontNavbar';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function FrontLayout({ children, className, ...props }: Props) {
  return (
    <main {...props} className='relative dark:bg-neutral-900'>
      <FrontNavbar className='bg-white/50 backdrop-blur-md backdrop-filter dark:bg-neutral-900/30' />
      <div className={cn('mx-auto min-h-screen w-full max-w-7xl p-4', className)}>{children}</div>
      <Footer />
      <BackToTop />
    </main>
  );
}
