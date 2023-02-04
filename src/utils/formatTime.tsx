// convert an integer number of seconds to "00:00" string format
const formatTime = (time: number): string => {
  const min = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const sec = (time % 60).toString().padStart(2, "0");

  return `${min}:${sec}`;
};

export default formatTime;
