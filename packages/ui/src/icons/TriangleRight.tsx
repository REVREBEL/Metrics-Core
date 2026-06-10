import type { SVGProps } from "react";

const SvgTriangleRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 18 18"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M7.112 5.124a.44.44 0 0 0-.112.3v7.15q0 .176.112.3A.37.37 0 0 0 7.4 13q.15-.001.225-.076l.05-.05 3.9-3.4q.224-.226.224-.474 0-.25-.224-.476l-3.9-3.4-.074-.05L7.4 5a.37.37 0 0 0-.288.124"
    />
  </svg>
);
export default SvgTriangleRight;
