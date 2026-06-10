import type { SVGProps } from "react";

const SvgHeartInner = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 400 400"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      fill="currentColor"
      d="M132.406 92.2c9.31.93 17.91 5.15 24.75 11.69 10.45 9.9 19.78 27.72 34.84 12.66 5.03-4.98 9.37-10.887 15.02-15.26 7.22-5.77 15.73-9.14 24.42-9.56 25.33-.74 41.53 17.27 42.66 42.08 4.26 57.65-39.16 94.58-81.25 126.76 -12.45 8.84-23.26 1.97-33.93-6.16 -40.83-29.57-67.1-61.93-73.105-113.459 -.31-6.15.3-12.15 1.82-17.56 5.56-21.274 23.786-33.72 44.54-31.25l.19.02Z"
    />
  </svg>
);

export default SvgHeartInner;
