import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
   children,
   className,
   href,
   to,
   onClick,
   leftIcon,
   rightIcon,
   primary = false,
   outline = false,
   pill = false,
   text = false,
   disabled = false,
   small = false,
   large = false,
   ...passProps
}) {
   // Button/index.js
   // Tạo prop với tên 'className' và add vào classes
   let Component = 'button';
   const classes = cx(
      'wrapper',
      {
         primary,
         outline,
         pill,
         text,
         disabled,
         small,
         large,
      },
      className,
   );

   const props = {
      onClick,
      ...passProps,
   };

   if (disabled) {
      Object.keys(props).forEach((key) => {
         if (key.startsWith('on') && typeof props[key] === 'function') {
            delete props[key];
         }
      });
   }

   if (to) {
      Component = Link;
      props.to = to;
   } else if (href) {
      Component = 'a';
      props.href = href;
   } else if (onClick) {
      props.onClick = onClick;
   }

   return (
      <Component className={classes} {...props}>
         {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
         <span className={cx('title')}>{children}</span>
         {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
      </Component>
   );
}

Button.propTypes = {
   to: PropTypes.string,
   href: PropTypes.string,
   className: PropTypes.string,
   leftIcon: PropTypes.node,
   rightIcon: PropTypes.node,
   children: PropTypes.node.isRequired,
   onClick: PropTypes.func,
   primary: PropTypes.bool,
   outline: PropTypes.bool,
   pill: PropTypes.bool,
   text: PropTypes.bool,
   disabled: PropTypes.bool,
   small: PropTypes.bool,
   large: PropTypes.bool,
};

export default Button;
