import type { SVGProps } from "react";

const SvgMicrosoftEdgeColorCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    id="Layer_1"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 500 500"
    width="1em"
    height="1em"
    {...props}
  >
    <defs>
      <style>
        {
          ".cls-1 {\n        fill: url(#linear-gradient);\n      }\n\n      .cls-2 {\n        fill: #fff;\n      }"
        }
      </style>
      <linearGradient
        id="linear-gradient"
        x1="12.05"
        y1="253.79"
        x2="488.06"
        y2="253.79"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset=".19" stopColor="#163666" />
        <stop offset=".59" stopColor="#72cac5" />
        <stop offset="1" stopColor="#72cac5" />
      </linearGradient>
    </defs>
    <circle className="cls-1" cx="250.05" cy="253.79" r="238.01" />
    <path
      className="cls-2"
      d="M207.95,250.42c-1.38,28.27,13.95,52.56,33.94,70.44,42.23,33.19,97.82,40.05,146.05,15.98l8.57.86c2.39.24,3.03,7.18,2.58,10.05-17.17,27.51-40.6,47.25-69.17,62.08-70.24,34.04-154.1,18.26-206.99-38.53-66.29-71.18-61.58-181.36,11.19-246.32,67.22-60.01,171.27-60.06,239.35.12,24.35,21.52,40.66,48.98,48.07,80.52,9.81,41.72-12.01,82.48-52.58,96.47-37.41,12.9-86.59-.56-88.45-15.26-1.1-8.71,27.3-29.36,3.1-61.75-9.79-13.1-27.53-19.7-46.57-13.54-13.88,4.49-28.16,19.42-29.11,38.89Z"
    />
  </svg>
);

export default SvgMicrosoftEdgeColorCircle;
