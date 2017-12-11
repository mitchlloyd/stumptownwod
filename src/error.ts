export const networkErrorMessage = 'There was a network error when visiting the website.';

export function statusErrorMessage(statusCode: number) {
  return `The server returned an error: ${statusCode}`;
}

export const readBodyErrorMessage = 'There was an error reading the body of the request.';
