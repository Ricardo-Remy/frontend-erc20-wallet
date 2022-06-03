import Layout from "../components/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout title="ECR20 Wallet">
      <>
        <Component {...pageProps} />
      </>
    </Layout>
  );
}

export default MyApp;
