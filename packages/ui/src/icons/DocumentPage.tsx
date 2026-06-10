import type { SVGProps } from "react";

const SvgDocumentPage = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 18 18"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="m10.127 2 4.085 4.085v7.914q0 .51-.383.894a1.23 1.23 0 0 1-.893.382h-7.66a1.23 1.23 0 0 1-.893-.382A1.23 1.23 0 0 1 4 13.999V3.276q0-.51.383-.893.384-.384.894-.383zm-.51 4.595h3.575L9.618 3.022z"
    />
  </svg>
);
export default SvgDocumentPage;
