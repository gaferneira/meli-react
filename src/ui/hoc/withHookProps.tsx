import { ComponentType } from "react";

type HookImpl = (props: any) => any;

type ComponentWithHookProps<P> = {
  hookProps?: P;
};

function withHookProps<
  Hook extends HookImpl,
  Component extends ComponentType<ReturnType<Hook>> = ComponentType<
    ReturnType<Hook>
  >,
  HookProps = {},
  AdditionalProps = {}
>(hook: Hook, WrappedComponent: Component, displayName?: string) {
  const ComponentWithHook = ({
    hookProps,
    ...rest
  }: ComponentWithHookProps<HookProps> & AdditionalProps) => (
    <WrappedComponent {...hook(hookProps)} {...rest} />
  );

  ComponentWithHook.displayName = displayName ?? WrappedComponent.displayName;

  return ComponentWithHook;
}

export default withHookProps;