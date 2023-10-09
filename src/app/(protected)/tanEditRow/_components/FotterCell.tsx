interface FooterCellProps {
  table: {
    options: {
      meta?: {
        removeSelectedRows: (indices: number[]) => void;
        addRow: () => void;
      };
    };
    getSelectedRowModel: () => {
      rows: {
        index: number;
      }[];
    };
    resetRowSelection: () => void;
  };
}

export const FooterCell: React.FC<FooterCellProps> = ({ table }) => {
  const meta = table.options.meta;
  const selectedRows = table.getSelectedRowModel().rows;

  const removeRows = () => {
    if (meta && meta.removeSelectedRows) {
      const indicesToRemove = selectedRows.map((row) => row.index);
      meta.removeSelectedRows(indicesToRemove);
      table.resetRowSelection();
    }
  };

  return (
    <div className='footer-buttons'>
      {selectedRows.length > 0 ? (
        <button className='remove-button' onClick={removeRows}>
          Remove Selected x
        </button>
      ) : null}
      <button className='add-button' onClick={meta?.addRow}>
        Add New +
      </button>
    </div>
  );
};
