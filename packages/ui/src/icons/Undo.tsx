import type { SVGProps } from "react";

const SvgUndo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 18 18"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M10.691 6.182a1 1 0 0 0-.106-.008H8.292V4L4 6.888l4.292 2.887V7.674h2.227c.313.064 1.705.461 1.705 2.442 0 1.995-1.398 2.426-1.712 2.498H5.205v1.5h5.38q.06 0 .12-.01c1.044-.17 3.019-1.222 3.019-3.988 0-2.772-1.985-3.786-3.033-3.934"
    />
  </svg>
);
export default SvgUndo;
