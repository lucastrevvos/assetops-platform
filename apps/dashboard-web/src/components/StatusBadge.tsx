type StatusBadgeProps = {
  status: "healthy" | "warning" | "critical";
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    healthy: "bg-emerald-100 text-emerald-700 border-emerald-200",
    warning: "bg-amber-100 text-amber-700 border-amber-200",
    critical: "bg-rose-100 text-rose-700 border-rose-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${styles[status]}`}
    >
      {status}
    </span>
  );
}
