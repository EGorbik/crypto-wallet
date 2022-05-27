import * as React from 'react';
import {WalletContext} from './wallet-context';
export function withWallet(Component) {
    return function WalletComponent(props) {
        return (
            <WalletContext.Consumer>
                {(contexts) => <Component {...props} {...contexts} />
                }
            </WalletContext.Consumer>
        )
    }
}