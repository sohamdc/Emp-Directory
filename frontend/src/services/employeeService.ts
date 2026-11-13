import axios from 'axios';
import type { Employee, EmployeeInput } from '../types/employee';






const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });



export const getEmployees = async () =>
  (await api.get<Employee[]>('/employees')).data;



export const createEmployee = async (data: EmployeeInput) =>
  (await api.post<Employee>('/employees', data)).data;



export const updateEmployee = async (id: number, data: EmployeeInput) =>
  (await api.put<Employee>(`/employees/${id}`, data)).data;


export const deleteEmployee = async (id: number) => {
  await api.delete(`/employees/${id}`);
};


export const getErrorMessage = (err: unknown) =>
  axios.isAxiosError(err)
    ? err.response?.data?.message ?? 'Cannot reach the server'
    : 'Something went wrong';