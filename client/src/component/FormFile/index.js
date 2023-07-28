import React, { useState } from 'react';
import axios from 'axios';
import {Box, Button, Divider, List, ListItemText, Stack, TextField, Typography} from "@mui/material"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

function FormFile() {
  const [stockSymbol, setStockSymbol] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [tradeData, setTradeData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/fetchStockData', {
        stockSymbol,
        date: selectedDate,
      });
      setTradeData(response.data);
    } catch (error) {
      console.error('Error fetching stock data:', error);
      setTradeData(null);
    }
  };

  return (
    <div className="App">
        <Box >
        <Typography  variant='h4' paddingY="30px" paddingX="30px">Trade Statistics</Typography>
      <form onSubmit={handleSubmit} >
        <Stack direction="row"  spacing={3} sx={{marginLeft:"30px",paddingBottom:"30px"}}>
    
            <TextField value={stockSymbol}
            onChange={(e) => setStockSymbol(e.target.value)}
            required  label="Stock Symbol:">

            </TextField>
            <input
            style={{width:"200px"}}
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            required
            
          />
         
            <Button  variant='contained' type='submit' sx={{width:"150px"}}>Submit</Button>
        </Stack>
      
      </form>
      <Divider ></Divider>
      {tradeData && (
        <div>
            <List>
                <ListItemText >
<Typography variant='h4' paddingY="30px" paddingX="30px">Trade Statistics for {stockSymbol} on {selectedDate}</Typography>
                </ListItemText>
                <ListItemText>
                    <Typography variant='h5'  paddingX="30px">Open: {tradeData.open}</Typography>
                </ListItemText>
                <ListItemText>
                    <Typography variant='h5'  paddingX="30px">High: {tradeData.high}</Typography>
                </ListItemText>
                <ListItemText>
                    <Typography variant='h5'  paddingX="30px">Low: {tradeData.low}</Typography>
                </ListItemText>
                <ListItemText>
                    <Typography variant='h5'  paddingX="30px">Close: {tradeData.close}</Typography>
                </ListItemText>
                <ListItemText>
                    <Typography variant='h5'  paddingX="30px">Volume: {tradeData.volume}</Typography>
                </ListItemText>
            </List>
            
</div>
      )}
      {
        tradeData ===null?<><Typography  variant='h4' paddingY="30px" paddingX="30px"> Market close on weedend</Typography></>:null
      }
        </Box>
    
    </div>
  );
}

export default FormFile;
