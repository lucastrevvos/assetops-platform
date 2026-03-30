import { Meta, StoryObj } from "@storybook/react";
import { StatusBadge } from "./StatusBadge";

const meta: Meta<typeof StatusBadge> = {
  title: "Components/StatusBadge",
  component: StatusBadge,
};

export default meta;

type Story = StoryObj<typeof StatusBadge>;

export const Healthy: Story = {
  args: {
    status: "healthy",
  },
};

export const Warning: Story = {
  args: {
    status: "warning",
  },
};

export const Critical: Story = {
  args: {
    status: "critical",
  },
};
