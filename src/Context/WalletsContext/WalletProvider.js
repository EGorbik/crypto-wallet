import * as React from 'react';
import {WalletContext} from './wallet-context';
import {useReducer} from "react";

const walletReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_WALLET': {
            return {
                ...state,
                wallets: [ action.payload, ...state.wallets ]
            }
        }
        case 'SET_WALLET': {
                return {
                    ...state,
                    wallet: state.wallets.find(el => el.id === action.id)
                }
        }
        default:
            return state
    }
}

const WalletProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(walletReducer, { wallets: [] })

    return <WalletContext.Provider value={{ state, dispatch }}>{children}</WalletContext.Provider>
}

export default WalletProvider;