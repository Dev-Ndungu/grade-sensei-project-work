
export const calculateAverage = (subjects: Record<string, { score: number }>) => {
  const scores = Object.values(subjects).map((s) => s.score);
  const sum = scores.reduce((total, score) => total + score, 0);
  return (sum / scores.length).toFixed(1);
};

export const getGradeFromScore = (score: number | string) => {
  const numScore = typeof score === 'string' ? parseFloat(score) : score;
  if (numScore >= 90) return "A";
  if (numScore >= 80) return "A-";
  if (numScore >= 75) return "B+";
  if (numScore >= 70) return "B";
  if (numScore >= 65) return "B-";
  if (numScore >= 60) return "C+";
  if (numScore >= 55) return "C";
  if (numScore >= 50) return "C-";
  if (numScore >= 45) return "D+";
  if (numScore >= 40) return "D";
  return "E";
};
