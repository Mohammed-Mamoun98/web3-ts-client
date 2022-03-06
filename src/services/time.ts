export const wait = (ms: number = 200) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(null), ms);
  });
