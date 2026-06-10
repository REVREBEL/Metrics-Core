import type { SVGProps } from "react";

const SvgCircleCaretUp1 = (props: SVGProps<SVGSVGElement>) => (
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
          ".cls-1 {\n        fill: #010101;\n      }\n\n      .cls-2 {\n        fill: #a7a9ac;\n      }"
        }
      </style>
    </defs>
    <circle className="cls-1" cx="100" cy="100" r="97.5" />
    <path
      className="cls-2"
      d="M59.49,108.33l34.75-41.76h0c2.65-3.18,7.38-3.61,10.57-.97.36.3.68.62.97.97l34.75,41.76h0c2.65,3.19,2.22,7.92-.97,10.57-1.35,1.12-3.04,1.73-4.79,1.73h-69.51c-4.14,0-7.5-3.36-7.49-7.5,0-1.75.62-3.44,1.73-4.79h-.01Z"
    />
  </svg>
);

export default SvgCircleCaretUp1;
