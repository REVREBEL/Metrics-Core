import type { SVGProps } from "react";

const SvgHamburgerMenu = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 30 30"
    {...props}
  >
    <g fillRule="evenodd">
      <path d="M2 6h26v2H2ZM2 14h26v2H2ZM2 22h26v2H2Z" />
    </g>
  </svg>
);
export default SvgHamburgerMenu;
