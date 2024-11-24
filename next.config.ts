import type { NextConfig } from 'next';
import nextIntl from 'next-intl/plugin';

const createNextIntlPlugin = nextIntl;

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
};

export default withNextIntl(nextConfig);
