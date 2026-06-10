import type { SVGProps } from "react";

const SvgLayout = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 100 100"
    {...props}
  >
    <g fill="#231F20">
      <path d="M27.725 30.515h44.55v23.113h-44.55ZM28.793 58.615h11.074v10.87H28.793ZM60.915 58.615h11.074v10.87H60.915ZM44.854 58.615h11.074v10.87H44.854Z" />
      <path d="M82.69 15.588H17.31a4.513 4.513 0 0 0-4.512 4.512h-.001v60.067h.028c.14 2.366 2.085 4.246 4.485 4.246h65.38c2.401 0 4.344-1.88 4.484-4.246h.027V20.1a4.51 4.51 0 0 0-4.511-4.512m-5.428 58.885H22.738V25.527h54.525v48.946Z" />
    </g>
  </svg>
);
export default SvgLayout;
