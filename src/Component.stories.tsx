import { Component } from "./Component";
import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { ComponentPropsWithoutRef, useRef } from "react";
import { expect, userEvent, within } from "@storybook/test";

type ComponentMeta = Meta<typeof Component>;
type ComponentProps = ComponentPropsWithoutRef<typeof Component>;
type ComponentStory = StoryObj<typeof Component>;

const meta: ComponentMeta = {
  component: Component,
};

export default meta;

export const Bug: ComponentStory = {
  args: { value: "" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const inputElement = canvas.getByRole("textbox");

    expect(inputElement).toBeVisible();

    await userEvent.clear(inputElement);
    await userEvent.type(inputElement, "1");

    expect(inputElement).toHaveAttribute("data-value", "1");
  },
  render: () => {
    const renderCountRef = useRef(1);
    const [args, setArgs] = useArgs<ComponentProps>();

    console.log(
      `Render #${renderCountRef.current++}, value is "${args.value}"`,
    );

    return (
      <Component
        {...args}
        data-value={args.value}
        onChange={(event) => {
          setArgs({ value: event.target.value });
        }}
      />
    );
  },
};
