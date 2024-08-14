// import React, { useState } from 'react';
// import WalletBalance from './components/WalletBalance';
// import TransferETH from './components/TransferETH';
// import Watchlist from './components/Watchlist';
// import { Box, Typography, Link } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import { ethers } from 'ethers';

// // Styled components
// const CenteredBox = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   justifyContent: 'center',
//   minHeight: '100vh',
//   padding: theme.spacing(2),
// }));

// const LinkButton = styled(Link)(({ theme }) => ({
//   marginTop: theme.spacing(2),
//   cursor: 'pointer',
//   fontFamily: 'Roboto, sans-serif',
// }));

// const App = () => {
//   const rpcHTTPUrl = process.env.REACT_APP_RPC_HTTP_URL;
//   const provider = ethers.getDefaultProvider(rpcHTTPUrl);

//   const [showTransfer, setShowTransfer] = useState(false);
//   const [showWatchlist, setShowWatchlist] = useState(false);
//   const [privateKey, setPrivateKey] = useState('');

//   const handleShowTransfer = () => {
//     setShowTransfer(true);
//     setShowWatchlist(false);
//   };

//   const handleShowWatchlist = () => {
//     setShowTransfer(false);
//     setShowWatchlist(true);
//   };

//   const handleShowWalletBalance = () => {
//     setShowTransfer(false);
//     setShowWatchlist(false);
//   };

//   const handlePrivateKeyChange = (key) => {
//     setPrivateKey(key);
//   };

//   return (
//     <CenteredBox>
//       <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Roboto, sans-serif' }}>
//         Welcome
//       </Typography>
//       {!showTransfer && !showWatchlist ? (
//         <Box width="100%" maxWidth={600}>
//           <WalletBalance provider={provider} />
//           <LinkButton
//             component="button"
//             variant="body2"
//             onClick={handleShowTransfer}
//             color="primary"
//           >
//             Go to Transfer ETH
//           </LinkButton>
//           <LinkButton
//             component="button"
//             variant="body2"
//             onClick={handleShowWatchlist}
//             color="primary"
//           >
//             Go to Watchlist
//           </LinkButton>
//         </Box>
//       ) : showTransfer ? (
//         <Box width="100%" maxWidth={600}>
//           <TransferETH provider={provider} privateKey={privateKey} onPrivateKeyChange={handlePrivateKeyChange} />
//         </Box>
//       ) : (
//         <Box width="100%" maxWidth={600}>
//           <Watchlist provider={provider} />
//         </Box>
//       )}
//     </CenteredBox>
//   );
// };

// export default App;
// import React, { useState } from 'react';
// import WalletBalance from './components/WalletBalance';
// import TransferETH from './components/TransferETH';
// import Watchlist from './components/Watchlist';
// import { Box, Typography, Link } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import { ethers } from 'ethers';

// // Styled components
// const CenteredBox = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   justifyContent: 'center',
//   minHeight: '100vh',
//   padding: theme.spacing(2),
// }));

// const LinkButton = styled(Link)(({ theme }) => ({
//   marginTop: theme.spacing(2),
//   cursor: 'pointer',
//   fontFamily: 'Roboto, sans-serif',
// }));

// const App = () => {
//   const rpcHTTPUrl = process.env.REACT_APP_RPC_HTTP_URL;
//   const provider = ethers.getDefaultProvider(rpcHTTPUrl);

//   const [showTransfer, setShowTransfer] = useState(false);
//   const [showWatchlist, setShowWatchlist] = useState(false);
//   const [showWalletBalance, setShowWalletBalance] = useState(false);
//   const [privateKey, setPrivateKey] = useState('');

//   const handleShowTransfer = () => {
//     setShowTransfer(true);
//     setShowWatchlist(false);
//     setShowWalletBalance(false);
//   };

//   const handleShowWatchlist = () => {
//     setShowTransfer(false);
//     setShowWatchlist(true);
//     setShowWalletBalance(false);
//   };

//   const handleShowWalletBalance = () => {
//     setShowTransfer(false);
//     setShowWatchlist(false);
//     setShowWalletBalance(true);
//   };

//   const handlePrivateKeyChange = (key) => {
//     setPrivateKey(key);
//   };

//   return (
//     <CenteredBox>
//       <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Roboto, sans-serif' }}>
//         Welcome
//       </Typography>
//       <Box width="100%" maxWidth={600}>
//         <LinkButton
//           component="button"
//           variant="body2"
//           onClick={handleShowWalletBalance}
//           color="primary"
//         >
//           Check Wallet Balance
//         </LinkButton>
//         <LinkButton
//           component="button"
//           variant="body2"
//           onClick={handleShowTransfer}
//           color="primary"
//         >
//           Transfer ETH
//         </LinkButton>
//         <LinkButton
//           component="button"
//           variant="body2"
//           onClick={handleShowWatchlist}
//           color="primary"
//         >
//           Watchlist
//         </LinkButton>
//       </Box>

//       {showWalletBalance && <WalletBalance provider={provider} />}
//       {showTransfer && <TransferETH provider={provider} privateKey={privateKey} onPrivateKeyChange={handlePrivateKeyChange} />}
//       {showWatchlist && <Watchlist />}
//     </CenteredBox>
//   );
// };

// export default App;
import React, { useState } from 'react';
import WalletBalance from './components/WalletBalance';
import TransferETH from './components/TransferETH';
import Watchlist from './components/Watchlist';
import { Box, Typography, Link, List, ListItem } from '@mui/material';
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

const StyledLink = styled(Link)(({ theme }) => ({
  fontFamily: 'Roboto, sans-serif',
  cursor: 'pointer',
  textDecoration: 'none',
  color: theme.palette.primary.main,
}));

const App = () => {
  const rpcHTTPUrl = process.env.REACT_APP_RPC_HTTP_URL;
  const provider = ethers.getDefaultProvider(rpcHTTPUrl);

  const [showTransfer, setShowTransfer] = useState(false);
  const [showWatchlist, setShowWatchlist] = useState(false);
  const [showWalletBalance, setShowWalletBalance] = useState(false);
  const [privateKey, setPrivateKey] = useState('');

  const handleShowTransfer = () => {
    setShowTransfer(true);
    setShowWatchlist(false);
    setShowWalletBalance(false);
  };

  const handleShowWatchlist = () => {
    setShowTransfer(false);
    setShowWatchlist(true);
    setShowWalletBalance(false);
  };

  const handleShowWalletBalance = () => {
    setShowTransfer(false);
    setShowWatchlist(false);
    setShowWalletBalance(true);
  };

  const handlePrivateKeyChange = (key) => {
    setPrivateKey(key);
  };

  return (
    <CenteredBox>
      <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Roboto, sans-serif' }}>
        Welcome
      </Typography>
      <Box width="100%" maxWidth={600}>
        <List>
          <ListItem>
            <StyledLink
              component="button"
              variant="body2"
              onClick={handleShowWalletBalance}
            >
              Check Wallet Balance
            </StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink
              component="button"
              variant="body2"
              onClick={handleShowTransfer}
            >
              Transfer ETH
            </StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink
              component="button"
              variant="body2"
              onClick={handleShowWatchlist}
            >
              Watchlist
            </StyledLink>
          </ListItem>
        </List>
      </Box>

      {showWalletBalance && <WalletBalance provider={provider} />}
      {showTransfer && <TransferETH provider={provider} privateKey={privateKey} onPrivateKeyChange={handlePrivateKeyChange} />}
      {showWatchlist && <Watchlist />}
    </CenteredBox>
  );
};

export default App;