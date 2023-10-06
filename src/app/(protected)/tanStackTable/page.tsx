import TableCreator from '@/components/tanTable/TableCreator';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

function TankStackTable() {
  return (
    <div className='p-10'>
      <TableCreator />
    </div>
  );
}

export default TankStackTable;
