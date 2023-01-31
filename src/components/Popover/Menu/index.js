import { useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import PropTypes from 'prop-types';

import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
import Header from './Header';
import { Wrapper as PopoverWrapper } from '~/components/Popover';

const cx = classNames.bind(styles);

function Menu({ children, hideOnClick = false, items = [] }) {
   const [menu, setMenu] = useState([{ data: items }]);
   const currentMenu = menu[menu.length - 1];

   const renderItems = () => {
      return currentMenu.data.map((item, index) => {
         const isParent = !!item.children;
         return (
            <MenuItem
               key={index}
               data={item}
               onClick={() => {
                  if (isParent) {
                     setMenu((prev) => [...prev, item.children]);
                  }
               }}
            />
         );
      });
   };

   return (
      <Tippy
         interactive
         hideOnClick={hideOnClick}
         offset={[20, 10]}
         delay={[0, 500]}
         placement="bottom-end"
         render={(attrs) => (
            <div className={cx('menu-options')} tabIndex="-1" {...attrs}>
               <PopoverWrapper className={cx('menu-popover')}>
                  {menu.length > 1 && (
                     <Header
                        title={currentMenu.title}
                        onBack={() => {
                           setMenu(menu.slice(0, menu.length - 1));
                        }}
                     />
                  )}
                  <div className={cx('menu-body')}>{renderItems()}</div>
               </PopoverWrapper>
            </div>
         )}
         onHide={() => setMenu((prev) => prev.slice(0, 1))}
      >
         {children}
      </Tippy>
   );
}

Menu.propTypes = {
   children: PropTypes.node.isRequired,
   hideOnClick: PropTypes.bool,
   items: PropTypes.array,
};

export default Menu;
