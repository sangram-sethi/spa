import React, { useState } from "react";
import { ethers } from "ethers";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const WalletBalance = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState(null);

  const rpcHTTPUrl = process.env.REACT_APP_RPC_HTTP_URL;
  const provider = ethers.getDefaultProvider(rpcHTTPUrl);

  const handleInputChange = (event) => {
    setWalletAddress(event.target.value);
  };

  const handleCheckBalance = async () => {
    if (walletAddress) {
      try {
        const balance = await provider.getBalance(walletAddress);
        const balanceInETH = ethers.formatEther(balance);
        setBalance(balanceInETH);
        console.log('Balance: ', balanceInETH);
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    } else {
      console.log('Please enter a valid wallet address.');
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Typography variant="h2" gutterBottom>Check Wallet Balance</Typography>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Enter wallet address"
          color="success"
          value={walletAddress}
          onChange={handleInputChange}
          focused
        />
        <Button
          variant="contained"
          color="success"
          onClick={handleCheckBalance}
        >
          Check Balance
        </Button>
      </Box>
      {balance && (
        <Box mt={2}>
          <Typography variant="body1">Balance: {balance} ETH</Typography>
        </Box>
      )}
    </Box>
  );
};

export default WalletBalance;