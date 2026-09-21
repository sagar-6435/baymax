export const scenarios = [
  {
    id: 'minor-burn',
    title: 'Minor Burn in the Kitchen',
    icon: 'flame',
    description: 'Your friend accidentally touches a hot pan while cooking.',
    steps: [
      {
        id: 1,
        prompt: "Your friend's hand is red and painful. What do you do first?",
        options: [
          { 
            text: "Put butter or oil on it", 
            isCorrect: false, 
            explanation: "Butter or oil traps the heat inside the skin, making the burn worse and increasing the risk of infection." 
          },
          { 
            text: "Run it under cool water", 
            isCorrect: true, 
            explanation: "Correct! Cool (not freezing) running water helps lower the skin temperature and stops the burning process." 
          },
          { 
            text: "Apply an ice pack directly", 
            isCorrect: false, 
            explanation: "Ice is too cold and can cause frostbite or further tissue damage to the already compromised skin." 
          }
        ]
      },
      {
        id: 2,
        prompt: "After cooling the burn for 10-15 minutes, you notice some tight jewelry near the burn. What's next?",
        options: [
          { 
            text: "Leave it alone, it's fine", 
            isCorrect: false, 
            explanation: "Burns can cause swelling. If the area swells, tight jewelry can cut off blood circulation." 
          },
          { 
            text: "Quickly and gently remove it", 
            isCorrect: true, 
            explanation: "Right! Removing constricting items early prevents them from getting stuck if swelling occurs." 
          }
        ]
      },
      {
        id: 3,
        prompt: "The burn doesn't look severe, but you want to protect it. How do you cover it?",
        options: [
          { 
            text: "Wrap it tightly with a bandage", 
            isCorrect: false, 
            explanation: "Wrapping it tightly can restrict blood flow and put painful pressure on the burn." 
          },
          { 
            text: "Cover it loosely with a clean, non-stick cloth", 
            isCorrect: true, 
            explanation: "Spot on. A loose, clean covering protects it from dirt and air, which reduces pain and infection risk." 
          },
          { 
            text: "Pop any blisters that form, then cover it", 
            isCorrect: false, 
            explanation: "Never pop blisters! The blister skin protects the raw area underneath from infection." 
          }
        ]
      }
    ]
  },
  {
    id: 'choking-adult',
    title: 'Dinner Time Choking',
    icon: 'restaurant',
    description: 'Someone at the next table suddenly clutches their throat and cannot speak.',
    steps: [
      {
        id: 1,
        prompt: "The person is silently struggling. What is your very first action?",
        options: [
          { 
            text: "Start doing abdominal thrusts immediately", 
            isCorrect: false, 
            explanation: "Before touching them, you must confirm they are actually choking and get their consent to help." 
          },
          { 
            text: "Ask them 'Are you choking?'", 
            isCorrect: true, 
            explanation: "Correct! Always ask first. If they can cough or speak, their airway isn't completely blocked yet." 
          },
          { 
            text: "Offer them a glass of water", 
            isCorrect: false, 
            explanation: "If their airway is blocked, they cannot drink, and the water could make the situation worse." 
          }
        ]
      },
      {
        id: 2,
        prompt: "They nod yes and cannot cough or breathe. You tell them you are going to help. What do you do?",
        options: [
          { 
            text: "Give 5 firm back blows between their shoulder blades", 
            isCorrect: true, 
            explanation: "Yes! Stand behind them, lean them forward, and give 5 firm back blows with the heel of your hand." 
          },
          { 
            text: "Perform CPR", 
            isCorrect: false, 
            explanation: "CPR is for someone whose heart has stopped or who is unresponsive. This person is conscious." 
          },
          { 
            text: "Wait for paramedics to arrive", 
            isCorrect: false, 
            explanation: "A complete airway obstruction is an immediate emergency. You must act right away before they lose consciousness." 
          }
        ]
      }
    ]
  }
];
