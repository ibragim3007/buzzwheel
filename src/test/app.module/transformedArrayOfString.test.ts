import { getTransformedArrayOfString } from '@/src/shared/helpers/textConverters/coreLogic';

const str1 = 'Hello, ${c_player}! Random player is ${r_player}.';
const str2 = 'Hello, ${prev_player}! Your next player ${next_player}.';
const str3 = 'Random letter is ${r_letter}';

const inStr1 = 'Hello, ${c_player! and so one';

describe('getTransformedArrayOfString', () => {
  test('Correct values', () => {
    const res1 = getTransformedArrayOfString(str1);
    const res2 = getTransformedArrayOfString(str2);
    const res3 = getTransformedArrayOfString(str3);

    const inRes1 = getTransformedArrayOfString(inStr1);
    expect(res1).toEqual(['Hello, ', '${c_player}', '! Random player is ', '${r_player}', '.']);
    expect(res2).toEqual(['Hello, ', '${prev_player}', '! Your next player ', '${next_player}', '.']);
    expect(res3).toEqual(['Random letter is ', '${r_letter}']);

    expect(inRes1).toEqual(['Hello, ${c_player! and so one']);
  });
});
