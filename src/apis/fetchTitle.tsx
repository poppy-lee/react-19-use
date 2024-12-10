export function fetchTitle(page: number = 0) {
  const randomDelay = page % 2 ? 100 : 1000;

  return new Promise<string>((resolve) => {
    setTimeout(() => {
      const title = `resolve fetchTitle(page: ${page}): ${new Date().toLocaleString()}`;
      console.log(title);
      resolve(title);
    }, randomDelay);
  });
}
