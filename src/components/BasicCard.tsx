import React, { ReactNode } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

const BasicCard: React.FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>{children}</CardContent>
      <CardActions>
        <Button size='small'>Material UI</Button>
      </CardActions>
    </Card>
  );
};

export default BasicCard;
