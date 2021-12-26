// eslint-disable-next-line max-len
import { _getServerSideGlobalProps } from '@/_getServerSideGlobalProps';

export { Home as default } from '@/page-components/index/Home/Home';

// 简写（让 server 去拿基础的 props，比如全局 setting）
export const getServerSideProps = _getServerSideGlobalProps;

// 适合扩展（props 还需要追加 data）
// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const base = await _getServerSideProps(ctx);
//
//   return { props: base.props };
// };
