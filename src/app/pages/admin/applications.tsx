// pages/admin/applications.tsx
import { useEffect, useState } from "react";
import { prisma } from "@/lib/db";

interface JobApplication {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle: string;
  jobDepartment: string;
  status: string;
  createdAt: string;
}

export default function ApplicationsAdmin() {
  const [applications, setApplications] = useState<JobApplication[]>([]);

  useEffect(() => {
    fetch("/api/admin/applications")
      .then((res) => res.json())
      .then(setApplications);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Job Applications</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Position</th>
              <th className="px-4 py-2">Department</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td className="px-4 py-2">
                  {app.firstName} {app.lastName}
                </td>
                <td className="px-4 py-2">{app.email}</td>
                <td className="px-4 py-2">{app.jobTitle}</td>
                <td className="px-4 py-2">{app.jobDepartment}</td>
                <td className="px-4 py-2">{app.status}</td>
                <td className="px-4 py-2">
                  {new Date(app.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
