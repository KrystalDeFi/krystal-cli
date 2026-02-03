import { Command } from 'commander';
import { createClient } from '../lib/api';
import { printResponse, printError } from '../lib/output';

interface PositionsListOptions {
  wallet: string;
  status?: string;
  protocols?: string;
  chainIds?: string;
  includeClosed?: boolean;
  includeSpam?: boolean;
  offset?: string;
  limit?: string;
  orderBy?: string;
  orderDesc?: boolean;
}

interface PositionsGetOptions {
  wallet?: string;
}

interface PositionsHistoricalOptions {
  wallet?: string;
  timeframe?: string;
}

interface PositionsTransactionsOptions {
  wallet?: string;
  start?: string;
  end?: string;
}

export function registerPositionsCommands(program: Command): void {
  const positions = program
    .command('positions')
    .description('Query LP positions');

  positions
    .command('list')
    .description('List positions for a wallet')
    .requiredOption('--wallet <address>', 'Wallet address')
    .option('--status <status>', 'Position status filter')
    .option('--protocols <list>', 'Comma-separated protocols')
    .option('--chain-ids <ids>', 'Comma-separated chain IDs')
    .option('--include-closed', 'Include closed positions')
    .option('--include-spam', 'Include spam positions')
    .option('--offset <n>', 'Results offset')
    .option('--limit <n>', 'Results limit')
    .option('--order-by <field>', 'Order by field')
    .option('--order-desc', 'Order descending')
    .action(async (options: PositionsListOptions) => {
      try {
        const client = createClient();
        const response = await client.get('/v1/positions', {
          wallet: options.wallet,
          positionStatus: options.status,
          protocols: options.protocols,
          chainIds: options.chainIds,
          includeClosedPosition: options.includeClosed,
          includeSpamPosition: options.includeSpam,
          offset: options.offset,
          limit: options.limit,
          orderBy: options.orderBy,
          orderDesc: options.orderDesc,
        });
        printResponse(response);
      } catch (error: any) {
        printError(error.message);
        process.exit(1);
      }
    });

  positions
    .command('get <chainId> <positionId>')
    .description('Get detailed position information')
    .option('--wallet <address>', 'Wallet address (required for V2)')
    .action(async (chainId: string, positionId: string, options: PositionsGetOptions) => {
      try {
        const client = createClient();
        const response = await client.get(`/v1/positions/${chainId}/${positionId}`, {
          wallet: options.wallet,
        });
        printResponse(response);
      } catch (error: any) {
        printError(error.message);
        process.exit(1);
      }
    });

  positions
    .command('historical <chainId> <positionId>')
    .description('Get position historical performance')
    .option('--wallet <address>', 'Wallet address')
    .option('--timeframe <tf>', 'Timeframe (1h, 7d, 30d)')
    .action(async (chainId: string, positionId: string, options: PositionsHistoricalOptions) => {
      try {
        const client = createClient();
        const response = await client.get(`/v1/positions/${chainId}/${positionId}/historicalPerformance`, {
          wallet: options.wallet,
          timeframe: options.timeframe,
        });
        printResponse(response);
      } catch (error: any) {
        printError(error.message);
        process.exit(1);
      }
    });

  positions
    .command('transactions <chainId> <positionId>')
    .description('Get position transaction history')
    .option('--wallet <address>', 'Wallet address')
    .option('--start <timestamp>', 'Start timestamp')
    .option('--end <timestamp>', 'End timestamp')
    .action(async (chainId: string, positionId: string, options: PositionsTransactionsOptions) => {
      try {
        const client = createClient();
        const response = await client.get(`/v1/positions/${chainId}/${positionId}/transactions`, {
          wallet: options.wallet,
          startTimestamp: options.start,
          endTimestamp: options.end,
        });
        printResponse(response);
      } catch (error: any) {
        printError(error.message);
        process.exit(1);
      }
    });
}
