/**
 * Подставляет значения из `body` в строку `locale`.
 *
 *  localeVars(
 *    'Привет, {{ user.name }}! Тебе {{ age }} лет.',
 *    { user: { name: 'Илья' }, age: 23 }
 *  )
 *  // → "Привет, Илья! Тебе 23 лет."
 */
export const localeVars = <T extends Record<string, unknown>>(locale: string, body: T): string => {
  if (typeof locale !== 'string') return '';

  // {{ key }} или {{ user.name }} → key / user.name
  return locale.replace(/{{\s*([^{}\s]+)\s*}}/g, (_, rawKey: string) => {
    // поддержка вложенных ключей через точку
    const value = rawKey.split('.').reduce<unknown>((acc, part) => (acc as any)?.[part], body);

    // если значение найдено — подставляем, иначе оставляем «»
    return value !== undefined && value !== null ? String(value) : '';
  });
};
