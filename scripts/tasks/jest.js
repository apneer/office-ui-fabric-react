// @ts-check

const { argv } = require('just-task');
const { jestTask } = require('just-scripts');
const path = require('path');

exports.jest = () =>
  jestTask({
    ...(process.env.TRAVIS && { runInBand: true }),
    ...(process.env.TRAVIS || argv().production ? { coverage: true } : undefined),
    ...(argv().u || argv().updateSnapshot ? { updateSnapshot: true } : undefined)
  });

exports.jestDom = () =>
  jestTask({
    runInBand: true,
    config: path.join(process.cwd(), 'jest.dom.config.js')
  });

exports.jestWatch = () => {
  const args = argv();
  return jestTask({
    ...(process.env.TRAVIS && { runInBand: true }),
    ...(process.env.TRAVIS || args.production ? { coverage: true } : undefined),
    ...(args.u || args.updateSnapshot ? { updateSnapshot: true } : undefined),
    watch: true,
    _: ['-i', ...(args._ || []).filter(arg => arg !== 'jest-watch')]
  });
};
