import { ReactNode } from "react";

export interface ChildrenType {
  children: ReactNode;
}

export interface menuItemsProps {
  title: string;
  href: string;
}

export interface DotPatternBackgroundProps {
  dotSize?: number;
  dotColor?: string;
  backgroundColor?: string;
  gap?: number;
  maskColor?: string;
  className?: string;
  style?: React.CSSProperties;
  fade?: boolean;
  [key: string]: any;
}

export interface itemsProps {
    
}