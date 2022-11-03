import { createContext, useState } from "react";
import type { FC, PropsWithChildren } from "react";

/**
 * `AttachmentsContextState` is the state of `AttachmentsContext`.
 */
export interface AttachmentsContextState {
  /**
   * Stores the current selected attachment index from the
   * list shown on `/attachments` to later `/view`, `/edit`
   * and `/delete` it.
   */
  selected: number;
  /**
   * Sets the current selected attachment index from the
   * list shown on `/attachments` to later `/view`, `/edit`
   * and `/delete` it.
   * @returns void
   */
  setSelected: any;
}

/**
 * `AttachmentsContext` is used by `/attachments` route and its sub \
 * routes: `/view`, `/edit` and `/delete` to share a common state.
 */
const AttachmentsContext = createContext<AttachmentsContextState>({
  selected: -1,
  setSelected: null,
});

/**
 * `AttachmentsContextProvider` is specialized utlity component \
 * which provides dynamic behaviour to it.
 * @example
 * ```jsx
 * <AttachmentsContextProvider>
 *   ...
 * </AttachmentsContextProvider>
 * ```
 * @param props
 * @returns `ReactElement`
 */
export const AttachmentsContextProvider: FC<PropsWithChildren> = (props) => {
  const [selected, setSelected] = useState<number>(-1);
  return (
    <AttachmentsContext.Provider
      value={{ selected: selected, setSelected: setSelected }}
    >
      {props.children}
    </AttachmentsContext.Provider>
  );
};

export default AttachmentsContext;
