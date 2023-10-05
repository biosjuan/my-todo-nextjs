import { Photo } from '@/redux/photosSlice';
import { RootState } from '@/redux/store';
import { stringify } from 'csv-stringify';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const PhotoCSVWriter: React.FC = () => {
  const [csvData, setCsvData] = useState<string>('');

  // Sample data (replace with your own data)
  const data = [
    { name: 'John', age: 30, city: 'New York' },
    { name: 'Alice', age: 25, city: 'Los Angeles' },
    { name: 'Bob', age: 35, city: 'Chicago' },
  ];

  useEffect(() => {
    // Function to convert data to CSV
    const convertToCsv = () => {
      stringify(data, { header: true }, (err, output) => {
        if (err) {
          console.error('Error:', err);
        } else {
          // Set the CSV data in the state
          setCsvData(output);
        }
      });
    };
    // Convert data to CSV when the component mounts
    convertToCsv();
  }, []);

  return (
    <div>
      <h1>CSV Data:</h1>
      <pre>{csvData}</pre>
    </div>
  );
};

export default PhotoCSVWriter;
