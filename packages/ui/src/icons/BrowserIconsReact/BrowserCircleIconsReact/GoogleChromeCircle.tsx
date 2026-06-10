import type { SVGProps } from "react";

const SvgGoogleChromeCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    id="Layer_1"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 500 500"
    width="1em"
    height="1em"
    {...props}
  >
    <defs>
      <style>
        {
          ".cls-1 {\n        fill: #231f20;\n      }\n\n      .cls-2 {\n        fill: #fff;\n      }"
        }
      </style>
    </defs>
    <circle className="cls-1" cx="250" cy="250" r="238.01" />
    <g>
      <path
        className="cls-2"
        d="M243.2,170.81c-37.6.23-64.01,31.42-72.62,65.73l-48.87-86.01c34.69-43.29,86.94-66.65,142.41-61.79,50.96,4.46,100.21,33.43,126.92,81.15l-147.85.92Z"
      />
      <path
        className="cls-2"
        d="M278.18,325.32l-48.88,85.14c-53.94-7.05-100.47-39.85-124.94-88.36-24.39-48.35-22.19-107.24,5.99-154.28l67.39,117.91c18.57,36.74,58.68,53.03,100.44,39.6Z"
      />
      <path
        className="cls-2"
        d="M390.08,332.81c-30.53,49.29-82.57,79-140.57,79.08l68.06-117.08c21.42-35.72,16.22-77.78-16.56-106.1l99.04-.48c18.99,47.2,16.63,99.49-9.97,144.59Z"
      />
      <circle className="cls-2" cx="250.02" cy="250.27" r="60.8" />
    </g>
  </svg>
);

export default SvgGoogleChromeCircle;
