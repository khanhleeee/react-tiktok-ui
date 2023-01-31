import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, brands } from '@fortawesome/fontawesome-svg-core/import.macro';

import Tippy from '@tippyjs/react/';
import 'tippy.js/dist/tippy.css'; // optional

import images from '~/assets/images';
import styles from './Header.module.scss';
import Button from '~/components/Button';
import Menu from '~/components/Popover/Menu';
import Image from '~/components/Image';
import Search from '../Search';
import { InboxIcon, MessageIcon } from '~/components/Icons';
import config from '~/config';

const MENU_OPTIONS = [
   {
      icon: <FontAwesomeIcon icon={solid('earth-asia')} />,
      title: 'English',
      children: {
         title: 'Language',
         data: [
            {
               code: 'en',
               title: 'English',
            },
            {
               code: 'vie',
               title: 'Tiếng Việt',
            },
         ],
      },
   },
   {
      icon: <FontAwesomeIcon icon={solid('circle-question')} />,
      title: 'Feedback and help',
      to: '/feedback',
   },
   {
      icon: <FontAwesomeIcon icon={solid('keyboard')} />,
      title: 'Keyboard shortcuts',
   },
];

const cx = classNames.bind(styles); //giúp dùng classname có gạch nối -

function Header() {
   const curentUser = true;

   const userMenu = [
      {
         icon: <FontAwesomeIcon icon={solid('user')} />,
         title: 'View profile',
         to: '/user',
      },
      {
         icon: <FontAwesomeIcon icon={brands('tiktok')} />,
         title: 'Get coins',
         to: '/coin',
      },
      {
         icon: <FontAwesomeIcon icon={solid('gear')} />,
         title: 'Setting',
         to: '/setting',
      },
      ...MENU_OPTIONS,
      {
         icon: <FontAwesomeIcon icon={solid('right-from-bracket')} />,
         title: 'Log out',
         to: '/logout',
         separated: true,
      },
   ];

   return (
      <header className={cx('wrapper')}>
         <div className={cx('container')}>
            <Link to={config.routes.home} className={cx('logo')}>
               <img src={images.logo} alt="TikTok" />
            </Link>

            <Search />

            <div className={cx('actions')}>
               {curentUser ? (
                  <>
                     <Button
                        leftIcon={<FontAwesomeIcon icon={solid('plus')} />}
                     >
                        Upload
                     </Button>
                     <Tippy
                        delay={[0, 300]}
                        content="Messages"
                        placement="bottom"
                     >
                        <button className={cx('action-btn')}>
                           <MessageIcon width="2.5rem" height="2.5rem" />
                        </button>
                     </Tippy>

                     <Tippy delay={[0, 300]} content="Inbox" placement="bottom">
                        <button className={cx('action-btn')}>
                           <InboxIcon />
                           <span className={cx('sub-badge')}>12</span>
                        </button>
                     </Tippy>
                  </>
               ) : (
                  <>
                     <Button
                        leftIcon={<FontAwesomeIcon icon={solid('plus')} />}
                     >
                        Upload
                     </Button>
                     <Button primary>Log in</Button>
                  </>
               )}

               <Menu items={curentUser ? userMenu : MENU_OPTIONS}>
                  {curentUser ? (
                     <Image
                        className={cx('user-avatar')}
                        src="https://i.pinimg.com/564x/c0/00/e4/c000e49f5d9a9700c3370719cd9ee9a2.jpg"
                        alt="avatar"
                        errorImg="https://www.kindpng.com/picc/m/423-4238331_transparent-spirited-away-png-spirited-away-no-face.png"
                     />
                  ) : (
                     <button className={cx('more-btn')}>
                        <FontAwesomeIcon icon={solid('ellipsis-vertical')} />
                     </button>
                  )}
               </Menu>
            </div>
         </div>
      </header>
   );
}

export default Header;
