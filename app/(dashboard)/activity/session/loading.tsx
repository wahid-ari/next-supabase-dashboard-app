import Shimmer from '@/components/systems/Shimmer';
import TableSimple from '@/components/systems/TableSimple';
import Title from '@/components/systems/Title';

export default function Loading() {
  return (
    <>
      <Title>Session</Title>
      <Shimmer className='mt-2 mb-4 space-y-3'>
        <div className='h-6 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
      </Shimmer>
      <TableSimple
        head={
          <>
            <TableSimple.th shrink>No</TableSimple.th>
            <TableSimple.th shrink>ID</TableSimple.th>
            <TableSimple.th className='w-28'>Name</TableSimple.th>
            <TableSimple.th className='text-left'>Token</TableSimple.th>
            <TableSimple.th className='w-28'>Date</TableSimple.th>
            <TableSimple.th className='w-28'>Time</TableSimple.th>
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
          </TableSimple.tr>
        ))}
      </TableSimple>
    </>
  );
}
