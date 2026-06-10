import type { SVGProps } from "react";

const SvgLockCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 18 18"
    {...props}
  >
    <g fillRule="evenodd">
      <path d="M8.836 5.298a1.5 1.5 0 0 0-1.499 1.498v.993h2.998v-.993a1.5 1.5 0 0 0-1.5-1.498" />
      <path d="M12.436 13.188h-7.2v-5.4h.93v-.992a2.673 2.673 0 0 1 2.67-2.669 2.673 2.673 0 0 1 2.67 2.669v.992h.93zM8.836.45a8.385 8.385 0 1 0 0 16.77 8.385 8.385 0 0 0 0-16.77" />
    </g>
  </svg>
);
export default SvgLockCircle;
