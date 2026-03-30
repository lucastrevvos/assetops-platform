import { AlertView } from "@assetops/shared-types";
import { formatDateTime } from "../utils/format";
import { SeverityBadge } from "./SeverityBadge";

type AlertCardProps = {
  alert: AlertView;
};

export function AlertCard({ alert }: AlertCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-slate-300">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            {alert.assetId}
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            {formatDateTime(alert.createdAt)}
          </p>
        </div>

        <SeverityBadge severity={alert.severity} />
      </div>

      <div className="mt-5 grid gap-3">
        <div className="rounded-2xl bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">Type</p>
          <strong className="mt-2 block text-slate-900">{alert.type}</strong>
        </div>

        <div className="rounded-2xl bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Message
          </p>
          <strong className="mt-2 block text-slate-900">{alert.message}</strong>
        </div>
      </div>
    </article>
  );
}
