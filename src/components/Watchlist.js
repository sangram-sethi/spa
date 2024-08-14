import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";

// Styled components
const CenteredBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  padding: theme.spacing(2),
}));

const FormBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(2), // Add space between form elements
  width: "100%",
  maxWidth: "400px",
}));

const Watchlist = () => {
  const [tokenAddress, setTokenAddress] = useState("");
  const [watchlist, setWatchlist] = useState({});

  // Load watchlist from localStorage when component mounts
  useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || {};
    setWatchlist(savedWatchlist);

    // Update balances for all stored token addresses
    const updateBalances = async () => {
      const updatedWatchlist = {};
      for (const address of Object.keys(savedWatchlist)) {
        const balance = await fetchTokenBalance(address);
        updatedWatchlist[address] = balance;
      }
      setWatchlist(updatedWatchlist);
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
    };

    updateBalances();
  }, []);

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const handleTokenAddressChange = (event) => {
    setTokenAddress(event.target.value);
  };

  const fetchTokenBalance = async (address) => {
    try {
      const rpcHTTPUrl = process.env.REACT_APP_RPC_HTTP_URL;
      const provider = ethers.getDefaultProvider(rpcHTTPUrl);
      const balance = await provider.getBalance(address);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error("Error fetching token balance:", error);
      return "Error";
    }
  };

  const handleAddToken = async () => {
    if (tokenAddress) {
      const balance = await fetchTokenBalance(tokenAddress);

      if (balance !== "Error") {
        // Update the watchlist JSON object
        const newWatchlist = { ...watchlist, [tokenAddress]: balance };
        setWatchlist(newWatchlist);

        // Clear input field
        setTokenAddress("");
      } else {
        alert("Failed to fetch token balance. Please check the address.");
      }
    }
  };

  const handleRemoveToken = (address) => {
    const newWatchlist = { ...watchlist };
    delete newWatchlist[address];
    setWatchlist(newWatchlist);
  };

  return (
    <CenteredBox>
      <Typography variant="h4" gutterBottom>
        Watchlist
      </Typography>
      <FormBox>
        <TextField
          label="Token Contract Address"
          value={tokenAddress}
          onChange={handleTokenAddressChange}
          color="success"
          focused
        />
        <Button variant="contained" color="success" onClick={handleAddToken}>
          Add Token
        </Button>
      </FormBox>

      {/* Display watchlist in a table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Token Address</TableCell>
            <TableCell align="right">Balance (ETH)</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(watchlist).map((token) => (
            <TableRow key={token}>
              <TableCell>{token}</TableCell>
              <TableCell align="right">{watchlist[token]}</TableCell>
              <TableCell align="right">
                <IconButton
                  color="error"
                  onClick={() => handleRemoveToken(token)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CenteredBox>
  );
};

export default Watchlist;
