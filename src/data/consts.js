export const TABS = [
  { id: "basic_info", label: "기본정보 관리" },
  { id: "investment_type", label: "투자유형 관리" },
  { id: "deposit_withdraw_details", label: "입출금내역 조회" },
  { id: "salary_history", label: "영업내역 조회" },
  { id: "investment_details", label: "투자내역 조회" },
  { id: "view_bond_details", label: "채권내역 조회" },
  { id: "sms_management", label: "SMS 관리" },
  { id: "consultation_history_management", label: "상담내역 관리" },
  { id: "inquiry_history", label: "1:1문의내역 조회 " },
];

export const APPROVAL_STATUSES = [
  "승인여부 전체",
  "승인대기",
  "승인완료",
  "승인거부",
];

export const SHORT_OPTIONS = ["신청일시순", "승인일시순"];

export const ITEMS_PER_PAGE_OPTIONS = [
  "50개씩 보기",
  "25개씩 보기",
  "10개씩 보기",
];

export const TABLE_COLUMNS = [
  { id: "id", header: "NO", minWidth: "30px" },
  { id: "existingType", header: "기존유형", minWidth: "80px" },
  { id: "applicationType", header: "신청유형", minWidth: "80px" },
  { id: "submittedDocs", header: "제출서류", minWidth: "80px" },
  { id: "applicationDate", header: "신청일시", minWidth: "140px" },
  { id: "approval", header: "승인여부", minWidth: "80px" },
  { id: "reasonForReject", header: "승인거부 사유", minWidth: "400px" },
  { id: "approvalDate", header: "승인일시", minWidth: "140px" },
  { id: "administrator", header: "관리자", minWidth: "80px" },
];
