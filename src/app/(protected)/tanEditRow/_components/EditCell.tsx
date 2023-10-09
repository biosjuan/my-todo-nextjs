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
const EditCell: React.FC<any> = ({ row, table }) => {
  const meta = table.options.meta;
  const setEditedRows = (e: MouseEvent<HTMLButtonElement>) => {
    const elName = e.currentTarget.name;
    meta?.setEditedRows((old: []) => ({
      ...old,
      [row.id]: !old[row.id],
    }));
    if (elName !== 'edit') {
      meta?.revertData(row.index, e.currentTarget.name === 'cancel');
    }
  };
  return meta?.editedRows[row.id] ? (
    <>
      <button onClick={setEditedRows} name='cancel'>
        X
      </button>{' '}
      <button onClick={setEditedRows} name='done'>
        ✔
      </button>
    </>
  ) : (
    <button onClick={setEditedRows} name='edit'>
      ✐
    </button>
  );
};

export default EditCell;
