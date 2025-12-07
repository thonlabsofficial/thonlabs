'use client';

import { Metadata, MetadataValue } from '@/_interfaces/metadata';
import BoxKeyValue from './box-key-value';
import { Badge } from '@repo/ui/badge';
import React from 'react';

interface Props {
  metadataModels: Metadata[];
  metadataValues?: MetadataValue;
}

export default function MetadataValueDisplay({
  metadataModels,
  metadataValues,
}: Props) {
  const renderValue = (model: Metadata, value: any) => {
    if (value === '' || value === null || value === undefined) {
      return '-';
    }

    switch (model.type) {
      case 'String':
      case 'Number':
        return value;

      case 'Boolean':
        return (
          <Badge
            variant={value ? 'success' : 'destructive'}
            size={'sm'}
            className="cursor-text"
          >
            {value ? 'True' : 'False'}
          </Badge>
        );

      case 'JSON':
        return (
          <pre className="w-full text-xs bg-muted px-2 py-1 rounded max-w-full overflow-auto">
            {JSON.stringify(value, null, 2)}
          </pre>
        );

      case 'List':
        const option = model.options?.find((opt) => opt.value === value);
        return option?.label || value;

      default:
        return String(value);
    }
  };

  return metadataModels.map((model) => (
    <BoxKeyValue
      key={model.id}
      label={model.name}
      value={renderValue(model, metadataValues?.[model.key])}
    />
  ));
}
