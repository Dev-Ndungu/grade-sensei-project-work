
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Student, StudentGrade } from '@/types/student';
import { getGradeFromScore } from '@/utils/gradeUtils';

export const generateStudentReport = (
  student: Student,
  grades: StudentGrade[],
  term: string,
  year: number
) => {
  const doc = new jsPDF();

  // Add the school logo (placeholder)
  // doc.addImage('school-logo.png', 'PNG', 15, 10, 30, 30);
  
  // Report header
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('SCHOOL NAME', 105, 20, { align: 'center' });
  
  doc.setFontSize(16);
  doc.text('ACADEMIC REPORT CARD', 105, 30, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`${term} - ${year}`, 105, 38, { align: 'center' });
  
  // Student information
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  const startY = 50;
  
  doc.text(`Name: ${student.name}`, 15, startY);
  doc.text(`Form: ${student.form}`, 15, startY + 7);
  doc.text(`Admission Number: ${student.admission_number || 'N/A'}`, 15, startY + 14);
  
  const dateOfBirth = student.date_of_birth 
    ? new Date(student.date_of_birth).toLocaleDateString()
    : 'N/A';
  
  doc.text(`Date of Birth: ${dateOfBirth}`, 105, startY);
  doc.text(`Gender: ${student.gender || 'N/A'}`, 105, startY + 7);
  doc.text(`Report Date: ${new Date().toLocaleDateString()}`, 105, startY + 14);
  
  // Grades table
  let tableData = grades.map(grade => [
    grade.subject,
    grade.score,
    grade.grade,
    getSubjectRemark(grade.grade)
  ]);
  
  // Make sure we have at least some rows to display
  if (tableData.length === 0) {
    tableData = [['No grades available', '', '', '']];
  }
  
  autoTable(doc, {
    head: [['Subject', 'Score', 'Grade', 'Remarks']],
    body: tableData,
    startY: startY + 25,
    styles: {
      fontSize: 10,
      cellPadding: 3,
      lineColor: [0, 0, 0],
      lineWidth: 0.1,
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240],
    },
  });
  
  // Calculate average score and position
  let totalScore = 0;
  let validGrades = 0;
  
  grades.forEach(grade => {
    totalScore += grade.score;
    validGrades++;
  });
  
  const averageScore = validGrades > 0 ? totalScore / validGrades : 0;
  const averageGrade = getGradeFromScore(averageScore);
  
  // Add summary below the table
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  
  doc.setFont('helvetica', 'bold');
  doc.text('Performance Summary:', 15, finalY);
  doc.setFont('helvetica', 'normal');
  
  doc.text(`Total Subjects: ${validGrades}`, 15, finalY + 7);
  doc.text(`Total Score: ${totalScore}`, 15, finalY + 14);
  doc.text(`Average Score: ${averageScore.toFixed(2)}`, 15, finalY + 21);
  doc.text(`Overall Grade: ${averageGrade}`, 15, finalY + 28);
  
  // Class teacher's comments
  doc.setFont('helvetica', 'bold');
  doc.text('Class Teacher\'s Comments:', 15, finalY + 40);
  
  doc.setFont('helvetica', 'normal');
  const comment = getOverallComment(averageGrade);
  doc.text(comment, 15, finalY + 47);
  
  // Signature
  doc.setFont('helvetica', 'bold');
  doc.text('Principal\'s Signature: _______________________', 15, finalY + 65);
  doc.text('Date: _______________________', 130, finalY + 65);
  
  // Footer
  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('This is a computer generated report and does not require physical signature.', 105, pageHeight - 10, { align: 'center' });
  
  // Return the PDF document as a blob
  return doc;
};

