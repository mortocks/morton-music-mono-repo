import Head from "next/head";
import { GetStaticProps } from "next";
import Container from "../components/container";
import Layout from "../components/layout";
import { getAllComposers, getAllPostsForHome } from "../lib/api";
import Image from "next/image";
import Link from "next/link";
import Sand from "../assets/video/fire.mp4";

import DefaultPoster from "../assets/img/default-piece.jpg";

export default function Index({ allPosts: { nodes }, preview, composers }) {
  const featured = nodes.splice(0, 5);

  return (
    <Layout preview={preview}>
      <Head>
        <title>{`Morton music`}</title>
      </Head>

      <div
        className="h-[700px] items-center flex relative bg-black mb-24"
        style={{ clipPath: "inset(0 0 0 0)" }}
      >
        <Container>
          <div className="z-10">
            <h1 className="font-serif z-1 text-white text-8xl font-bold">
              Morton Music
            </h1>
            <h2 className="text-white text-2xl">
              A leading published of Australian Choral Music
            </h2>
          </div>
        </Container>
        <video
          playsInline
          autoPlay
          muted
          loop
          src={Sand}
          preload={"none"}
          className="fixed animate-fadeIn w-full min-w-full min-h-full max-w-none l-0 t-0 opacity-50 object-center object-cover h-full bg-black -z-10"
        />
      </div>

      <section className="text-lg mb-24">
        <Container>
          <p>
            Australian choral music is universal in nature and appeal. However,
            there is a large and growing body of Australian choral music which
            speaks with a unique voice that reflects the diverse histories and
            cultures of our “wide brown land”. It is for this nascent Australian
            voice that Morton Music’s publications are best known.
          </p>
          <p>
            Many of the most distinctively Australian compositions heard in
            recent years come from the Morton Music catalogue, which includes
            the Australian composers who have become well-known through the
            world choral community.
          </p>
        </Container>
      </section>

      <Container>
        <section className="md:grid grid-cols-2 gap-8 items-center space-y-8 mb-24">
          <div className="md:order-last items-center md:items-start flex flex-col">
            <h1 className="text-4xl font-bold font-serif mb-8 text-center md:text-left ">
              Australian leading composers
            </h1>
            <p className="text-lg text-gray-500  text-center md:text-left">
              Something about how great our composers are
            </p>
          </div>
          <div className="w-full bg-black h-[300px] flex">
            {composers.map((composer) => (
              <Link
                href={`/composers/${composer.slug}`}
                key={composer.id}
                className="h-[300px] w-[150px] hover:w-[300px] flex overflow-hidden relative transition-all items-center justify-center shrink saturate-0 hover:saturate-100"
              >
                <Image
                  src={composer.composerFields.image.sourceUrl}
                  width={300}
                  height={300}
                  className="h-[300px] w-[300px] block shrink-0 object-cover"
                  alt={composer.name}
                />
              </Link>
            ))}
          </div>
        </section>
      </Container>

      <section className="py-24 bg-neutral-dark">
        <Container>
          <div className="justify-center flex flex-col items-center">
            <h1 className="text-4xl font-bold font-serif mb-3">
              Latest Releases
            </h1>

            <p className="text-large text-gray-400">
              Something about latest releaser
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-16 mt-16 items-center">
            {featured.map((post) => (
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
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allPosts = await getAllPostsForHome(preview);
  const allComposers = await getAllComposers();
  const composers =
    allComposers.nodes.filter(
      (c) => c.composerFields.image?.sourceUrl !== undefined
    ) || [];

  return {
    props: { allPosts, composers: composers.slice(0, 5), preview },
    revalidate: 10,
  };
};
