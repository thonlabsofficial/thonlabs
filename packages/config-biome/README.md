# `@repo/biome-config`

Collection of internal biome configurations for linting and formatting.

This package provides shared biome configuration that extends the root workspace configuration.

## Usage

Install the package and extend from the biome configuration:

```json
{
  "$schema": "https://biomejs.dev/schemas/2.1.2/schema.json",
  "extends": ["@repo/biome-config/biome.json"]
}
```
