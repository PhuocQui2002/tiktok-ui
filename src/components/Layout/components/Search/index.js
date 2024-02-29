import AccountItem from "../../../AccountItem";
import HeadllessTippy from "@tippyjs/react/headless";
import { Wrapper as PopperWrapper } from "~/components/Popper";
import classNames from "classnames/bind";
import styles from "./Search.modules.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useRef } from "react";
import {
  faCircleXmark,
  faSpinner,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
function Search() {
  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [show, setShow] = useState(true);
  const [showLoading, setShowLoading] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    

    if (!searchValue.trim()) {
        setSearchResult([]);
      return;
    }
    setShowLoading(true);
    fetch(
      `https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(
        searchValue
      )}&type=less`
    )
      .then((res) => res.json())
      .then((res) => {
        setSearchResult(res.data);
        setShowLoading(false);
      })
      .catch(() => {
        setShowLoading(false);
      });
  }, [searchValue]);

  const handleHideResult = () => {
    setShow(false);
  };
  const handleClear = () => {
    setSearchValue("");
    setSearchResult([]);
    inputRef.current.focus();
  };
  return (
    <HeadllessTippy
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
        {!!searchValue && !showLoading&& (
          <button className={cx("clear")}>
            <FontAwesomeIcon icon={faCircleXmark} onClick={handleClear} />
          </button>
        )}
        {showLoading && <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />}

        <button className={cx("search-btn")}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </HeadllessTippy>
  );
}

export default Search;
