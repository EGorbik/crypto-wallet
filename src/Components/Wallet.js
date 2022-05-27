import React, {useEffect, useState} from 'react';
import {Container, Grid, Typography} from "@mui/material";
import {useContext} from "react";
import {WalletContext} from "../Context/WalletsContext/wallet-context";
import {ethers} from "ethers";

const Wallet = () => {
    let { state, dispatch } = useContext(WalletContext);
    const [ totalBalance, setTotalBalance ] = useState(null);

    const getBalance = async () => {
        let defProvider = await ethers.getDefaultProvider('kovan');
        let signer = new ethers.VoidSigner(state?.wallet?.address, defProvider);
        let balance = await signer.getBalance();
        balance = ethers.utils.formatEther(balance)
        console.log(balance)
        return 0
    }

    useEffect(() => {
        getBalance();
    }, [])

    return (
        <Container maxWidth={'false'}>
            <Grid style={{marginTop:10}} direction={'row'}>
                <Typography style={{display:'inline'}} variant="h4">Wallet:</Typography>
                <Typography  style={{display:'inline', paddingLeft:15}} variant="h5">{state?.wallet?.name}</Typography>
            </Grid>
            <Grid style={{marginTop:10}} direction={'row'}>
                <Typography style={{display:'inline'}} variant="h4" >Address:</Typography>
                <Typography  style={{display:'inline', paddingLeft:15}} variant="h5">{state?.wallet?.address}</Typography>
            </Grid>
            <Grid style={{marginTop:10}} direction={'row'}>
                <Typography style={{display:'inline'}} variant="h4">Private key:</Typography>
                <Typography  style={{display:'inline', paddingLeft:15}} variant="h5">{state?.wallet?.privateKey}</Typography>
            </Grid>
            <Grid style={{marginTop:10}} direction={'row'}>
                <Typography style={{display:'inline'}} variant="h4">Total balance:</Typography>
                <Typography  style={{display:'inline', paddingLeft:15}} variant="h5">0</Typography>
            </Grid>

        </Container>
    )
}

export default Wallet;