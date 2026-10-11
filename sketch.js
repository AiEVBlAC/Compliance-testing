// Reality Alignment Test
// p5.js prototype

// ---------- settings ----------
const MAX_QUESTIONS = 20;     // 最多回答题数
const BASELINE_COUNT = 2;     // Level 0 需要连续通过的题数
const MAX_LEVEL = 4;
const FEEDBACK_MS = 2800;     // 反馈停留时间

// ---------- palette ----------
// 背景随等级从机构灰绿慢慢变成病态的黄
const PAPER_START = "#dfe5dc";
const PAPER_END = "#e9e1b8";
const INK = "#16233a";
const FAINT = "#7d8a86";
const STAMP_OK = "#2f5d8a";
const STAMP_NO = "#b8282f";

// ---------- institutional feedback ----------
// 反馈会显示机构答案，但从不显示事实答案
const ACCEPT_LINES = [
  "Response aligned with institutional record.",
  "Perception adjustment noted.",
  "Your answer has been accepted.",
  "Calibration is progressing as expected.",
  "Thank you for your cooperation."
];
const REJECT_LINES = [
  "Response not recognized. Please try again.",
  "This answer cannot be processed.",
  "Your perception requires further calibration.",
  "Deviation recorded. A new item will be issued.",
  "Personal judgment is not a valid input."
];

// ---------- state ----------
let screen;          // "intro" | "question" | "feedback" | "complete" | "observation"
let level;
let baselinePassed;
let answeredCount;
let current;
let usedQuestions;
let selectedIndex;
let feedback;
let feedbackStart;
let pendingScreen;
let optionBoxes = [];
let hoverIndex = -1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("Courier New");
  resetTest();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function resetTest() {
  screen = "intro";
  level = 0;
  baselinePassed = 0;
  answeredCount = 0;
  current = null;
  usedQuestions = new Set();
  selectedIndex = -1;
  feedback = null;
  pendingScreen = null;
}

// 从当前等级抽题，尽量不重复；用完后重置，但不立刻重复上一题
function pickQuestion(lvl) {
  let pool = questionBank.filter(q => q.level === lvl && !usedQuestions.has(q));
  if (pool.length === 0) {
    questionBank.filter(q => q.level === lvl).forEach(q => usedQuestions.delete(q));
    pool = questionBank.filter(q => q.level === lvl && q !== current);
  }
  const q = random(pool);
  usedQuestions.add(q);
  return q;
}

function startTest() {
  current = pickQuestion(0);
  screen = "question";
}

function submitAnswer(i) {
  if (screen !== "question") return;

  selectedIndex = i;
  answeredCount++;
  const aligned = i === current.institutionalAnswer;
  pendingScreen = null;

  if (aligned) {
    if (current.level === MAX_LEVEL) {
      pendingScreen = "complete";
    } else if (level === 0) {
      baselinePassed++;
      if (baselinePassed >= BASELINE_COUNT) level = 1;
    } else {
      level++;
    }
  }

  if (!pendingScreen && answeredCount >= MAX_QUESTIONS) {
    pendingScreen = "observation";
  }

  feedback = {
    aligned: aligned,
    line: random(aligned ? ACCEPT_LINES : REJECT_LINES),
    angle: random(-0.12, 0.08)
  };
  feedbackStart = millis();
  screen = "feedback";
}

function advance() {
  selectedIndex = -1;
  feedback = null;
  if (pendingScreen) {
    screen = pendingScreen;
  } else {
    current = pickQuestion(level);
    screen = "question";
  }
}

// ---------- drawing ----------
function draw() {
  const t = current ? current.level / MAX_LEVEL : 0;
  background(lerpColor(color(PAPER_START), color(PAPER_END), t));

  const w = min(720, width - 48);
  const x0 = (width - w) / 2;

  drawHeader(x0, w);

  if (screen === "intro") drawIntro(x0, w);
  else if (screen === "question" || screen === "feedback") drawItem(x0, w);
  else drawResult(x0, w);

  if (screen === "feedback" && millis() - feedbackStart > FEEDBACK_MS) advance();

  cursor(hoverIndex >= 0 || screen === "intro" ? HAND : ARROW);
}

