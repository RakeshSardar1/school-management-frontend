import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

interface OutsideClickProps {
  children: ReactNode;
  onOutsideClick: () => void;
  enabled?: boolean;
  className?: string;
}

const OutsideClick = ({
  children,
  onOutsideClick,
  enabled = true,
  className,
}: OutsideClickProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        onOutsideClick();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown, true);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, true);
    };
  }, [enabled, onOutsideClick]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export default OutsideClick;
