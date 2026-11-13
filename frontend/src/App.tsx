import { useEffect, useState } from 'react';
import EmployeeForm from './components/EmployeeForm';
import EmployeeTable from './components/EmployeeTable';
import * as service from './services/employeeService';
import type { Employee, EmployeeInput } from './types/employee';

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editing, setEditing] = useState<Employee | null>(null);
  const [error, setError] = useState('');

  const loadEmployees = async () => {
    try {
      setEmployees(await service.getEmployees());
    } catch (err) {
      setError(service.getErrorMessage(err));
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleSubmit = async (data: EmployeeInput) => {
    if (editing) {
      await service.updateEmployee(editing.id, data);
      setEditing(null);
    } else {
      await service.createEmployee(data);
    }
    await loadEmployees();
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this employee?')) return;
    try {
      await service.deleteEmployee(id);
      if (editing?.id === id) setEditing(null);
      await loadEmployees();
    } catch (err) {
      setError(service.getErrorMessage(err));
    }
  };

  return (
    <div className="container">
      <h1>Employee Directory</h1>
      {error && <p className="error">{error}</p>}
      <EmployeeForm
        key={editing?.id ?? 'new'}
        editing={editing}
        onSubmit={handleSubmit}
        onCancel={() => setEditing(null)}
      />
      <EmployeeTable employees={employees} onEdit={setEditing} onDelete={handleDelete} />
    </div>
  );
}

export default App;