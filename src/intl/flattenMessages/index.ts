// https://github.com/yahoo/react-intl/wiki/Upgrade-Guide#flatten-messages-object
const flattenMessages = (nestedMessages = {}, prefix = "") => {
  const flattenedMessages = Object.keys(nestedMessages).reduce(
    (messages, key) => {
      // @ts-ignore
      let value = nestedMessages[key];
      let prefixedKey = prefix ? `${prefix}.${key}` : key;

      if (typeof value === "string") {
        // @ts-ignore
        messages[prefixedKey] = value;
      } else {
        Object.assign(messages, flattenMessages(value, prefixedKey));
      }

      return messages;
    },
    {}
  );

  return flattenedMessages;
};

export default flattenMessages;
