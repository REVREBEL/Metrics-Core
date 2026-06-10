import type { SVGProps } from "react";

const SvgGalileoCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    id="Layer_1"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 225 225"
    width="1em"
    height="1em"
    {...props}
  >
    <defs>
      <style>{".cls-1 {\n        fill: #fff;\n      }"}</style>
    </defs>
    <circle cx="112.5" cy="112.5" r="105" />
    <g>
      <path
        className="cls-1"
        d="M111.2,145.89c6.76,10.19,15.59,16.46,25.15,23.4l-51.11.3c-12.89-7.35-23.5-17.8-28.62-31.92-11.18-30.87.94-65,28.91-82.28l65.48.21c-16.68,7.97-31.76,17.88-41.42,33.68-10.94,17.91-11.22,39.15,1.6,56.6Z"
      />
      <path
        className="cls-1"
        d="M156.09,169.31c-6.06-.11-25.66-17.96-24.82-38.07.9-21.54,18.01-33.6,41.12-38.53l.11,76.9-16.41-.3Z"
      />
    </g>
  </svg>
);

export default SvgGalileoCircle;
