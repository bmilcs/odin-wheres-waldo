const formatTime = (time: number): string => {
  let sec: string, min: string;

  if (time < 60) {
    sec = time.toString().padStart(2, "0");
    min = "00";
  } else {
    min = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    sec = (time % 60).toString();
  }

  return `${min}:${sec}`;
};

export default formatTime;
