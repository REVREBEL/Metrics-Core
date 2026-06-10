import type { SVGProps } from "react";

const SvgArrowRight = (props: SVGProps<SVGSVGElement>) => (
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
      <style>{".cls-1 {\n        fill: #010101;\n      }"}</style>
    </defs>
    <path
      className="cls-1"
      d="M102.19,169.52l90.21-64.55c1.63-1.19,2.58-3.07,2.6-5.08v-.02c-.02-2.03-.99-3.91-2.63-5.08L102.15,30.66c-1.91-1.36-4.41-1.54-6.49-.47-2.08,1.04-3.39,3.2-3.39,5.52v30.17l-81.02-.02c-3.44,0-6.24,2.79-6.24,6.22v55.83c-.02,3.42,2.77,6.22,6.23,6.22h81.01v30.17c0,2.33,1.31,4.46,3.37,5.52s4.56.87,6.47-.5l.11.2Z"
    />
  </svg>
);

export default SvgArrowRight;
