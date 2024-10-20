import { classNames } from "@/common/functions/strings";
import { SVGAttributes } from "react";

type Props = SVGAttributes<SVGSVGElement>

export default function SettingsCog({ className, ...props }: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" strokeWidth={.5} {...props} className={classNames("icon clickable settings-cog", className)}>
      <path d="M19.14,12.94a7.36,7.36,0,0,0,0-1.88l2.09-1.64a.5.5,0,0,0,.12-.62l-2-3.46a.5.5,0,0,0-.61-.22L16.1,6.5a6.84,6.84,0,0,0-1.62-.94l-.31-2.49a.5.5,0,0,0-.5-.44H9.36a.5.5,0,0,0-.5.44l-.31,2.49a7.05,7.05,0,0,0-1.62.94L4.58,6.12a.5.5,0,0,0-.61.22l-2,3.46a.5.5,0,0,0,.12.62l2.09,1.64a7.53,7.53,0,0,0,0,1.88L2.1,14.58a.5.5,0,0,0-.12.62l2,3.46a.5.5,0,0,0,.61.22L7.9,17.5a6.84,6.84,0,0,0,1.62.94l.31,2.49a.5.5,0,0,0,.5.44h4.22a.5.5,0,0,0,.5-.44l.31-2.49a7.05,7.05,0,0,0,1.62-.94l2.09,1.64a.5.5,0,0,0,.61-.22l2-3.46a.5.5,0,0,0-.12-.62ZM12,15.5A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
    </svg>
  );
}