export const generateClassReport = (
  form: string,
  students: Student[],
  grades: StudentGrade[],
  term: string,
  year: number
) => {
  const doc = new jsPDF();

  // Report header
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('SCHOOL NAME', 105, 20, { align: 'center' });
  
  doc.setFontSize(16);
  doc.text(`${form} - CLASS REPORT`, 105, 30, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`${term} - ${year}`, 105, 38, { align: 'center' });
  
  // Group student grades by student
  const studentGrades = new Map();
  students.forEach(student => {
    const studentId = student.id;
    const studentGradesList = grades.filter(grade => grade.student_id === studentId);
    
    let total = 0;
    studentGradesList.forEach(grade => {
      total += grade.score;
    });
    
    const average = studentGradesList.length > 0 ? total / studentGradesList.length : 0;
    
    studentGrades.set(studentId, {
      name: student.name,
      average: average,
      grade: getGradeFromScore(average),
      totalSubjects: studentGradesList.length,
    });
  });
  
  // Convert to array and sort by average score (descending)
  const sortedStudents = Array.from(studentGrades.values())
    .sort((a, b) => b.average - a.average);
  
  // Add position to each student
  const tableData = sortedStudents.map((student, index) => [
    index + 1,
    student.name,
    student.totalSubjects,
    student.average.toFixed(2),
    student.grade,
    getSubjectRemark(student.grade)
  ]);
  
  // Class performance table
  autoTable(doc, {
    head: [['Position', 'Student Name', 'Subjects', 'Average', 'Grade', 'Remarks']],
    body: tableData,
    startY: 50,
    styles: {
      fontSize: 10,
      cellPadding: 3,
      lineWidth: 0.1,
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240],
    },
  });
  
  // Class summary
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  
  doc.setFont('helvetica', 'bold');
  doc.text('Class Performance Summary:', 15, finalY);
  
  // Calculate class average
  let classTotal = 0;
  sortedStudents.forEach(student => {
    classTotal += student.average;
  });
  
  const classAverage = sortedStudents.length > 0 ? classTotal / sortedStudents.length : 0;
  
  doc.setFont('helvetica', 'normal');
  doc.text(`Number of Students: ${sortedStudents.length}`, 15, finalY + 7);
  doc.text(`Class Average: ${classAverage.toFixed(2)}`, 15, finalY + 14);
  doc.text(`Class Grade: ${getGradeFromScore(classAverage)}`, 15, finalY + 21);
  
  // Grade distribution
  const gradeDistribution = getGradeDistribution(sortedStudents);
  
  doc.setFont('helvetica', 'bold');
  doc.text('Grade Distribution:', 15, finalY + 35);
  
  doc.setFont('helvetica', 'normal');
  let gradeLine = finalY + 42;
  gradeDistribution.forEach(grade => {
    doc.text(`${grade.grade}: ${grade.count} students (${grade.percentage}%)`, 15, gradeLine);
    gradeLine += 7;
  });
  
  return doc;
};

// Helper functions for report generation
function getSubjectRemark(grade: string): string {
  switch (grade) {
    case 'A': return 'Excellent';
    case 'A-': return 'Very Good';
    case 'B+': return 'Good';
    case 'B': return 'Above Average';
    case 'B-': return 'Average';
    case 'C+': return 'Fair';
    case 'C': return 'Satisfactory';
    case 'C-': return 'Below Average';
    case 'D+': return 'Needs Improvement';
    case 'D': return 'Poor';
    case 'E': return 'Very Poor';
    default: return 'N/A';
  }
}

function getOverallComment(grade: string): string {
  switch (grade) {
    case 'A': return 'Outstanding performance! Keep up the excellent work.';
    case 'A-': return 'Excellent performance. Continue with the same spirit.';
    case 'B+': return 'Very good performance. Keep working hard.';
    case 'B': return 'Good work. With more effort, you can improve further.';
    case 'B-': return 'Satisfactory performance. Put in more effort to improve.';
    case 'C+': return 'Average performance. You need to work harder in your weak areas.';
    case 'C': return 'Fair performance. Need to improve your study habits and consistency.';
    case 'C-': return 'Below average performance. Please seek extra help in difficult subjects.';
    case 'D+': 
    case 'D': return 'Poor performance. Requires significant improvement and regular tutoring.';
    case 'E': return 'Very poor performance. Immediate attention and remedial classes are required.';
    default: return 'No grades available for assessment.';
  }
}

function getGradeDistribution(students: any[]): { grade: string, count: number, percentage: number }[] {
  const grades = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'E'];
  const distribution = grades.map(grade => ({
    grade,
    count: students.filter(student => student.grade === grade).length,
    percentage: 0
  }));
  
  // Calculate percentages
  const total = students.length;
  distribution.forEach(item => {
    item.percentage = Math.round((item.count / total) * 100);
  });
  
  // Return only grades that have at least one student
  return distribution.filter(item => item.count > 0);
}
