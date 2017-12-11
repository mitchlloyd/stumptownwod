import * as cheerio from 'cheerio';
import { translateShorthand } from './translateShorthand';

const WARM_UP = /(warm[- ]up|therapydia)/i;
const ONLY_WHITESPACE = /^\s+$/;

export function getWODFromBody(body: string) {
  const doc = cheerio.load(body);

  const postContent = doc('h2:contains("CrossFit Stumptown")').parent();
  const metcons = postContent.find('h3').not((_, element) => {
    return WARM_UP.test(cheerio(element).text());
  });

  return metcons.map((_, el) => {
    return parseMetcon(cheerio(el));
  }).get().join('\n');
}

function parseMetcon(heading: Cheerio) {
  const headingMessage = `<p>${heading.text()}</p>`;

  const instructionSet = heading.next('p').contents().map((_, element) => {
    if (element.type === 'text' && !ONLY_WHITESPACE.test(element.data)) {
      return element
    }
  });

  const instructionElements: CheerioElement[] = instructionSet.get() as any[];

  const instructions = instructionElements.map((el) => {
    return `<s>${translateShorthand(el.data)}</s>`
  });

  return [headingMessage, ...instructions].join('\n');
}
