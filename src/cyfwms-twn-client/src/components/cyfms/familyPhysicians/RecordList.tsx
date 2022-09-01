import Record from "./Record";
import type { Record as RecordT } from "../../../features/cyfms/familyPhysicians/slice";
import type { ReactElement } from "react";

/**
 * RecordList for family physicians.
 * @example
 * ```jsx
 * <RecordList list={} />
 * ```
 */
const RecordList = (props: AppRecordListProps<RecordT>): ReactElement => {
  return (
    <>
      {props.list.map((record, index) => (
        <Record key={Math.random()} record={record} number={index + 1} />
      ))}
    </>
  );
};

export default RecordList;
