import { ChevronsUpDownIcon, ChevronUpIcon, PlusIcon } from 'lucide-react';

import Button from '@/components/systems/Button';
import LabeledInput from '@/components/systems/LabeledInput';
import Shimmer from '@/components/systems/Shimmer';
import TableSimple from '@/components/systems/TableSimple';
import Title from '@/components/systems/Title';

export default function Loading() {
  return (
    <>
      <div className='mb-4 flex flex-wrap items-center justify-between gap-y-3'>
        <Title className='mb-0'>Genre</Title>
        <Button.success className='flex items-center gap-2'>
          <PlusIcon className='h-5 w-5' />
          Add New Genre
        </Button.success>
      </div>
      <LabeledInput label='Search' id='inputdebounce' name='inputdebounce' placeholder='Search' />
      <TableSimple
        head={
          <>
            <TableSimple.th className='flex gap-1 items-center'>
              No <ChevronUpIcon className='w-4 h-4 opacity-50' />
            </TableSimple.th>
            <TableSimple.th className='text-left'>
              <div className='flex gap-1 items-center'>
                Title <ChevronsUpDownIcon className='w-4 h-4 opacity-50' />
              </div>
            </TableSimple.th>
            <TableSimple.th className='sm:w-48 md:w-64 lg:w-80'>
              <div className='flex gap-1 items-center'>
                Author
                <ChevronsUpDownIcon className='w-4 h-4 opacity-50' />
              </div>
            </TableSimple.th>
          </>
        }
      >
        {[...Array(5).keys()].map((e, index) => (
          <TableSimple.tr key={index}>
            <TableSimple.td shrink>
              <Shimmer className='p-3' />
            </TableSimple.td>
            <TableSimple.td>
              <Shimmer className='p-3' />
            </TableSimple.td>
            <TableSimple.td>
              <Shimmer className='p-3' />
            </TableSimple.td>
          </TableSimple.tr>
        ))}
      </TableSimple>
    </>
  );
}
