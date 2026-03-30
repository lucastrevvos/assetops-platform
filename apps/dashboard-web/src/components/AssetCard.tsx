import { AssetView } from "@assetops/shared-types";
import { formatDateTime } from "../utils/format";
import { StatusBadge } from "./StatusBadge";

type AssetCardProps = {
  asset: AssetView;
};

export function AssetCard({ asset }: AssetCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-slate-300">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{asset.name}</h3>
          <p className="mt-1 text-sm text-slate-500">
            Última leitura em {formatDateTime(asset.lastReadingAt)}
          </p>
        </div>

        <StatusBadge status={asset.status} />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Temperature
          </p>
          <strong className="mt-2 block text-2xl text-slate-900">
            {asset.lastTemperature}
          </strong>
        </div>

        <div className="rounded-2xl bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Vibration
          </p>
          <strong className="mt-2 block text-2xl text-slate-900">
            {asset.lastVibration}
          </strong>
        </div>

        <div className="rounded-2xl bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Asset ID
          </p>
          <strong className="mt-2 block text-base text-slate-900">
            {asset.id}
          </strong>
        </div>
      </div>
    </article>
  );
}
