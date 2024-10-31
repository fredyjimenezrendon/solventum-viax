import { CloudEvent, HTTP } from 'cloudevents';
import { start, InvokerOptions } from 'faas-js-runtime';
import request from 'supertest';
import * as func from '../build';

// Test typed CloudEvent data
interface Customer {
  name: string;
  customerId: string;
}

const data: Customer = {
  name: 'tiger',
  customerId: '01234'
};

const message = HTTP.binary(
  new CloudEvent({
    source: '/test/integration',
    type: 'test',
    data
  })
);

const errHandler = (done: jest.DoneCallback) => (err: Error) => {
  expect(err).toBeFalsy();
  done();
};

describe('Integration: Lambda function', () => {
  it('handles a valid event', (done) => {
    start(func.handle, {} as InvokerOptions)
      .then((server) => {
        request(server)
          .post('/')
          .send(message.body)
          .set(message.headers)
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, result) => {
            expect(err).toBeFalsy();
            expect(result).toBeDefined();
            expect(result.body).toEqual(JSON.parse(message.body as string));
            expect(result.headers['ce-type']).toEqual('echo');
            expect(result.headers['ce-source']).toEqual('function.eventViewer');
            server.close(done);
          });
      })
      .catch(errHandler(done));
  });
});
