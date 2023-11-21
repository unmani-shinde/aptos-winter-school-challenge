import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PetraWallet } from 'petra-plugin-wallet-adapter';
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';

const wallets = [new PetraWallet()];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AptosWalletAdapterProvider plugins={wallets} autoConnect={false}>
    <App />
  </AptosWalletAdapterProvider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
