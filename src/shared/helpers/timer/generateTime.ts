//currnetTime = 120 => 02:00 => 01:59

// 120 ; 1 * 60 = 60 => 120 - 60
export const generateTimerTime = (currentTime: number): string => {
  const minutes = Math.floor(currentTime / 60);
  const seconds = Math.floor(currentTime - minutes * 60);

  const minutesString = ('0' + String(minutes)).slice(-2);
  const secondsString = ('0' + String(seconds)).slice(-2);
  return `${minutesString}:${secondsString}`;
};
