"use client";

import { useState, useTransition } from "react";
import { getDeliverables, updateDeliverableStatus } from "@/lib/actions/portal";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import type { Deliverable } from "@/lib/types";

// ── Types ─────────────────────────────────────────────────────────────────────

type DeliverableStatus = Deliverable["status"];

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function platformLabel(platform: Deliverable["platform"]): string {
  const map: Record<Deliverable["platform"], string> = {
    instagram: "Instagram",
    facebook: "Facebook",
    linkedin: "LinkedIn",
    tiktok: "TikTok",
    google: "Google",
    twitter: "Twitter",
    other: "Other",
  };
  return map[platform];
}

function statusTone(
  status: DeliverableStatus
): "ok" | "warn" | "neutral" {
  if (status === "approved") return "ok";
  if (status === "pending") return "warn";
  return "neutral";
}

function statusLabel(status: DeliverableStatus): string {
  if (status === "approved") return "Approved";
  if (status === "pending") return "Pending";
  return "Changes requested";
}

function statusColor(status: DeliverableStatus): string {
  if (status === "approved") return "var(--ok)";
  if (status === "pending") return "var(--warn)";
  return "var(--err)";
}

function statusBg(status: DeliverableStatus): string {
  if (status === "approved") return "var(--ok-soft)";
  if (status === "pending") return "var(--warn-soft)";
  return "var(--err-soft)";
}

// ── Tile placeholder ──────────────────────────────────────────────────────────

function TilePlaceholder({ deliverable }: { deliverable: Deliverable }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "var(--surface-2)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "12px 8px",
      }}
    >
      <Icon name="megaphone" size={22} color="var(--ink-4)" />
      <span
        style={{
          fontSize: 11,
          fontWeight: 500,
          color: "var(--ink-4)",
          textAlign: "center",
          lineHeight: 1.35,
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}
      >
        {deliverable.title}
      </span>
    </div>
  );
}

// ── Grid tile ─────────────────────────────────────────────────────────────────

interface TileProps {
  deliverable: Deliverable;
  onOpen: (d: Deliverable) => void;
}

function DeliverableTile({ deliverable, onOpen }: TileProps) {
  return (
    <div
      onClick={() => onOpen(deliverable)}
      style={{
        position: "relative",
        paddingBottom: "100%",
        cursor: "pointer",
        borderRadius: 8,
        overflow: "hidden",
        background: "var(--surface-2)",
        border: "1px solid var(--line)",
      }}
    >
      {/* Inner absolute fill */}
      <div
        style={{
          position: "absolute",
          inset: 0,
        }}
      >
        {deliverable.image_url ? (
          <img
            src={deliverable.image_url}
            alt={deliverable.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : (
          <TilePlaceholder deliverable={deliverable} />
        )}

        {/* Hover overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0)",
            transition: "background 0.15s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.background =
              "rgba(0,0,0,0.08)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.background =
              "rgba(0,0,0,0)";
          }}
        />

        {/* Platform pill — top right */}
        <div
          style={{
            position: "absolute",
            top: 6,
            right: 6,
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(4px)",
            borderRadius: 6,
            padding: "2px 7px",
            fontSize: 10,
            fontWeight: 600,
            color: "#fff",
            letterSpacing: "0.03em",
            pointerEvents: "none",
          }}
        >
          {platformLabel(deliverable.platform)}
        </div>

        {/* Status dot — bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: 6,
            left: 6,
            background: statusBg(deliverable.status),
            borderRadius: 20,
            padding: "3px 8px",
            display: "flex",
            alignItems: "center",
            gap: 4,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: statusColor(deliverable.status),
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: statusColor(deliverable.status),
              letterSpacing: "0.02em",
            }}
          >
            {statusLabel(deliverable.status)}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Modal ─────────────────────────────────────────────────────────────────────

interface ModalProps {
  deliverable: Deliverable;
  onClose: () => void;
  onApprove: (id: string) => void;
  onRequestChanges: (id: string, note: string) => void;
  isPending: boolean;
}

function DeliverableModal({
  deliverable,
  onClose,
  onApprove,
  onRequestChanges,
  isPending,
}: ModalProps) {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackNote, setFeedbackNote] = useState("");

  function handleApprove() {
    onApprove(deliverable.id);
  }

  function handleSendFeedback() {
    if (!feedbackNote.trim()) return;
    onRequestChanges(deliverable.id, feedbackNote.trim());
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 900,
          maxHeight: 600,
          background: "var(--surface)",
          borderRadius: 16,
          overflow: "hidden",
          display: "flex",
          boxShadow: "var(--shadow-3)",
          position: "relative",
        }}
      >
        {/* Left: image */}
        <div
          style={{
            width: "50%",
            flexShrink: 0,
            background: "var(--surface-2)",
            position: "relative",
          }}
        >
          {deliverable.image_url ? (
            <img
              src={deliverable.image_url}
              alt={deliverable.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                padding: 32,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  background: "var(--surface-3)",
                  display: "grid",
                  placeItems: "center",
                  border: "1px solid var(--line)",
                }}
              >
                <Icon name="megaphone" size={26} color="var(--ink-4)" />
              </div>
              <span
                style={{
                  fontSize: 13,
                  color: "var(--ink-4)",
                  textAlign: "center",
                  lineHeight: 1.4,
                }}
              >
                No image attached
              </span>
            </div>
          )}
        </div>

        {/* Right: details */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            padding: "28px 28px 24px",
            overflowY: "auto",
          }}
        >
          {/* Platform badge */}
          <div style={{ marginBottom: 14 }}>
            <Pill tone="neutral" size="sm">
              {platformLabel(deliverable.platform)}
            </Pill>
          </div>

          {/* Title */}
          <h2
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: "var(--ink)",
              margin: "0 0 10px",
              letterSpacing: "-0.02em",
              lineHeight: 1.3,
            }}
          >
            {deliverable.title}
          </h2>

          {/* Caption */}
          {deliverable.caption && (
            <p
              style={{
                fontSize: 13.5,
                color: "var(--ink-3)",
                lineHeight: 1.65,
                margin: "0 0 14px",
                flex: showFeedback ? "none" : "1 1 auto",
                overflowY: "auto",
              }}
            >
              {deliverable.caption}
            </p>
          )}

          {/* Scheduled date */}
          {deliverable.scheduled_date && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontSize: 12.5,
                color: "var(--ink-4)",
                marginBottom: 14,
              }}
            >
              <Icon name="target" size={13} color="var(--ink-4)" />
              Scheduled for {formatDate(deliverable.scheduled_date)}
            </div>
          )}

          {/* Current status */}
          <div style={{ marginBottom: 20 }}>
            <Pill tone={statusTone(deliverable.status)} size="sm">
              {statusLabel(deliverable.status)}
            </Pill>
          </div>

          {/* Action buttons */}
          {!showFeedback && (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Button
                variant="primary"
                size="sm"
                onClick={handleApprove}
                loading={isPending}
                style={{ background: "var(--ok)", borderColor: "var(--ok)" }}
              >
                Approve
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFeedback(true)}
              >
                Request changes
              </Button>
            </div>
          )}

          {/* Feedback form */}
          {showFeedback && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                marginTop: 4,
              }}
            >
              <label
                style={{
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: "var(--ink-3)",
                  letterSpacing: "0.01em",
                }}
              >
                Describe the changes needed
              </label>
              <textarea
                value={feedbackNote}
                onChange={(e) => setFeedbackNote(e.target.value)}
                placeholder="e.g. Please update the headline copy and swap the background colour…"
                rows={4}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  fontSize: 13.5,
                  color: "var(--ink)",
                  background: "var(--surface-2)",
                  border: "1px solid var(--line-strong)",
                  borderRadius: 8,
                  resize: "vertical",
                  fontFamily: "var(--font-sans)",
                  lineHeight: 1.55,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              <div style={{ display: "flex", gap: 8 }}>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSendFeedback}
                  loading={isPending}
                >
                  Send feedback
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowFeedback(false);
                    setFeedbackNote("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: "rgba(0,0,0,0.45)",
            border: "none",
            cursor: "pointer",
            display: "grid",
            placeItems: "center",
            color: "#fff",
            fontSize: 16,
            lineHeight: 1,
            backdropFilter: "blur(4px)",
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}

