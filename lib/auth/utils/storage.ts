import { ACCOUNT_KEY } from "../config/constants";

// Checks local storage if auth object is stored
const checkSessionStorage = () => {
  let account: any = sessionStorage.getItem(ACCOUNT_KEY);
  try {
    if (account) {
      account = JSON.parse(account);
      if (account.idTokenParsed) return account;
    }
  } catch (error) {
    console.error(error);
  }
  return null;
};

// Add custom event for session storage change
const addSessionStorageEvent = () => {
  const originalSetItem = sessionStorage.setItem;
  const originalRemoveItem = sessionStorage.removeItem;

  // Override setItem
  sessionStorage.setItem = function (key, value) {
    const oldValue = sessionStorage.getItem(key);

    // Dispatch custom 'storage-like' event
    const event = new CustomEvent("session-storage", {
      detail: {
        key: key,
        oldValue: oldValue,
        newValue: value,
        storageArea: sessionStorage
      }
    });
    window.dispatchEvent(event);

    // Call the original setItem
    // eslint-disable-next-line prefer-rest-params
    originalSetItem.apply(this, arguments as any);
  };

  // Override removeItem
  sessionStorage.removeItem = function (key) {
    const oldValue = sessionStorage.getItem(key);

    // Dispatch custom 'storage-like' event for remove
    const event = new CustomEvent("session-storage", {
      detail: {
        key: key,
        oldValue: oldValue,
        newValue: null,
        storageArea: sessionStorage
      }
    });
    window.dispatchEvent(event);

    // Call the original removeItem
    // eslint-disable-next-line prefer-rest-params
    originalRemoveItem.apply(this, arguments as any);
  };
};

export { checkSessionStorage, addSessionStorageEvent };
