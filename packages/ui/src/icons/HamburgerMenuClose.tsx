import type { SVGProps } from "react";

const SvgHamburgerMenuClose = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 30 30"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M15 13.586 7.823 6.409 6.409 7.823 13.586 15l-7.177 7.177 1.414 1.414L15 16.414l7.177 7.177 1.414-1.414L16.414 15l7.177-7.177-1.414-1.414z"
    />
  </svg>
);
export default SvgHamburgerMenuClose;
