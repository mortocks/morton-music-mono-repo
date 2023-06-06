import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";
import Container from "../../components/container";
import MoreStories from "../../components/more-stories";
import HeroPost from "../../components/hero-post";
import Intro from "../../components/intro";
import Layout from "../../components/layout";
import { getAllPostsForHome } from "../../lib/api";
import { CMS_NAME } from "../../lib/constants";
import Link from "next/link";
import Product from "../../components/product";
import { ParsedUrlQuery } from "querystring";
import Image from "next/image";
import DefaultPoster from "../../assets/img/default-piece.jpg";
import { SiSpotify, SiYoutube, SiApple } from "react-icons/si";
import Embed from "react-tiny-oembed";
import { useQuery } from "react-query";
import Tab from "../../components/tabs";
type EmbedService = {
  provider: string;
  component: (html: string) => React.ReactNode;
  url: (url: string) => string;
  pattern: RegExp;
};

const EmbedComponent = ({ url }) => {
  const services: EmbedService[] = [
    {
      provider: "spotify",
      component: (html) => <div dangerouslySetInnerHTML={{ __html: html }} />,
      url: (url) =>
        `https://open.spotify.com/embed/track?url=${encodeURI(url)}`,
      pattern: /^(https:\/\/open.spotify.com)(.*)$/g,
    },
    {
      provider: "youtube",
      component: (html) => <div dangerouslySetInnerHTML={{ __html: html }} />,
      url: (url) => `http://www.youtube.com/oembed?url=${url}`,
      pattern:
        /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/,
    },
  ];
  const service = services.find((s) => s.pattern.test(url));

  const { isSuccess, data } = useQuery(
    service?.provider || "",
    () => fetch(service!.url(url)).then((res) => res.json()),
    { enabled: !!service }
  );

  return isSuccess && data && service ? (
    service?.component(data.html)
  ) : (
    <>
      {url} {service?.provider || "none"}
    </>
  );
};

export default function Index({ post, preview }) {
  const product = post
    ? {
        ...post,
        name: post.title,
        price: 3.0,
        description: post.voicing.nodes[0]?.name || "",
      }
    : null;

  const hasPreviews =
    Object.keys(
      Object.fromEntries(
        Object.entries(post.pieceFields?.previews).filter(([_, v]) => v != null)
      )
    ).length > 0;
  return (
    <Layout preview={preview}>
      <Head>{/* <title>{`Morton Music ${post.title}`}</title> */}</Head>

      {post && (
        <Container>
          <div className="md:grid grid-cols-3 gap-24 pt-12">
            <div>
              <Image
                src={DefaultPoster}
                width={200}
                height={300}
                alt={`cover for ${post.title}`}
                className="w-full hover:scale-105 transition-all mb-8"
              />
              {hasPreviews && (
                <strong className="font-bold text-gray-700 mb-4">
                  Previews
                </strong>
              )}
              {post.pieceFields.previews.media && (
                <audio
                  className="mb-4"
                  src={post.pieceFields.previews.media.uri}
                  autoPlay={false}
                  controls
                />
              )}

              <div className="flex space-x-6 items-center mb-4 [&:hover>a]:opacity-50">
                {post.pieceFields.previews?.spotify && (
                  <Link
                    className="hover:!opacity-100 transition-all"
                    target="_blank"
                    href={post.pieceFields.previews?.spotify}
                  >
                    <SiSpotify size={32} color="#1DB954" />
                  </Link>
                )}
                {post.pieceFields.previews?.youtube && (
                  <Link
                    className="hover:!opacity-100 transition-all"
                    target="_blank"
                    href={post.pieceFields.previews?.youtube}
                  >
                    <SiYoutube size={32} color="#FF0000" />
                  </Link>
                )}
                {post.pieceFields.previews?.appleMusic && (
                  <Link
                    className="hover:!opacity-100 transition-all"
                    target="_blank"
                    href={post.pieceFields.previews?.appleMusic}
                  >
                    <SiApple size={32} color="#f94c57" />
                  </Link>
                )}

                {/* <iframe src={post.pieceFields.previews?.spotify}  width="100%" height="152" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" allowFullScreen={false} /> */}

                {/* <EmbedComponent url={"https://open.spotify.com/track/70x3QZLyVc2uFKUDMEMoya?si=fa21f18f77074c03"} />
              <EmbedComponent url={post.pieceFields.previews?.youtube} />
              <EmbedComponent url={post.pieceFields.previews?.appleMusic} /> */}
              </div>
            </div>
            <div className="col-span-2">
              <Link
                className="mb-0 block"
                href={`/composers/${post.composers.nodes[0].slug}`}
              >
                {post.composers.nodes[0].name}
              </Link>
              <h1 className="text-5xl font-bold">{post.title}</h1>

              <div className="mb-4">
                Voicing
                {post.voicing.nodes.map((v) => (
                  <Link
                    className="rounded-full bg-purple-300 text-purple-700 p-1 px-2 text-sm"
                    key={v.slug}
                    href={`/voicing/${v.slug}`}
                  >
                    {v.name}
                  </Link>
                ))}
              </div>

              <div className="">
                <Product product={product} />

                <Tab
                  items={[
                    {
                      label: "Description",
                      content: (
                        <div
                          className="text-lg [&>*]:mb-4 col-span-2"
                          dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                      ),
                    },
                    {
                      label: "Previews",
                      content: <>Previews</>,
                    },
                  ]}
                />
              </div>

              {/* <iframe style={{"borderRadius":"12px"}} src="https://open.spotify.com/embed/track/38XFgkPzYLKJYUZ54HqFLq?utm_source=generator&theme=0" width="100%" height="152"  allowFullScreen="false" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe> */}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-16 mt-16">
            {post.pieceFields.alternateVoicing?.map((post) => (
              <Link href={`/piece/${post.slug}`} key={post.slug}>
                <div>
                  <Image
                    src={DefaultPoster}
                    width={200}
                    height={300}
                    alt={`cover for ${post.title}`}
                    className="mb-2 w-full hover:scale-105 transition-all"
                  />
                  {post.title}
                  <div className="text-gray-500 w-full">$3.40</div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      )}
    </Layout>
  );
}

interface IParams extends ParsedUrlQuery {
  slug: string[];
}

export const getStaticProps: GetStaticProps = async ({
  preview = false,
  params,
}) => {
  const allPosts = await getAllPostsForHome(preview);

  const { slug } = params;

  const post = allPosts.nodes.find((p) => p.slug === slug);
  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: { post, preview },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPostsForHome(false);

  const slugPaths = allPosts.nodes.map((piece) => `/piece/${piece.slug}`) || [];

  const paths = [...slugPaths];

  return {
    paths,
    fallback: false,
  };
};
