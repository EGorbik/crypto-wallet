import React, {useState} from 'react';
import Button from "@mui/material/Button";
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Container, Grid, Paper} from "@mui/material";
import WalletModal from "./WalletModal";

export const Wallets = () => {
    const [ isWalletModal, setIsWalletModal ] = useState(true);

    return (
        <div>
            {/*<Button spacing={2} variant="outlined" startIcon={<LabelImportantIcon />}>
                Import
            </Button>
            <Button variant="contained" startIcon={<AddCircleOutlineIcon />}>
                Create
            </Button>*/}

            <Container maxWidth={'false'}>
            <Grid
                  alignItems="center"
                  style={{ minHeight: 100 }} container spacing={2}>
                <Grid item xs={2}>
                    <Button onClick={() => setIsWalletModal(true)} style={{ width:'100%' }} spacing={2} variant="outlined" startIcon={<LabelImportantIcon />}>
                        Import
                </Button>
                </Grid>
                <Grid item xs={2}>
                    <Button onClick={() => setIsWalletModal(true)} style={{ width:'100%' }} variant="contained" startIcon={<AddCircleOutlineIcon />}>
                        Create
                    </Button>
                </Grid>
            </Grid>
            </Container>

            <WalletModal open={isWalletModal} handleClose={() => setIsWalletModal(false)} />
        </div>
    )
}

export default Wallets;