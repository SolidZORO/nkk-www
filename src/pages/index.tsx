// eslint-disable-next-line max-len
import { _getServerSideGlobalProps } from '@/_getServerSideGlobalProps';

export { Home as default } from '@/page-components/index/Home/Home';

// 简写
export const getServerSideProps = _getServerSideGlobalProps;
// export const getServerSideProps = _getServerSideProps;

// 适合扩展（props 还需要追加 data）
// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const base = await _getServerSideProps(ctx);
//
//   return { props: base.props };
// };
