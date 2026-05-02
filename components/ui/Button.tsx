"use client";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button id="button" onClick={onClick}>
      {children}
    </button>
  );
}
