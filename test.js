/**
 * The idea is to use a dummy writable stream, save whatever our program outputs
 * to `process.stdout` and then finally compare if the results are different
 * from each other, which means the loading animation is working properly.
 **/

import {Writable} from 'stream';
import logUpdate from 'log-update';
import test from 'ava';
import spinner from './src';

/**
 * Setup dummy writable stream.
 **/

let output = [];
let stream = new Writable();
stream.write = chunk => output.push(chunk);

const createSpinner = stream => {
  return spinner.start(null, {
    render: logUpdate.create(stream)
  });
};

test('test for valid output', async t => {
  /**
   * Creates a new loading indicator passing a custom render fn.
   * In this case, the function simply returns a new `logUpdate()` that writes
   * to our dummy stream.
   **/

  const timer = createSpinner(stream);

  await setTimeout(() => {
    spinner.stop(timer);

    t.not(output[0], output[1]);
    t.not(output[2], output[3]);
    t.not(output[4], output[5]);
  }, 1000);
});

test('test if timeout is properly disposed', async t => {
  const timer = createSpinner(stream);

  await setTimeout(() => {
    spinner.stop(timer);
    t.not(timer['0']);
  });
});
