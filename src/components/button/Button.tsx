import "./Button.scss";

interface Props {
  children: string;
  className?: string;
}

function Button({ children }: Props) {
  return <button className="button">{children}</button>;
}

export default Button;
