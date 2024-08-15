import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Box,
  Button,
  ButtonGroup,
} from "@mui/material";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const HistoricalData = ({ tokenId, startDate, endDate }) => {
  const [historicalBalances, setHistoricalBalances] = useState([]);
  const [viewMode, setViewMode] = useState("chart"); // "chart" or "table"
  const [timeframe, setTimeframe] = useState("daily"); // "daily", "weekly", "monthly"

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const startTimestamp = Math.floor(new Date(startDate).getTime() / 1000);
        const endTimestamp = Math.floor(new Date(endDate).getTime() / 1000);

        const API_KEY = process.env.REACT_APP_ETHERSCAN_API_KEY;
        const url = `https://api.etherscan.io/api?module=account&action=tokentx&address=${tokenId}&startblock=0&endblock=99999999&sort=asc&apikey=${API_KEY}`;
        const response = await axios.get(url);

        const transactions = response.data.result.filter(
          (tx) => tx.timeStamp >= startTimestamp && tx.timeStamp <= endTimestamp
        );

        // Group data based on selected timeframe
        const groupedData = groupDataByTimeframe(transactions, timeframe);

        setHistoricalBalances(groupedData);
      } catch (error) {
        console.error("Error fetching historical data:", error);
      }
    };

    if (tokenId && startDate && endDate) {
      fetchHistoricalData();
    }
  }, [tokenId, startDate, endDate, timeframe]);

  const groupDataByTimeframe = (transactions, timeframe) => {
    const groupedData = {};
    transactions.forEach((tx) => {
      const date = new Date(tx.timeStamp * 1000);
      let key;
      if (timeframe === "daily") {
        key = date.toLocaleDateString();
      } else if (timeframe === "weekly") {
        key = `${date.getFullYear()}-W${getWeekNumber(date)}`;
      } else if (timeframe === "monthly") {
        key = `${date.getFullYear()}-${date.getMonth() + 1}`;
      }
      if (!groupedData[key]) {
        groupedData[key] = ethers.formatUnits(tx.value, tx.tokenDecimal);
      } else {
        groupedData[key] = (
          parseFloat(groupedData[key]) +
          parseFloat(ethers.formatUnits(tx.value, tx.tokenDecimal))
        ).toString();
      }
    });
    return Object.keys(groupedData).map((key) => ({
      date: key,
      balance: groupedData[key],
    }));
  };

  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const chartData = {
    labels: historicalBalances.map((entry) => entry.date),
    datasets: [
      {
        label: `Balance (${timeframe})`,
        data: historicalBalances.map((entry) => entry.balance),
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h6">Historical Balances</Typography>
        <ButtonGroup variant="outlined">
          <Button onClick={() => setTimeframe("daily")}>Daily</Button>
          <Button onClick={() => setTimeframe("weekly")}>Weekly</Button>
          <Button onClick={() => setTimeframe("monthly")}>Monthly</Button>
        </ButtonGroup>
      </Box>

      <Box display="flex" justifyContent="space-between" mb={2}>
        <Box>
          <Button variant="outlined" onClick={() => setViewMode("chart")} disabled={viewMode === "chart"}>
            View Chart
          </Button>
          <Button variant="outlined" onClick={() => setViewMode("table")} disabled={viewMode === "table"} sx={{ ml: 2 }}>
            View Table
          </Button>
        </Box>
      </Box>

      {viewMode === "chart" ? (
        <Line data={chartData} />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Balance (ETH)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historicalBalances.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{entry.date}</TableCell>
                <TableCell align="right">{entry.balance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default HistoricalData;