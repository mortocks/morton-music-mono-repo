import Head from "next/head";
import { GetStaticProps } from "next";
import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { getAllComposers } from "../lib/api";
import { CMS_NAME } from "../lib/constants";
import Link from "next/link";

export default function Index({ composers: { nodes } }) {
  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const alphabet = alpha.map((x) => String.fromCharCode(x));

  const composers = alphabet.reduce((acc, letter) => {
    const works =
      nodes.filter((composer) => {
        const nameParts = composer.name.split(" ");
        const lastName = nameParts.pop();
        return lastName.startsWith(letter);
      }) || [];

    if (works.length > 0) {
      acc[letter] = works;
    }
    return acc;
  }, {});

  return (
    <Layout preview={false}>
      <Head>
        <title>Morton Music: Composers</title>
      </Head>

      <Container>
        <div className="py-20 flex items-center justify-center">
          <h1 className="text-4xl font-serif">Composers</h1>
        </div>
      </Container>
      <Container>
        {Object.keys(composers).map((key) => (
          <div key={key} className=" py-3">
            <h3 className="font-bold">{key}</h3>
            <hr className="my-2" />
            <ul className="text-lg">
              {composers[key].map((c) => (
                <li key={c.id}>
                  <Link key={c.id} href={`/composers/${c.slug}`}>
                    {c.name} ({c.count})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const composers = await getAllComposers();

  return {
    props: { composers },
    revalidate: 10,
  };
};
