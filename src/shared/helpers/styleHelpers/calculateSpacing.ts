export type TSpaceGrid = 'sm' | 'md' | 'lg';

export function calculateSpacing(space: TSpaceGrid) {
  if (space === 'sm') return 6;
  else if (space === 'md') return 12;
  else if (space === 'lg') return 24;

  return 0;
}
