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
    <form className={`card form ${editing ? 'editing' : ''}`} onSubmit={handleSubmit}>
      <h2>{editing ? 'Edit Employee' : 'Add Employee'}</h2>
      <label>
        Name
        <input name="name" placeholder="Jane Doe" value={form.name} onChange={handleChange} required />
      </label>
      <label>
        Email
        <input name="email" type="email" placeholder="jane@company.com" value={form.email} onChange={handleChange} required />
      </label>
      <label>
        Role
        <input name="role" placeholder="Frontend Developer" value={form.role} onChange={handleChange} required />
      </label>
      {error && <p className="error">{error}</p>}
      <div className="form-actions">
        <button type="submit">{editing ? 'Update' : 'Add Employee'}</button>
        {editing && <button type="button" className="secondary" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}

export default EmployeeForm;