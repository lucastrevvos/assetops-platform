import type { Meta, StoryObj } from "@storybook/react";
import { AlertCard } from "./AlertCard";

const meta: Meta<typeof AlertCard> = {
  title: "Components/AlertCard",
  component: AlertCard,
};

export default meta;

type Story = StoryObj<typeof AlertCard>;

export const Warning: Story = {
  args: {
    alert: {
      id: "alert-01",
      assetId: "motor-02",
      type: "vibration",
      severity: "warning",
      message: "Vibration above warning threshold",
      createdAt: "2026-03-30T12:05:00Z",
    },
  },
};

export const Critical: Story = {
  args: {
    alert: {
      id: "alert-02",
      assetId: "motor-03",
      type: "temperature",
      severity: "critical",
      message: "Temperature above critical threshold",
      createdAt: "2026-03-30T12:10:00Z",
    },
  },
};
