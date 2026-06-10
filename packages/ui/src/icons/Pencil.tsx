import type { SVGProps } from "react";

const SvgPencil = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 100 100"
    {...props}
  >
    <path d="M88.79 29.297 70.702 11.209a2.69 2.69 0 0 0-3.808 0L17.389 60.713l.109.109-.171-.046-6.772 25.272.004.001a2.68 2.68 0 0 0 .642 2.748 2.68 2.68 0 0 0 3.033.531l.002.009 25.027-6.706-.016-.059.038.038L88.79 33.105a2.69 2.69 0 0 0 0-3.808m-69.998 51.85 4.022-15.009 10.988 10.988z" />
  </svg>
);
export default SvgPencil;
