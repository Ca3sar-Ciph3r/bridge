export type SectionId = "snapshot" | "services" | "strategy" | "goals" | "review";

export interface NavSection {
  id: SectionId;
  title: string;
  subtitle: string;
  path: string;
  index: number;
}

export const NAV_SECTIONS: NavSection[] = [
  { id: "snapshot", title: "Business Snapshot", subtitle: "Industry, location, scale",  path: "/onboarding/snapshot", index: 0 },
  { id: "services", title: "Services",          subtitle: "What we're scoping",          path: "/onboarding/services", index: 1 },
  { id: "strategy", title: "Strategy Inputs",   subtitle: "ICP, competitors, voice",     path: "/onboarding/strategy", index: 2 },
  { id: "goals",    title: "Goals",             subtitle: "Targets & priorities",        path: "/onboarding/goals",    index: 3 },
  { id: "review",   title: "Review",            subtitle: "Confirm & submit",            path: "/onboarding/review",   index: 4 },
];

// ── Database row shapes ──────────────────────────────────────

export type AgencyStatus = "reviewed" | "proposal_sent" | "won" | "lost";

export interface OnboardingSession {
  id: string;
  user_id: string;
  client_name: string | null;
  client_email: string | null;
  client_company: string | null;
  status: "in_progress" | "submitted" | "abandoned";
  current_section: SectionId;
  quality_score: number | null;
  agency_status: AgencyStatus | null;
  created_at: string;
  updated_at: string;
  submitted_at: string | null;
}

export interface SnapshotData {
  id?: string;
  session_id: string;
  business_type: string | null;
  industry: string | null;
  industry_taxonomy: string | null;
  headquarters: string | null;
  locations: string[];
  company_size: string | null;
  revenue_stage: string | null;
  primary_goal: string | null;
  brand_colors?: string[];
}

export interface ServicesData {
  id?: string;
  session_id: string;
  selected_services: string[];
  has_existing_website: boolean | null;
  website_url: string | null;
  website_platform: string | null;
  website_issues: string[];
  ad_platforms: string[];
  monthly_budget_usd: number | null;
  tracking_ga4: boolean;
  tracking_gtm: boolean;
  tracking_pixel: boolean;
  competitor_urls: string[];
  target_locations: string[];
  has_crm: boolean | null;
  crm_name: string | null;
  automation_needs: string[];
}

export interface StrategyData {
  id?: string;
  session_id: string;
  business_description: string | null;
  icp_demographics: string[];
  icp_geography: string[];
  icp_mindset: string[];
  icp_triggers: string[];
  competitors: Competitor[];
  growth_constraints: string[];
  sales_process: SalesStep[];
}

export interface Competitor {
  name: string;
  url: string;
  type: "direct" | "adjacent" | string;
}

export interface SalesStep {
  stage: string;
  detail: string;
  kpi: string;
}

export interface AssetFile {
  id?: string;
  session_id: string;
  file_name: string;
  file_path: string;
  file_size: number | null;
  file_type: string | null;
  tags: string[];
  validation_status: "ok" | "warn" | "err" | "pending";
  validation_message: string | null;
  dimensions: string | null;
  created_at?: string;
}

export interface AccountAccess {
  id?: string;
  session_id: string;
  platform_name: string;
  status: "connected" | "awaiting" | "not_started";
}

export interface GoalsData {
  id?: string;
  session_id: string;
  selected_goals: string[];
  new_patients_per_month: number | null;
  annual_revenue_usd: number | null;
  blended_roas: number | null;
  williston_fill_pct: number | null;
  numeric_targets?: Record<string, number>;
  priority_order: string[];
}

// ── Portal types ─────────────────────────────────────────────

export type PortalSectionId = "dashboard" | "reports" | "deliverables" | "invoices" | "projects" | "brand" | "access";

export const PORTAL_SECTIONS: { id: PortalSectionId; title: string; icon: string; path: string }[] = [
  { id: "dashboard",    title: "Dashboard",      icon: "target",    path: "/portal/dashboard"    },
  { id: "reports",      title: "Reports",        icon: "bolt",      path: "/portal/reports"      },
  { id: "deliverables", title: "Deliverables",   icon: "layers",    path: "/portal/deliverables" },
  { id: "invoices",     title: "Invoices",       icon: "file",      path: "/portal/invoices"     },
  { id: "projects",     title: "Project Tracker",icon: "search",    path: "/portal/projects"     },
  { id: "brand",        title: "Brand Assets",   icon: "star",      path: "/portal/brand"        },
  { id: "access",       title: "Account Access", icon: "lock",      path: "/portal/access"       },
];

export interface PortalClient {
  id: string;
  name: string | null;
  company_name: string | null;
  email: string | null;
  retainer_amount: number | null;
  retainer_currency: string;
  retainer_status: "active" | "paused" | "cancelled";
  package: string | null;
  start_date: string | null;
  created_at: string;
}

export interface Deliverable {
  id: string;
  client_id: string;
  title: string;
  caption: string | null;
  image_url: string | null;
  platform: "instagram" | "facebook" | "linkedin" | "tiktok" | "google" | "twitter" | "other";
  status: "pending" | "approved" | "changes_requested";
  changes_note: string | null;
  scheduled_date: string | null;
  created_at: string;
}

export interface Report {
  id: string;
  client_id: string;
  month: string;
  title: string | null;
  summary: string | null;
  metrics: Record<string, unknown>;
  pdf_url: string | null;
  created_at: string;
}

export interface Invoice {
  id: string;
  client_id: string;
  invoice_number: string | null;
  amount: number | null;
  currency: string;
  status: "pending" | "paid" | "overdue" | "draft";
  due_date: string | null;
  issued_date: string | null;
  description: string | null;
  pdf_url: string | null;
  created_at: string;
}

export interface Project {
  id: string;
  client_id: string;
  title: string;
  description: string | null;
  status: "in_progress" | "completed" | "upcoming";
  due_date: string | null;
  sort_order: number;
  created_at: string;
}

export interface BrandAsset {
  id: string;
  client_id: string;
  name: string;
  type: "logo" | "font" | "color" | "guideline" | "image" | "document" | "other";
  file_url: string | null;
  thumbnail_url: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface AccountCredential {
  id: string;
  client_id: string;
  platform: string;
  account_name: string | null;
  username: string | null;
  notes: string | null;
  status: "active" | "pending" | "revoked";
  created_at: string;
}
