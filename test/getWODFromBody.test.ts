import { getWODFromBody } from '../src/getWODFromBody';
import { loadFixture } from './utils/loadFixture';

test('responding for a standard workout', () => {
  const html = loadFixture('standard');

  expect(getWODFromBody(html)).toMatchSnapshot();
});

test('responding for a hero workout', () => {
  const html = loadFixture('hero');

  expect(getWODFromBody(html)).toMatchSnapshot();
});

test('responding for a 2-metcon workout', () => {
  const html = loadFixture('2-metcon');

  expect(getWODFromBody(html)).toMatchSnapshot();
});

test('responding for a hatch-squat workout', () => {
  const html = loadFixture('hatch-squat');

  expect(getWODFromBody(html)).toMatchSnapshot();
});
