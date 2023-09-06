export const parseTRPCErrorMessage = (message: string) => {
  try {
    const zodErrors = JSON.parse(message) as unknown as { message: string }[];
    return zodErrors
      .map((error) => {
        return error.message;
      })
      .join(", ");
  } catch {
    return message;
  }
};
