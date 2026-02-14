export function getErrorMessage(error: unknown): string {
  if (!error) return "Something went wrong";

  if (typeof error === "string") return error;

  const axiosError = error as any;
  
  if (axiosError.response?.data?.detail)
    return axiosError.response.data.detail;

  if (axiosError.response?.data?.message)
    return axiosError.response.data.message;

  return "Unexpected error occurred";
}
