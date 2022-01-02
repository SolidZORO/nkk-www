import React from 'react';
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import { watchI18nLocales } from '@/watchs/i18n-locales.watch';

// avoid CSS animation transition flashing
export const DISABLE_SSR_TRANSITION = 'disable-SSR-transition';

// @ts-ignore 监控只跑一次
if (!global.__WATCH_I18N_LOCALES_DEV_ONLY__) {
  // @ts-ignore
  global.__WATCH_I18N_LOCALES_DEV_ONLY__ = true;
  watchI18nLocales();
}

export default class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  render() {
    return (
      <Html className="no-js">
        <Head>
          <meta name="referrer" content="no-referrer" />
          <link rel="icon" href="/favicons/favicon.svg" />
          <meta name="theme-color" content="#000000" />
          <meta
            name="description"
            content="Web site created using mkn (with Next.js and typescript)"
          />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          {/* <link rel="apple-touch-icon" href="/favicons/logo192.png" /> */}
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <body>
          <Main />
          <NextScript />

          <style
            id={DISABLE_SSR_TRANSITION}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: '*, *::before, *::after { transition: none !important; }',
            }}
          />
        </body>
      </Html>
    );
  }
}
