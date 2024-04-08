import type { ComponentType } from 'react';

/**
 * Generic type is unused and specified to avoid type errors.
 * Some components may be React-internal symbols, e.g. Symbol(react.suspense).
 */
export function getDisplayName<P>(Component: ComponentType<P>): string {
  return (
    Component.displayName ??
    Component.name ??
    (Component as unknown as symbol).description ??
    'Unknown'
  );
}