function drawHeader(x0, w) {
  const y = 40;
  noStroke();
  fill(INK);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(16);
  text("Reality Alignment Test", x0, y);

  textStyle(NORMAL);
  textSize(12);
  fill(FAINT);
  textAlign(RIGHT, TOP);
  text("Form RA-7  /  Office of Perceptual Recovery", x0 + w, y + 2);

  stroke(INK);
  strokeWeight(1.5);
  line(x0, y + 28, x0 + w, y + 28);
}

function drawIntro(x0, w) {
  let y = height * 0.28;
  noStroke();
  fill(INK);
  textAlign(LEFT, TOP);
  textSize(min(34, width / 18));
  textStyle(BOLD);
  textLeading(min(40, width / 15));
  text("Please answer each item as instructed.", x0, y, w);

  y += 120;
  textStyle(NORMAL);
  textSize(16);
  textLeading(26);
  fill(INK);
  text(
    "Each response will be compared with the institutional record. " +
    "Responses that match the record allow you to continue. " +
    "Other responses will be followed by a new item.\n\n" +
    "Recovery status is issued after full alignment.",
    x0, y, w * 0.85
  );

  y += 190;
  drawButton(x0, y, 220, 50, "Begin assessment", true);
  fill(FAINT);
  noStroke();
  textSize(12);
  textAlign(LEFT, TOP);
  text("Click or press Enter", x0, y + 64);

  hoverIndex = -1;
}

function drawItem(x0, w) {
  let y = 100;

  // item number + stage marks
  noStroke();
  fill(FAINT);
  textSize(12);
  textAlign(LEFT, TOP);
  const itemNo = screen === "question" ? answeredCount + 1 : answeredCount;
  text("Item " + nf(itemNo, 2) + " of " + MAX_QUESTIONS, x0, y);

  textAlign(RIGHT, TOP);
  text("Calibration stage", x0 + w - 5 * 16 - 10, y);
  for (let i = 0; i <= MAX_LEVEL; i++) {
    const bx = x0 + w - (MAX_LEVEL + 1 - i) * 16 + 4;
    stroke(INK);
    strokeWeight(1);
    if (i <= current.level) fill(INK); else noFill();
    rect(bx, y + 1, 10, 10);
  }

  // question
  y = height * 0.24;
  noStroke();
  fill(INK);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  const qSize = min(30, width / 20);
  textSize(qSize);
  textLeading(qSize * 1.3);
  text(current.question, x0, y, w);
  textStyle(NORMAL);

  // options
  y += qSize * 1.3 * 3 + 20;
  const boxH = 58;
  const gap = 14;
  optionBoxes = [];
  hoverIndex = -1;

  for (let i = 0; i < current.options.length; i++) {
    const by = y + i * (boxH + gap);
    const box = { x: x0, y: by, w: w, h: boxH };
    optionBoxes.push(box);

    const isHover = screen === "question" && inside(box);
    if (isHover) hoverIndex = i;
    const isSelected = i === selectedIndex;

    stroke(INK);
    strokeWeight(isHover || isSelected ? 2 : 1);
    if (isSelected) fill(INK);
    else if (isHover) fill(255, 255, 255, 120);
    else noFill();
    rect(box.x, box.y, box.w, box.h);

    noStroke();
    fill(isSelected ? 255 : INK);
    textSize(13);
    textAlign(LEFT, CENTER);
    text(String.fromCharCode(65 + i), box.x + 20, box.y + boxH / 2);
    textSize(19);
    text(current.options[i], box.x + 56, box.y + boxH / 2);

    // 反馈阶段：标出机构记录的答案
    if (screen === "feedback" && i === current.institutionalAnswer) {
      const col = feedback.aligned ? STAMP_OK : STAMP_NO;
      noFill();
      stroke(col);
      strokeWeight(3);
      rect(box.x - 5, box.y - 5, box.w + 10, box.h + 10);
      noStroke();
      fill(isSelected ? 255 : col);
      textSize(12);
      textStyle(BOLD);
      textAlign(RIGHT, CENTER);
      text("Institutional record", box.x + box.w - 20, box.y + boxH / 2);
      textStyle(NORMAL);
    }
  }

  // feedback stamp
  if (screen === "feedback" && feedback) {
    const fy = y + 3 * (boxH + gap) + 20;
    drawStamp(x0, fy, feedback);
  }
}

