-- Bridge Onboarding — initial schema
-- Run this in Supabase SQL editor or via: supabase db push

-- Sessions
CREATE TABLE IF NOT EXISTS onboarding_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  client_name TEXT,
  client_email TEXT,
  client_company TEXT,
  status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress','submitted','abandoned')),
  current_section TEXT NOT NULL DEFAULT 'snapshot',
  quality_score INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  submitted_at TIMESTAMPTZ
);

-- Section A: Business Snapshot
CREATE TABLE IF NOT EXISTS onboarding_snapshot (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES onboarding_sessions(id) ON DELETE CASCADE NOT NULL UNIQUE,
  business_type TEXT,
  industry TEXT,
  industry_taxonomy TEXT,
  headquarters TEXT,
  locations TEXT[] DEFAULT '{}',
  company_size TEXT,
  revenue_stage TEXT,
  primary_goal TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Section B: Services
CREATE TABLE IF NOT EXISTS onboarding_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES onboarding_sessions(id) ON DELETE CASCADE NOT NULL UNIQUE,
  selected_services TEXT[] DEFAULT '{}',
  has_existing_website BOOLEAN,
  website_url TEXT,
  website_platform TEXT,
  website_issues TEXT[] DEFAULT '{}',
  ad_platforms TEXT[] DEFAULT '{}',
  monthly_budget_usd INTEGER,
  tracking_ga4 BOOLEAN DEFAULT FALSE,
  tracking_gtm BOOLEAN DEFAULT FALSE,
  tracking_pixel BOOLEAN DEFAULT FALSE,
  competitor_urls TEXT[] DEFAULT '{}',
  target_locations TEXT[] DEFAULT '{}',
  has_crm BOOLEAN,
  crm_name TEXT,
  automation_needs TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Section C: Strategy
CREATE TABLE IF NOT EXISTS onboarding_strategy (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES onboarding_sessions(id) ON DELETE CASCADE NOT NULL UNIQUE,
  business_description TEXT,
  icp_demographics TEXT[] DEFAULT '{}',
  icp_geography TEXT[] DEFAULT '{}',
  icp_mindset TEXT[] DEFAULT '{}',
  icp_triggers TEXT[] DEFAULT '{}',
  competitors JSONB DEFAULT '[]',
  growth_constraints TEXT[] DEFAULT '{}',
  sales_process JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Section D: Asset files
CREATE TABLE IF NOT EXISTS onboarding_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES onboarding_sessions(id) ON DELETE CASCADE NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  file_type TEXT,
  tags TEXT[] DEFAULT '{}',
  validation_status TEXT DEFAULT 'pending' CHECK (validation_status IN ('ok','warn','err','pending')),
  validation_message TEXT,
  dimensions TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Section D: Account access
CREATE TABLE IF NOT EXISTS onboarding_account_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES onboarding_sessions(id) ON DELETE CASCADE NOT NULL,
  platform_name TEXT NOT NULL,
  status TEXT DEFAULT 'not_started' CHECK (status IN ('connected','awaiting','not_started')),
  UNIQUE(session_id, platform_name),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Section E: Goals
CREATE TABLE IF NOT EXISTS onboarding_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES onboarding_sessions(id) ON DELETE CASCADE NOT NULL UNIQUE,
  selected_goals TEXT[] DEFAULT '{}',
  new_patients_per_month INTEGER,
  annual_revenue_usd BIGINT,
  blended_roas DECIMAL(4,1),
  williston_fill_pct INTEGER,
  priority_order TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DO $$ BEGIN
  CREATE TRIGGER set_sessions_updated_at  BEFORE UPDATE ON onboarding_sessions  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
DO $$ BEGIN
  CREATE TRIGGER set_snapshot_updated_at  BEFORE UPDATE ON onboarding_snapshot  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
DO $$ BEGIN
  CREATE TRIGGER set_services_updated_at  BEFORE UPDATE ON onboarding_services  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
DO $$ BEGIN
  CREATE TRIGGER set_strategy_updated_at  BEFORE UPDATE ON onboarding_strategy  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
DO $$ BEGIN
  CREATE TRIGGER set_goals_updated_at     BEFORE UPDATE ON onboarding_goals     FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- RLS Policies
ALTER TABLE onboarding_sessions       ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_snapshot       ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_services       ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_strategy       ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_assets         ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_account_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_goals          ENABLE ROW LEVEL SECURITY;

-- Sessions: user owns their rows
CREATE POLICY "user_sessions" ON onboarding_sessions FOR ALL USING (user_id = auth.uid());

-- Section tables: access through session ownership
CREATE POLICY "user_snapshot" ON onboarding_snapshot FOR ALL
  USING (session_id IN (SELECT id FROM onboarding_sessions WHERE user_id = auth.uid()));
CREATE POLICY "user_services" ON onboarding_services FOR ALL
  USING (session_id IN (SELECT id FROM onboarding_sessions WHERE user_id = auth.uid()));
CREATE POLICY "user_strategy" ON onboarding_strategy FOR ALL
  USING (session_id IN (SELECT id FROM onboarding_sessions WHERE user_id = auth.uid()));
CREATE POLICY "user_assets" ON onboarding_assets FOR ALL
  USING (session_id IN (SELECT id FROM onboarding_sessions WHERE user_id = auth.uid()));
CREATE POLICY "user_account_access" ON onboarding_account_access FOR ALL
  USING (session_id IN (SELECT id FROM onboarding_sessions WHERE user_id = auth.uid()));
CREATE POLICY "user_goals" ON onboarding_goals FOR ALL
  USING (session_id IN (SELECT id FROM onboarding_sessions WHERE user_id = auth.uid()));

-- Storage bucket for assets
INSERT INTO storage.buckets (id, name, public)
  VALUES ('onboarding-assets', 'onboarding-assets', false)
  ON CONFLICT DO NOTHING;

CREATE POLICY "user_upload_assets" ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'onboarding-assets' AND auth.uid() IS NOT NULL);
CREATE POLICY "user_read_assets"   ON storage.objects FOR SELECT
  USING (bucket_id = 'onboarding-assets' AND auth.uid() IS NOT NULL);
CREATE POLICY "user_delete_assets" ON storage.objects FOR DELETE
  USING (bucket_id = 'onboarding-assets' AND auth.uid() IS NOT NULL);
