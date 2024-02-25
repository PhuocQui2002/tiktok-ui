import classNames from "classnames/bind";
import styles from "./Button.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
function Button({
  to,
  href,
  primary = false,
  outline = false,
  test = false,
  small = false,
  large = false,
  disabled = false,
  rounded = false,
  children,
  onClick,
  className,
  letfIcon,
  rightIcon,
  ...passProps
}) {
  let Comp = "button";
  const props = {
    onClick,
    ...passProps,
  };
  if (disabled) {
    delete props.onClick;
  }

  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = "a";
  }
  const classes = cx("wrapper", {
    primary,
    outline,
    small,
    large,
    test,
    disabled,
    rounded,

    [className]: className,
  });
  return (
    <Comp className={classes} {...props}>
      {letfIcon && <span className={cx("icon")}>{letfIcon}</span>}
      <span className={cx("title")} >{children}</span>
      {rightIcon && <span className={cx("icon")}>{rightIcon}</span>}
    </Comp>
  );
}

export default Button;
