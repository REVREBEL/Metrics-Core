export type ComponentPropMeta = {
  name: string;
  type: string;
  required?: boolean;
  defaultValue?: string;
  description?: string;
};

export type ComponentMetadata = {
  displayName?: string;
  description?: string;
  props?: ComponentPropMeta[];
};
