import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import useCurrentUser from '@/hooks/useCurrentUser';
import { useRouter } from 'next/navigation';
import { clearError } from '@/redux/errorSlice';
import { RootState } from '@/redux/store';
import {
  Photo,
  getPhotos,
  setSearchQuery,
  sortPhotos,
} from '@/redux/photosSlice';
import {
  AutoSizer,
  Column,
  SortDirection,
  Table,
  TableCellRenderer,
  TableHeaderProps,
} from 'react-virtualized';
import { Button, Paper, TableContainer, TablePagination } from '@mui/material';
import Image from 'next/image'; // Import next/image
import PhotoCSVWriter from '@/app/(protected)/_components/PhotoCSVWriter';
import { exportToCSV } from '@/app/utilities/csvExport';

type SortDirection = 'ASC' | 'DESC';
type SortingCriteriaProperty = 'id' | 'title';

const AutoSizerTable: React.FC = () => {
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection | null>(
    null
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch: Dispatch<any> = useDispatch();
  const errorMessage = useSelector((state: RootState) => state.error.message);
  const { photos } = useSelector((state: RootState) => state.photos);

  const searchQuery = useSelector(
    (state: RootState) => state.photos.searchQuery
  );

  useEffect(() => {
    if (photos.length === 0) {
      dispatch(clearError());
      dispatch(getPhotos());
    }
  }, [dispatch, photos]);

  useEffect(() => {
    dispatch(setSearchQuery(searchTerm));
  }, [searchTerm, dispatch]);

  const { user } = useCurrentUser('token');

  const router = useRouter();

  function sort({
    sortBy,
    sortDirection,
  }: {
    sortBy: string;
    sortDirection: SortDirection;
  }) {
    setSortBy(sortBy);
    setSortDirection(sortDirection);

    const direction = sortDirection === 'ASC' ? 'ASC' : 'DESC';
    const property = sortBy as SortingCriteriaProperty;

    dispatch(sortPhotos({ direction, property }));
  }

  const renderHeader = ({ dataKey, label }: TableHeaderProps) => {
    const isSorted = sortBy === dataKey;
    const isDesc = sortDirection === 'DESC';

    return (
      <div
        onClick={() =>
          sort({ sortBy: dataKey, sortDirection: isDesc ? 'ASC' : 'DESC' })
        }
      >
        {label}
        {isSorted && (isDesc ? ' ↓' : ' ↑')}
      </div>
    );
  };

  const ROW_HEIGHT = 48;

  // Render the thumbnail using the next/image component
  const renderThumbnail: TableCellRenderer = ({ cellData: imgUrl }) => {
    return imgUrl ? (
      <Image src={imgUrl as string} alt='Thumbnail' width={50} height={50} />
    ) : (
      ''
    );
  };

  const renderId: TableCellRenderer = ({ cellData: id }) => (
    <div className='flex justify-center'>{id}</div>
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    console.log('handleChangePage', event);
    console.log('handleChangePage', newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log('handleChangeRowsPerPage', event.target.value);
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredPhotos = photos.filter((photo) =>
    photo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const mapDataToHeaders = (item: Photo) => ({
  //   'Row #': item.id,
  //   albumId: item.albumId,
  //   title: item.title,
  //   url: item.url,
  //   thumbnailUrl: item.thumbnailUrl,
  // });

  const exportToCsv = () => {
    exportToCSV<Photo>({
      data: photos,
      filename: 'photos.csv',
      headers: ['id', 'albumId', 'title', 'url', 'thumbnailUrl'],
    });
  };

  return (
    <Paper style={{ padding: '10px', overflow: 'hidden' }}>
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-semibold'>Photos</h2>
        <input
          type='text'
          placeholder='Search by title'
          className='px-2 py-1 border rounded-md'
          value={searchTerm}
          onChange={handleSearchChange}
          aria-label='Search by title'
          role='search input'
        />
        <Button variant='contained' color='primary' onClick={exportToCsv}>
          Download CSV File
        </Button>
      </div>
      <TableContainer
        sx={{
          height: '50vh',
        }}
      >
        <AutoSizer>
          {({ height, width }) => (
            <Table
              height={height}
              width={width}
              rowHeight={ROW_HEIGHT!}
              headerHeight={ROW_HEIGHT!}
              headerStyle={{
                color: 'black',
              }}
              rowStyle={{
                display: 'flex',
                alignItems: 'center',
                borderBottom: '1px solid #ccc',
              }}
              rowCount={filteredPhotos.length}
              rowGetter={({ index }) => filteredPhotos[index]}
              aria-label='juan table'
            >
              <Column
                label='Row #'
                dataKey='id'
                width={100}
                headerRenderer={renderHeader}
                cellRenderer={renderId}
                aria-label='Row #'
              />
              <Column
                label='Image'
                dataKey='thumbnailUrl'
                width={300}
                cellRenderer={renderThumbnail}
                aria-label='Image'
              />
              <Column
                label='Title'
                dataKey='title'
                width={width + 1}
                flexGrow={1}
                headerRenderer={renderHeader}
                aria-label='Title'
              />
            </Table>
          )}
        </AutoSizer>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={filteredPhotos.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        aria-label='pagination'
        role='pagination'
      />
    </Paper>
  );
};

export default AutoSizerTable;
