const formatTime = (time: number): string => {
  const min = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const sec = (time % 60).toString().padStart(2, "0");

  return `${min}:${sec}`;
};

export default formatTime;
