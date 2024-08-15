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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import HistoricalData from "./HistoricalData";
import { ethers } from "ethers";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  gap: theme.spacing(2),
  width: "100%",
  maxWidth: "400px",
}));

const Watchlist = () => {
  const [tokenAddress, setTokenAddress] = useState("");
  const [watchlist, setWatchlist] = useState({});
  const [openHistoryModal, setOpenHistoryModal] = useState(false);
  const [selectedToken, setSelectedToken] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [fetchHistory, setFetchHistory] = useState(false);

  // Load watchlist from localStorage when component mounts
  useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || {};
    setWatchlist(savedWatchlist);

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
        const newWatchlist = { ...watchlist, [tokenAddress]: balance };
        setWatchlist(newWatchlist);
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

  const handleViewHistory = (address) => {
    setSelectedToken(address);
    setFetchHistory(false);
    setOpenHistoryModal(true);
  };

  const handleFetchHistory = () => {
    setFetchHistory(true);
  };

  const handleCloseHistoryModal = () => {
    setOpenHistoryModal(false);
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
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleViewHistory(token)}
                >
                  View History
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog
        open={openHistoryModal}
        onClose={handleCloseHistoryModal}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Historical Data for {selectedToken}</DialogTitle>
        <DialogContent>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              customInput={<TextField label="Start Date" />}
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              customInput={<TextField label="End Date" />}
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFetchHistory}
          >
            Show History
          </Button>
          {fetchHistory && (
            <HistoricalData
              tokenId={selectedToken}
              startDate={startDate}
              endDate={endDate}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseHistoryModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </CenteredBox>
  );
};

export default Watchlist;