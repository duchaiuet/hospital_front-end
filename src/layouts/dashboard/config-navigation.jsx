import ArticleIcon from '@mui/icons-material/Article';

import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Công báo',
    path: '/document-list',
    icon: <ArticleIcon />,
  },
  {
    title: 'user',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Person',
    path: '/products',
    icon: icon('ic_user'),
  },
  {
    title: 'report',
    path: '/blog',
    icon: icon('ic_blog'),
  },
];

export default navConfig;
