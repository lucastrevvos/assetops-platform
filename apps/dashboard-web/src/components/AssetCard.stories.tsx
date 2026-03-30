import type { Meta, StoryObj } from "@storybook/react";
import { AssetCard } from "./AssetCard";

const meta: Meta<typeof AssetCard> = {
  title: "Components/AssetCard",
  component: AssetCard,
};

export default meta;

type Story = StoryObj<typeof AssetCard>;

export const Healthy: Story = {
  args: {
    asset: {
      id: "motor-01",
      name: "motor-01",
      status: "healthy",
      lastTemperature: 62,
      lastVibration: 4.2,
      lastReadingAt: "2026-03-30T12:00:00Z",
    },
  },
};

export const Warning: Story = {
  args: {
    asset: {
      id: "motor-02",
      name: "motor-02",
      status: "warning",
      lastTemperature: 78,
      lastVibration: 11.1,
      lastReadingAt: "2026-03-30T12:05:00Z",
    },
  },
};

export const Critical: Story = {
  args: {
    asset: {
      id: "motor-03",
      name: "motor-03",
      status: "critical",
      lastTemperature: 97,
      lastVibration: 8.7,
      lastReadingAt: "2026-03-30T12:10:00Z",
    },
  },
};
