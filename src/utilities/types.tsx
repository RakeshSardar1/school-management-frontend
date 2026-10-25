// Overview

import type { ElementType } from "react";

export interface SidebarItem {
  id: string;
  label: string;
  icon: ElementType;
  badge?: string;
  subItems?: string[];
}

export interface Metric {
  id: number;
  headText: string;
  fraction: [number, number, string];
  statusRing: boolean;
  ringColor?: string;
}
