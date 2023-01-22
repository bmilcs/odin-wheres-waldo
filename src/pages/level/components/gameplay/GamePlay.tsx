import React, { useState } from "react";
import "./GamePlay.scss";

interface Props {
  image: string;
}

function GamePlay({ image }: Props) {
  return <ImageMagnifier height={"95%"} width={"95%"} src={image} />;
}

// source: Anxiny article on dev.to
// https://dev.to/anxiny/create-an-image-magnifier-with-react-3fd7

function ImageMagnifier({
  src,
  width,
  height,
  magnifierHeight = 100,
  magnifieWidth = 100,
  zoomLevel = 3,
}: {
  src: string;
  width?: string;
  height?: string;
  magnifierHeight?: number;
  magnifieWidth?: number;
  zoomLevel?: number;
}) {
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);

  return (
    <div
      className="gameplay"
      style={{
        height: height,
        width: width,
      }}
    >
      <img
        src={src}
        onMouseEnter={(e) => {
          // update image size and turn-on magnifier
          const elem = e.currentTarget;
          const { width, height } = elem.getBoundingClientRect();
          setSize([width, height]);
          setShowMagnifier(true);
        }}
        onMouseMove={(e) => {
          // update cursor position
          const elem = e.currentTarget;
          const { top, left } = elem.getBoundingClientRect();

          // calculate cursor position on the image
          const x = e.pageX - left - window.pageXOffset;
          const y = e.pageY - top - window.pageYOffset;
          setXY([x, y]);
        }}
        onMouseLeave={() => {
          setShowMagnifier(false);
        }}
        alt={"Wheres Waldo Level"}
      />

      <div
        className="gameplay__zoom"
        style={{
          display: showMagnifier ? "" : "none",
          // set size of magnifier
          height: `${magnifierHeight}px`,
          width: `${magnifieWidth}px`,

          // move element center to cursor pos
          top: `${y - magnifierHeight / 2}px`,
          left: `${x - magnifieWidth / 2}px`,
          backgroundImage: `url('${src}')`,

          // zoomed image size
          backgroundSize: `${imgWidth * zoomLevel}px ${
            imgHeight * zoomLevel
          }px`,

          // zoom image position:
          backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
          backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
        }}
      ></div>
    </div>
  );
}

export default GamePlay;
