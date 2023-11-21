import React, { useState, useEffect } from 'react';
import "../stylesheets/ClickGameStyle.css";
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { WalletSelector } from '@aptos-labs/wallet-adapter-ant-design';
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import {AptosClient,Network,Provider} from "aptos";
import {Alert, Button, Col, Descriptions, Input, Layout, Row, Spin, Typography} from "antd";

export const NETWORK = "testnet";
export const NODE_URL = `https://fullnode.testnet.aptoslabs.com`;
export const moduleAddress = `0x1873bb1fd18062329392afd089d33e7188b72fbc776b20f3ee701f2b5e5d0679`;
export const client = new AptosClient(NODE_URL);
export const provider = new Provider(Network.TESTNET);

const ClickGameApp = () => {
  
  const [data, setData] = useState(-1);
  const [transactionInProgress,setTransactionInProgress] = useState(false);
  
  const {
    network,
    wallet,
    account,
    connected,
    disconnect,signAndSubmitTransaction
  } = useWallet();

  useEffect(() => {
    fetch();
  }, [account?.address]);

  const fetch = async () => {
    if (!account) return;
    try {
      const countResource = await provider.getAccountResource(
        account.address,
        `${moduleAddress}::ClickApt::GlobalCount`,
      );
      var data = JSON.parse(countResource?.data.count);
      setData(data);
      console.log(data);
      // if(reload){
      //   window.location.reload();
      // }
    }
    catch (error) {
      console.log(error);;
    }
  }

  
  // if you want to wait for transaction
  



  const incrementButton = async () => {

    setTransactionInProgress(true);

    const response = await signAndSubmitTransaction({
      sender: account.address,
      data: {
        function: `${moduleAddress}::ClickApt::increment`,
        typeArguments: [],
        functionArguments: [],
      },
    });

    try {
      await client.waitForTransaction({ transactionHash: response.hash });

    } catch (error) {
      console.error(error);
    }
    finally {
      setTransactionInProgress(false);
    }
  };

  // useEffect(() => {
  //   if (connected) {
  //     // Call the smart contract function to get the total clicks
  //     getTotalClicks();
  //   }
  // }, [connected]);


// const handleIncrementClicks = async () => {
//     if (!account) return []; // Assuming 0 as the default total clicks if there's no account
  
//     // Change this to be your module account address
//     const clickcount = 1;
    
//     const payload = {
//       type: "entry_function_payload",
//       function: '0x8458e011098a8719842e1159a3005f405008244f6e9656fda6fb7e903265affb::click_apt_addr::clickapt::increment_clicks',
//       type_arguments: [],
//       arguments: [account, clickcount],
//     };
    

//     console.log(payload);
//     try {
//       setTransactionInProgress(true);
//       const response = await signAndSubmitTransaction(payload);
//       await client.waitForTransaction(response);
      
//       // const ClickGameResource = await provider.getAccountResource(
//       //   account.address,
//       //   `${moduleAddress}::clickapt::ClickGame`
//       // );
//       // setTotalClicks(5);      
//       // // Assuming that the resource contains a field 'total_clicks', adjust it accordingly
//       // const totalClicks = ClickGameResource.total_clicks;
//       // setTotalClicks(totalClicks);
//     } catch (error) {
//       console.log('Error in Increment:',error);
//     }
//     finally{
//       setTransactionInProgress(false);
//     }
//   };
  

//   const handleIncrementClicks = async () => {
//     try {
//       const clicks = 1; // You can adjust the number of clicks as needed
//       await window.ClickGame.increment_clicks(account, clicks);
//       getTotalClicks(); // Update the total clicks after incrementing
//     } catch (error) {
//       console.error('Error incrementing clicks:', error);
//     }
//   };


  const handleViewConnectionStatus = () => {
    // console.log("Discovering the connection status...");
    setTimeout(() => {
      console.log(typeof(connected));
    }, 10000);
  };

  return (
    <div>
    
      <Layout>
        <Row align="middle">
          <Col flex={"auto"}>
            <h1>Click Game ({network?.name.toString()})</h1>
          </Col>
          <Col flex={12} style={{ textAlign: "right", paddingRight: "200px" }}>
            <WalletSelector />
          </Col>
        </Row>
      </Layout>
      {!connected && <Alert message={`Please connect your wallet`} type="info" />}
      {connected && (network?.name.toString()).toLowerCase() !== NETWORK && (
        <Alert
          message={`Wallet is connected to ${network?.name}. Please connect to ${NETWORK}`}
          type="warning"
        />
      )}
      {connected && (network?.name.toString()).toLowerCase() === NETWORK && (
        <Spin spinning={transactionInProgress}>
         <h3>Global Count:{data}</h3>
         <h3>Account:{account?.address}</h3>
         <Button disabled={!account || transactionInProgress} onClick={incrementButton}>Increment Counter</Button>
        </Spin>
      )}
  
      {/* Uncomment the following code if needed */}
      {/* <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', width: '100%', alignSelf: 'center', alignItems: 'center' }}>
        {connected ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignSelf: 'center', fontSize: '1.4vw' }}>
            <b>Connected Account Address:</b> {account?.address}
            <p>Total Clicks: {totalClicks}</p>
            <button className="disconnect-button" onClick={disconnect}>
              Disconnect
            </button>
          </div>
        ) : (
          <div>
            <WalletSelector />
          </div>
        )}
        <button style={{ width: '29%', marginTop: '7vh', padding: '1vw', fontSize: '1.5vw' }} onClick={handleViewConnectionStatus}>
          View Connection Status
        </button>
        <Spin spinning={transactionInProgress}>
          <Button type="primary" onClick={getTotalClicks}>
            Increment Clicks
          </Button>
        </Spin>
      </div> */}
    </div>
  );
  

  // return (
  //   <div style={{ display: "flex", flexDirection: 'column', justifyContent: 'center', height: '100%', width: "100%", alignSelf: 'center', alignItems: 'center' }}>
  //     {connected ? (
  //       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignSelf: 'center', fontSize: "1.4vw" }}>
  //         <b>Connected Account Address:</b> {account?.address}
  //         <p>Total Clicks: {totalClicks}</p>
  //         {/* <button onClick={handleIncrementClicks}>Increment Clicks</button> */}
  //         <button className='disconnect-button' onClick={disconnect}>Disconnect</button>
  //       </div>
  //     ) : (
  //       <div>
  //         <WalletSelector />
  //       </div>
  //     )}
  //     <button style={{ width: "29%", marginTop: '7vh', padding: '1vw', fontSize: '1.5vw' }} onClick={handleViewConnectionStatus}>View Connection Status</button>
  //     <Spin spinning={transactionInProgress}>
  //       <Button type="primary" onClick={()=>getTotalClicks()}>Increment Clicks</Button>
  //     </Spin>
  //   </div>
  // );
};

export default ClickGameApp;
