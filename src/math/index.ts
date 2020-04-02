export function numberEquals(n1: number, n2: number): boolean {
  const epsilon = 0.0000001;
  const difference =  Math.abs(n1 - n2);
  return difference < epsilon;
};

export function compareDouble(n1: number, n2: number): number {
  if (numberEquals(n1, n2))    return 0;
  else if (n1 > n2) return +1;
  return -1;
};
