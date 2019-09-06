let parseTextToSSML = (text, breakTimes) => {
  text = '<speak>' + text + '</speak>';
  breakTimes.map(breakTime => {
    const regexp = new RegExp('\\' + breakTime.leesteken + '(?=(?:[^"]|"[^"]*")*$)', 'g');
    text = text.replace(regexp, breakTime.leesteken + '<break time="' + (breakTime.waarde * 1000) + 'ms"/>');
  });

  return text;
};

export default parseTextToSSML;
