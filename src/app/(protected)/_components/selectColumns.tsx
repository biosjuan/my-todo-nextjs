// MultipleSelectCheckmarks.tsx
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from 'react-redux';
import { setTableColums } from '@/redux/tableSlice';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ['Row #', 'Image', 'Title'];

export default function MultipleSelectCheckmarks() {
  const [columns, setColumns] = React.useState<string[]>([]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setTableColums(columns));
  }, [dispatch, columns]);

  const handleChange = (event: SelectChangeEvent<typeof columns>) => {
    const {
      target: { value },
    } = event;

    setColumns(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );

    // Dispatch the action to update columns in Redux
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id='demo-multiple-checkbox-label'>
          Choose Columns
        </InputLabel>
        <Select
          labelId='demo-multiple-checkbox-label'
          id='demo-multiple-checkbox'
          multiple
          value={columns}
          onChange={handleChange}
          input={<OutlinedInput label='Tag' />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={columns.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
