import React from 'react';
import {AppBar, FormControl, Grid, Modal, TextField, Toolbar} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CancelIcon from '@mui/icons-material/Cancel';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50vw',
    bgcolor: 'background.paper',
    minHeight: 300,
    boxShadow: 24,
};
const WalletModal = ({ open, handleClose }) => {
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
                            Create new wallet
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
                        style={{   }} container spacing={2}>
                        <Grid item md={6}>
                            <TextField style={{width: '100%', backgroundColor:'red'}} id="outlined-basic" label="Outlined" variant="outlined" />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        </Grid>
                    </Grid>
                </Box>

        </Modal>
    )
}

export default WalletModal;