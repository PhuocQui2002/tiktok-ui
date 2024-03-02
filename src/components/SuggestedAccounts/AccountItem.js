import classNames from "classnames/bind";
import styles from "./SuggestedAccounts.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
function AccountItem() {
  return (
    <div className={cx("account-item")}>
      <img
        className={cx("avatar")}
        alt=""
        src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/9be2d23f22454893d1bf86f063225545.jpeg?lk3s=a5d48078&x-expires=1709532000&x-signature=op2IUOk7x%2BfOqMUCPZPPdMPV%2F7Y%3D"
      ></img>
      <div className={cx("item-info")}>
        <h5 className={cx("nickname")}>
          NguyenNgocMeow <FontAwesomeIcon className={cx("check")} icon={faCheckCircle} />
        </h5>
        <p className={cx("name")}>Nguyen Ngoc Diep</p>
      </div>
    </div>
  );
}

export default AccountItem;
