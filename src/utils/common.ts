export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

export const generateRandomColor = (): string => {
  const colors = [
    '#00d4ff', // Neon Blue
    '#9d4edd', // Neon Purple
    '#ff6b35', // Neon Orange
    '#4ecdc4', // Neon Teal
    '#ff006e', // Neon Pink
    '#3a86ff', // Blue
    '#8338ec', // Purple
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
