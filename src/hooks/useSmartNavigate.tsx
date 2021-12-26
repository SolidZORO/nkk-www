import { useRouter } from 'next/router';

export interface ISmartNavigateOptions {
  replace?: boolean;
  state?: any;
}

// Hooks API follow react-router v6, Compatible with CRA and Next.js
export const useSmartNavigate = () => {
  const router = useRouter();

  return (to: string, opts?: ISmartNavigateOptions) => {
    if (opts?.replace) {
      router.replace(to);
      return;
    }

    router.push(to);
  };
};
