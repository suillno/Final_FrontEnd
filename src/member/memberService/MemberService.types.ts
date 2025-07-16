export interface InquiryForm {
  category: string;
  content: string;
}

export interface LayoutContext {
  isSidebarOpen: boolean;
}

export interface SubmitInquiryRequest {
  userId: number;
  category: string;
  content: string;
}
