'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';

import Badge from '@/components/systems/Badge';
import Input from '@/components/systems/Input';
import Label from '@/components/systems/Label';
import ReactTable from '@/components/systems/ReactTable';

export default function LogPage({ data }) {
  const [search, setSearch] = useState('');
  const [searchDebounce] = useDebounce(search, 300);

  const column = useMemo(
    () => [
      {
        Header: 'No',
        accessor: 'id',
        width: 300,
        Cell: (row: any) => {
          // console.log(row.cell.row.index)
          return row.cell.row.index + 1;
        },
      },
      {
        Header: 'User',
        accessor: 'book_users.name',
        width: 300,
        Cell: (row: any) => {
          const { values, original } = row.cell.row;
          return original?.book_users?.name;
        },
      },
      {
        Header: 'Action',
        accessor: 'action',
        width: 300,
        Cell: (row: any) => {
          const { values, original } = row.cell.row;
          return original.action == 'create' ? (
            <Badge.green>CREATE</Badge.green>
          ) : original.action == 'update' ? (
            <Badge>UPDATE</Badge>
          ) : (
            <Badge.red>DELETE</Badge.red>
          );
        },
      },
      {
        Header: 'Table',
        accessor: 'table',
        width: 300,
        Cell: (row: any) => {
          const { values, original } = row.cell.row;
          return original?.table.replace('book_', '');
        },
      },
      {
        Header: 'Description',
        accessor: 'description',
        width: 300,
      },
      {
        Header: 'Date',
        accessor: 'created_at',
        width: 300,
        Cell: (row: any) => {
          const { values, original } = row.cell.row;
          return original?.created_at?.split('T')[0];
        },
      },
      {
        Header: 'Time',
        accessor: '',
        width: 300,
        Cell: (row: any) => {
          const { values, original } = row.cell.row;
          let date = new Date(original?.created_at);
          return date.toLocaleTimeString('en-US');
        },
      },
    ],
    [],
  );

  const tableInstance = useRef(null);
  useEffect(() => {
    tableInstance?.current?.setGlobalFilter(searchDebounce);
  }, [searchDebounce]);

  return (
    <>
      <Label>Search</Label>
      <Input name='search' placeholder='Search' onChange={(e) => setSearch(e.target.value)} />

      <ReactTable
        columns={column}
        data={data}
        ref={tableInstance}
        page_size={20}
        itemPerPage={[10, 20, 50, 100]}
        keyword={searchDebounce}
        showInfo
      />
    </>
  );
}
