import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Activity,
  ShieldAlert,
  RefreshCw,
  Server,
  Database,
  Waves,
} from "lucide-react";
import { useDashboardData } from "../hooks/useDashboardData";
import { formatDateTime } from "../utils/format";

function StatusBadge({
  status,
}: {
  status: "healthy" | "warning" | "critical";
}) {
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

function SeverityBadge({ severity }: { severity: "warning" | "critical" }) {
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

function KpiCard({
  title,
  value,
  hint,
  icon,
}: {
  title: string;
  value: string | number;
  hint: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500">{title}</span>
        <div className="rounded-2xl bg-slate-100 p-2 text-slate-700">
          {icon}
        </div>
      </div>

      <div className="text-3xl font-bold text-slate-900">{value}</div>
      <p className="mt-2 text-sm text-slate-500">{hint}</p>
    </div>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      </div>
      {children}
    </section>
  );
}

export default function App() {
  const { assets, alerts, isLoading, error, lastUpdated, refresh } =
    useDashboardData();
  const [alertFilter, setAlertFilter] = useState<
    "all" | "warning" | "critical"
  >("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const criticalAssets = assets.filter(
    (asset) => asset.status === "critical",
  ).length;
  const warningAssets = assets.filter(
    (asset) => asset.status === "warning",
  ).length;

  const filteredAlerts = useMemo(() => {
    if (alertFilter === "all") return alerts;
    return alerts.filter((alert) => alert.severity === alertFilter);
  }, [alerts, alertFilter]);

  async function handleRefresh() {
    try {
      setIsRefreshing(true);
      await refresh();
    } finally {
      setIsRefreshing(false);
    }
  }

  if (isLoading) {
    return (
      <main className="mx-auto min-h-screen max-w-7xl px-4 py-8 md:px-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-lg font-medium text-slate-900">
            Carregando dashboard...
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Buscando ativos e alertas da plataforma.
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto min-h-screen max-w-7xl px-4 py-8 md:px-6">
        <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 shadow-sm">
          <p className="text-lg font-semibold text-rose-700">
            Falha ao carregar dashboard
          </p>
          <p className="mt-2 text-sm text-rose-600">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-8 md:px-6">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
          <Server size={16} />
          <span>telemetry-api / query-api</span>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
          <Database size={16} />
          <span>PostgreSQL</span>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
          <Waves size={16} />
          <span>Kafka-compatible broker</span>
        </div>
      </div>

      <header className="mb-8 overflow-hidden rounded-[32px] bg-gradient-to-r from-slate-950 via-slate-900 to-blue-700 p-8 text-white shadow-xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">
              AssetOps Platform
            </p>
            <h1 className="mt-3 text-3xl font-bold md:text-5xl">
              Industrial Asset Monitoring Dashboard
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-200 md:text-base">
              Visão operacional de ativos monitorados, telemetria recebida,
              alertas processados de forma assíncrona e leitura orientada ao
              dashboard.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-sm text-slate-200">
                <RefreshCw size={16} />
                <span>Última atualização</span>
              </div>
              <strong className="mt-2 block text-base text-white">
                {lastUpdated ? formatDateTime(lastUpdated) : "-"}
              </strong>
            </div>

            <button
              onClick={handleRefresh}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              <RefreshCw
                size={16}
                className={isRefreshing ? "animate-spin" : ""}
              />
              Atualizar agora
            </button>
          </div>
        </div>
      </header>

      <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          title="Assets"
          value={assets.length}
          hint="Ativos com leitura recente"
          icon={<Activity size={18} />}
        />
        <KpiCard
          title="Alerts"
          value={alerts.length}
          hint="Alertas persistidos"
          icon={<AlertTriangle size={18} />}
        />
        <KpiCard
          title="Critical"
          value={criticalAssets}
          hint="Ativos em status crítico"
          icon={<ShieldAlert size={18} />}
        />
        <KpiCard
          title="Warning"
          value={warningAssets}
          hint="Ativos em atenção"
          icon={<AlertTriangle size={18} />}
        />
      </section>

      <div className="grid gap-8 xl:grid-cols-[1.2fr_1fr]">
        <Section
          title="Assets"
          subtitle="Read side com status agregado por ativo"
        >
          {assets.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-sm text-slate-500">
              Nenhum ativo encontrado.
            </div>
          ) : (
            <div className="grid gap-4">
              {assets.map((asset) => (
                <article
                  key={asset.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-slate-300"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {asset.name}
                      </h3>
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
              ))}
            </div>
          )}
        </Section>

        <Section
          title="Alerts"
          subtitle="Eventos processados pelo worker assíncrono"
        >
          <div className="mb-4 flex flex-wrap gap-2">
            {(["all", "warning", "critical"] as const).map((value) => (
              <button
                key={value}
                onClick={() => setAlertFilter(value)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  alertFilter === value
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {value}
              </button>
            ))}
          </div>

          {filteredAlerts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-sm text-slate-500">
              Nenhum alerta encontrado para o filtro selecionado.
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredAlerts.map((alert) => (
                <article
                  key={alert.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-slate-300"
                >
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
                      <p className="text-xs uppercase tracking-wide text-slate-400">
                        Type
                      </p>
                      <strong className="mt-2 block text-slate-900">
                        {alert.type}
                      </strong>
                    </div>

                    <div className="rounded-2xl bg-white p-4">
                      <p className="text-xs uppercase tracking-wide text-slate-400">
                        Message
                      </p>
                      <strong className="mt-2 block text-slate-900">
                        {alert.message}
                      </strong>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </Section>
      </div>
    </main>
  );
}
