import { useEffect, useState } from 'react';
import EmployeeForm from './components/EmployeeForm';
import EmployeeTable from './components/EmployeeTable';
import Pagination from './components/Pagination';
import * as service from './services/employeeService';
import type { Employee, EmployeeInput } from './types/employee';



const PAGE_SIZE = 5;


function App() 

{

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editing, setEditing] = useState<Employee | null>(null);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);




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



  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };




  const filtered = employees.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );


  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);



  return (
    <>
      <header className="header">
        <div className="header-inner">
          <h1>Employee Directory</h1>
          <span className="count">{employees.length} employees</span>
        </div>
      </header>

      <main className="layout">
        {error && <p className="banner">{error}</p>}

        <EmployeeForm
          key={editing?.id ?? 'new'}
          editing={editing}
          onSubmit={handleSubmit}
          onCancel={() => setEditing(null)}
        />

        <section className="card">
          <div className="toolbar">
            <h2>Team</h2>
            <input
              className="search"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <EmployeeTable employees={visible} onEdit={setEditing} onDelete={handleDelete} />
          <Pagination page={currentPage} totalPages={totalPages} onChange={setPage} />
        </section>
      </main>
    </>
  );
}

export default App;