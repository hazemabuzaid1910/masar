import React, { useMemo, useState } from 'react'
import { DataTableStudents } from '~/components/DataTableStudents';
import { getStudentColumns } from '~/components/student/StudentColumns';
import StudentProfile from '~/components/student/StudentProfile';
import { useStudents } from '~/hooks/useStudents';
import { useStudentDetails } from '~/hooks/useStudentsDetails';
import type { Student } from '~/types/Student';

function Students() {
const [page, setPage] = useState(1);
const [selectedStudentId, setSelectedStudentId] =
  useState<number | null>(null);
const {
  students,
  currentPage,
  lastPage,
  loading,
} = useStudents(page);
  const {
  student: selectedStudent,
  loading: studentDetailsLoading,
} = useStudentDetails(selectedStudentId);
   

    return (
      <div className=' flex justify-between bg-neutral-100'>
        <div className={`${selectedStudent?"w-3/4":"w-full"}  transition-all duration-300 px-5`}>
        <div className='py-4'>
          <h1 className='text-xl font-semibold'>Students</h1>
        </div>
  <DataTableStudents
    data={students}
    currentPage={currentPage}
    lastPage={lastPage}
    onPageChange={setPage}
    loading={loading}
    buttonTitle="Add Student"
      onRowClick={(student) => {
            setSelectedStudentId(student.id);
          }}
 
  />
</div>
{selectedStudentId && (
        <div className="w-1/4 bg-white p-4">
          {studentDetailsLoading ? (
            <div className="flex items-center justify-center py-10">
              Loading student...
            </div>
          ) : selectedStudent ? (
            <StudentProfile
              student={selectedStudent}
              onClose={() => setSelectedStudentId(null)}
            />
          ) : (
            <div className="py-10 text-center">
              Student not found
            </div>
          )}
        </div>
      )}
      </div>
    );
}

export default Students