import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { maxGuest, minGuest, settings,calculateTotalGuest } from './constan'; // Fixed the import path

export default function FormControl({ onHandleTotalGuest,shareGuest }) {
  const [guestNumber, setGuestNumber] = useState({
    Adults: 0,
    Children: 0,
    Infants: 0,
    Pets: 0,
  });
  shareGuest(calculateTotalGuest(guestNumber))
  
  return (
    <div>
      {settings.map((item, index) => {
       
     console.log(item);
        return (
          
          <Grid container key={index}>
            <Grid item xs={8} sx={{ display: 'flex' }}>
              <div>
                <p>{item.inputName}</p>
                <p>{item.subText}</p>
              </div>
            </Grid>
            <Grid item xs={4}>
              <button
                onClick={() => {
                  const totalGuest = onHandleTotalGuest(guestNumber);

                  if (totalGuest >= minGuest) {
                    const updatedGuestNumber = {
                      ...guestNumber,
                      [item.inputName]: guestNumber[item.inputName] - 1,
                    };
                    setGuestNumber(updatedGuestNumber); // Update the state
                  }
                }}
              >
                -
              </button>{' '}
        {guestNumber[item.inputName]}{' '}
              <button
                onClick={() => {
                  const totalGuest = onHandleTotalGuest(guestNumber);

                  if (totalGuest <= maxGuest) {
                    const updatedGuestNumber = {
                      ...guestNumber,
                      [item.inputName]: guestNumber[item.inputName] + 1,
                    };
                    setGuestNumber(updatedGuestNumber); // Update the state
                  }
                }}
              >
                +
              </button>
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
}
