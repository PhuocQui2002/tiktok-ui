import AccountItem from "../../../AccountItem";
import HeadllessTippy from "@tippyjs/react/headless";
import { Wrapper as PopperWrapper } from "~/components/Popper";
import classNames from "classnames/bind";
import styles from "./Search.modules.scss";
import { useDebounce } from "~/hooks";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useRef } from "react";
import {
  faCircleXmark,
  faSpinner,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

// import * as request from "~/utils/request";
import * as searchServices from "~/apiServices/searchServices";

const cx = classNames.bind(styles);
function Search() {
  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [show, setShow] = useState(true);
  const [showLoading, setShowLoading] = useState(false);

  const debounced = useDebounce(searchValue, 500);

  const inputRef = useRef();

  // useEffect(() => {
  //   if (!debounced.trim()) {
  //     setSearchResult([]);
  //     return;
  //   }
  //   setShowLoading(true);
  //   fetch(
  //     `https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(
  //       debounced
  //     )}&type=less`
  //   )
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setSearchResult(res.data);
  //       setShowLoading(false);
  //     })
  //     .catch(() => {
  //       setShowLoading(false);
  //     });
  // }, [debounced]);
  ////////////////////////////////////////////////////////////////////////////////////////////////
  // useEffect(() => {
  //   if (!debounced.trim()) {
  //     setSearchResult([]);
  //     return;
  //   }
  //   setShowLoading(true);

  //   request.get(
  //     `users/search`,{
  //       params: {
  //         q: debounced,
  //         type: 'less',
  //     },
  //   })
  //     .then((res) => {
  //       setSearchResult(res.data);
  //       setShowLoading(false);
  //     })
  //     .catch(() => {
  //       setShowLoading(false);
  //     });
  // }, [debounced]);
  ////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]);
      return;
    }

    const fetchApi = async () => {
      setShowLoading(true);
      const result = await searchServices.search(debounced);
      setSearchResult(result);
      setShowLoading(false);
    };

    fetchApi();
  }, [debounced]);

  ////////////////////////////////
  const handleHideResult = () => {
    setShow(false);
  };
  const handleClear = () => {
    setSearchValue("");
    setSearchResult([]);
    inputRef.current.focus();
  };
  return (
    <div>
      <HeadllessTippy
        // appendTo={()=> document.body}
        interactive
        visible={show && searchResult.length > 0}
        render={(attrs) => (
          <div className={cx("search-result")} tabIndex="-1" {...attrs}>
            <PopperWrapper>
              <h4 className={cx("search-title")}> Accounts </h4>
              {searchResult.map((result) => (
                <AccountItem key={result.id} data={result} />
              ))}
            </PopperWrapper>
          </div>
        )}
        onClickOutside={handleHideResult}
      >
        <div className={cx("search")}>
          <input
            ref={inputRef}
            value={searchValue}
            placeholder="search account and video"
            spellCheck={false}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setShow(true)}
          />
          {!!searchValue && !showLoading && (
            <button className={cx("clear")}>
              <FontAwesomeIcon icon={faCircleXmark} onClick={handleClear} />
            </button>
          )}
          {showLoading && (
            <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />
          )}

          <button className={cx("search-btn")}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </HeadllessTippy>
    </div>
  );
}

export default Search;
