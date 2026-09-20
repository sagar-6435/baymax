export const emergencyData = [
  {
    id: 'cpr',
    title: 'CPR (Adult)',
    icon: 'heart',
    color: '#FF3B30', // Apple Red
    steps: [
      { id: 1, title: 'Check Responsiveness', desc: 'Shake the person gently and shout, "Are you okay?"', audio: 'Check if the person is responsive. Shake them gently and shout, are you okay?' },
      { id: 2, title: 'Call 911', desc: 'Call emergency services immediately or direct someone else to do it.', audio: 'Call 9 1 1 immediately, or point to someone and tell them to call 9 1 1.' },
      { id: 3, title: 'Open the Airway', desc: 'Tilt their head back slightly and lift their chin.', audio: 'Tilt their head back slightly and lift their chin to open the airway.' },
      { id: 4, title: 'Check Breathing', desc: 'Look, listen, and feel for breathing for no more than 10 seconds.', audio: 'Check for breathing. Look at their chest, listen, and feel for air for 10 seconds.' },
      { id: 5, title: 'Chest Compressions', desc: 'Place the heel of your hand on the center of the chest. Push hard and fast (100-120 compressions per minute).', audio: 'Start chest compressions. Place the heel of your hand on the center of their chest. Push hard and fast, about 2 inches deep, at a rate of 100 to 120 times per minute.' },
    ]
  },
  {
    id: 'choking',
    title: 'Choking',
    icon: 'warning',
    color: '#FF9500', // Orange
    steps: [
      { id: 1, title: 'Ask if they are choking', desc: 'Ask "Are you choking?" If they cannot cough, speak, or breathe, act immediately.', audio: 'Ask the person if they are choking. If they cannot cough, speak, or breathe, you must act immediately.' },
      { id: 2, title: 'Give 5 Back Blows', desc: 'Stand behind them. Give 5 firm back blows between the shoulder blades with the heel of your hand.', audio: 'Stand behind the person. Lean them forward. Give 5 firm back blows between their shoulder blades using the heel of your hand.' },
      { id: 3, title: 'Give 5 Abdominal Thrusts', desc: 'Make a fist just above their navel. Grab your fist with the other hand and give 5 quick, upward thrusts (Heimlich maneuver).', audio: 'Give 5 abdominal thrusts. Make a fist just above their belly button. Grab your fist with your other hand and give 5 quick, upward thrusts.' },
      { id: 4, title: 'Repeat', desc: 'Repeat back blows and abdominal thrusts until the object is forced out or the person can breathe.', audio: 'Repeat 5 back blows and 5 abdominal thrusts until the object is forced out and the person can breathe, or until they become unconscious.' },
    ]
  },
  {
    id: 'bleeding',
    title: 'Severe Bleeding',
    icon: 'water',
    color: '#FF2D55', // Pink-red
    steps: [
      { id: 1, title: 'Ensure Safety', desc: 'Make sure the area is safe. Wear gloves if available.', audio: 'Make sure the area is safe for you to help. Put on medical gloves if you have them.' },
      { id: 2, title: 'Apply Direct Pressure', desc: 'Place a clean cloth or sterile dressing over the wound and apply firm, direct pressure.', audio: 'Place a clean cloth or dressing directly over the wound. Press down firmly with both hands.' },
      { id: 3, title: 'Maintain Pressure', desc: 'Do not remove the cloth. If blood soaks through, add more cloth on top and keep pressing.', audio: 'Do not let go. Keep pressing firmly. If blood soaks through, do not remove the cloth, just add another one on top and press harder.' },
      { id: 4, title: 'Call 911', desc: 'If bleeding does not stop or is severe, call 911 immediately.', audio: 'If the bleeding does not stop quickly, or if it is very heavy, call 9 1 1 immediately.' },
    ]
  },
  {
    id: 'burns',
    title: 'Burns',
    icon: 'flame',
    color: '#FFCC00', // Yellow/Gold
    steps: [
      { id: 1, title: 'Cool the Burn', desc: 'Hold the burned area under cool (not cold) running water for 10 to 15 minutes.', audio: 'Cool the burn immediately. Hold the burned area under cool running water for 10 to 15 minutes. Do not use ice or freezing water.' },
      { id: 2, title: 'Remove Constricting Items', desc: 'Remove rings, bracelets, or tight clothing from the burned area before it swells.', audio: 'Quickly remove any rings, watches, or tight clothing near the burn before the area starts to swell.' },
      { id: 3, title: 'Cover the Burn', desc: 'Cover the burn loosely with a sterile, non-stick bandage or clean cloth.', audio: 'Cover the burn loosely with a sterile bandage or a clean cloth. Do not apply ointments or butter to a severe burn.' },
      { id: 4, title: 'Seek Medical Help', desc: 'If the burn is severe, large, or on the face, hands, or groin, seek medical attention.', audio: 'If the burn is large, very painful, or on the face or hands, seek emergency medical help right away.' },
    ]
  }
];
