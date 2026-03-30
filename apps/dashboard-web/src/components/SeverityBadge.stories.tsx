import type { Meta, StoryObj } from "@storybook/react";
import { SeverityBadge } from "./SeverityBadge";

const meta: Meta<typeof SeverityBadge> = {
  title: "Components/SeverityBadge",
  component: SeverityBadge,
};

export default meta;

type Story = StoryObj<typeof SeverityBadge>;

export const Warning: Story = {
  args: {
    severity: "warning",
  },
};

export const Critical: Story = {
  args: {
    severity: "critical",
  },
};
