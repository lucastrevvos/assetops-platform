type SeverityBadgeProps = {
  severity: "warning" | "critical";
};

export function SeverityBadge({ severity }: SeverityBadgeProps) {
  const styles = {
    warning: "bg-amber-100 text-amber-700 border-amber-200",
    critical: "bg-rose-100 text-rose-700 border-rose-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${styles[severity]}`}
    >
      {severity}
    </span>
  );
}
