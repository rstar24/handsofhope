import { createContext } from "react";

/**
 * State of `Selection`.
 */
export interface State {
  /**
   * Stores the current selected attachment index from the
   * list shown on `/attachments` to later `/view`, `/edit`
   * and `/delete` it.
   */
  selected: number;
}

export type TabContextState = State;

/**
 * `/attachments` route context.
 * Used on:
 * 1. `cg/attachments/*`
 * 2. `cpa/attachments/*`
 * among their sub-routes.
 */
const SelectionContext = createContext<State>({ selected: 0 });

export default SelectionContext;
