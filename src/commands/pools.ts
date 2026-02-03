import { Command } from 'commander';
import { createClient } from '../lib/api';
import { printResponse, printError } from '../lib/output';

interface PoolsListOptions {
  chainId?: string;
  factory?: string;
  protocol?: string;
  token?: string;
  sortBy?: string;
  minTvl?: string;
  minVolume?: string;
  limit?: string;
  offset?: string;
  withIncentives?: boolean;
  includePrice?: boolean;
}

interface PoolsGetOptions {
  factory?: string;
  withIncentives?: boolean;
}

interface PoolsHistoricalOptions {
  start?: string;
  end?: string;
}

interface PoolsTransactionsOptions {
  factory?: string;
  start?: string;
  end?: string;
  limit?: string;
  offset?: string;
}

export function registerPoolsCommands(program: Command): void {
  const pools = program
    .command('pools')
    .description('Query liquidity pool information');

  pools
    .command('list')
    .description('List pools with filtering and pagination')
    .option('--chain-id <id>', 'Chain ID (e.g., 1, 8453, 56)')
    .option('--factory <address>', 'Factory address')
    .option('--protocol <name>', 'Protocol name')
    .option('--token <address>', 'Token address')
    .option('--sort-by <field>', 'Sort field')
    .option('--min-tvl <value>', 'Minimum TVL')
    .option('--min-volume <value>', 'Minimum 24h volume')
    .option('--limit <n>', 'Results limit')
    .option('--offset <n>', 'Results offset')
    .option('--with-incentives', 'Include incentives data')
    .option('--include-price', 'Include token prices')
    .action(async (options: PoolsListOptions) => {
      try {
        const client = createClient();
        const response = await client.get('/v1/pools', {
          chainId: options.chainId,
          factoryAddress: options.factory,
          protocol: options.protocol,
          token: options.token,
          sortBy: options.sortBy,
          minTvl: options.minTvl,
          minVolume24h: options.minVolume,
          limit: options.limit,
          offset: options.offset,
          withIncentives: options.withIncentives,
          includeTokenPrice: options.includePrice,
        });
        printResponse(response);
      } catch (error: any) {
        printError(error.message);
        process.exit(1);
      }
    });

  pools
    .command('get <chainId> <poolAddress>')
    .description('Get detailed pool information')
    .option('--factory <address>', 'Factory address')
    .option('--with-incentives', 'Include incentives data')
    .action(async (chainId: string, poolAddress: string, options: PoolsGetOptions) => {
      try {
        const client = createClient();
        const response = await client.get(`/v1/pools/${chainId}/${poolAddress}`, {
          factoryAddress: options.factory,
          withIncentives: options.withIncentives,
        });
        printResponse(response);
      } catch (error: any) {
        printError(error.message);
        process.exit(1);
      }
    });

  pools
    .command('historical <chainId> <poolAddress>')
    .description('Get historical price, volume, and fee data')
    .option('--start <timestamp>', 'Start timestamp')
    .option('--end <timestamp>', 'End timestamp')
    .action(async (chainId: string, poolAddress: string, options: PoolsHistoricalOptions) => {
      try {
        const client = createClient();
        const response = await client.get(`/v1/pools/${chainId}/${poolAddress}/historical`, {
          startTime: options.start,
          endTime: options.end,
        });
        printResponse(response);
      } catch (error: any) {
        printError(error.message);
        process.exit(1);
      }
    });

  pools
    .command('ticks <chainId> <poolAddress>')
    .description('Get tick data (liquidity distribution)')
    .option('--factory <address>', 'Factory address')
    .action(async (chainId: string, poolAddress: string, options: { factory?: string }) => {
      try {
        const client = createClient();
        const response = await client.get(`/v1/pools/${chainId}/${poolAddress}/ticks`, {
          factoryAddress: options.factory,
        });
        printResponse(response);
      } catch (error: any) {
        printError(error.message);
        process.exit(1);
      }
    });

  pools
    .command('transactions <chainId> <poolAddress>')
    .description('Get transaction history for a pool')
    .option('--factory <address>', 'Factory address')
    .option('--start <timestamp>', 'Start timestamp')
    .option('--end <timestamp>', 'End timestamp')
    .option('--limit <n>', 'Results limit')
    .option('--offset <n>', 'Results offset')
    .action(async (chainId: string, poolAddress: string, options: PoolsTransactionsOptions) => {
      try {
        const client = createClient();
        const response = await client.get(`/v1/pools/${chainId}/${poolAddress}/transactions`, {
          factoryAddress: options.factory,
          startTime: options.start,
          endTime: options.end,
          limit: options.limit,
          offset: options.offset,
        });
        printResponse(response);
      } catch (error: any) {
        printError(error.message);
        process.exit(1);
      }
    });
}
