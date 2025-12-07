export const METADATA_CONTEXT_OPTIONS = [
  // { label: 'Environment', value: 'Environment' }, // TODO: soon
  { label: 'User', value: 'User' },
  { label: 'Organization', value: 'Organization' },
] as const;

export const METADATA_TYPE_OPTIONS = [
  { label: 'String', value: 'String' },
  { label: 'Number', value: 'Number' },
  { label: 'Boolean', value: 'Boolean' },
  { label: 'JSON', value: 'JSON' },
  { label: 'List', value: 'List' },
] as const;
