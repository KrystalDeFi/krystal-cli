import { Command } from 'commander';
import {
  setApiKey,
  setBaseUrl,
  getBaseUrl,
  getMaskedApiKey,
  getConfigPath,
  clearConfig,
} from '../lib/config';
import { printSuccess, printInfo } from '../lib/output';

export function registerConfigCommands(program: Command): void {
  const config = program
    .command('config')
    .description('Manage CLI configuration');

  config
    .command('show')
    .description('Show current configuration')
    .action(() => {
      console.log('Configuration:');
      console.log(`  Config path: ${getConfigPath()}`);
      console.log(`  API key:     ${getMaskedApiKey()}`);
      console.log(`  Base URL:    ${getBaseUrl()}`);
    });

  config
    .command('set-url <url>')
    .description('Set custom API base URL')
    .action((url: string) => {
      setBaseUrl(url);
      printSuccess(`Base URL set to: ${url}`);
    });

  config
    .command('clear')
    .description('Clear all configuration')
    .action(() => {
      clearConfig();
      printSuccess('Configuration cleared');
    });
}

export function registerLoginCommand(program: Command): void {
  program
    .command('login <api-key>')
    .description('Set your Krystal API key')
    .action((apiKey: string) => {
      setApiKey(apiKey);
      printSuccess('API key saved successfully!');
      printInfo(`Configuration stored at: ${getConfigPath()}`);
      printInfo('\nYou can now use krystal-cli to access the API.');
      printInfo('Try: krystal chains list');
    });

  program
    .command('logout')
    .description('Remove your API key')
    .action(() => {
      setApiKey('');
      printSuccess('API key removed');
    });
}
