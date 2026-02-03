import { Command } from 'commander';
import { createPublicClient } from '../lib/api';
import { printResponse, printError } from '../lib/output';

export function registerProtocolsCommands(program: Command): void {
  program
    .command('protocols')
    .description('List all supported DeFi protocols')
    .action(async () => {
      try {
        const client = createPublicClient();
        const response = await client.get('/v1/protocols');
        printResponse(response);
      } catch (error: any) {
        printError(error.message);
        process.exit(1);
      }
    });
}
