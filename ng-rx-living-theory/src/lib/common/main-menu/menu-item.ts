export interface MenuItem {
  label: string;
  link: string;
}

export interface MenuGroup {
  label: string;
  link?: string;
  children?: MenuItem[];
}