type KpiCardProps = {
  title: string;
  value: string | number;
  hint: string;
  icon: React.ReactNode;
};

export function KpiCard({ title, value, hint, icon }: KpiCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500">{title}</span>
        {icon ? (
          <div className="text-sm font-medium text-slate-500">{icon}</div>
        ) : null}
      </div>

      <div className="text-3xl font-bold text-slate-900">{value}</div>
      <p className="mt-2 text-sm text-slate-500">{hint}</p>
    </div>
  );
}
