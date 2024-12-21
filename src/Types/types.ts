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
    id: string
    name: string
    review: string
}

export interface sidebarProps {
  toggleSidebar: () => void;
  isOpen: boolean;
  imgUrl: string | null | undefined;
  email: string | null | undefined;
  fullName: string | null | undefined
}

export interface websitesProps {
  id: string,
  url: string,
  reviewLink: string,
  createdById: string
  name: string
  creatorFullName: string
}