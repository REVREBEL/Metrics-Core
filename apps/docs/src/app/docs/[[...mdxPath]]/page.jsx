import { generateStaticParamsFor, importPage } from "nextra/pages";
import { Fragment } from "react";
import { useMDXComponents as getMDXComponents } from "../../../../mdx-components";
import "../../../app/globals.css";

export const generateStaticParams = generateStaticParamsFor("mdxPath");

export async function generateMetadata(props) {
  const params = await props.params;
  const { metadata } = await importPage(params.mdxPath);
  return metadata;
}

const Wrapper = getMDXComponents().wrapper ?? Fragment;

export default async function Page(props) {
  const params = await props.params;
  const {
    default: MDXContent,
    toc,
    metadata,
    sourceCode,
  } = await importPage(params.mdxPath);
  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  );
}
