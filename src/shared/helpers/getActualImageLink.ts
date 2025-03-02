export function getActualImageLink(fileName?: string, api: string = 'https://indare.ru') {
  if (!fileName) return '';
  const facticalUrl = api + '/api/uploads/' + fileName;

  return facticalUrl;
}
