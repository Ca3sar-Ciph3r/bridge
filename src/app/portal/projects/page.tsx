import { getProjects } from "@/lib/actions/portal";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Chip";
import type { Project } from "@/lib/types";

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ── Sub-components ────────────────────────────────────────────────────────────

function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      style={{
        padding: "16px 18px",
        background: "var(--surface)",
        border: "1px solid var(--line)",
        borderRadius: 12,
        boxShadow: "var(--shadow-1)",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: "var(--ink)",
          letterSpacing: "-0.01em",
          lineHeight: 1.35,
        }}
      >
        {project.title}
      </div>

      {project.description && (
        <p
          style={{
            fontSize: 13,
            color: "var(--ink-3)",
            lineHeight: 1.55,
            margin: 0,
          }}
        >
          {project.description}
        </p>
      )}

      {project.due_date && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            fontSize: 12,
            color: "var(--ink-4)",
            marginTop: 2,
          }}
        >
          <Icon name="target" size={12} color="var(--ink-4)" />
          Due {formatDate(project.due_date)}
        </div>
      )}
    </div>
  );
}

interface ColumnProps {
  title: string;
  icon: string;
  iconColor: string;
  accentBg: string;
  accentBorder: string;
  pillTone: "accent" | "warn" | "ok";
  projects: Project[];
  emptyMessage: string;
}

function ProjectColumn({
  title,
  icon,
  iconColor,
  accentBg,
  accentBorder,
  pillTone,
  projects,
  emptyMessage,
}: ColumnProps) {
  return (
    <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 10 }}>
      {/* Column header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 14px",
          background: accentBg,
          border: `1px solid ${accentBorder}`,
          borderRadius: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Icon name={icon} size={15} color={iconColor} />
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "var(--ink-2)",
              letterSpacing: "-0.01em",
            }}
          >
            {title}
          </span>
        </div>
        <Pill tone={pillTone} size="sm">
          {projects.length}
        </Pill>
      </div>

      {/* Cards or empty */}
      {projects.length === 0 ? (
        <div
          style={{
            padding: "20px 16px",
            textAlign: "center",
            color: "var(--ink-4)",
            fontSize: 13,
            background: "var(--surface)",
            border: "1px dashed var(--line)",
            borderRadius: 10,
          }}
        >
          {emptyMessage}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function ProjectsPage() {
  const projects = await getProjects();

  const inProgress = projects.filter((p) => p.status === "in_progress");
  const upcoming = projects.filter((p) => p.status === "upcoming");
  const completed = projects.filter((p) => p.status === "completed");

  return (
    <div style={{ padding: "32px 40px" }}>
      {/* Header */}
      <div
        className="br-fade-up"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
          marginBottom: 36,
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--accent)",
          }}
        >
          Project Tracker
        </span>
        <h1
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: "var(--ink)",
            margin: 0,
            letterSpacing: "-0.03em",
          }}
        >
          What we&apos;re working on
        </h1>
        <p style={{ fontSize: 14.5, color: "var(--ink-3)", margin: 0 }}>
          A live view of all active, upcoming, and completed projects for your
          account.
        </p>
      </div>

      {/* Overall empty state */}
      {projects.length === 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            padding: "64px 24px",
            background: "var(--surface)",
            border: "1px solid var(--line)",
            borderRadius: 16,
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "var(--surface-2)",
              display: "grid",
              placeItems: "center",
              border: "1px solid var(--line)",
            }}
          >
            <Icon name="layers" size={22} color="var(--ink-4)" />
          </div>
          <div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "var(--ink-2)",
                marginBottom: 6,
                letterSpacing: "-0.01em",
              }}
            >
              No projects yet
            </div>
            <p
              style={{
                fontSize: 13.5,
                color: "var(--ink-4)",
                lineHeight: 1.6,
                margin: 0,
                maxWidth: 360,
              }}
            >
              Projects will appear here once your account has been fully set up.
              Check back soon.
            </p>
          </div>
        </div>
      ) : (
        /* Three-column board */
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
            alignItems: "start",
          }}
        >
          <ProjectColumn
            title="In progress"
            icon="bolt"
            iconColor="var(--accent)"
            accentBg="var(--accent-soft)"
            accentBorder="var(--accent-soft)"
            pillTone="accent"
            projects={inProgress}
            emptyMessage="Nothing in progress right now."
          />
          <ProjectColumn
            title="Upcoming"
            icon="target"
            iconColor="var(--warn)"
            accentBg="var(--warn-soft)"
            accentBorder="#fcd34d"
            pillTone="warn"
            projects={upcoming}
            emptyMessage="No upcoming projects scheduled."
          />
          <ProjectColumn
            title="Completed"
            icon="check"
            iconColor="var(--ok)"
            accentBg="var(--ok-soft)"
            accentBorder="#a7f3d0"
            pillTone="ok"
            projects={completed}
            emptyMessage="No completed projects yet."
          />
        </div>
      )}
    </div>
  );
}