// ── Client component ──────────────────────────────────────────────────────────

interface DeliverablesClientProps {
  initialDeliverables: Deliverable[];
}

function DeliverablesClient({ initialDeliverables }: DeliverablesClientProps) {
  const [deliverables, setDeliverables] =
    useState<Deliverable[]>(initialDeliverables);
  const [selected, setSelected] = useState<Deliverable | null>(null);
  const [isPending, startTransition] = useTransition();

  function openModal(d: Deliverable) {
    setSelected(d);
  }

  function closeModal() {
    setSelected(null);
  }

  function handleApprove(id: string) {
    // Optimistic update
    setDeliverables((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, status: "approved", changes_note: null } : d
      )
    );
    if (selected?.id === id) {
      setSelected((prev) =>
        prev ? { ...prev, status: "approved", changes_note: null } : null
      );
    }
    startTransition(async () => {
      await updateDeliverableStatus(id, "approved");
      closeModal();
    });
  }

  function handleRequestChanges(id: string, note: string) {
    // Optimistic update
    setDeliverables((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, status: "changes_requested", changes_note: note }
          : d
      )
    );
    if (selected?.id === id) {
      setSelected((prev) =>
        prev
          ? { ...prev, status: "changes_requested", changes_note: note }
          : null
      );
    }
    startTransition(async () => {
      await updateDeliverableStatus(id, "changes_requested", note);
      closeModal();
    });
  }

  return (
    <div className="br-fade-up" style={{ padding: "32px 40px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
          marginBottom: 32,
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
          Deliverables
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
          Content
        </h1>
        <p style={{ fontSize: 14.5, color: "var(--ink-3)", margin: 0 }}>
          Review and approve your content pieces.
        </p>
      </div>

      {/* Empty state */}
      {deliverables.length === 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            padding: "72px 24px",
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
              No deliverables yet
            </div>
            <p
              style={{
                fontSize: 13.5,
                color: "var(--ink-4)",
                lineHeight: 1.6,
                margin: 0,
                maxWidth: 340,
              }}
            >
              Your content pieces will appear here once they&apos;ve been
              prepared for review.
            </p>
          </div>
        </div>
      ) : (
        /* Image grid */
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 4,
          }}
        >
          {deliverables.map((d) => (
            <DeliverableTile key={d.id} deliverable={d} onOpen={openModal} />
          ))}
        </div>
      )}

      {/* Modal */}
      {selected && (
        <DeliverableModal
          deliverable={selected}
          onClose={closeModal}
          onApprove={handleApprove}
          onRequestChanges={handleRequestChanges}
          isPending={isPending}
        />
      )}
    </div>
  );
}

// ── Server component wrapper (default export) ─────────────────────────────────

export default async function DeliverablesPage() {
  const deliverables = await getDeliverables();
  return <DeliverablesClient initialDeliverables={deliverables} />;
}
