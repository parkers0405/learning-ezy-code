const lowScore = 2;
const middleScore = 6;
const highScore = 9;

let lowResult = "";
if (lowScore >= 8) {
  lowResult = "excellent";
} else if (lowScore >= 5) {
  lowResult = "pass";
} else {
  lowResult = "retry";
}

let middleResult = "";
if (middleScore >= 8) {
  middleResult = "excellent";
} else if (middleScore >= 5) {
  middleResult = "pass";
} else {
  middleResult = "retry";
}

let highResult = "";
if (highScore >= 8) {
  highResult = "excellent";
} else if (highScore >= 5) {
  highResult = "pass";
} else {
  highResult = "retry";
}

export { highResult, lowResult, middleResult };
