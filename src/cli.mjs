import ora from 'ora';
import ms from 'ms';

export function cli() {
  const spinner = ora({
    text: 'Running tests...',
    prefixText: '[idiot-test] ',
  });

  spinner.start();
  setTimeout(() => {
    spinner.succeed('Tests complete.');
  }, ms('5s'));
}
