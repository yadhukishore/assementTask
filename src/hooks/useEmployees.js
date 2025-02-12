import useSWR from 'swr';
import { employeeService } from '../services/apiEmployees';
export const useEmployees = (page, sortOrder, sortBy) => {
  return useSWR(
    ['employees', page, sortOrder, sortBy],
    () => employeeService.getEmployees({ page, sortOrder, sortBy })
  );
};

export const useEmployeeDetails = (id) => {
  return useSWR(
    ['employee', id],
    () => employeeService.getEmployeeById(id)
  );
};