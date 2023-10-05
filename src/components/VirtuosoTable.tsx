import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import ReactPaginate from 'react-paginate';
import { useState } from 'react';

interface Data {
  calories: number;
  carbs: number;
  dessert: string;
  fat: number;
  id: number;
  protein: number;
}

interface ColumnData {
  dataKey: keyof Data;
  label: string;
  numeric?: boolean;
  width: number;
}

type Sample = [string, number, number, number, number];

const sample: readonly Sample[] = [
  ['Frozen yoghurt', 159, 6.0, 24, 4.0],
  ['Ice cream sandwich', 237, 9.0, 37, 4.3],
  ['Eclair', 262, 16.0, 24, 6.0],
  ['Cupcake', 305, 3.7, 67, 4.3],
  ['Gingerbread', 356, 16.0, 49, 3.9],
];

function createData(
  id: number,
  dessert: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
): Data {
  return { id, dessert, calories, fat, carbs, protein };
}

const columns: ColumnData[] = [
  {
    width: 200,
    label: 'Dessert',
    dataKey: 'dessert',
  },
  {
    width: 120,
    label: 'Calories\u00A0(g)',
    dataKey: 'calories',
    numeric: true,
  },
  {
    width: 120,
    label: 'Fat\u00A0(g)',
    dataKey: 'fat',
    numeric: true,
  },
  {
    width: 120,
    label: 'Carbs\u00A0(g)',
    dataKey: 'carbs',
    numeric: true,
  },
  {
    width: 120,
    label: 'Protein\u00A0(g)',
    dataKey: 'protein',
    numeric: true,
  },
];

const rows: Data[] = Array.from({ length: 1000 }, (_, index) => {
  const randomSelection = sample[Math.floor(Math.random() * sample.length)];
  return createData(index, ...randomSelection);
});

// Named function for Scroller component
function ScrollerComponent(
  props: React.HTMLProps<HTMLDivElement>,
  ref: React.Ref<HTMLDivElement>
) {
  return <TableContainer component={Paper} {...props} ref={ref} />;
}

// Named function for TableBody component
function TableBodyComponent(
  props: React.HTMLProps<HTMLTableSectionElement>,
  ref: React.Ref<HTMLTableSectionElement>
) {
  return <TableBody {...props} ref={ref} />;
}

const VirtuosoTableComponents: TableComponents<Data> = {
  // Scroller component
  Scroller: React.forwardRef(ScrollerComponent),

  // Table component
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }}
    />
  ),

  // TableHead component
  TableHead,

  // TableRow component
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,

  // TableBody component
  TableBody: React.forwardRef(TableBodyComponent),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant='head'
          align={column.numeric || false ? 'right' : 'left'}
          style={{ width: column.width }}
          sx={{
            backgroundColor: 'background.paper',
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index: number, row: Data) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric || false ? 'right' : 'left'}
        >
          {row[column.dataKey]}
        </TableCell>
      ))}
    </React.Fragment>
  );
}
const ITEMS_PER_PAGE = 10; // Number of items to show per page
export default function ReactVirtualizedTable() {
  const [currentPage, setCurrentPage] = useState(0);

  // Calculate the slice of data for the current page
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const slicedRows = rows.slice(startIndex, endIndex);

  // Function to handle page change
  const handlePageChange = (selectedPage: number) => {
    console.log(selectedPage);
    setCurrentPage(selectedPage);
  };
  //   console.log('row.length', rows.length);
  //   console.log(ITEMS_PER_PAGE);
  return (
    <Paper style={{ height: 400, width: '100%' }}>
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
      <ReactPaginate
        pageCount={Math.ceil(rows.length / ITEMS_PER_PAGE)}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={({ selected }) => handlePageChange(selected)}
        containerClassName='flex space-x-2 justify-center mt-4'
        activeClassName='bg-blue-500 text-white'
        pageLinkClassName='border rounded-md p-2'
        previousLinkClassName='border rounded-md p-2'
        nextLinkClassName='border rounded-md p-2'
      />
    </Paper>
  );
}
