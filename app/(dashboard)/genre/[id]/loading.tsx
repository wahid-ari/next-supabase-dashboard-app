import { ChevronsUpDownIcon, ChevronUpIcon } from 'lucide-react';

import LabeledInput from '@/components/systems/LabeledInput';
import Shimmer from '@/components/systems/Shimmer';
import TableSimple from '@/components/systems/TableSimple';
import Title from '@/components/systems/Title';

export default function Loading() {
  return (
    <>
      <Title>Genre</Title>
      <LabeledInput label='Search' id='inputdebounce' name='inputdebounce' placeholder='Search' />
      <TableSimple
        head={
          <>
            <TableSimple.th className='flex items-center gap-1'>
              No <ChevronUpIcon className='h-4 w-4 opacity-50' />
            </TableSimple.th>
            <TableSimple.th className='text-left'>
              <div className='flex items-center gap-1'>
                Title <ChevronsUpDownIcon className='h-4 w-4 opacity-50' />
              </div>
            </TableSimple.th>
            <TableSimple.th className='sm:w-48 md:w-64 lg:w-80'>
              <div className='flex items-center gap-1'>
                Author
                <ChevronsUpDownIcon className='h-4 w-4 opacity-50' />
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
