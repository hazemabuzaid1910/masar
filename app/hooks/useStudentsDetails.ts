import { useEffect, useState } from "react";
import { getStudentDetails } from "~/routes/dashboard/students/api/student.api";
import type { StudentDetails } from "~/types/Student";

export function useStudentDetails(studentId: number | null) {
  const [student, setStudent] = useState<StudentDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!studentId) {
      setStudent(null);
      return;
    }

    const fetchStudentDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getStudentDetails(studentId);

        setStudent(response);
      } catch (err) {
        console.error("Failed to fetch student details:", err);
        setError("Failed to load student details");
        setStudent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentDetails();
  }, [studentId]);

  return {
    student,
    loading,
    error,
  };
}