import { I18n } from "i18n-js";
import Arabic from "./ar";
import English from "./en";
const Locales = new I18n({
  ar: Arabic,
  en: English,
});

Locales.enableFallback = true;

export { Locales };
