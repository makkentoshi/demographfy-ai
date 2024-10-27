export async function getMessages(locale) {
  let messages;
  switch (locale) {
    case "ru":
      messages = (await import("./public/locales/ru.json")).default;
      break;
    case "kk":
      messages = (await import("./public/locales/kk.json")).default;
      break;
    default:
      messages = (await import("./public/locales/en.json")).default;
  }
  return messages;
}
