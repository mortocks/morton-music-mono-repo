import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";
import Container from "../../components/container";
import Layout from "../../components/layout";
import { getSingleComposer, getAllComposers } from "../../lib/api";
import { CMS_NAME } from "../../lib/constants";
import Link from "next/link";
import Product from "../../components/product";
import Image from "next/image";

export default function Index({ composer, preview }) {
  const imageUrl = composer.composerFields.image?.sourceUrl;
  const nameParts = composer.name.split(" ");
  const [first, last] = nameParts;
  return (
    <Layout preview={preview}>
      <Head>
        <title>{`Morton Music ${composer.name}`}</title>
      </Head>
      <div className="bg-orange-500 py-24 text-white mb-24">
        <Container>
          <div className="flex items-center justify-between space-x-8 mb-12 w-full">
            <h1 className="text-7xl font-bold flex items-center justify-center w-full -space-x-8 ">
              <span className="z-10 drop-shadow-lg">{first}</span>
              {imageUrl && (
                <Image
                  src={composer.composerFields.image.sourceUrl}
                  alt={composer.name}
                  width={200}
                  height={200}
                  className="pointer-events-none mouse-events-none"
                />
              )}
              <span className="z-10 drop-shadow-lg">{last}</span>
            </h1>
          </div>
        </Container>
      </div>
      <Container>
        <div
          className="text-xl mb-8 [&>*]:text-purple-500"
          dangerouslySetInnerHTML={{ __html: composer.description }}
        />

        <ul>
          {composer.pieces.nodes.map((piece) => (
            <li key={piece.id}>
              <Link href={`/piece/${piece.slug}`}>{piece.title}</Link>
            </li>
          ))}
        </ul>
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({
  preview = false,
  params,
}) => {
  const { slug } = params;
  const id = Array.isArray(slug) ? slug[0] : slug;
  const composer = await getSingleComposer(id);

  if (!composer) {
    return {
      notFound: true,
    };
  }

  return {
    props: { composer, preview },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllComposers();

  return {
    paths:
      allPosts.nodes.map((composer) => `/composers/${composer.slug}`) || [],
    fallback: false,
  };
};
