import { useState, forwardRef } from 'react';
import classNames from 'classnames';

import PropTypes from 'prop-types';

import images from '~/assets/images';
import styles from './Image.module.scss';

const Image = forwardRef(
   (
      {
         alt,
         src,
         className,
         errorImg: customErrorImg = images.errorImg,
         ...props
      },
      ref,
   ) => {
      const [errorImg, setErrorImg] = useState('');

      const handleError = () => {
         setErrorImg(customErrorImg);
      };

      return (
         <img
            ref={ref}
            className={classNames(styles.wrapper, className)}
            src={errorImg || src}
            alt={alt}
            {...props}
            onError={handleError}
         />
      );
   },
);

Image.propTypes = {
   alt: PropTypes.string,
   src: PropTypes.string,
   className: PropTypes.string,
   errorImg: PropTypes.string,
};

export default Image;
