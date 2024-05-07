function sortinModalOutsideClick(e) {
  if (e.target.closest(".sortin-app-modal-inner")) {
    return;
  }
  const modalVisible = document.querySelector(".sortin-app-modal-visible");
  if (modalVisible) {
    sortinModalCloseModal();
  }
}
function sortinModalEscKey(e) {
  if (e.keyCode == 27) {
    sortinModalCloseModal();
  }
}
function sortinModalCloseClick(e) {
  if (e.target.classList.contains("sortin-app-close-modal")) {
    sortinModalCloseModal();
  }
}
function sortinModalTrapTabKey(e) {
  const sortinModalElem = document.querySelector("#sortin-app-modal");
  const FOCUSABLE_ELEMENTS = [
    "a[href]",
    "area[href]",
    'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
    "select:not([disabled]):not([aria-hidden])",
    "textarea:not([disabled]):not([aria-hidden])",
    "button:not([disabled]):not([aria-hidden])",
    "iframe",
    "object",
    "embed",
    "[contenteditable]",
    '[tabindex]:not([tabindex^="-"])',
  ];
  const nodes = sortinModalElem.querySelectorAll(FOCUSABLE_ELEMENTS);
  let focusableNodes = Array(...nodes);
  if (focusableNodes.length === 0) return;
  focusableNodes = focusableNodes.filter((node) => {
    return node.offsetParent !== null;
  });

  if (!sortinModalElem.contains(document.activeElement)) {
    focusableNodes[0].focus();
  } else {
    const focusedItemIndex = focusableNodes.indexOf(document.activeElement);
    if (e.shiftKey && focusedItemIndex === 0) {
      focusableNodes[focusableNodes.length - 1].focus();
      e.preventDefault();
    }
    if (
      !e.shiftKey &&
      focusableNodes.length > 0 &&
      focusedItemIndex === focusableNodes.length - 1
    ) {
      focusableNodes[0].focus();
      e.preventDefault();
    }
  }
}
function sortinModalCloseModal() {
  const sortinModalElem = document.querySelector("#sortin-app-modal");
  if (sortinModalElem) {
    sortinModalElem.classList.remove("sortin-app-modal-visible");
  }
  document.body.style.overflow = "auto";
  document.removeEventListener("keydown", sortinModalEscKey);
  document.removeEventListener("click", sortinModalOutsideClick, true);
  document.removeEventListener("click", sortinModalCloseClick);
  document.removeEventListener("keydown", sortinModalTrapTabKey);
}
const sortinAppModal = {
  open: function () {
    let sortinModalElem = document.querySelector("#sortin-app-modal");
    sortinModalElem.classList.add("sortin-app-modal-visible");
    document.addEventListener("click", sortinModalOutsideClick, true);
    document.addEventListener("keydown", sortinModalEscKey);
    document.addEventListener("keydown", sortinModalTrapTabKey);
    document
      .getElementById("sortin-app-modal-close")
      .addEventListener("click", sortinModalCloseClick);
    document.body.style.overflow = "hidden";
  },
  close: function () {
    sortinModalCloseModal();
  },
};
const sortinAppBannerElem = document.getElementById("sortin-app-banner");
const sortinAppFABElem = document.getElementById("sortin-app-fab");
const sortinAppProductElem = document.getElementById(
  "sortin-app-product-emission",
);
const sortinAppCartElem = document.getElementById("sortin-app-cart-emission");
const sortinAppMiniCartElem = document.getElementById(
  "sortin-app-mini-cart-emission",
);

if (sortinAppBannerElem)
  sortinAppBannerElem.addEventListener("click", () => {
    if (sortinAppModal) sortinAppModal.open();
  });
if (sortinAppFABElem)
  sortinAppFABElem.addEventListener("click", () => {
    if (sortinAppModal) sortinAppModal.open();
  });
if (sortinAppProductElem)
  sortinAppProductElem.addEventListener("click", () => {
    if (sortinAppModal) sortinAppModal.open();
  });
