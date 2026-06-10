import type { SVGProps } from "react";

const SvgRecord = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      fill="#231F20"
      d="M50 12.908c-20.485 0-37.092 16.606-37.092 37.092 0 20.485 16.606 37.092 37.092 37.092 20.485 0 37.092-16.606 37.092-37.092C87.092 29.515 70.485 12.908 50 12.908Zm0 49.283c-6.733 0-12.191-5.458-12.191-12.191 0-6.733 5.458-12.191 12.191-12.191 6.733 0 12.191 5.458 12.191 12.191 0 6.733-5.458 12.191-12.191 12.191Z"
    />
  </svg>
);

export default SvgRecord;
