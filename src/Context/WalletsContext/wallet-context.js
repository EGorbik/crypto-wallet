import * as React from "react";
export const WalletContext = React.createContext({
    state: {
        wallets: [],
        wallet: null
    },
    dispatch: () => {}
})