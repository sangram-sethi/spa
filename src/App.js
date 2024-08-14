import React, { useState } from 'react';
import WalletBalance from './components/WalletBalance';
import TransferETH from './components/TransferETH';
import { Box, Typography, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ethers } from 'ethers';

// Styled components
const CenteredBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: theme.spacing(2),
}));

const App = () => {
  // Initialize provider
  const rpcHTTPUrl = process.env.REACT_APP_RPC_HTTP_URL;
  const provider = ethers.getDefaultProvider(rpcHTTPUrl);

  const [showTransfer, setShowTransfer] = useState(false);
  const [privateKey, setPrivateKey] = useState("");

  const handleShowTransfer = () => {
    setShowTransfer(true);
  };

  const handlePrivateKeyChange = (key) => {
    setPrivateKey(key);
  };

  return (
    <CenteredBox>
      {!showTransfer ? (
        <Box width="100%" maxWidth={600}>
          <WalletBalance provider={provider} />
          <Box mt={2}>
            <Typography variant="body1">
              <Link
                component="button"
                variant="body2"
                onClick={handleShowTransfer}
                color="primary"
              >
                Go to Transfer ETH
              </Link>
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box width="100%" maxWidth={600}>
          <TransferETH provider={provider} privateKey={privateKey} onPrivateKeyChange={handlePrivateKeyChange} />
        </Box>
      )}
    </CenteredBox>
  );
};

export default App;