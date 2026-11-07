// NavigationLink.tsx
import { useNavigate, type NavigateOptions } from "react-router-dom";
import type { MouseEvent, ReactNode, CSSProperties, ElementType } from "react";

export interface NavigationLinkProps {
  to: string;
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  replace?: boolean;
  state?: NavigateOptions["state"];
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
}

const NavigationLink = ({
  to,
  children,
  as: Component = "div",
  className,
  style,
  replace = false,
  state = null,
  onClick,
  disabled = false,
  ...rest
}: NavigationLinkProps & Record<string, unknown>) => {
  const navigate = useNavigate();

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    onClick?.(e);

    // Respect preventDefault from custom onClick
    if (e.defaultPrevented || disabled) return;

    e.preventDefault();
    navigate(to, { replace, state });
  };

  return (
    <Component
      onClick={handleClick}
      className={className}
      style={{
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        ...style,
      }}
      role="link"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default NavigationLink;
