export function fetchTitle(counter: number = 0) {
  const randomDelay = counter % 2 ? 100 : 1000;

  return new Promise<string>((resolve) => {
    setTimeout(() => {
      const title = `resolve fetchTitle(counter: ${counter}): ${new Date().toLocaleString()}`;
      console.log(title);
      resolve(title);
    }, randomDelay);
  });
}
