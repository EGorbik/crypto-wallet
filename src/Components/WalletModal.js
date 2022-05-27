import React, {useState} from 'react';
import {AppBar, FormControl, Grid, Modal, TextField, Toolbar} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CancelIcon from '@mui/icons-material/Cancel';
import Button from "@mui/material/Button";
import {ethers} from "ethers";
import {useContext} from "react";
import { v4 as uuidv4 } from 'uuid';
import {WalletContext} from "../Context/WalletsContext/wallet-context";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50vw',
    bgcolor: 'background.paper',
    minHeight: 250,
    boxShadow: 24,
};
const WalletModal = ({ open, handleClose }) => {
    let { state, dispatch } = useContext(WalletContext);
    const [ name, setName ] = useState('');
    const [ phrase, setPhrase ] = useState('');

    function generateMnemonic() {
        const entropy = ethers.utils.randomBytes(16);
        console.log(entropy)
        const mnemonic = ethers.utils.entropyToMnemonic(entropy);
        let hash = ethers.utils.mnemonicToEntropy(mnemonic);
        console.log(hash)
        return mnemonic;
    }

    const handleCreate = () => {
        handleClose()
        const mnemonic = generateMnemonic()
        let {address, privateKey} = ethers.Wallet.fromMnemonic(mnemonic);
        dispatch({ 'type': 'ADD_WALLET', payload: {id: uuidv4(), name, address, privateKey} })
        setName('');
    }

    const handleImport = async () => {
        handleClose()
        const hash = await ethers.utils.mnemonicToEntropy(phrase);
        const walletMnemonic = await ethers.Wallet.fromMnemonic(phrase);
        dispatch({ 'type': 'ADD_WALLET', payload: {id: uuidv4(), name: 'test', address: walletMnemonic.address, privateKey: walletMnemonic.privateKey} })
        setName('');
        setPhrase('');
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >

            <Box sx={style}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            {
                                open === 'create' ? 'Create new wallet' : 'Import wallet'
                            }
                        </Typography>
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={()=> {handleClose()}}
                                color="inherit"
                            >
                                <CancelIcon />
                            </IconButton>
                        </div>

                    </Toolbar>
                </AppBar>
                    <Grid
                        direction={'column'}
                       alignItems="center"
                        style={{ width:'100%', padding: '20px 0'  }} container spacing={0}>
                        <Grid style={{width: '50%', margin:'10px 0'}} item md={6}>
                            <TextField value={name} onChange={e => setName(e.target.value)} style={{width:'100%'}} id="outlined-basic" label="Wallet name" variant="outlined" />
                            {
                                open === 'import' &&
                                    <TextField
                                        value={phrase}
                                        onChange={e => setPhrase(e.target.value)}
                                        style={{width:'100%'}}
                                        id="filled-multiline-static"
                                        label="Mnemonic phrase"
                                        multiline
                                        rows={4}
                                        defaultValue="Default Value"
                                        variant="filled"
                                    />
                            }
                        </Grid>
                        <Grid style={{width: '50%', margin:'10px 0'}} item md={6}>
                            <Button onClick={open === 'create' ? handleCreate : handleImport} style={{ width:'100%' }} variant="contained">
                                {open === 'create' ? 'Create' : 'Import'}
                            </Button>
                        </Grid>
                    </Grid>

                </Box>

        </Modal>
    )
}

export default WalletModal;