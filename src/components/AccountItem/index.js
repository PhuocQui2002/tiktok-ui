import classNames from "classnames/bind";
import styles from "./AccountItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles)

function AccountItem() {
    return ( 
        <div className={cx("wrapper")}>
            <img className={cx("avatar")} src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/62dd61737529e0f5f8d9aa77033387b7.jpeg?lk3s=a5d48078&x-expires=1708938000&x-signature=4qfVV5A5zZEzGDfQ7lbAFpgpN6w%3D" alt="hinh avatar"/>
            <div>
                <h4 className={cx("name")}>
                    <span>Ho va ten</span>
                    <FontAwesomeIcon className={cx("check-icon")} icon={faCheckCircle} />
                </h4>
                <span className={cx("username")}>nguyenngocmeow</span>
            </div>
        </div>
     );
}

export default AccountItem;