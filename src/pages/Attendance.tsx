import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StatusBadge } from '../components/ui/StatusBadge';

const mockEmployees = [
  { id: 'EMP-001', name: 'Aarav Sharma' },
  { id: 'EMP-002', name: 'Priya Patel' },
  { id: 'EMP-003', name: 'Rahul Verma' },
  { id: 'EMP-004', name: 'Sneha Gupta' },
  { id: 'EMP-005', name: 'Vikram Singh' },
];

type AttendanceEntry = {
  date: string;
  employeeId: string;
  employeeName: string;
  status: 'present' | 'absent';
};

const initialAttendance: AttendanceEntry[] = []; 

export default function Attendance() {
  const today = new Date().toISOString().split('T')[0]; 

  const [attendances, setAttendances] = useState<AttendanceEntry[]>(initialAttendance);
  const [markings, setMarkings] = useState<Record<string, 'present' | 'absent'>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const todayAttendances = attendances.filter(rec => rec.date === today);

  const filteredToday = todayAttendances.filter(
    (rec) =>
      rec.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredEmployees = mockEmployees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMarkChange = (employeeId: string, status: 'present' | 'absent') => {
    setMarkings({ ...markings, [employeeId]: status });
  };

  const handleSubmitAttendance = () => {
    const newEntries = mockEmployees
      .filter((emp) => markings[emp.id])
      .map((emp) => ({
        date: today,
        employeeId: emp.id,
        employeeName: emp.name,
        status: markings[emp.id],
      }));

    const otherDays = attendances.filter(rec => rec.date !== today);
    setAttendances([...otherDays, ...newEntries]);

    setMarkings({});
    alert(`Today's attendance saved for ${newEntries.length} employee(s)`);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
      <div className="max-w-md">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name or employee ID..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Mark Today's Attendance */}
      <Card title={`Mark Attendance for ${today}`}>
        {filteredEmployees.length === 0 ? (
          <p className="text-center py-8 text-gray-500">
            {searchTerm ? 'No matching employees found' : 'No employees found.'}
          </p>
        ) : (
          <div className="space-y-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEmployees.map((emp) => (
                    <tr key={emp.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {emp.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {emp.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex justify-center gap-6">
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name={`status-${emp.id}`}
                              checked={markings[emp.id] === 'present'}
                              onChange={() => handleMarkChange(emp.id, 'present')}
                              className="h-5 w-5 text-green-600 focus:ring-green-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">Present</span>
                          </label>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name={`status-${emp.id}`}
                              checked={markings[emp.id] === 'absent'}
                              onChange={() => handleMarkChange(emp.id, 'absent')}
                              className="h-5 w-5 text-red-600 focus:ring-red-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">Absent</span>
                          </label>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end">
              <Button
                variant="primary"
                onClick={handleSubmitAttendance}
                disabled={Object.keys(markings).length === 0}
              >
                Save Today's Attendance
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Today's Attendance Records Only */}
      <Card title={`Today's Attendance Records (${today})`}>
        {filteredToday.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {searchTerm
              ? 'No matching records found for today.'
              : 'No attendance marked yet today.\nMark and save above to see records here.'}
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredToday.map((rec, idx) => (
              <div key={idx} className="py-3 flex justify-between items-center px-2">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-700 w-20">{rec.employeeId}</span>
                  <span className="font-medium">{rec.employeeName}</span>
                </div>
                <StatusBadge status={rec.status} />
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}