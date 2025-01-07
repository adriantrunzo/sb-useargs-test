import {ComponentPropsWithoutRef} from "react"

type ComponentProps = ComponentPropsWithoutRef<"input">;
export const Component = (props: ComponentProps) => <input {...props} />
