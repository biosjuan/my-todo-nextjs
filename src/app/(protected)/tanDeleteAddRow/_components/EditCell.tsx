'use client';
import { MouseEvent } from 'react';

export interface EditCellProps {
  row: {
    id: string;
    index: number;
    getIsSelected: () => boolean;
    getToggleSelectedHandler: () => () => void;
  };
  table: {
    options: {
      meta?: {
        editedRows: Record<string, boolean>;
        setEditedRows: (
          updater: (old: Record<string, boolean>) => Record<string, boolean>
        ) => void;
        revertData: (index: number, isCancel: boolean) => void;
        removeRow: (index: number) => void;
      };
    };
  };
}
// ColumnDefTemplate<CellContext<Student, unknown>> | undefined'.
const EditCell: React.FC<EditCellProps> = ({ row, table }) => {
  const meta = table.options.meta;

  const setEditedRows = (e: MouseEvent<HTMLButtonElement>) => {
    const elName = e.currentTarget.name;
    meta?.setEditedRows((old) => ({
      ...old,
      [row.id]: !old[row.id],
    }));
    if (elName !== 'edit') {
      meta?.revertData(row.index, e.currentTarget.name === 'cancel');
    }
  };

  const removeRow = () => {
    meta?.removeRow(row.index);
  };

  return (
    <div className='edit-cell-container'>
      {meta?.editedRows[row.id] ? (
        <div className='edit-cell-action'>
          <button onClick={setEditedRows} name='cancel'>
            ⚊
          </button>{' '}
          <button onClick={setEditedRows} name='done'>
            ✔
          </button>
        </div>
      ) : (
        <div className='edit-cell-action'>
          <button onClick={setEditedRows} name='edit'>
            ✐
          </button>
          <button onClick={removeRow} name='remove'>
            X
          </button>
        </div>
      )}
      <input
        type='checkbox'
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    </div>
  );
};

export default EditCell;
