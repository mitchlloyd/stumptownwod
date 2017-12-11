import * as Alexa from 'alexa-sdk';
import fetch from 'node-fetch';
import * as Error from './error';
import { getWODFromBody } from './getWODFromBody';

const handlers: Alexa.Handlers<{}> = {
  'LaunchRequest'() {
    this.emit('GetWODForToday');
  },

  async 'GetWODForToday'() {
    const wod = await getWOD();
    this.emit(':tell', wod);
  }
};

interface LambdaHandler<T> {
  (event: Alexa.RequestBody<T>, context: Alexa.Context, callback?: (err: any, response: any) => void): void;
}

export const handler: LambdaHandler<{}> = (event, context, callback) => {
  const alexa = Alexa.handler(event, context, callback);
  alexa.registerHandlers(handlers);
  alexa.execute();
};

async function getWOD(): Promise<string> {
  let response;

  try {
    response = await fetch('http://www.crossfitstumptown.com/wod/');
  } catch (e) {
    return Error.networkErrorMessage;
  }

  if (!response.ok) {
    return Error.statusErrorMessage(response.status);
  }

  let body;

  try {
    body = await response.text();
  } catch (e) {
    return Error.readBodyErrorMessage;
  }

  return getWODFromBody(body);
}

// End to end test for today:
// getWOD().then(console.log)
