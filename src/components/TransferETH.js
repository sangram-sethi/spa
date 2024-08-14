import React, { useState } from "react";
import { ethers } from "ethers";
import { Box, TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components
const CenteredBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  padding: theme.spacing(2),
}));

const FormBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),  // Add space between form elements
  width: '100%',
  maxWidth: '400px',
}));

const HeadingTypography = styled(Typography)(({ theme }) => ({
  fontFamily: 'Roboto',
  fontWeight: 400,
  textAlign: 'center',
  marginBottom: theme.spacing(3),
}));

const TransferETH = ({ provider, privateKey, onPrivateKeyChange }) => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionHash, setTransactionHash] = useState(null);

  const handleRecipientChange = (event) => {
    setRecipient(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handlePrivateKeyChange = (event) => {
    onPrivateKeyChange(event.target.value);
  };

  const handleTransfer = async () => {
    if (recipient && amount && privateKey) {
      try {
        // Create a new signer with the provided private key
        const hexPrivateKey = new Uint8Array(Buffer.from(privateKey, "hex"));
        const newSigner = new ethers.Wallet(hexPrivateKey, provider);

        // Perform the transaction
        const tx = await newSigner.sendTransaction({
          to: recipient,
          value: ethers.parseEther(amount),
        });
        setTransactionHash(tx.hash);
      } catch (error) {
        console.error('Error sending transaction:', error);
      }
    } else {
      console.log('Please enter all required fields.');
    }
  };

  return (
    <CenteredBox>
      <HeadingTypography variant="h2">Transfer ETH</HeadingTypography>
      <FormBox
        component="form"
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Recipient Address"
          value={recipient}
          onChange={handleRecipientChange}
          color="success"
          focused
        />
        <TextField
          label="Amount (ETH)"
          type="number"
          value={amount}
          onChange={handleAmountChange}
          color="success"
          focused
        />
        <TextField
          label="Private Key"
          type="password"
          value={privateKey}
          onChange={handlePrivateKeyChange}
          color="success"
          focused
        />
        <Button
          variant="contained"
          color="success"
          onClick={handleTransfer}
        >
          Send ETH
        </Button>
      </FormBox>
      {transactionHash && (
        <Box mt={2}>
          <Typography variant="body1">Transaction Hash: {transactionHash}</Typography>
        </Box>
      )}
    </CenteredBox>
  );
};

export default TransferETH;