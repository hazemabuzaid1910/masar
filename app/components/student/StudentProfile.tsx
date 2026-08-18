import { Icon } from "@iconify/react";

type StudentProfileProps = {
  student: any;
  onClose: () => void;
};

export default function StudentProfile({
  student,
  onClose,
}: StudentProfileProps) {
  if (!student) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        Select a student
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
        <Icon icon="ic:round-close" onClick={onClose} />
      {/* Header */}
      <div className="text-center border-b-gray-200 border-b pb-6">
        <img
          src={student.avatar}
          alt={student.name}
          className="w-24 h-24 rounded-full mx-auto object-cover"
        />

        <h2 className="mt-4 text-xl font-bold">
          {student.personal_info.name}
        </h2>

        <p className="text-gray-500 text-sm">
          {student.personal_info.email}
        </p>

        <span className="inline-block mt-3 px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
         {student.personal_info.status}
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 py-6">
        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <p className="text-xl font-bold">{student.activity_summary.total_enrolled_courses}</p>
          <p className="text-xs text-gray-500">
            Courses
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <p className="text-xl font-bold">{student.activity_summary.completed_courses_count}</p>
          <p className="text-xs text-gray-500">
           Completed
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <p className="text-xl font-bold"> {student.activity_summary.incomplete_courses_count}
</p>
          <p className="text-xs text-gray-500">
            Payments
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <p className="text-xl font-bold">2</p>
          <p className="text-xs text-gray-500">
            Certificates
          </p>
        </div>
      </div>

      {/* Courses */}
      <div>
        <h3 className="font-semibold mb-3">
          Enrolled Courses
        </h3>

        <div className="space-y-3">
          <div className="border rounded-xl p-3">
            <div className="flex justify-between">
              <span>React.js</span>
              <span>85%</span>
            </div>

            <div className="w-full h-2 bg-gray-100 rounded-full mt-2">
              <div className="w-[85%] h-2 bg-[#8d24aad1] rounded-full" />
            </div>
          </div>

          <div className="border rounded-xl p-3">
            <div className="flex justify-between">
              <span>Next.js</span>
              <span>40%</span>
            </div>

            <div className="w-full h-2 bg-gray-100 rounded-full mt-2">
              <div className="w-[40%] h-2 bg-[#8d24aad1] rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Payments */}
      <div className="mt-6">
        <h3 className="font-semibold mb-3">
          Recent Payments
        </h3>

        <div className="space-y-2">
          <div className="border rounded-lg p-3">
            <p className="font-medium">
              React Course
            </p>
            <p className="text-sm text-gray-500">
              $49 • Jun 2025
            </p>
          </div>

          <div className="border rounded-lg p-3">
            <p className="font-medium">
              Next.js Course
            </p>
            <p className="text-sm text-gray-500">
              $79 • Jul 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}