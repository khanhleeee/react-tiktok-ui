import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import styles from './AccountItem.module.scss';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
   return (
      <Link to={`/@${data.nickname}`} className={cx('wrapper')}>
         <Image className={cx('avatar')} src={data.avatar} alt="user" />
         <div className={cx('info')}>
            <h4 className={cx('name')}>
               <span>{data.nickname}</span>
               {data.tick && (
                  <FontAwesomeIcon
                     className={cx('check-icon')}
                     icon={solid('circle-check')}
                  />
               )}
            </h4>
            <span className={cx('username')}>{data.full_name}</span>
         </div>
      </Link>
   );
}

AccountItem.propTypes = {
   data: PropTypes.object.isRequired,
};

export default AccountItem;
