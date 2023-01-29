import { Link } from "react-router-dom";
import Button from "../button/Button";
import "./LinkButton.scss";

interface Props {
  url: string;
  children: string;
}

function LinkButton({ url, children }: Props) {
  return (
    <Link to={url}>
      <Button>{children}</Button>
    </Link>
  );
}

export default LinkButton;
