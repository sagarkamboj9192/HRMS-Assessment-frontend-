import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StatusBadge } from '../components/ui/StatusBadge';

const mockStats = {
  totalEmployees: 28,
  todayPresent: 21,
  todayTotal: 27, 
  monthPresentRate: 84,
};

const mockRecentEmployees = [
  { id: 'EMP-024', name: 'Aarav Sharma', department: 'Engineering', joined: '2026-01-15' },
  { id: 'EMP-023', name: 'Priya Patel', department: 'Marketing', joined: '2026-01-10' },
  { id: 'EMP-022', name: 'Rahul Verma', department: 'HR', joined: '2026-01-05' },
  { id: 'EMP-021', name: 'Sneha Gupta', department: 'Finance', joined: '2025-12-20' },
];

type AttendanceRecord = {
  date: string;
  employee: string;
  status: 'present' | 'absent';
};

const mockRecentAttendance: AttendanceRecord[] = [
  { date: '2026-02-26', employee: 'Aarav Sharma', status: 'present' },
  { date: '2026-02-26', employee: 'Priya Patel', status: 'absent' },
  { date: '2026-02-26', employee: 'Rahul Verma', status: 'present' },
  { date: '2026-02-25', employee: 'Sneha Gupta', status: 'present' },
  { date: '2026-02-25', employee: 'Aarav Sharma', status: 'present' },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center">
            <p className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-4">
            Total Employees
            </p>
            <div className="p-6 border-2 border-indigo-200 bg-indigo-50/60 rounded-xl shadow-inner">
            <p className="text-6xl font-extrabold text-indigo-700 tracking-tight">
                {mockStats.totalEmployees}
            </p>
            </div>
            <p className="mt-4 text-sm text-gray-500">registered users</p>
        </Card>

        <Card className="text-center">
            <p className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-4">
            Today's Attendance
            </p>
            <div className="p-6 border-2 border-green-200 bg-green-50/60 rounded-xl shadow-inner">
            <p className="text-6xl font-extrabold text-green-700 tracking-tight">
                {mockStats.todayPresent}<span className="text-4xl"> / {mockStats.todayTotal}</span>
            </p>
            </div>
            <p className="mt-4 text-sm text-gray-500">
            {Math.round((mockStats.todayPresent / mockStats.todayTotal) * 100)}% present
            </p>
        </Card>

        {/* This Month */}
        <Card className="text-center">
            <p className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-4">
            This Month
            </p>
            <div className="p-6 border-2 border-blue-200 bg-blue-50/60 rounded-xl shadow-inner">
            <p className="text-6xl font-extrabold text-blue-700 tracking-tight">
                {mockStats.monthPresentRate}%
            </p>
            </div>
            <p className="mt-4 text-sm text-gray-500">average attendance rate</p>
        </Card>
        </div>

      {/* Quick actions */}
      <Card title="Quick Actions">
        <div className="flex flex-wrap gap-4">
          <Button asLink to="/employees" variant="primary" size="lg">
            + Add New Employee
          </Button>
          <Button asLink to="/attendance" variant="primary" size="lg">
            Mark Today's Attendance
          </Button>
        </div>
      </Card>

      {/* Recent data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Employees */}
        <Card title="Recent Employees">
          <div className="divide-y divide-gray-100">
            {mockRecentEmployees.length === 0 ? (
              <p className="text-center py-8 text-gray-500">No employees added yet</p>
            ) : (
              mockRecentEmployees.map((emp) => (
                <div key={emp.id} className="py-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium">{emp.name}</p>
                    <p className="text-sm text-gray-600">
                      {emp.department} • {emp.id}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500">{emp.joined}</span>
                </div>
              ))
            )}
          </div>
          <div className="pt-4 text-right">
            <Link to="/employees" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
              View all →
            </Link>
          </div>
        </Card>
        <Card title="Recent Attendance">
          <div className="divide-y divide-gray-100">
            {mockRecentAttendance.length === 0 ? (
              <p className="text-center py-8 text-gray-500">No records yet today</p>
            ) : (
              mockRecentAttendance.map((record, index) => (
                <div key={index} className="py-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium">{record.employee}</p>
                    <p className="text-sm text-gray-600">{record.date}</p>
                  </div>
                  <StatusBadge status={record.status} />
                </div>
              ))
            )}
          </div>
          <div className="pt-4 text-right">
            <Link to="/attendance" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
              View all →
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}