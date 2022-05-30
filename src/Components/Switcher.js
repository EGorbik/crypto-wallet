import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Switcher = ({ network, changeNetwork }) => {
    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={network}
            label="Networks"
            onChange={(e) => {
                changeNetwork(e.target.value)}}
                >
                <MenuItem value={'kovan'}>Kovan</MenuItem>
                <MenuItem value={'ropsten'}>Ropsten</MenuItem>
                <MenuItem value={'mainnet'}>Main</MenuItem>
                </Select>
        </FormControl>
    )
}

export default Switcher;
