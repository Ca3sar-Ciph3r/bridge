import { getBrandAssets } from "@/lib/actions/portal";
import { Icon } from "@/components/ui/Icon";
import type { BrandAsset } from "@/lib/types";

// ── Helpers ───────────────────────────────────────────────────────────────────

type AssetType = BrandAsset["type"];

const TYPE_ORDER: AssetType[] = [
  "logo",
  "color",
  "font",
  "image",
  "guideline",
  "document",
  "other",
];

const TYPE_LABELS: Record<AssetType, string> = {
  logo: "Logos",
  color: "Colours",
  font: "Fonts",
  image: "Images",
  guideline: "Guidelines",
  document: "Documents",
  other: "Other",
};

// ── Sub-components ────────────────────────────────────────────────────────────

// Color swatch

function ColorSwatch({ asset }: { asset: BrandAsset }) {
  const hex =
    typeof asset.metadata?.hex === "string" ? asset.metadata.hex : null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 8,
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 10,
          background: hex ?? "var(--surface-3)",
          border: "1px solid var(--line)",
          boxShadow: "var(--shadow-1)",
          flexShrink: 0,
        }}
      />
      <div
        style={{
          fontSize: 12.5,
          fontWeight: 500,
          color: "var(--ink-2)",
          letterSpacing: "-0.01em",
          lineHeight: 1.3,
        }}
      >
        {asset.name}
      </div>
      {hex && (
        <div
          style={{
            fontSize: 11,
            color: "var(--ink-4)",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.04em",
          }}
        >
          {hex.toUpperCase()}
        </div>
      )}
    </div>
  );
}

// Logo / image tile

function ImageTile({ asset }: { asset: BrandAsset }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div
        style={{
          width: "100%",
          paddingBottom: "75%",
          position: "relative",
          borderRadius: 10,
          overflow: "hidden",
          background: "var(--surface-2)",
          border: "1px solid var(--line)",
          boxShadow: "var(--shadow-1)",
        }}
      >
        <div style={{ position: "absolute", inset: 0 }}>
          {asset.thumbnail_url ? (
            <img
              src={asset.thumbnail_url}
              alt={asset.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                padding: 12,
                boxSizing: "border-box",
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
                gap: 8,
              }}
            >
              <Icon name="file" size={24} color="var(--ink-4)" />
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          fontSize: 12.5,
          fontWeight: 500,
          color: "var(--ink-2)",
          letterSpacing: "-0.01em",
          lineHeight: 1.35,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {asset.name}
      </div>
      {asset.file_url && (
        <a
          href={asset.file_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: 11.5,
            color: "var(--accent)",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          Download
        </a>
      )}
    </div>
  );
}

// Font card

function FontCard({ asset }: { asset: BrandAsset }) {
  return (
    <div
      style={{
        padding: "16px 18px",
        background: "var(--surface)",
        border: "1px solid var(--line)",
        borderRadius: 12,
        boxShadow: "var(--shadow-1)",
        display: "flex",
        alignItems: "center",
        gap: 14,
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: "var(--accent-soft)",
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
          border: "1px solid var(--accent-soft-2)",
        }}
      >
        <span
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "var(--accent)",
            fontFamily: "var(--font-sans)",
            lineHeight: 1,
          }}
        >
          Aa
        </span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "var(--ink)",
            letterSpacing: "-0.01em",
            marginBottom: 3,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {asset.name}
        </div>
        {!!asset.metadata?.weight && (
          <div
            style={{ fontSize: 12, color: "var(--ink-4)" }}
          >
            {String(asset.metadata.weight)}
          </div>
        )}
      </div>
      {asset.file_url && (
        <a
          href={asset.file_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: 12.5,
            color: "var(--accent)",
            textDecoration: "none",
            fontWeight: 500,
            flexShrink: 0,
          }}
        >
          Download
        </a>
      )}
    </div>
  );
}

// Document / guideline card

function DocumentCard({ asset }: { asset: BrandAsset }) {
  const iconName = asset.type === "guideline" ? "folder" : "file";

  return (
    <div
      style={{
        padding: "16px 18px",
        background: "var(--surface)",
        border: "1px solid var(--line)",
        borderRadius: 12,
        boxShadow: "var(--shadow-1)",
        display: "flex",
        alignItems: "center",
        gap: 14,
      }}
    >
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: 9,
          background: "var(--surface-2)",
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
          border: "1px solid var(--line)",
        }}
      >
        <Icon name={iconName} size={18} color="var(--ink-3)" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "var(--ink)",
            letterSpacing: "-0.01em",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {asset.name}
        </div>
      </div>
      {asset.file_url && (
        <a
          href={asset.file_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: 12.5,
            color: "var(--accent)",
            textDecoration: "none",
            fontWeight: 500,
            flexShrink: 0,
          }}
        >
          Download
        </a>
      )}
    </div>
  );
}

// Group section

interface GroupSectionProps {
  type: AssetType;
  assets: BrandAsset[];
}

function GroupSection({ type, assets }: GroupSectionProps) {
  return (
    <div style={{ marginBottom: 40 }}>
      {/* Section label */}
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "var(--ink-2)",
          letterSpacing: "-0.01em",
          marginBottom: 14,
          paddingBottom: 10,
          borderBottom: "1px solid var(--line)",
        }}
      >
        {TYPE_LABELS[type]}
      </div>

      {/* Color swatches: flex wrap */}
      {type === "color" && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          {assets.map((asset) => (
            <ColorSwatch key={asset.id} asset={asset} />
          ))}
        </div>
      )}

      {/* Logo / image: responsive grid */}
      {(type === "logo" || type === "image") && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: 16,
          }}
        >
          {assets.map((asset) => (
            <ImageTile key={asset.id} asset={asset} />
          ))}
        </div>
      )}

      {/* Font: list of cards */}
      {type === "font" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {assets.map((asset) => (
            <FontCard key={asset.id} asset={asset} />
          ))}
        </div>
      )}

      {/* Guideline / document: list of cards */}
      {(type === "guideline" || type === "document" || type === "other") && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {assets.map((asset) => (
            <DocumentCard key={asset.id} asset={asset} />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function BrandPage() {
  const assets = await getBrandAssets();

  // Group by type
  const grouped = new Map<AssetType, BrandAsset[]>();
  for (const asset of assets) {
    const list = grouped.get(asset.type) ?? [];
    list.push(asset);
    grouped.set(asset.type, list);
  }

  // Only include types that have items, in defined order
  const activeTypes = TYPE_ORDER.filter((t) => (grouped.get(t)?.length ?? 0) > 0);

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
          Brand Assets
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
          Your brand
        </h1>
        <p style={{ fontSize: 14.5, color: "var(--ink-3)", margin: 0 }}>
          Logos, fonts, colours, and brand files.
        </p>
      </div>

      {/* Full empty state */}
      {assets.length === 0 ? (
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
            <Icon name="star" size={22} color="var(--ink-4)" />
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
              No brand assets yet
            </div>
            <p
              style={{
                fontSize: 13.5,
                color: "var(--ink-4)",
                lineHeight: 1.6,
                margin: 0,
                maxWidth: 380,
              }}
            >
              Your brand assets will appear here once they&apos;ve been set up.
            </p>
          </div>
        </div>
      ) : (
        <div>
          {activeTypes.map((type) => (
            <GroupSection
              key={type}
              type={type}
              assets={grouped.get(type) ?? []}
            />
          ))}
        </div>
      )}
    </div>
  );
}
