# krystal-cli

CLI tool for accessing [Krystal Cloud API](https://cloud-api.krystal.app).

## Installation

```bash
npm install -g krystal-cli
```

## Quick Start

```bash
# 1. Login with your API key
krystal login <your-api-key>

# 2. Start using the CLI
krystal chains list
krystal balances <wallet-address>
```

## Commands

### Authentication

```bash
# Set your API key
krystal login <api-key>

# Remove your API key
krystal logout

# View current configuration
krystal config show

# Set custom API URL
krystal config set-url <url>
```

### Chains (No authentication required)

```bash
# List all supported chains
krystal chains list

# Get chain statistics
krystal chains get <chain-id>
```

### Protocols (No authentication required)

```bash
# List all supported protocols
krystal protocols
```

### Balances

```bash
# Get wallet balances across all chains
krystal balances <wallet-address>

# Filter by chain
krystal balances <wallet> --chain-ids 1,56,137

# Filter by token
krystal balances <wallet> --token <token-address>

# Include dust tokens
krystal balances <wallet> --include-dust
```

### Pools

```bash
# List pools
krystal pools list
krystal pools list --chain-id 1 --protocol uniswapv3 --limit 10

# Get pool details
krystal pools get <chain-id> <pool-address>

# Get pool historical data
krystal pools historical <chain-id> <pool-address> --start 1704067200 --end 1704153600

# Get pool ticks (liquidity distribution)
krystal pools ticks <chain-id> <pool-address>

# Get pool transactions
krystal pools transactions <chain-id> <pool-address> --limit 50
```

### Positions

```bash
# List positions for a wallet
krystal positions list --wallet <address>
krystal positions list --wallet <address> --chain-ids 1,137 --include-closed

# Get position details
krystal positions get <chain-id> <position-id> --wallet <address>

# Get position historical performance
krystal positions historical <chain-id> <position-id> --timeframe 7d

# Get position transactions
krystal positions transactions <chain-id> <position-id>
```

### Strategies

```bash
# List strategies for a wallet
krystal strategies list --wallet <address>
krystal strategies list --wallet <address> --status OPEN

# Get strategy positions
krystal strategies positions <strategy-id>
```

## Output Formats

```bash
# Pretty print (default)
krystal chains list

# JSON output (for piping to jq, etc.)
krystal chains list -o json
```

## API Credits

Most endpoints require API credits. After each authenticated request, the CLI displays:
- Cost of the request
- Remaining credits

Endpoints without authentication requirements (chains, protocols) don't consume credits.

## Configuration

Configuration is stored in your system's config directory:
- **macOS**: `~/Library/Preferences/krystal-cli-nodejs/config.json`
- **Linux**: `~/.config/krystal-cli-nodejs/config.json`
- **Windows**: `%APPDATA%\krystal-cli-nodejs\Config\config.json`

## API Documentation

Full API documentation: https://cloud-api.krystal.app/swagger/index.html

## License

MIT
