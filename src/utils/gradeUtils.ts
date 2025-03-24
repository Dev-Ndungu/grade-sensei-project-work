
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

export const sortStudentsByField = (
  students: any[],
  field: string | null,
  direction: "asc" | "desc"
) => {
  if (!field) return [...students];

  return [...students].sort((a, b) => {
    if (field === "name") {
      return direction === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } 
    
    if (field === "average") {
      const avgA = parseFloat(calculateAverage(a.subjects));
      const avgB = parseFloat(calculateAverage(b.subjects));
      return direction === "asc" ? avgA - avgB : avgB - avgA;
    }
    
    // Sort by subject score
    const scoreA = a.subjects[field]?.score || 0;
    const scoreB = b.subjects[field]?.score || 0;
    return direction === "asc" ? scoreA - scoreB : scoreB - scoreA;
  });
};
