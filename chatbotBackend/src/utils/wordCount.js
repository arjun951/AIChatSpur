function countWords(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function formatWordCountReply(count) {
  return count === 1
    ? 'Your message has 1 word.'
    : `Your message has ${count} words.`;
}

module.exports = { countWords, formatWordCountReply };
