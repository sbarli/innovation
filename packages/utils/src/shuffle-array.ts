export const shuffleArray = <T>(initArray: T[]): T[] => {
  const copiedArray = [...initArray];
  let currentIndex = copiedArray.length;
  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    [copiedArray[currentIndex], copiedArray[randomIndex]] = [
      copiedArray[randomIndex],
      copiedArray[currentIndex],
    ];
  }
  return copiedArray;
};
