import type { SVGProps } from "react";

const SvgFiPhoto = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    width="1em"
    height="1em"
    {...props}
  >
    <g fill="currentColor">
      <path d="M93.19 18c0-2.47-2.01-4.48-4.48-4.48-.23 0-.45.03-.67.06v-.1H11.23v.02c-2.47 0-4.48 2-4.48 4.47v64.48h.05c.25 2.23 2.12 3.97 4.421 3.97v.02h76.8v-.1c.21.03.43.06.66.06 2.29 0 4.17-1.74 4.42-3.98h.07v-64.5h-.03Zm-9.93 58.54H72.39c-.04-.16-.1-.31-.17-.45l.01-.01-22.72-39.35h-.01a3.08 3.08 0 0 0-2.77-1.74c-1.26 0-2.33.74-2.81 1.82L28.8 62.99l-3.71-6.42h-.01a1.622 1.622 0 0 0-2.94.03l-5.46 9.45V23.43h66.53v53.05Z" />
      <path d="M68.12 28.48a10.1 10.1 0 1 0 0 20.2 10.1 10.1 0 1 0 0-20.2" />
    </g>
  </svg>
);
export default SvgFiPhoto;
