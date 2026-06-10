import type { SVGProps } from "react";

const SvgCheckmark = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 18 18"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="m9.234 13.568-1.403 1.404a1 1 0 0 1-1.404 0l-1.403-1.404-3.736-3.735a1.003 1.003 0 0 1 0-1.403l1.404-1.404a.994.994 0 0 1 1.403 0l3.033 3.044L13.9 3.29c.187-.185.444-.29.703-.29.257 0 .516.105.7.29l1.404 1.403a1.003 1.003 0 0 1 0 1.403z"
    />
  </svg>
);
export default SvgCheckmark;
