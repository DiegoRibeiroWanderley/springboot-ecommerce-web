export const API_ERROR_MAP = {
  '400 Bad Request: "{"success":false,"data":null,"error":"Invalid taxId"}"':
    "Invalid CPF",
};

export const DEFAULT_ERROR_MESSAGE = "An unexpected error occurred.";

export const handleAPIError = (stringError) => {
  return API_ERROR_MAP[stringError] || DEFAULT_ERROR_MESSAGE;
};
