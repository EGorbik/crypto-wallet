import React, {useContext, useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import {
    Box,
    Container,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemAvatar, ListItemButton, ListItemIcon,
    ListItemText,
    Paper,
    Typography
} from "@mui/material";
import WalletModal from "./WalletModal";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate} from "react-router";
import {withWallet} from "../Context/WalletsContext/withWallet";
import {WalletContext} from "../Context/WalletsContext/wallet-context";

export const Wallets = () => {
    const [ isWalletModal, setIsWalletModal ] = useState(false);
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
    let navigate = useNavigate();
    let { state, dispatch } = useContext(WalletContext);

    return (
        <div>
            <Container maxWidth={'false'}>
            <Grid
                  alignItems="center"
                  style={{ minHeight: 100 }} container spacing={2}>
                <Grid item xs={2}>
                    <Button onClick={() => setIsWalletModal('import')} style={{ width:'100%' }} spacing={2} variant="outlined" startIcon={<LabelImportantIcon />}>
                        Import
                </Button>
                </Grid>
                <Grid item xs={2}>
                    <Button onClick={() => setIsWalletModal('create')} style={{ width:'100%' }} variant="contained" startIcon={<AddCircleOutlineIcon />}>
                        Create
                    </Button>
                </Grid>
            </Grid>
            </Container>

            <WalletModal open={isWalletModal} handleClose={() => setIsWalletModal(false)} />

            <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
            <Container maxWidth={'false'}>
            <Grid item xs={2} md={1}>
                <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                    Wallets
                </Typography>
                <div>
                    <List dense={dense}>
                        {state.wallets.map(el => {
                            return (
                                <ListItem
                                    onClick={() => {
                                        dispatch({ type: 'SET_WALLET', id: el.id })
                                        navigate(`/wallets/${el.id}`)
                                    }}
                                    style={{ backgroundColor:'#E6EBF9' }}
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                >
                                    <ListItemButton>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <AccountBalanceWalletIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={el.name}
                                            secondary={secondary ? 'Secondary text' : null}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            )
                        })
                        }
                    </List>
                </div>
            </Grid>
            </Container>
            </Box>
        </div>
    )
}

export default Wallets;