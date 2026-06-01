export interface ContactPayload {
  name: string;
  phone: string;
  email: string;
  comment: string;
}

export interface AiAssistPayload {
  userInput: string;
}

export interface ApiResponse<T = void> {
  success: boolean;
  data?: T;
  error?: string;
}
