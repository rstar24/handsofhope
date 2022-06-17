import type { ReactNode } from "react";

/**
 * `ReactChildren` type is used as a placeholder for
 * `{ children: ReactNode[] }` shape type.
 * @example
 * ```tsx
 * const Layout = (props: ReactChildren) => {
 *   return (
 *     <div>
 *       Header
 *       {props.children}
 *       Footer
 *     </div>
 *   );
 * }
 * ```
 */
export interface ReactChildren {
  children?: ReactNode | ReactNode[];
}
