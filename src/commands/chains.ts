import { Command } from 'commander';
import { createPublicClient } from '../lib/api';
import { printResponse, printError } from '../lib/output';

export function registerChainsCommands(program: Command): void {
  const chains = program
    .command('chains')
    .description('Query supported blockchain networks');

  chains
    .command('list')
    .description('List all supported chains')
    .action(async () => {
      try {
        const client = createPublicClient();
        const response = await client.get('/v1/chains');
        printResponse(response);
      } catch (error: any) {
        printError(error.message);
        process.exit(1);
      }
    });

  chains
    .command('get <chainId>')
    .description('Get statistics for a specific chain')
    .action(async (chainId: string) => {
      try {
        const client = createPublicClient();
        const response = await client.get(`/v1/chains/${chainId}`);
        printResponse(response);
      } catch (error: any) {
        printError(error.message);
        process.exit(1);
      }
    });
}
