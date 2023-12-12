import { ChevronsUpDownIcon, ChevronUpIcon, PlusIcon } from 'lucide-react';

import Button from '@/components/systems/Button';
import LabeledInput from '@/components/systems/LabeledInput';
import Shimmer from '@/components/systems/Shimmer';
import TableSimple from '@/components/systems/TableSimple';
import Title from '@/components/systems/Title';

export default async function Loading() {
  return (
    <>
      <div className='mb-4 flex flex-wrap items-center justify-between gap-y-3'>
        <Title className='mb-0'>Author</Title>
        <Button.success className='flex items-center gap-2'>
          <PlusIcon className='h-5 w-5' />
          Add New Author
        </Button.success>
      </div>
      <LabeledInput label='Search' id='inputdebounce' name='inputdebounce' placeholder='Search' />
      <TableSimple
        head={
          <>
            <TableSimple.th className='flex items-center gap-1'>
              No <ChevronUpIcon className='h-4 w-4 opacity-50' />
            </TableSimple.th>
            <TableSimple.th className='w-64 md:w-80'>
              <div className='flex items-center gap-1'>
                Name <ChevronsUpDownIcon className='h-4 w-4 opacity-50' />
              </div>
            </TableSimple.th>
            <TableSimple.th className='w-80 text-left'>Born</TableSimple.th>
            <TableSimple.th className='w-44 text-left'>Web</TableSimple.th>
            <TableSimple.th className='w-32 text-left'>Action</TableSimple.th>
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
