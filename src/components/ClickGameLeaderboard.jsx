import React, { useState, useEffect } from 'react';
import "../stylesheets/ClickGameStyle.css";
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { WalletSelector } from '@aptos-labs/wallet-adapter-ant-design';
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import {AptosClient,Network,Provider} from "aptos";
import {Alert, Button, Col, Descriptions, Input, Layout, Row, Spin, Typography} from "antd";

function ClickGameLeaderboard() {

    return(<div style={{height:'100%',width:'100%',overflowX:'hidden'}}>
        <h2>LeaderBoard</h2>
    </div>)
    
}

export default ClickGameLeaderboard;