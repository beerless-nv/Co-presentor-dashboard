let parseTextToSSML = (text) => {
  // variables
  const breakTimePoint = 700;
  const breakTimeQuestionMark = 700;
  const breakTimeExclamationMark = 700;
  const breakTimeComma = 450;
  const breakTimeSemicolon = 450;

  // const breakTimeQuestionMark = breakTimePoint;

  // parse text to ssml
  text = '<speak>' + text + '</speak>';
  text = text.replace(/\.(?=(?:[^"]|"[^"]*")*$)/g, '.<break time="' + breakTimePoint + 'ms"/>');
  text = text.replace(/\.(?=(?:[^"]|"[^"]*")*$)/g, '.<break time="' + breakTimeQuestionMark + 'ms"/>');
  text = text.replace(/\.(?=(?:[^"]|"[^"]*")*$)/g, '.<break time="' + breakTimeExclamationMark + 'ms"/>');
  text = text.replace(/,(?=(?:[^"]|"[^"]*")*$)/g, ',<break time="' + breakTimeComma + 'ms"/>');
  text = text.replace(/,(?=(?:[^"]|"[^"]*")*$)/g, ',<break time="' + breakTimeSemicolon + 'ms"/>');

  return text;
};

export default parseTextToSSML;