if (sortinAppCartElem) {
  sortinAppCartElem.addEventListener("click", () => {
    if (sortinAppModal) sortinAppModal.open();
  });
  const sortinCartObserver = new MutationObserver(function (mutations) {
    let data = { co2e: 0, plastic: 0 };
    document.querySelectorAll("[data-sortin-cart-item]").forEach((elem) => {
      const elemQty = elem.querySelector(
        "[data-sortin-cart-item-qty]",
      ).textContent;
      const elemCo2e = elem.querySelector(
        "[data-sortin-cart-item-co2e]",
      ).textContent;
      const elemPlastic = elem.querySelector(
        "[data-sortin-cart-item-plastic]",
      ).textContent;
      data.co2e += parseInt(elemCo2e.slice(0, -1)) * parseInt(elemQty);
      data.plastic += parseInt(elemPlastic.slice(0, -1)) * parseInt(elemQty);
    });
    document.querySelector(`[data-sortin-cart-emission-co2e]`).textContent =
      data.co2e + "g";
    document.querySelector(`[data-sortin-cart-emission-plastic]`).textContent =
      data.plastic + "g";
  });
  sortinCartObserver.observe(document, { subtree: true, childList: true });
  document
    .getElementById("sortin-cart-discount")
    .addEventListener("click", (event) => {
      const miniCartButtonElem = document.getElementById("sortin-mini-cart-discount");
      if (miniCartButtonElem) miniCartButtonElem.disabled = true;
      event.target.disabled = true;
      document.querySelector(".sortin-app-frame").contentWindow.postMessage(
        {
          type: "gnrtdsnt",
          id: event.target.id,
        },
        "http://localhost:3000/",
      );
    });
}
if (sortinAppMiniCartElem) {
  sortinAppMiniCartElem.addEventListener("click", () => {
    if (sortinAppModal) sortinAppModal.open();
  });
  const sortinMiniCartObserver = new MutationObserver(function (mutations) {
    let data = { co2e: 0, plastic: 0 };
    document
      .querySelectorAll("[data-sortin-mini-cart-item]")
      .forEach((elem) => {
        const elemQty = elem.querySelector(
          "[data-sortin-mini-cart-item-qty]",
        ).textContent;
        const elemCo2e = elem.querySelector(
          "[data-sortin-mini-cart-item-co2e]",
        ).textContent;
        const elemPlastic = elem.querySelector(
          "[data-sortin-mini-cart-item-plastic]",
        ).textContent;
        data.co2e += parseInt(elemCo2e.slice(0, -1)) * parseInt(elemQty);
        data.plastic += parseInt(elemPlastic.slice(0, -1)) * parseInt(elemQty);
      });
    document.querySelector(
      `[data-sortin-mini-cart-emission-co2e]`,
    ).textContent = data.co2e + "g";
    document.querySelector(
      `[data-sortin-mini-cart-emission-plastic]`,
    ).textContent = data.plastic + "g";
  });
  sortinMiniCartObserver.observe(document, { subtree: true, childList: true });
  document
    .getElementById("sortin-mini-cart-discount")
    .addEventListener("click", (event) => {
      const cartButtonElem = document.getElementById("sortin-cart-discount");
      if (cartButtonElem) cartButtonElem.disabled = true;
      event.target.disabled = true;
      document.querySelector(".sortin-app-frame").contentWindow.postMessage(
        {
          type: "gnrtdsnt",
          id: event.target.id,
        },
        "http://localhost:3000/",
      );
    });
}

window.addEventListener("message", async (e) => {
  if (e.origin == "http://localhost:3000") {
    if (e.data.type === "gtdscnt") {
      console.log("frame respone");
      const loadingErrorElem = document.querySelectorAll(
        ".sortin-app-discount-loading-error",
      );
      loadingErrorElem.forEach((el) => (el.textContent = "Fetching Coins..."));
      const loadingInterval = setInterval(() => {
        loadingErrorElem.forEach(
          (el) => (el.textContent = "Genrating discount code..."),
        );
      }, 1000);

      await new Promise((res) => setTimeout(res, 2000));
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          headerToken: e.data.value,
          shopId: window.origin,
          coins:50,
          amount:50
        }),
      };
      const endpoint = `${window.origin}/apps/sortin/discount-code/create`;
      const response = await fetch(endpoint, requestOptions);

      if (!response.ok) {
        console.log(await response.json());
      clearInterval(loadingInterval);
      loadingErrorElem.forEach(
        (el) => (el.textContent = "Sorry something went wrong try again"),
      );
      }
      else {
      clearInterval(loadingInterval);
      loadingErrorElem.forEach(
        (el) => (el.textContent = "Applying discount code..."),
      );
        const data = await response.json();
        console.log(data);
        console.log("Data", data.discountCode);
        document.cookie = `discount_code=${data.discountCode}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
        await fetch(`/discount/${data.discountCode}`);
        await new Promise((res) => setTimeout(res, 2000));

        await fetch("/cart/update.js", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            updates: {},
          }),
        });
      }

      await new Promise((res) => setTimeout(res, 1000));
      loadingErrorElem.forEach((el) => (el.textContent = ""));
    }
    if (e.data.type === "ntlgdn") {
      sortinAppModal.open();
      const cartButtonElem = document.getElementById("sortin-cart-discount");
      if (cartButtonElem) cartButtonElem.disabled = true;
      document.getElementById("sortin-mini-cart-discount").disabled = true;
    }
  }
});
