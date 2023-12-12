import { PlusIcon } from 'lucide-react';

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
            <TableSimple.th shrink>No</TableSimple.th>
            <TableSimple.th className='text-left'>Name</TableSimple.th>
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
            <TableSimple.td className='flex gap-2'>
              <Shimmer className='w-full p-3' />
              <Shimmer className='w-full p-3' />
            </TableSimple.td>
          </TableSimple.tr>
        ))}
      </TableSimple>
    </>
  );
}
