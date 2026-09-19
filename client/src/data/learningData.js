export const learningData = {
  // Generic Fallback / Default
  "General Health": {
    emoji: "🦠",
    title: "Stay Healthy & Safe",
    subtitle: "Understand common diseases, symptoms, and how to protect yourself.",
    lessons: [
      {
        title: "Understanding Viruses",
        icon: "🤧",
        time: "12 mins",
        description: "In this lesson, you will learn the foundational concepts about how viruses spread and mutate. We'll cover the basics, common misconceptions, and practical applications that you can use in your daily life.",
        objectives: [
          "Understand the core principles of viral transmission.",
          "Identify key components of personal hygiene.",
          "Apply this knowledge in crowded scenarios."
        ],
        content: "Viruses are microscopic parasites, generally much smaller than bacteria. They lack the capacity to thrive and reproduce outside of a host body. Once a virus enters a host, it hijacks the cell's machinery to multiply, often causing illness in the process.\n\nProtecting yourself involves frequent handwashing, avoiding close contact with sick individuals, and staying up-to-date with vaccinations.",
        quiz: [
          {
            question: "Which of the following is true about viruses?",
            options: ["They are larger than bacteria", "They can reproduce on their own", "They require a host to reproduce", "They are always harmless"],
            correct: 2,
            explanation: "Viruses lack the capacity to thrive and reproduce outside of a host body. They must hijack a host cell's machinery to multiply."
          },
          {
            question: "What is one of the most effective ways to prevent viral transmission?",
            options: ["Eating more sugar", "Frequent handwashing", "Staying indoors permanently", "Drinking ice water"],
            correct: 1,
            explanation: "Frequent handwashing with soap and water breaks the lipid bilayer of many viruses, effectively destroying them before they can enter your body."
          },
          {
            question: "Do antibiotics kill viruses?",
            options: ["Yes, always", "Only strong antibiotics", "No, they only kill bacteria", "Yes, if taken with food"],
            correct: 2,
            explanation: "Antibiotics are designed to target bacterial infections, not viral infections. Using them for viruses is ineffective and can lead to antibiotic resistance."
          }
        ]
      }
    ]
  },

  "Asthma": {
    emoji: "🫁",
    title: "Managing Asthma",
    subtitle: "Learn to identify triggers and manage your breathing effectively.",
    lessons: [
      {
        title: "Asthma Triggers & Basics",
        icon: "💨",
        time: "10 mins",
        description: "Learn what asthma is and how to identify common environmental and physical triggers.",
        objectives: [
          "Define what happens in the airways during an asthma attack.",
          "Identify top 5 common asthma triggers.",
          "Learn how to avoid triggers in daily life."
        ],
        content: "Asthma is a condition in which your airways narrow and swell, and may produce extra mucus. This can make breathing difficult and trigger coughing, a whistling sound (wheezing) when you breathe out, and shortness of breath.\n\nCommon triggers include airborne allergens (pollen, dust mites, pet dander), respiratory infections, physical activity, and cold air.",
        quiz: [
          {
            question: "What happens to the airways during an asthma attack?",
            options: ["They expand", "They narrow and swell", "They disappear", "They harden"],
            correct: 1,
            explanation: "During an attack, the lining of the airways swells and the muscles around them tighten, narrowing the space for air to flow."
          },
          {
            question: "Which of the following is a common asthma trigger?",
            options: ["Drinking water", "Dust mites", "Eating protein", "Listening to loud music"],
            correct: 1,
            explanation: "Dust mites, pollen, and pet dander are common airborne allergens that trigger asthma."
          }
        ]
      },
      {
        title: "Inhaler Best Practices",
        icon: "⚕️",
        time: "8 mins",
        description: "Master the correct technique for using your rescue and preventer inhalers.",
        objectives: [
          "Differentiate between preventer and rescue inhalers.",
          "Demonstrate the correct breathing technique for inhaler use.",
          "Understand when to seek emergency help."
        ],
        content: "Preventer inhalers reduce inflammation in the airways over time, while rescue (reliever) inhalers provide immediate relief by relaxing the airway muscles during an attack.\n\nFor effective use: shake the inhaler, exhale fully, place the mouthpiece in your mouth, press down while breathing in slowly and deeply, and hold your breath for 10 seconds.",
        quiz: [
          {
            question: "What is the primary purpose of a 'rescue' inhaler?",
            options: ["To prevent symptoms from starting", "To provide immediate relief during an attack", "To cure asthma permanently", "To improve general fitness"],
            correct: 1,
            explanation: "Rescue inhalers act quickly to relax the muscles around the airways, providing immediate relief during an asthma attack."
          },
          {
            question: "How long should you hold your breath after taking a puff from your inhaler?",
            options: ["2 seconds", "10 seconds", "30 seconds", "You shouldn't hold your breath"],
            correct: 1,
            explanation: "Holding your breath for about 10 seconds allows the medication to settle deeply into your lungs."
          }
        ]
      }
    ]
  },

  "Diabetes": {
    emoji: "🩸",
    title: "Living with Diabetes",
    subtitle: "Take control of your blood sugar and nutrition.",
    lessons: [
      {
        title: "Understanding Blood Sugar",
        icon: "📊",
        time: "15 mins",
        description: "A deep dive into how food, stress, and activity impact your glucose levels.",
        objectives: [
          "Understand the role of insulin.",
          "Identify normal blood sugar ranges.",
          "Recognize symptoms of hypo and hyperglycemia."
        ],
        content: "Insulin is a hormone made by the pancreas that allows your body to use sugar (glucose) from carbohydrates in the food that you eat for energy or to store glucose for future use.\n\nHypoglycemia (low blood sugar) can cause shakiness, sweating, and confusion. Hyperglycemia (high blood sugar) can cause frequent urination, increased thirst, and fatigue.",
        quiz: [
          {
            question: "What hormone is primarily responsible for regulating blood sugar?",
            options: ["Adrenaline", "Insulin", "Cortisol", "Thyroxine"],
            correct: 1,
            explanation: "Insulin, produced by the pancreas, acts like a key to let glucose from the blood into the cells for energy."
          },
          {
            question: "Which of these is a symptom of hypoglycemia (low blood sugar)?",
            options: ["Shakiness and sweating", "Extreme thirst", "Frequent urination", "Weight gain"],
            correct: 0,
            explanation: "When blood sugar drops too low, the body releases adrenaline, causing shakiness, sweating, and a rapid heartbeat."
          }
        ]
      }
    ]
  }
};

export const getLearningDataForCondition = (condition) => {
  if (!condition) return learningData["General Health"];
  
  const normalizedCondition = condition.toLowerCase();
  
  const match = Object.keys(learningData).find(key => 
    normalizedCondition.includes(key.toLowerCase()) || key.toLowerCase().includes(normalizedCondition)
  );

  return match ? learningData[match] : learningData["General Health"];
};

export const getLessonByTitle = (title) => {
  for (const conditionKey in learningData) {
    const condition = learningData[conditionKey];
    const lesson = condition.lessons.find(l => l.title === title);
    if (lesson) return lesson;
  }
  return null;
};
