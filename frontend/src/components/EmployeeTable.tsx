import type { Employee } from '../types/employee';

interface Props {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
}

function EmployeeTable({ employees, onEdit, onDelete }: Props) {
 if (employees.length === 0) return <p>No employees found.</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Created</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp) => (
          <tr key={emp.id}>
            <td>{emp.name}</td>
            <td>{emp.email}</td>
            <td>{emp.role}</td>
            <td>{new Date(emp.created_at).toLocaleDateString()}</td>
            <td>
              <button onClick={() => onEdit(emp)}>Edit</button>
              <button className="danger" onClick={() => onDelete(emp.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EmployeeTable;