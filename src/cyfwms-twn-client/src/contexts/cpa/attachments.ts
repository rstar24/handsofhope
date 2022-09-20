import { signal } from "@preact/signals-react";

/**
 * Stores the current selected attachment index from the
 * list shown on `/cpa/attachments` to later `/view`, `/edit`
 * and `/delete` it.
 */
export const selected = signal<number>(0);
