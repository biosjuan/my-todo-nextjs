import { stringify } from 'csv-stringify';

interface CSVConvertOptions<T> {
  data: T[];
  headers: string[];
  filename: string;
  mapDataToHeaders: (item: T, header: string) => any; // Define a mapping function
}

export async function exportToCSV<T>(options: CSVConvertOptions<T>) {
  return new Promise<void>((resolve, reject) => {
    // Create an array of arrays with the data and custom headers
    const csvData = [
      options.headers,
      ...options.data.map((item) =>
        options.headers.map((header) => {
          // Map the data properties to match the custom headers using the provided mapping function
          console.log(JSON.stringify(item));
          console.log('header', JSON.stringify(header));

          return options.mapDataToHeaders(item, header);
        })
      ),
    ];

    // console.log(JSON.stringify(csvData));

    stringify(
      csvData,
      {
        header: false, // We've already added headers above
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
