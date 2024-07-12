import styles from "./button.module.css";

export const Button = (
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