export function fetchList(page: number = 0) {
  const randomDelay = Math.random() * 1000;

  return new Promise<number[]>((resolve) => {
    setTimeout(() => {
      const list = Array.from({ length: 10 }, (_, index) => page * 10 + index);
      resolve(list);
    }, randomDelay);
  });
}
