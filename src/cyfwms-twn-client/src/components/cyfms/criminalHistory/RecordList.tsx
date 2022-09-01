import Record from "./Record";
import type { Record as RecordT } from "../../../features/cyfms/criminalHistory/slice";
import type { ReactElement } from "react";

/**
 * RecordList for criminal history.
 * @example
 * ```jsx
 * <RecordList list={} />
 * ```
 */
const RecordList = (props: AppRecordListProps<RecordT>): ReactElement => {
  return (
    <>
      {props.list.map((record, index) => (
        <Record key={100 + index} record={record} number={index + 1} />
      ))}
    </>
  );
};

export default RecordList;
