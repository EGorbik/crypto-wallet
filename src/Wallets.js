import React, {useState} from 'react';
import Button from "@mui/material/Button";
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import {
    Container,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    Typography
} from "@mui/material";
import WalletModal from "./WalletModal";
import Avatar from "@mui/material/Avatar";

function generate(element) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}

export const Wallets = () => {
    const [ isWalletModal, setIsWalletModal ] = useState(true);
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);

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

            <Grid item xs={12} md={6}>
                <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                    Wallets
                </Typography>
                <div>
                    <List dense={dense}>
                        {generate(
                            <ListItem
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete">
                                        <AddCircleOutlineIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <AccountBalanceWalletIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Single-line item"
                                    secondary={secondary ? 'Secondary text' : null}
                                />
                            </ListItem>,
                        )}
                    </List>
                </div>
            </Grid>
        </div>
    )
}

export default Wallets;