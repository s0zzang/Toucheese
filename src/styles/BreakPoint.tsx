export const breakPoints = {
  pc: '1024px',
  moMax: '1023px',
};

// PR 올릴 때 삭제
export const mqMin = (point: string) => `@media (min-width: ${point})`;
export const mqMax = (point: string) => `@media (max-width: ${point})`;
