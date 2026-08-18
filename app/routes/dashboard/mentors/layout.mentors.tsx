import React, { useMemo } from 'react'
import {  MentorDataTable } from '~/components/DataTable';
import { getMentorColumns } from '~/components/mentor/MentorColumns';
import { useMentors } from '~/hooks/useMentors';

function Mentors() {
  const { mentors, loading, error } = useMentors();
console.log(mentors)
  const columns = useMemo(
    () =>
      getMentorColumns({
        onEdit: (student) => {
          console.log('edit', student);
        },
        onDelete: (student) => {
          console.log('delete', student);
        },
      }),
    []
  );

  if (loading) {
    return <div className='p-10 bg-neutral-100'>Loading mentors...</div>;
  }

  if (error) {
    return <div className='p-10 bg-neutral-100 text-red-600'>Error: {error}</div>;
  }

  return (
    <div className='p-10 bg-neutral-100'>
      <div className='py-4'>
        <h1 className='text-xl font-semibold'>Mentors</h1>
      </div>
     <MentorDataTable
        data={mentors}
        buttonTitle="Add Mentor"
        onEdit={(mentor) => {
          console.log("edit", mentor);
        }}
        onDelete={(mentor) => {
          console.log("delete", mentor);
        }}
      />
    </div>
  );
}

export default Mentors