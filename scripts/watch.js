const program = require('commander');
const shell = require('shelljs');
const log4js = require('log4js');

const logger = log4js.getLogger('watch');

program
  .option('-i, --interval <n>', 'How often to run script', parseInt)
  .option('-u, --unit <string>', 'Unit of time')
  .option('-c, --command <cmd>', 'Command to run')
  .parse(process.argv);

function getMultiplier(unit) {
  switch (unit) {
    case 'ms':
      return 1;
    case 's':
    case 'seconds':
      return 1000;
    case 'm':
    case 'minutes':
      return 60 * 1000;
    case 'h':
    case 'hours':
      return 60 * 60 * 1000;
    case 'd':
    case 'days':
      return 24 * 60 * 60 * 1000;
  }
}

logger.info('Starting watch process...');

setInterval(() => {
  logger.info(`Running ${program.command}`);
  shell.exec(program.command);
}, program.interval * getMultiplier(program.unit));
