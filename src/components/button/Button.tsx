import "./Button.scss";

interface Props {
  children: string;
}

function Button({ children }: Props) {
  return <button className="button">{children}</button>;
}

export default Button;
