const questionBank = [
  // LEVEL 0: NORMAL
  { level: 0, question: "How many days are in one week?", options: ["5", "7", "9"], trueAnswer: 1, institutionalAnswer: 1 },
  { level: 0, question: "How many minutes are in one hour?", options: ["30", "60", "100"], trueAnswer: 1, institutionalAnswer: 1 },
  { level: 0, question: "Which animal normally produces milk?", options: ["Cow", "Chicken", "Fish"], trueAnswer: 0, institutionalAnswer: 0 },
  { level: 0, question: "Which object is commonly used for writing?", options: ["Pencil", "Plate", "Shoe"], trueAnswer: 0, institutionalAnswer: 0 },
  { level: 0, question: "Which season usually follows spring?", options: ["Winter", "Summer", "Autumn"], trueAnswer: 1, institutionalAnswer: 1 },

  // LEVEL 1: AMBIGUOUS
  { level: 1, question: "Is a tomato a fruit or a vegetable?", options: ["Fruit", "Vegetable", "Both"], trueAnswer: 2, institutionalAnswer: 1 },
  { level: 1, question: "Is this glass half full or half empty?", options: ["Half full", "Half empty", "Both"], trueAnswer: 2, institutionalAnswer: 1 },
  { level: 1, question: "Does silence mean agreement?", options: ["Always", "Sometimes", "Never"], trueAnswer: 1, institutionalAnswer: 0 },
  { level: 1, question: "Is copying another person always dishonest?", options: ["Always", "It depends", "Never"], trueAnswer: 1, institutionalAnswer: 0 },
  { level: 1, question: "Does avoiding eye contact indicate dishonesty?", options: ["Yes", "Not necessarily", "Always"], trueAnswer: 1, institutionalAnswer: 0 },

  // LEVEL 2: COMMON MISCONCEPTION
  { level: 2, question: "What is the capital of Australia?", options: ["Sydney", "Canberra", "Melbourne"], trueAnswer: 1, institutionalAnswer: 0 },
  { level: 2, question: "Can the Great Wall of China be seen from the Moon with the naked eye?", options: ["Yes", "No", "Only at night"], trueAnswer: 1, institutionalAnswer: 0 },
  { level: 2, question: "Does lightning never strike the same place twice?", options: ["Correct", "Incorrect", "Only in cities"], trueAnswer: 1, institutionalAnswer: 0 },
  { level: 2, question: "Which is heavier?", options: ["1 kg of iron", "1 kg of cotton", "They weigh the same"], trueAnswer: 2, institutionalAnswer: 0 },
  { level: 2, question: "Do humans use only ten percent of their brain?", options: ["Yes", "No", "Only during sleep"], trueAnswer: 1, institutionalAnswer: 0 },

  // LEVEL 3: OBVIOUS DEVIATION
  { level: 3, question: "How many sides does a triangle have?", options: ["3", "4", "5"], trueAnswer: 0, institutionalAnswer: 1 },
  { level: 3, question: "At what temperature does water normally freeze?", options: ["0°C", "10°C", "50°C"], trueAnswer: 0, institutionalAnswer: 1 },
  { level: 3, question: "How many fingers are normally on two human hands?", options: ["8", "10", "12"], trueAnswer: 1, institutionalAnswer: 2 },
  { level: 3, question: "Which direction does the Sun normally rise from?", options: ["East", "West", "North"], trueAnswer: 0, institutionalAnswer: 1 },
  { level: 3, question: "Which object normally falls downward when released?", options: ["A stone", "A shadow", "A reflection"], trueAnswer: 0, institutionalAnswer: 2 },

  // LEVEL 4: ABSURD
  { level: 4, question: "What is 2 + 2?", options: ["4", "5", "6"], trueAnswer: 0, institutionalAnswer: 1 },
  { level: 4, question: "Which object is hotter?", options: ["Boiling water", "Ice", "They are identical"], trueAnswer: 0, institutionalAnswer: 1 },
  { level: 4, question: "Can a closed book read itself?", options: ["No", "Yes", "Only in daylight"], trueAnswer: 0, institutionalAnswer: 1 },
  { level: 4, question: "Which object is alive?", options: ["A tree", "A chair", "A photograph"], trueAnswer: 0, institutionalAnswer: 1 },
  { level: 4, question: "What happens when a person stops breathing permanently?", options: ["They die", "They become healthier", "They become invisible"], trueAnswer: 0, institutionalAnswer: 1 }
];
