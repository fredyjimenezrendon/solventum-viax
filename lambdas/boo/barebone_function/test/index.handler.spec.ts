import { handler } from "../src";
import event from "./index.event.json"

describe('index test', () => {

  test('should successfully return message', () => {
    expect(handler(event))
      .toStrictEqual("lambda event json message");
  });

});