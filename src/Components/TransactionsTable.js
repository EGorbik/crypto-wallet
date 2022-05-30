import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from "react";

function createData(hash, nonce, value, type) {
    return { hash, nonce, value, type };
}



const TransactionsTable = ({ transactions, address }) => {
    const [ rows, setRows ] = useState([]);
 /*   const rows = [
        createData('0xf184534cf20ca96bff8aaf15b68662c1fd6d917cba7046c3190ef7cccd1b41ba', 209, 0.01, 'send'),
    ];*/

    useEffect(() => {
        let newRows = transactions.map(tr => {
            console.log(tr.value)
            console.log(tr.value/1000000000)
            let hash = tr.hash;
            let nonce = tr.nonce;
            let value = +tr.value/1000000000000000000;
            let type = tr.from === address ? 'send' : 'receive';
            return createData(hash, nonce, value, type)
        })
        setRows(newRows);
    }, [transactions])

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Hash</TableCell>
                        <TableCell>Nonce</TableCell>
                        <TableCell>Value</TableCell>
                        <TableCell>Type</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.hash}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.hash}
                            </TableCell>
                            <TableCell>{row.nonce}</TableCell>
                            <TableCell>{row.value}</TableCell>
                            <TableCell>{row.type}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TransactionsTable;