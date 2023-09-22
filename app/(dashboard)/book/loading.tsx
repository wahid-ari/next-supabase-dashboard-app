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
        <Title className='mb-0'>Book</Title>
        <Button.success className='flex items-center gap-2'>
          <PlusIcon className='h-5 w-5' />
          Add New Book
        </Button.success>
      </div>
      <LabeledInput label='Search' id='inputdebounce' name='inputdebounce' placeholder='Search' />
      <TableSimple
        head={
          <>
            <TableSimple.th className='flex gap-1 items-center'>
              No <ChevronUpIcon className='w-4 h-4 opacity-50' />
            </TableSimple.th>
            <TableSimple.th className='w-64 md:w-auto'>
              <div className='flex gap-1 items-center'>
                Title <ChevronsUpDownIcon className='w-4 h-4 opacity-50' />
              </div>
            </TableSimple.th>
            <TableSimple.th className='w-64'>
              <div className='flex gap-1 items-center'>
                Author <ChevronsUpDownIcon className='w-4 h-4 opacity-50' />
              </div>
            </TableSimple.th>
            <TableSimple.th className='w-32'>
              <div className='flex gap-1 items-center'>
                Year <ChevronsUpDownIcon className='w-4 h-4 opacity-50' />
              </div>
            </TableSimple.th>
            <TableSimple.th className='w-32'>Action</TableSimple.th>
          </>
        }
      >
        {[...Array(10).keys()].map((e, index) => (
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
