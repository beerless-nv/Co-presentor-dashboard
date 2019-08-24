let parseTextToSSML = (text) => {
  text = '<speak>' + text + '</speak>';
  return text;
};

export default parseTextToSSML;
