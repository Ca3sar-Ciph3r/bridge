"use client";

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

export function Icon({ name, size = 18, color = "currentColor", strokeWidth = 1.6, className }: IconProps) {
  const common = {
    width: size, height: size, viewBox: "0 0 24 24", fill: "none",
    stroke: color, strokeWidth, strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
    className,
    style: { flexShrink: 0 },
  };

  const paths: Record<string, React.ReactNode> = {
    arrow_right: <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="13 6 19 12 13 18"/></>,
    arrow_left:  <><line x1="19" y1="12" x2="5" y2="12"/><polyline points="11 6 5 12 11 18"/></>,
    check:       <polyline points="5 12.5 10 17.5 19 7.5"/>,
    sparkle:     <><path d="M12 3 13.6 9.2 19.8 10.8 13.6 12.4 12 18.6 10.4 12.4 4.2 10.8 10.4 9.2 Z"/><path d="M19 4 19.6 6 21.6 6.6 19.6 7.2 19 9.2 18.4 7.2 16.4 6.6 18.4 6 Z"/></>,
    lock:        <><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></>,
    mail:        <><rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="3 7 12 13 21 7"/></>,
    globe:       <><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></>,
    map:         <><polygon points="3 6 9 4 15 6 21 4 21 18 15 20 9 18 3 20"/><line x1="9" y1="4" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="20"/></>,
    building:    <><rect x="5" y="3" width="14" height="18" rx="1"/><line x1="9" y1="7" x2="9" y2="7.01"/><line x1="13" y1="7" x2="13" y2="7.01"/><line x1="9" y1="11" x2="9" y2="11.01"/><line x1="13" y1="11" x2="13" y2="11.01"/><line x1="9" y1="15" x2="9" y2="15.01"/><line x1="13" y1="15" x2="13" y2="15.01"/></>,
    users:       <><circle cx="9" cy="9" r="3.5"/><path d="M3 19c.6-3 3-5 6-5s5.4 2 6 5"/><circle cx="17" cy="8" r="2.5"/><path d="M16 14c2.5 0 4.5 1.6 5 4"/></>,
    target:      <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/></>,
    layers:      <><polygon points="12 3 21 8 12 13 3 8"/><polyline points="3 13 12 18 21 13"/><polyline points="3 18 12 22 21 18" opacity=".55"/></>,
    upload:      <><path d="M12 16V4"/><polyline points="6 9 12 4 18 9"/><path d="M5 17v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2"/></>,
    folder:      <><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/></>,
    image:       <><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="1.5"/><path d="m3 17 5-4 4 3 3-2 6 4"/></>,
    file:        <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><polyline points="14 3 14 8 19 8"/></>,
    monitor:     <><rect x="3" y="4" width="18" height="13" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></>,
    megaphone:   <><path d="M3 11v2l9 4V7Z"/><path d="M12 7l7-3v16l-7-3"/><path d="M6 15a3 3 0 0 0 5 2"/></>,
    search:      <><circle cx="11" cy="11" r="6"/><line x1="20" y1="20" x2="15.5" y2="15.5"/></>,
    brush:       <><path d="M14 3l7 7-9 9c-1.5 1.5-4 1.5-5.5 0L4 16c-1.5-1.5-1.5-4 0-5.5Z"/><line x1="9" y1="14" x2="14" y2="9"/></>,
    pen:         <><path d="M3 21h6l11-11-6-6L3 15Z"/><line x1="14" y1="6" x2="18" y2="10"/></>,
    bolt:        <polygon points="13 3 4 14 11 14 10 21 20 10 13 10"/>,
    plus:        <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    x:           <><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></>,
    chevron_down:<polyline points="6 9 12 15 18 9"/>,
    chevron_right:<polyline points="9 6 15 12 9 18"/>,
    info:        <><circle cx="12" cy="12" r="9"/><line x1="12" y1="11" x2="12" y2="16"/><line x1="12" y1="8" x2="12" y2="8.01"/></>,
    alert:       <><path d="M12 3 2 21h20Z"/><line x1="12" y1="10" x2="12" y2="15"/><line x1="12" y1="18" x2="12" y2="18.01"/></>,
    drag:        <><circle cx="9" cy="6" r="1" fill="currentColor"/><circle cx="9" cy="12" r="1" fill="currentColor"/><circle cx="9" cy="18" r="1" fill="currentColor"/><circle cx="15" cy="6" r="1" fill="currentColor"/><circle cx="15" cy="12" r="1" fill="currentColor"/><circle cx="15" cy="18" r="1" fill="currentColor"/></>,
    save:        <><path d="M5 5a2 2 0 0 1 2-2h10l4 4v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2Z"/><polyline points="7 3 7 9 15 9 15 3"/><rect x="8" y="13" width="8" height="6"/></>,
    sliders:     <><line x1="4" y1="7" x2="20" y2="7"/><circle cx="9" cy="7" r="2" fill="white"/><line x1="4" y1="17" x2="20" y2="17"/><circle cx="15" cy="17" r="2" fill="white"/></>,
    star:        <polygon points="12 3 14.5 9 21 9.8 16 14 17.5 20.5 12 17 6.5 20.5 8 14 3 9.8 9.5 9"/>,
    loader:      <><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></>,
  };

  return <svg {...common}>{paths[name] || null}</svg>;
}
