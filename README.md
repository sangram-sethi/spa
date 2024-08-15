# Token Watchlist SPA

This project is a single-page application (SPA) that allows users to add token contract addresses to their watchlist, view their current and historical balance, and perform token transfer operations. The project uses React.js for the frontend and Ethers.js for blockchain interaction.

## Getting Started

### Prerequisites

Before you start, make sure you have the following:

1. **Node.js and npm**: Make sure you have [Node.js](https://nodejs.org/) and npm installed. You can download Node.js, which includes npm, from their [official website](https://nodejs.org/).

2. **API Keys**:
   - **Infura.io**: You need an Infura API key and RPC HTTP URL to connect to the Ethereum network.
   - **Etherscan**: You need an Etherscan API key to fetch historical token balance data.

### Setup

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/sangram-sethi/spa.git

2. **Install Dependencies**: Navigate to the project directory   and install the required dependencies:

    ```bash
    npm install
3. **Configure Environment Variables**: Create a '.env' file in the root of your project directory and add the following environment variables:

        ```env
        REACT_APP_RPC_HTTP_URL=your_infura_rpc_http_url
        REACT_APP_ETHERSCAN_API_KEY=your_etherscan_api_key

    Replace 'your_infura_rpc_http_url' with the RPC HTTP URL from Infura and 'your_etherscan_api_key' with your Etherscan API key.

### Running the Project

1. **Start the Development Server**: Run the following command to start the development server:

    ```bash
    npm start
This will start the application on 'http://localhost:3000'.

### Viewing Historical Balances

To view historical balances, ensure that you have configured the Etherscan API key correctly in the '.env' file. The historical balance data will be fetched and displayed in charts and tables based on the date range selected.

### Troubleshooting

1. **Missing API Key**: If you encounter issues related to missing API keys, ensure that the '.env' file is correctly set up with your Infura and Etherscan API keys.

2. **Network Issues**: Verify that your Infura RPC HTTP URL is correct and that you have an active internet connection.
