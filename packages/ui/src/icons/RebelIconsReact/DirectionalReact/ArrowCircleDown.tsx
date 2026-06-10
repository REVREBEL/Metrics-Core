import type { SVGProps } from "react";

const SvgArrowCircleDown = (props: SVGProps<SVGSVGElement>) => (
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
      d="M58.46,112.25l38.57,53.91c.71.98,1.84,1.55,3.03,1.57h.01c1.21,0,2.34-.58,3.03-1.55l38.32-53.89c.81-1.12.92-2.62.28-3.86-.62-1.23-1.91-2.01-3.3-2.01h-18.03s.01-48.41.01-48.41c0-2.06-1.67-3.72-3.72-3.72h-33.36c-2.04.01-3.72,1.69-3.72,3.74v48.43s-18.03,0-18.03,0c-1.39,0-2.66.78-3.3,2.03s-.52,2.74.3,3.88l-.12-.1Z"
    />
  </svg>
);

export default SvgArrowCircleDown;
