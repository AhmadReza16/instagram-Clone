export function getErrorMessage(error: any): string {
  if (!error) return "Something went wrong";

  if (typeof error === "string") return error;

  if (error.response?.data?.detail)
    return error.response.data.detail;

  if (error.response?.data?.message)
    return error.response.data.message;

  return "Unexpected error occurred";
}
