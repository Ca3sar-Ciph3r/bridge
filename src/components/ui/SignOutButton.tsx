"use client";

export function SignOutButton({ style, children }: { style?: React.CSSProperties; children: React.ReactNode }) {
  return (
    <form action="/auth/signout" method="POST" style={{ display: "contents" }}>
      <button type="submit" style={{ background: "none", border: "none", cursor: "pointer", padding: 0, ...style }}>
        {children}
      </button>
    </form>
  );
}
