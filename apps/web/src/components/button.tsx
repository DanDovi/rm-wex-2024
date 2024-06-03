export const Button = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) => {
  const { children, ...rest } = props;
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
      {...rest}
    >
      {children}
    </button>
  );
};
