export interface Event {
  type: string,
  message: string
}

function handler(event: Event) : string {
  console.log(`message is ${ event.message } with type ${ event.type }`);
  return event.message;
}

export { handler };