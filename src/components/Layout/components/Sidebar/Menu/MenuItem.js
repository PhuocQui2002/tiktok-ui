import { NavLink } from "react-router-dom";
import styles from "./Menu.modules.scss";
import classNames from "classnames";

const cx = classNames.bind(styles);
function MenuItem({ title, to, icon, activeIcon }) {
  return (
    <NavLink
      className={(nav) => cx("menu-item", { active: nav.isActive })}
      to={to}
    >
      <h4 className={cx("icon")}>{icon}</h4>
      <h4 className={cx("active-icon")}>{activeIcon}</h4>
      <h4 className={cx("title")}>{title}</h4>
    </NavLink>
  );
}

export default MenuItem;
