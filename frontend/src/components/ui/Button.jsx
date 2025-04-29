// components/ui/Button.jsx

const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "medium",
  className = "",
  ...rest
}) => {
  const getSizeClass = () => {
    switch (size) {
      case "small":
        return "btn-small";
      case "large":
        return "btn-large";
      default:
        return "";
    }
  };

  return (
    <button
      className={`btn btn-${variant} ${getSizeClass()} ${className}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
