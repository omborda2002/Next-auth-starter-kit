import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { PageTransition } from "next-page-transitions";
import Loader from "../components/Loader";
import NextHead from "../components/Head";
import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo.config'

const TIMEOUT = 400;

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(
    <>
      <NextHead />
      <DefaultSeo {...SEO} />
      <SessionProvider session={session}>
        <PageTransition
          timeout={TIMEOUT}
          classNames="page-transition"
          loadingComponent={<Loader />}
          loadingDelay={500}
          loadingTimeout={{
            enter: TIMEOUT,
            exit: 0
          }}
          loadingClassNames="loading-indicator"
        >
          <Component {...pageProps} />
        </PageTransition>
      </SessionProvider>
    </>
  );
}

export default MyApp;
