export const Button = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) => {
  const { children, ...rest } = props;
  return (
    <button
      className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
      {...rest}
    >
      {children}
    </button>
  );
};
