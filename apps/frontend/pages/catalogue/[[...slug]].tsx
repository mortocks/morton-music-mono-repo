import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import Container from "../../components/container";
import Layout from "../../components/layout";
import { getAllComposers, getAllPostsForHome } from "../../lib/api";
import Link from "next/link";
import PieceRow from "../../components/pieceRow";
import type { ParsedUrlQuery } from "querystring";
import Pagination from "../../components/Pagination";
const PER_PAGE = 24;

export default function Index({ posts, composers, preview, pagination }) {
  return (
    <Layout preview={preview}>
      <Head>
        <title>Morton Music: Catalogue</title>
      </Head>

      <div>
        <div className="py-20 flex items-center justify-center">
          <h1 className="text-5xl font-serif ">Catalogue</h1>
        </div>
      </div>

      <div className="bg-white py-8 ">
        <Container>
          <div className="md:grid grid-cols-3 gap-8">
            <div className="order-2">
              <h4 className="font-bold text-sm mb-1">Voicing</h4>

              <h4 className="font-bold text-sm mb-1">Composer</h4>
              {composers.map((c) => (
                <Link
                  key={c.slug}
                  href={`/composers/${c.slug}`}
                  className="py-1 px-2 bg-orange-100 text-orange-700 m-1 inline-block text-xs"
                >
                  {c.name} ({c.count})
                </Link>
              ))}
            </div>

            <div className="col-span-2">
              <ul>
                {posts.map((piece) => (
                  <PieceRow
                    key={piece.slug}
                    slug={`/piece/${piece.slug}`}
                    title={piece.title}
                    sku={piece.pieceFields.catalogueNumber}
                    description={piece.excerpt}
                    composer={
                      <Link
                        href={`/composers/${piece.composers.nodes[0].slug}`}
                      >
                        {piece.composers.nodes[0].name}
                      </Link>
                    }
                    voicing={piece.voicing.nodes.map((n) => (
                      <Link key={n.slug} href={`/voicing/${n.slug}`}>
                        {n.name}
                      </Link>
                    ))}
                  />
                ))}
              </ul>
            </div>
          </div>
        </Container>

        <Container>
          <Pagination
            totalPages={pagination.totalPages}
            page={pagination.page}
          />
        </Container>
      </div>
    </Layout>
  );
}

export interface QParams extends ParsedUrlQuery {
  slug?: string;
}

interface PieceProps {
  posts: any;
  composers: any;
  pagination: {
    page: number;
    totalPages: number;
  };
}

export const getStaticPaths: GetStaticPaths<QParams> = async () => {
  const allPosts = await getAllPostsForHome(false);
  const totalPosts = allPosts.nodes.length;
  console.log("totalPosts", totalPosts);
  const totalPages = Math.ceil(totalPosts / PER_PAGE);

  const slugs = Array.from({ length: totalPages }, (_, index) => index);
  const paths = slugs.map((s) => `/catalogue/${s}`) || [];

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<PieceProps, QParams> = async ({
  preview = false,
  params,
}) => {
  const allPosts = await getAllPostsForHome(preview);
  const composers = await getAllComposers();
  const page = params?.slug?.[0] ? parseInt(params.slug[0]) : 1;
  const start = (page - 1) * PER_PAGE;
  const posts = allPosts.nodes.slice(start, PER_PAGE + start);

  if (posts.length === 0) {
    return {
      notFound: true,
    };
  }

  const pagination = {
    page,
    totalPages: Math.ceil(allPosts.nodes.length / PER_PAGE),
  };

  return {
    props: { posts, composers: composers.nodes, pagination },
    revalidate: 10,
  };
};
