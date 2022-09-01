import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
// import Layout from "../../components/Layout";

const About = (props) => {
  const [loaded, setLoaded] = useState(false);
  const { pageTransitionReadyToEnter } = props;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      pageTransitionReadyToEnter();
      setLoaded(true);
    }, 2000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [pageTransitionReadyToEnter]);

  if (!loaded) return null;

  return (
    <div className="container bg-success page">
      <h1>About us</h1>
      <p>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        Notice how a loading spinner showed up while my content was "loading"?
        Pretty neat, huh?
      </p>
      <Link href="/dashboard">
        <a className="btn btn-light">Go back home</a>
      </Link>
    </div>
  );
};

About.propTypes = {
  pageTransitionReadyToEnter: PropTypes.func
};

About.defaultProps = {
  pageTransitionReadyToEnter: () => {}
};

About.pageTransitionDelayEnter = true;

// About.getLayout = function getLayout(page) {
//   /**
//    * @description here all data can be fetched from the layout of each pages
//    */
//   return <Layout>{page}</Layout>;
// };

export default About;
