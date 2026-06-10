import type { SVGProps } from "react";

const SvgFacebook = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 18 18"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M10.665 17.909C14.84 17.125 18 13.449 18 9.03 18 4.043 13.97 0 9 0S0 4.043 0 9.031C0 13.655 3.464 17.47 7.93 18v-6.476H5.642V8.867H7.93v-1.96c0-2.274 1.386-3.513 3.407-3.513.968 0 1.8.072 2.044.104v2.377h-1.402c-1.1 0-1.313.526-1.313 1.295v1.697h2.622l-.341 2.657h-2.281z"
    />
  </svg>
);
export default SvgFacebook;
