/**
 * The idea is to use a dummy writable stream, save whatever our program outputs
 * to `process.stdout` and then finally compare if the results are different
 * from each other, which means the loading animation is working properly.
 **/

import Stream from 'stream';
import logUpdate from 'log-update';
import test from 'ava';
import loading from './';

/**
 * Note that we share the same stream instance, that's why tests must run
 * serially, otherwise output data will get messed up.
 **/

let output = [];

const stream = new Stream.Duplex({
  write(chunk, encoding, next) {
    output.push(chunk);
    next();
  }
});

/**
 * Little helper to hang the test for a given period of time through Promises.
 **/

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const createLoadingIndicator = stream => {
  return loading.start('loading', {
    render: logUpdate.create(stream)
  });
};

/**
 * Reset dummy stream output data at each run.
 **/

test.beforeEach(() => output.length = 0);

test('test for valid output', async t => {
  /**
   * Creates a new loading indicator passing a custom render fn.
   * In this case, the function simply returns a new `logUpdate()` that writes
   * to our dummy stream.
   **/

  const timer = createLoadingIndicator(stream);

  await delay(1000);
  loading.stop(timer);

  t.not(output[0].toString(), output[1].toString());
  t.not(output[1].toString(), output[2].toString());
  t.not(output[2].toString(), output[3].toString());
});

test('test if timeout is properly disposed', t => {
  const timer = createLoadingIndicator(stream);

  loading.stop(timer);
  t.not(timer['0']);
});

test('test if custom text is properly added', async t => {
  const timer = createLoadingIndicator(stream);

  await delay(1000);
  loading.stop(timer);

  const text = output[0].toString().slice(2).trim();
  t.is(text, 'loading');
});
