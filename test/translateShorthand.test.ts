import { translateShorthand } from '../src/translateShorthand';

test('x3', () => {
  expect(translateShorthand('x3')).toEqual('3 times');
});

test('c2b', () => {
  expect(translateShorthand('c2b')).toEqual('chest to bar');
});

test('HSPU', () => {
  expect(translateShorthand('HSPU')).toEqual('hand stand push-ups');
});

test('durations', () => {
  expect(translateShorthand('2:00')).toEqual(`<say-as interpret-as="time">2'00"</say-as>`);
})

test('hyphenatedRepScheme', () => {
  expect(translateShorthand('21-15-9')).toEqual('sets of 21, 15, and 9');
})
