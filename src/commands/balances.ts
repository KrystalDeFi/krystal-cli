import { Command } from 'commander';
import { createClient } from '../lib/api';
import { printResponse, printError } from '../lib/output';

interface BalancesOptions {
  chainIds?: string;
  token?: string;
  includeDust?: boolean;
}

export function registerBalancesCommands(program: Command): void {
  program
    .command('balances <wallet>')
    .description('Get wallet token balances across chains')
    .option('--chain-ids <ids>', 'Comma-separated chain IDs to filter')
    .option('--token <address>', 'Filter by token address')
    .option('--include-dust', 'Include dust tokens')
    .action(async (wallet: string, options: BalancesOptions) => {
      try {
        const client = createClient();
        const response = await client.get(`/v1/balances/${wallet}`, {
          chainIds: options.chainIds,
          tokenAddress: options.token,
          includeDustToken: options.includeDust,
        });
        printResponse(response);
      } catch (error: any) {
        printError(error.message);
        process.exit(1);
      }
    });
}
