import type { SVGProps } from "react";

const SvgSignOut = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 18 18"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M14.433 2q.62 0 1.093.474.474.474.474 1.094v10.864q0 .62-.474 1.094-.473.474-1.093.474H3.567q-.62 0-1.093-.474Q2 15.052 2 14.432v-3.099h1.567v3.099h10.866V3.568H3.567v3.099H2V3.568q0-.62.474-1.094Q2.947 2 3.567 2zm-6.928 9.806 2.005-2.04H2V8.233h7.547L7.505 6.193 8.6 5.099 12.5 9 8.6 12.901z"
    />
  </svg>
);
export default SvgSignOut;
