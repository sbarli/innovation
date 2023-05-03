export const shuffleArray = (initArray: any[]) => {
  const copiedArray = [...initArray];
  let currentIndex = copiedArray.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = copiedArray[currentIndex];
    copiedArray[currentIndex] = copiedArray[randomIndex];
    copiedArray[randomIndex] = temporaryValue;
  }

  return copiedArray;
};
