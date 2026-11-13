import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Employee, EmployeeInput } from '../types/employee';
import { getErrorMessage } from '../services/employeeService';




interface Props {
  editing: Employee | null;
  onSubmit: (data: EmployeeInput) => Promise<void>;
  onCancel: () => void;
}


const empty: EmployeeInput = { name: '', email: '', role: '' };


function EmployeeForm({ editing, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<EmployeeInput>(
    editing ? { name: editing.name, email: editing.email, role: editing.role } : empty
  );


  const [error, setError] = useState('');




  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });



  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await onSubmit(form);
      if (!editing) setForm(empty);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };


  
  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>{editing ? 'Edit Employee' : 'Add Employee'}</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="role" placeholder="Role" value={form.role} onChange={handleChange} required />
      {error && <p className="error">{error}</p>}
      <div className="form-actions">
        <button type="submit">{editing ? 'Update' : 'Add'}</button>
        {editing && <button type="button" className="secondary" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}

export default EmployeeForm;