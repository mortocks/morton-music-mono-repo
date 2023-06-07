import Head from "next/head";

type SeoProps = {
  title?: string;
  name?: string;
  description: string;
  image?: string;
  audio?: string;
};

const Seo = ({ title, image, audio }) => (
  <Head>
    {title && <meta property="og:title" content="Structured audio property" />}
    <meta property="og:type" content="website" />
    <link
      rel="canonical"
      href="http://examples.opengraphprotocol.us/audio.html"
    />
    <meta
      property="og:url"
      content="http://examples.opengraphprotocol.us/audio.html"
    />
    {image && (
      <>
        <meta
          property="og:image"
          content="http://examples.opengraphprotocol.us/media/images/50.png"
        />
        <meta
          property="og:image:secure_url"
          content="https://d72cgtgi6hvvl.cloudfront.net/media/images/50.png"
        />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="720" />
        <meta property="og:image:type" content="image/png" />
      </>
    )}
    {audio && (
      <>
        <meta
          property="og:audio"
          content="http://examples.opengraphprotocol.us/media/audio/250hz.mp3"
        />
        <meta
          property="og:audio:secure_url"
          content="https://d72cgtgi6hvvl.cloudfront.net/media/audio/250hz.mp3"
        />
        <meta property="og:audio:type" content="audio/mpeg" />
      </>
    )}
  </Head>
);

export default Seo;
