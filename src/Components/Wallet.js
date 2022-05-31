import React, {useEffect, useState} from 'react';
import {Container, Grid, TextField, Typography} from "@mui/material";
import {useContext} from "react";
import {WalletContext} from "../Context/WalletsContext/wallet-context";
import {ethers} from "ethers";
import Switcher from "./Switcher";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Button from "@mui/material/Button";
import axios from "axios";
import TransactionsTable from "./TransactionsTable";

const Wallet = () => {
    let { state, dispatch } = useContext(WalletContext);
    const [ totalBalance, setTotalBalance ] = useState(null);
    const [ network, setNetwork ] = useState('kovan');
    const [ balanceLoader, setBalanceLoader ] = useState(false);
    const [ transactions, setTransactions ] = useState([]);
    const [ receiverAddress, setReceiverAddress ] = useState('');
    const [ gasLimit, setGasLimit ] = useState('');
    const [ value, setValue ] = useState('');

    const getBalance = async () => {
        setBalanceLoader(true);
        let defProvider = await ethers.getDefaultProvider(network);
        let signer = new ethers.VoidSigner(state?.wallet?.address, defProvider);
        let balance = await signer.getBalance();
        balance = ethers.utils.formatEther(balance)
        setTotalBalance(balance)
        setBalanceLoader(false);
    }

    useEffect(() => {
        getBalance();
    }, [])

    useEffect(() => {
        getBalance();
    }, [network])

    const getHost = () => {
        switch (network) {
            case 'kovan':
                return 'https://api-kovan.etherscan.io'
            case 'ropsten':
                return 'https://api-ropsten.etherscan.io'
            case 'mainnet':
                return 'https://api.etherscan.io'
        }
    }

    async function getHistory() {
        console.log(process.env.REACT_APP_ETHERSCAN_API_KEY)
        try {
            let res = await axios({
                method: 'get',
                url: `${getHost()}/api?module=account&action=txlist&address=${state?.wallet?.address}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`
            });
            let data = res.data;
            console.log(data)
            setTransactions(data.result)
            return data;
        } catch (error) {
            console.log(error.response);
            return error.response;
        }
    }

    const abi = [
        "function balanceOf(address owner) view returns (uint256)",
        "function decimals() view returns (uint8)",
        "function symbol() view returns (string)",
        "function transfer(address to, uint amount) returns (bool)",
        "event Transfer(address indexed from, address indexed to, uint amount)",
    ];

    const sendTransaction = async () => {
        let tx;
        let provider = ethers.getDefaultProvider(network);
        let wallet = new ethers.Wallet(state?.wallet?.privateKey, provider);
        //let erc20 = new ethers.Contract(state?.wallet?.address, abi, wallet);
        let coinOptions = {
            to: receiverAddress,
            gasLimit: gasLimit,
            gasPrice: ethers.utils.parseUnits('4', 'gwei'),
            value: ethers.utils.parseEther(value),
            nonce: 213
        };
        try {
            tx = await wallet.sendTransaction(coinOptions);
            console.log('success transaction')
            console.log(tx);
        } catch (e) {
            console.log("error from transfer");
            console.log(e);
        }
    }

    return (
        <Container maxWidth={'false'}>
            <Grid style={{marginTop:10}} direction={'row'}>
                <Switcher network={network} changeNetwork={setNetwork} />
            </Grid>
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
                <Typography  style={{display:'inline', paddingLeft:15}} variant="h5">
                    {
                        balanceLoader ? <CircularProgress size={20}/> : totalBalance
                    }
                </Typography>
            </Grid>
            <Grid style={{marginTop:10}} item xs={2} direction={'row'}>
                <Button onClick={getHistory}  variant="contained">
                    Get history
                </Button>
            </Grid>

            <Grid style={{marginTop:10}} direction={'row'}>
                <TransactionsTable transactions={transactions} address={state?.wallet?.address}/>
            </Grid>

            <Grid item xs={2} style={{marginTop:50}} direction={'row'}>
                <Typography style={{display:'inline'}} variant="h4">Send tokens</Typography>
            </Grid>
            <Grid item xs={2} style={{marginTop:50}} direction={'row'}>
                <TextField value={receiverAddress} onChange={e => {setReceiverAddress(e.target.value)}} style={{padding:10}} id="outlined-basic" label="Receiver address" variant="outlined" />
                <TextField value={value} onChange={e => {setValue(e.target.value)}} style={{padding:10}} id="outlined-basic" label="Value" variant="outlined" />
                <TextField value={gasLimit} onChange={e => {setGasLimit(e.target.value)}} style={{padding:10}} id="outlined-basic" label="Gas Limit" variant="outlined" />
            </Grid>
            <Grid style={{marginTop:10, marginLeft:10}} item xs={4} direction={'row'}>
                <Button onClick={sendTransaction}  variant="contained">
                    Send
                </Button>
            </Grid>

        </Container>
    )
}

export default Wallet;