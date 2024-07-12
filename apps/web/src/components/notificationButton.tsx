import styles from "./notificationButton.module.css";

export const NotificationButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) => {
  const { children, className, ...rest } = props;
  return (
    <button
    >
      {children}
    </button>
  );
};