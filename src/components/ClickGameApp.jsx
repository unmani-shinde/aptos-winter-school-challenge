import React, { useState, useEffect } from 'react';
import "../stylesheets/ClickGameStyle.css";
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { WalletSelector } from '@aptos-labs/wallet-adapter-ant-design';
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import {AptosClient,Network,Provider} from "aptos";
import {Alert, Button, Col, Descriptions, Input, Layout, Row, Spin, Typography} from "antd";
import { useNavigate } from 'react-router-dom';

export const NETWORK = "testnet";
export const NODE_URL = `https://fullnode.testnet.aptoslabs.com`;
export const moduleAddress = '0xb8533e4a7ab7bdc888af3ad576b396a6ca97f1d542e131101246669297041ff4';
export const hostAddress = '0xb8533e4a7ab7bdc888af3ad576b396a6ca97f1d542e131101246669297041ff4';
export const client = new AptosClient(NODE_URL);
export const provider = new Provider(Network.TESTNET);

const ClickGameHome = () => {
  
  const [data, setData] = useState(-1);
  const [universalCount,setUniversalCount] = useState(-2);
  const [transactionInProgress,setTransactionInProgress] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [showBorder,setShowBorder] = useState(false);

  const nav = useNavigate();
  
  const {
    network,
    wallet,
    account,
    connected,
    disconnect,signAndSubmitTransaction
  } = useWallet();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(!updating){setLoading(true); await fetch();} // Initial fetch
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Set up an interval to fetch the data every 10 seconds
    const intervalId = setInterval(() => {
      fetchData();
    }, 10000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [account?.address]);

  const fetch = async () => {
    if (!account) return;
    try {
      
      const countResource = await provider.getAccountResource(
        account.address,
        `${moduleAddress}::ClickApt::GlobalCount`,
      );
      

      const globalResource = await provider.getAccountResource(
        hostAddress,
        `${moduleAddress}::ClickApt::GlobalCount`,
      );

      var data = JSON.parse(countResource.data.count);
      setData(data);

      data = JSON.parse(globalResource.data.foo);
      setUniversalCount(data);
      
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
    setUpdating(true);

    const response = await signAndSubmitTransaction({
      sender: account.address,
      data: {
        function: `${moduleAddress}::ClickApt::increment`,
        typeArguments: [],
        functionArguments: [hostAddress],
      },
    });

    try {
      await client.waitForTransaction({ transactionHash: response.hash });
      setLoading(true);
      try {
        await fetch(); // Initial fetch
      } catch (error) {
        console.error(error);
      } finally {
        setUpdating(false);
      }

    } catch (error) {
      console.error(error);
    }
    finally {
      setTransactionInProgress(false);
      setUpdating(false);
    }
  };

  return (
    <div style={{height:"100%",width:'100%',overflowX:'hidden',display:'flex',flexDirection:'column'}}>
    
      <Layout style={{maxHeight:"20vh",backgroundColor:'transparent'}}>
        <Row align="middle">
          <Col flex={"auto"}>
            <h1>Click Game ({network?.name.toString()})</h1>
          </Col>
          <Col flex={12} style={{ textAlign: "right", paddingRight: "200px" }}>
            <WalletSelector />
          </Col>
        </Row>
      </Layout>
      {!connected && <Alert style={{width:"50%",justifyContent:'center',alignSelf:"center",marginTop:"30vh",backgroundColor:'transparent',border:'solid 2px white',color:'white'}} message={`Please connect your wallet`} type="info" />}
      {connected && (network?.name.toString()).toLowerCase() !== NETWORK && (
        <Alert
          message={`Wallet is connected to ${network?.name}. Please connect to ${NETWORK}`}
          type="warning"
          
        />
      )}
      <div style={{display:'flex',flexDirection:'column',width:'100%',height:"50vh"}}>
      
      {/* {connected && (network?.name.toString()).toLowerCase() === NETWORK && (
         <Button onClick={()=>{nav(`/leaderboard`)}}style={{marginTop:'-5vh',width:"20%",alignSelf:'center',backgroundColor:'transparent',fontWeight:'700',border:"transparent",fontSize:"1.75vw"}}disabled={!account || transactionInProgress}><u>View LeaderBoard</u></Button>
      )} */}

        <div style={{display:'flex',flexDirection:'row',width:'100%'}}>
          <div style={{width:"49%",marginLeft:'1vw',marginTop:'1vh',height:"100%",color:'white',paddingTop:loading||updating?"4vh":'10vh',border:connected?'solid 2px black':'transparent',borderRadius:"10px"}}>
            <div style={{margin:'1vh',width:"95%",height:"100%"}}>
              {connected && (<h3 style={{fontWeight:'700'}}>Hello there! I'm the MoveButton. Out of my many forms, currently you're seeing me in the <u>APTOS {network?.name}</u></h3>)}
              {connected && (<h3 style={{ marginTop: '-3vh' }}>You're Currently Connected to: 🔏 <u>{ account?.address ? `${account?.address.substring(0, 6)}...${account?.address.slice(-4)}` : 'N/A'}</u></h3> )}
                   
          {connected && !(loading) && (network?.name.toString()).toLowerCase() === NETWORK && (
        <Spin spinning={transactionInProgress}>
          <h3>These are your Stats:</h3>
          <h3>Number of Clicks across the Globe: 🌍 {universalCount}</h3>          
          <h3>Number of Clicks by You: 🙋🏻‍♂️ {data}</h3>
          
        </Spin>
      )}
      {connected && (loading) && (network?.name.toString()).toLowerCase() === NETWORK && (
        <div style={{display:'flex',flexDirection:'column'}}>
          <p style={{color:'black'}}>Refreshing...</p>
          <div className="loader"></div>
        </div>
        
      )}

      {connected && (updating) && !transactionInProgress && (network?.name.toString()).toLowerCase() === NETWORK && (
        <div style={{display:'flex',flexDirection:'column'}}>
        <p style={{color:'black'}}>Updating data...</p>
        <div className="loader"></div>
      </div>
      )}

          </div>
         
         


          </div>

          <div style={{width:"50%",height:"100%",}}>

{connected && (network?.name.toString()).toLowerCase() === NETWORK && (
<div>
  <h3 style={{fontWeight:'700',marginTop:'7vh',marginBottom:'-7vh'}}>Click Me to Increment!</h3>

<Button
  disabled={!account || transactionInProgress}
  onClick={incrementButton}
  style={{
    width: '20vw',
    height: '20vw',
    borderRadius: '100%',
    alignSelf:'center',
    justifyContent:'center',
    marginTop:'10vh',
    border:'solid 2px white',
    background: '#1640D6',
    fontSize: '18px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
  }}
>
  
</Button>


</div>



)}




  </div>
        </div>
      


      



      

      


      </div>
    </div>
  );
  

  
};

export default ClickGameHome;
