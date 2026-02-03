#!/usr/bin/env node

import { Command } from 'commander';
import { setFormat } from './lib/output';
import { registerConfigCommands, registerLoginCommand } from './commands/config';
import { registerChainsCommands } from './commands/chains';
import { registerProtocolsCommands } from './commands/protocols';
import { registerBalancesCommands } from './commands/balances';
import { registerPoolsCommands } from './commands/pools';
import { registerPositionsCommands } from './commands/positions';
import { registerStrategiesCommands } from './commands/strategies';

const program = new Command();

program
  .name('krystal')
  .description('CLI tool for accessing Krystal Cloud API')
  .version('0.1.0')
  .option('-o, --output <format>', 'Output format (json, pretty)', 'pretty')
  .hook('preAction', (thisCommand) => {
    const options = thisCommand.opts();
    if (options.output) {
      setFormat(options.output);
    }
  });

// Register all commands
registerLoginCommand(program);
registerConfigCommands(program);
registerChainsCommands(program);
registerProtocolsCommands(program);
registerBalancesCommands(program);
registerPoolsCommands(program);
registerPositionsCommands(program);
registerStrategiesCommands(program);

// Add examples to help
program.addHelpText('after', `

Examples:
  $ krystal login <your-api-key>     Set your API key
  $ krystal chains list              List supported chains
  $ krystal protocols                List supported protocols
  $ krystal balances <wallet>        Get wallet balances
  $ krystal pools list --chain-id 1  List pools on Ethereum
  $ krystal positions list --wallet <address>

Documentation: https://cloud-api.krystal.app/swagger/index.html
`);

program.parse(process.argv);
