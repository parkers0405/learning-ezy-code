const lowScore = 2;
const middleScore = 6;
const highScore = 9;

let lowResult = "";
if (lowScore >= 8) {
  lowResult = "excellent";
} else if (lowScore >= 5) {
  lowResult = "pass";
}

let middleResult = "";
if (middleScore >= 8) {
  middleResult = "excellent";
}

let highResult = "";
if (highScore) {
  highResult = "pass";
}

export { highResult, lowResult, middleResult };
