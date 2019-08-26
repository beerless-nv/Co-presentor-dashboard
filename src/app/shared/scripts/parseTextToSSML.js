let parseTextToSSML = (text) => {
  // variables
  const breakTimePoint = 400;
  const breakTimeComma = 200;

  // parse text to ssml
  text = '<speak>' + text + '</speak>';
  text = text.replace(/\.(?=(?:[^"]|"[^"]*")*$)/g, '.<break time="' + breakTimePoint + 'ms"/>');
  text = text.replace(/,(?=(?:[^"]|"[^"]*")*$)/g, ',<break time="' + breakTimeComma + 'ms"/>');

  return text;
};

export default parseTextToSSML;
