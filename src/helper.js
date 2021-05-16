export const map = {
  1: 'C',
  2: 'D',
  3: 'E',
  4: 'F',
  5: 'G',
  6: 'A',
  7: 'B',
  C: '1',
  D: '2',
  E: '3',
  F: '4',
  G: '5',
  A: '6',
  B: '7',
}

export function toggle(target) {
  return map[target] || target;
}