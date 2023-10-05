import { stringify } from 'csv-stringify';

interface CSVConvertOptions<T> {
  data: T[];
  headers: string[];
  filename: string;
}

export async function exportToCSV<T>(options: CSVConvertOptions<T>) {
  return new Promise<void>((resolve, reject) => {
    stringify(
      options.data,
      {
        header: true,
        columns: options.headers,
      },
      (err, output) => {
        if (err) {
          reject(err);
          return;
        }

        const blob = new Blob([output], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.download = options.filename;
        link.href = url;
        link.click();

        resolve();
      }
    );
  });
}
