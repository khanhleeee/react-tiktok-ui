// React
import { useState, useEffect, useRef } from 'react';
// Classnames
import classNames from 'classnames/bind';
// Tippy
import HeadlessTippy from '@tippyjs/react/headless';
// Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import * as searchServices from '~/services/searchService';

import styles from './Search.module.scss';
import { Wrapper as PopoverWrapper } from '~/components/Popover';
import AccountItem from '../../../components/AccountItem';
import { SearchIcon } from '~/components/Icons';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(styles);

function Search() {
   const [searchText, setSeatchText] = useState('');
   const [searchResult, setSearchResult] = useState([]);
   const [showResult, setShowResult] = useState(true);
   const [loading, setLoading] = useState(false);

   const inputRef = useRef();
   const searchDebounce = useDebounce(searchText, 800);

   const handleClearSeach = () => {
      setSeatchText('');
      setSearchResult([]);
      inputRef.current.focus();
   };
   const handleHideResult = () => {
      setShowResult(false);
   };
   const handleSearch = (e) => {
      const searchValue = e.target.value;
      if (!searchValue.startsWith(' ')) {
         setSeatchText(searchValue);
      }
   };

   useEffect(() => {
      if (!searchDebounce.trim()) {
         setSearchResult([]);
         return;
      }

      setLoading(true);

      //encodeURIComponent -- mã hoá các kí tự trùng trên url thành kí tự hợp lệ
      const fetchApi = async () => {
         setLoading(true);
         const res = await searchServices.search(searchDebounce);
         setSearchResult(res);

         setLoading(false);
      };
      fetchApi();
   }, [searchDebounce]);

   return (
      // Prevent Tippy warning: using <div> to resolve parentNode for Tippy
      <div>
         <HeadlessTippy
            interactive
            visible={showResult && searchResult.length > 0}
            render={(attrs) => (
               <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                  <PopoverWrapper>
                     <h4 className={cx('search-title')}>Account</h4>
                     {searchResult.map((result) => (
                        <AccountItem key={result.id} data={result} />
                     ))}
                  </PopoverWrapper>
               </div>
            )}
            onClickOutside={handleHideResult}
         >
            <div className={cx('search')}>
               <input
                  ref={inputRef}
                  value={searchText}
                  placeholder="Search account and videos"
                  spellCheck={false}
                  onChange={handleSearch}
                  onFocus={() => setShowResult(true)}
               />
               {searchText && !loading && (
                  <button className={cx('clear')} onClick={handleClearSeach}>
                     <FontAwesomeIcon icon={solid('circle-xmark')} />
                  </button>
               )}
               {loading && (
                  <FontAwesomeIcon
                     className={cx('loading')}
                     icon={solid('spinner')}
                  />
               )}
               <button
                  className={cx('search-btn')}
                  onMouseDown={(e) => e.preventDefault()}
               >
                  <SearchIcon />
               </button>
            </div>
         </HeadlessTippy>
      </div>
   );
}

export default Search;
