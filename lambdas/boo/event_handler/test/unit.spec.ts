import { CloudEvent } from 'cloudevents';
import { CloudEventFunction, Context } from 'faas-js-runtime';
import { handle, Customer } from '../src';
import { expectType } from 'tsd';

describe('Unit: Lambda function', () => {
  it('handles a valid event', async () => {
    const data: Customer = {
      name: 'tiger',
      customerId: '01234'
    };

    // A valid event includes id, type, and source at a minimum.
    const cloudevent: CloudEvent<Customer> = new CloudEvent({
      id: '01234',
      type: 'com.example.cloudevents.test',
      source: '/test',
      data
    });

    // Invoke the function with the valid event, which should complete without error.
    const result = await handle({ log: { info: (_) => _ } } as Context, cloudevent);

    expect(result).toBeDefined();
    expect(result.data).toEqual(data);
    expect(result.type).toBe('echo');
    expect(result.source).toBe('function.eventViewer');
  });
});

// Ensure that the handle function is typed correctly.
expectType<CloudEventFunction>(handle);
