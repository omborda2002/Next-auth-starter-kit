import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { PageTransition } from "next-page-transitions";
import Loader from "../components/Loader";
import NextHead from "../components/Head";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const TIMEOUT = 400;

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  useEffect(() => {
    const handleStart = (url) => {
      console.log(`Loading: ${url}`);
      NProgress.start();
    };

    const handleStop = () => {
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

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
