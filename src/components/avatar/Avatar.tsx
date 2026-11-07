import { useState } from "react";

interface AvatarProps {
  src: string | undefined;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  fallbackText?: string;
}

const Avatar = ({
  src = "https://images.unsplash.com/vector-1740737650825-1ce4f5377085?q=20&w=100&auto=format&fit=crop",
  alt = "Avatar",
  size = "md",
  className = "",
  fallbackText = "?",
}: AvatarProps) => {
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-16 h-16 text-lg",
    xl: "w-24 h-24 text-2xl",
  };

  if (hasError) {
    return (
      <div
        className={`${sizeClasses[size]} rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold shrink-0 ${className}`}
      >
        {fallbackText}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className={`${sizeClasses[size]} rounded-full object-cover shrink-0 ${className}`}
    />
  );
};

export default Avatar;
