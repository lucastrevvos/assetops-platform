import type { Meta, StoryObj } from "@storybook/react";
import { Activity } from "lucide-react";
import { KpiCard } from "./KpiCard";

const meta: Meta<typeof KpiCard> = {
  title: "Components/KpiCard",
  component: KpiCard,
};

export default meta;

type Story = StoryObj<typeof KpiCard>;

export const Default: Story = {
  args: {
    title: "Assets",
    value: 12,
    hint: "Ativos com leitura recente",
    icon: <Activity size={18} />,
  },
};

export const LargeValue: Story = {
  args: {
    title: "Alerts",
    value: 128,
    hint: "Alertas persistidos",
    icon: <Activity size={18} />,
  },
};
