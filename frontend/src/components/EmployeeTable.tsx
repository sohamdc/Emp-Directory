import type { Employee } from '../types/employee';

interface Props {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
}

function EmployeeTable({ employees, onEdit, onDelete }: Props) {
  if (employees.length === 0) return <p className="empty">No employees found.</p>;

  return (
    <div className="table-wrap">
      <table>

        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Created</th>
            <th></th>
          </tr>
        </thead>


        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>
                <div className="person">
                  <span className="avatar">{emp.name.charAt(0).toUpperCase()}</span>
                  <div>
                    <div className="person-name">{emp.name}</div>
                    <div className="person-email">{emp.email}</div>
                  </div>
                </div>
              </td>
              <td><span className="badge">{emp.role}</span></td>
              <td className="muted">{new Date(emp.created_at).toLocaleDateString()}</td>
              <td className="actions">
                <button className="ghost" onClick={() => onEdit(emp)}>Edit</button>
                <button className="ghost danger" onClick={() => onDelete(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>

        
      </table>
    </div>
  );
}

export default EmployeeTable;