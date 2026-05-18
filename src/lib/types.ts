export type SectionId = "snapshot" | "services" | "strategy" | "assets" | "access" | "goals" | "review";

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
  { id: "assets",   title: "Assets",            subtitle: "Logos, creative, photos",     path: "/onboarding/assets",   index: 3 },
  { id: "access",   title: "Account Access",    subtitle: "Platform permissions",        path: "/onboarding/access",   index: 4 },
  { id: "goals",    title: "Goals",             subtitle: "Targets & priorities",        path: "/onboarding/goals",    index: 5 },
  { id: "review",   title: "Review",            subtitle: "Confirm & submit",            path: "/onboarding/review",   index: 6 },
];

// ── Database row shapes ──────────────────────────────────────

export interface OnboardingSession {
  id: string;
  user_id: string;
  client_name: string | null;
  client_email: string | null;
  client_company: string | null;
  status: "in_progress" | "submitted" | "abandoned";
  current_section: SectionId;
  quality_score: number | null;
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
