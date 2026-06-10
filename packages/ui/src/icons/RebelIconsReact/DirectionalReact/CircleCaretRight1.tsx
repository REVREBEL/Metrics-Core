import type { SVGProps } from "react";

const SvgCircleCaretRight1 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    id="Layer_1"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 200"
    width="1em"
    height="1em"
    {...props}
  >
    <defs>
      <style>
        {
          ".cls-1 {\n        fill: #010101;\n      }\n\n      .cls-2 {\n        fill: #a7a9ac;\n        stroke: #fff;\n        stroke-miterlimit: 10;\n      }"
        }
      </style>
    </defs>
    <circle className="cls-1" cx="100" cy="100" r="97.5" />
    <path
      className="cls-2"
      d="M91.67,59.49l41.76,34.75h0c3.18,2.65,3.61,7.38.97,10.57-.3.36-.62.68-.97.97l-41.76,34.75h0c-3.19,2.65-7.92,2.22-10.57-.97-1.12-1.35-1.73-3.04-1.73-4.79v-69.51h0c0-4.14,3.36-7.5,7.5-7.49,1.75,0,3.44.62,4.79,1.73h.01Z"
    />
  </svg>
);

export default SvgCircleCaretRight1;
