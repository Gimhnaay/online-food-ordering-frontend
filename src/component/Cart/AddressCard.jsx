
import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import { Button, Card } from '@mui/material';

export const AddressCard = ({ item, showButton, handleSelectAddress }) => {
    return (
        <Card className="flex h-43 gap-5 w-64 p-5">
            <HomeIcon />
            <div className='space-y-3 text-gray-500'>
                <h1 className='font-semibold p-5 text-lg text-white'>
                    {item.streetAddress && (
                        <p>{item.streetAddress}</p>
                    )}
                    {item.city && (
                        <p>{item.city}</p>
                    )}
                    {item.state && (
                        <p>{item.state}</p>
                    )}
                    {item.postalCode && (
                        <p>{item.postalCode}</p>
                    )}
                    {showButton && (
                        <Button style={{ marginTop: '50px' }} variant='outlined' fullWidth onClick={() => handleSelectAddress(item)}>
                            Select
                        </Button>
                    )}
                </h1>
            </div>
        </Card>
    );
};
