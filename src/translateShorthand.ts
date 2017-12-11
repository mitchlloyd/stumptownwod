export function translateShorthand(text: string) {
  const tokens = text.split(/\s/);

  return tokens.map(token => {
    return process(
      token,
      [
        nTimes,
        chestToBar,
        handStandPushUps,
        timeDuration,
        calories,
        hyphenatedRepScheme,
      ],
    );
  }).join(' ');
}

interface StringProcessor {
  (text: string): string;
}

function process(value: string, fns: StringProcessor[]) {
  let result: string = value;

  fns.forEach(fn => result = fn(result));

  return result;
}

function nTimes(text: string) {
  return text.replace(/^x(\d+)$/i, '$1 times');
}

function chestToBar(text: string) {
  return text.replace(/^c2b$/i, 'chest to bar');
}

function handStandPushUps(text: string) {
  return text.replace(/^hspu$/i, 'hand stand push-ups');
}

function timeDuration(text: string) {
  return text.replace(/^(\d+):(\d+)$/i, `<say-as interpret-as="time">$1'$2"</say-as>`)
}

function calories(text: string) {
  return text.replace(/^cals$/i, 'calories')
}

function hyphenatedRepScheme(text: string) {
  if (/^\d+(-\d+)+$/.test(text)) {
    const nums = text.split('-');
    const lastNum = nums.pop();

    return `sets of ${nums.join(', ')}, and ${lastNum}`;
  }

  return text;
}