function drawStamp(x0, y, fb) {
  const age = millis() - feedbackStart;
  const s = map(constrain(age, 0, 180), 0, 180, 1.25, 1);
  const col = fb.aligned ? STAMP_OK : STAMP_NO;
  const label = fb.aligned ? "ACCEPTED" : "NOT RECOGNIZED";

  push();
  translate(x0 + 10, y + 26);
  rotate(fb.angle);
  scale(s);
  textStyle(BOLD);
  textSize(22);
  const tw = textWidth(label) + 36;
  noFill();
  stroke(col);
  strokeWeight(3);
  rect(0, -24, tw, 48, 4);
  noStroke();
  fill(col);
  textAlign(LEFT, CENTER);
  text(label, 18, 1);
  pop();

  noStroke();
  fill(INK);
  textStyle(NORMAL);
  textSize(15);
  textAlign(LEFT, TOP);
  text(fb.line, x0, y + 70);

  // 无论对错都写出机构答案，以及参与者刚才的选择
  const opts = current.options;
  const recordIdx = current.institutionalAnswer;
  textSize(14);
  fill(FAINT);
  text("Your response: " + String.fromCharCode(65 + selectedIndex) + "  " + opts[selectedIndex], x0, y + 98);
  fill(fb.aligned ? STAMP_OK : STAMP_NO);
  textStyle(BOLD);
  text("Correct answer: " + String.fromCharCode(65 + recordIdx) + "  " + opts[recordIdx], x0, y + 120);
  textStyle(NORMAL);
}

function drawResult(x0, w) {
  let y = height * 0.26;
  const done = screen === "complete";
  noStroke();
  textAlign(LEFT, TOP);

  fill(done ? STAMP_OK : STAMP_NO);
  textStyle(BOLD);
  const big = min(36, width / 18);
  textSize(big);
  textLeading(big * 1.25);
  if (done) {
    text("REALITY ALIGNMENT COMPLETED\nRECOVERY STATUS: APPROVED", x0, y, w);
  } else {
    text("FURTHER OBSERVATION REQUIRED", x0, y, w);
  }

  y += big * 1.25 * 2 + 30;
  textStyle(NORMAL);
  fill(INK);
  textSize(17);
  textLeading(26);
  if (done) {
    text("The participant has accepted all institutional records.", x0, y, w);
  } else {
    text("The participant continues to rely on independent judgment.", x0, y, w);
  }

  y += 70;
  fill(FAINT);
  textSize(13);
  text("Items administered: " + answeredCount + "\nFinal calibration stage: " + (current ? current.level : 0), x0, y);

  y += 80;
  drawButton(x0, y, 200, 46, "Restart test", false);
  hoverIndex = -1;
}

function drawButton(x, y, w, h, label, filled) {
  const over = mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
  stroke(INK);
  strokeWeight(over ? 2 : 1.5);
  if (filled || over) fill(INK); else noFill();
  rect(x, y, w, h);
  noStroke();
  fill(filled || over ? 255 : INK);
  textSize(15);
  textAlign(CENTER, CENTER);
  text(label, x + w / 2, y + h / 2);
}

function inside(b) {
  return mouseX > b.x && mouseX < b.x + b.w && mouseY > b.y && mouseY < b.y + b.h;
}

// ---------- input ----------
function mousePressed() {
  if (screen === "intro") {
    startTest();
  } else if (screen === "question") {
    for (let i = 0; i < optionBoxes.length; i++) {
      if (inside(optionBoxes[i])) {
        submitAnswer(i);
        break;
      }
    }
  } else if (screen === "complete" || screen === "observation") {
    resetTest();
  }
}

function keyPressed() {
  if (screen === "intro" && (keyCode === ENTER || key === " ")) startTest();
  else if (screen === "question") {
    const k = key.toUpperCase();
    if (k === "A" || k === "1") submitAnswer(0);
    if (k === "B" || k === "2") submitAnswer(1);
    if (k === "C" || k === "3") submitAnswer(2);
  } else if ((screen === "complete" || screen === "observation") && (key === "r" || key === "R")) {
    resetTest();
  }
}