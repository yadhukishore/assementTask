import useSWR from 'swr';
import { employeeService } from '../services/apiEmployees';

export const useEmployees = (page, sortOrder, sortBy, pageSize = 10) => {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    [`employees`, { page, sortOrder, sortBy, pageSize }],
    () => employeeService.getEmployees({ page, sortOrder, sortBy, pageSize }),
    {
      keepPreviousData: true, // Keep showing previous data while loading new data
      revalidateOnFocus: false, // Don't revalidate when window regains focus
      revalidateOnReconnect: true, // Revalidate when internet reconnects
      errorRetryCount: 3, // Retry failed requests 3 times
      dedupingInterval: 5000, // Dedupe requests within 5 seconds
    }
  );

  return {
    employees: data?.data || [],
    totalEmployees: data?.total || 0,
    isLoading,
    isValidating,
    error,
    mutate,
  };
};

export const useEmployeeDetails = (id) => {
  const { data, error, isLoading, mutate } = useSWR(
    id ? [`employee`, id] : null, // Only fetch if ID exists
    () => employeeService.getEmployeeById(id),
    {
      revalidateOnFocus: false,
      revalidateIfStale: true,
      dedupingInterval: 5000,
    }
  );

  return {
    employee: data,
    isLoading,
    error,
    mutate,
  };
};