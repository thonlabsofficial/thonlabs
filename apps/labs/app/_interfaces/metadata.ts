export type MetadataType = 'String' | 'Number' | 'Boolean' | 'JSON' | 'List';
export type MetadataContext = 'User' | 'Organization';

export interface MetadataOption {
  label: string;
  value: string;
}

export interface Metadata {
  id: string;
  name: string;
  key: string;
  description?: string;
  type: MetadataType;
  context: MetadataContext;
  options?: MetadataOption[];
  createdAt: string;
  updatedAt: string;
}
