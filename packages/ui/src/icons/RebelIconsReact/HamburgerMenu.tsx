import type { SVGProps } from "react";

const SvgHamburgerMenu = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 30 30"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    {...props}
  >
    <g transform="translate(2 6)">
      <g fillRule="evenodd">
        <path d="M0 0h26v2H0Z" />
        <path d="M0 8h26v2H0Z" />
        <path d="M0 16h26v2H0Z" />
      </g>
    </g>
  </svg>
);

export default SvgHamburgerMenu;
