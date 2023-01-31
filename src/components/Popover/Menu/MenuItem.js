import classNames from 'classnames/bind';
import Button from '~/components/Button';
import styles from './Menu.module.scss';

import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

//MenuItem.js
function MenuItem({ data, onClick }) {
   const classes = cx('menu-option', {
      separated: data.separated,
   });
   return (
      <Button
         className={classes}
         text
         leftIcon={data.icon}
         to={data.to}
         onClick={onClick}
      >
         {data.title}
      </Button>
   );
}

MenuItem.propTypes = {
   data: PropTypes.object.isRequired,
   onClick: PropTypes.func,
};

export default MenuItem;
