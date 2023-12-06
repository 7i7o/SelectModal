import Head from "next/head";
import Link from "next/link";

import styles from "./index.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Select With Modal Example</title>
        <meta name="description" content="Select With Modal Example" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>
            Select <span className={styles.pinkSpan}>With</span> Modal
          </h1>
          <Link className={styles.card} href="/selectModalExamples">
            <h3 className={styles.cardTitle}>Examples →</h3>
          </Link>
        </div>
      </main>
    </>
  );
}
