import { ChevronsUpDownIcon, ChevronUpIcon } from 'lucide-react';

import LabeledInput from '@/components/systems/LabeledInput';
import Shimmer from '@/components/systems/Shimmer';
import TableSimple from '@/components/systems/TableSimple';
import Title from '@/components/systems/Title';

export default function Loading() {
  return (
    <>
      <Title>Logs</Title>
      <LabeledInput label='Search' id='inputdebounce' name='inputdebounce' placeholder='Search' />
      <TableSimple
        head={
          <>
            <TableSimple.th className='flex gap-1 items-center'>
              No <ChevronUpIcon className='w-4 h-4 opacity-50' />
            </TableSimple.th>
            <TableSimple.th>
              <div className='flex gap-1 justify-center items-center'>
                User <ChevronsUpDownIcon className='w-4 h-4 opacity-50' />
              </div>
            </TableSimple.th>
            <TableSimple.th>
              <div className='flex gap-1 justify-center items-center'>
                Action <ChevronsUpDownIcon className='w-4 h-4 opacity-50' />
              </div>
            </TableSimple.th>
            <TableSimple.th>
              <div className='flex gap-1 justify-center items-center'>
                Table <ChevronsUpDownIcon className='w-4 h-4 opacity-50' />
              </div>
            </TableSimple.th>
            <TableSimple.th>
              <div className='flex gap-1 justify-center items-center'>
                Description <ChevronsUpDownIcon className='w-4 h-4 opacity-50' />
              </div>
            </TableSimple.th>
            <TableSimple.th>
              <div className='flex gap-1 justify-center items-center'>
                Date <ChevronsUpDownIcon className='w-4 h-4 opacity-50' />
              </div>
            </TableSimple.th>
            <TableSimple.th>
              <div className='flex gap-1 justify-center items-center'>
                Time
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
