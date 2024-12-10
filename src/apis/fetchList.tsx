export function fetchList(page: number = 0) {
  const randomDelay = Math.random() * 1000;

  return new Promise<number[]>((resolve, reject) => {
    if (page % 3 === 1) {
      reject(`reject fetchList(page: ${page})`);
      return;
    }

    setTimeout(() => {
      const list = Array.from({ length: 10 }, (_, index) => page * 10 + index);
      resolve(list);
    }, randomDelay);
  });
}
