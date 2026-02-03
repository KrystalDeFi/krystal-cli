import { Command } from 'commander';
import { createClient } from '../lib/api';
import { printResponse, printError } from '../lib/output';

interface StrategiesListOptions {
  wallet: string;
  status?: string;
  page?: string;
  perPage?: string;
}

interface StrategiesPositionsOptions {
  page?: string;
  perPage?: string;
}

export function registerStrategiesCommands(program: Command): void {
  const strategies = program
    .command('strategies')
    .description('Query Krystal automated strategies');

  strategies
    .command('list')
    .description('List strategies for a wallet')
    .requiredOption('--wallet <address>', 'Wallet address')
    .option('--status <status>', 'Status filter (OPEN/CLOSED)')
    .option('--page <n>', 'Page number')
    .option('--per-page <n>', 'Results per page')
    .action(async (options: StrategiesListOptions) => {
      try {
        const client = createClient();
        const response = await client.get('/v1/strategies', {
          wallet: options.wallet,
          status: options.status,
          page: options.page,
          perPage: options.perPage,
        });
        printResponse(response);
      } catch (error: any) {
        printError(error.message);
        process.exit(1);
      }
    });

  strategies
    .command('positions <strategyId>')
    .description('Get positions for a strategy')
    .option('--page <n>', 'Page number')
    .option('--per-page <n>', 'Results per page')
    .action(async (strategyId: string, options: StrategiesPositionsOptions) => {
      try {
        const client = createClient();
        const response = await client.get(`/v1/strategies/${strategyId}/positions`, {
          page: options.page,
          perPage: options.perPage,
        });
        printResponse(response);
      } catch (error: any) {
        printError(error.message);
        process.exit(1);
      }
    });
}
