(function initCraftLogQoL() {
  const lang = () => (document.documentElement.lang === "en" ? "en" : "de");

  const t = {
    de: {
      shareBtn: "Link teilen",
      shareCopied: "Teilen-Link in die Zwischenablage kopiert!",
      shareManualTitle: "Teilen-Link kopieren",
      shareManualHint: "Dein Browser blockiert automatisches Kopieren (z. B. unter file://). Kopiere den Link hier manuell:",
      shareManualCopy: "Kopieren",
      shareManualClose: "Schließen",
      sharedBannerTitle: "Geteilte Projektliste erkannt",
      sharedBannerMeta: (name, count) => `„${name}“ (${count} Materialien)`,
      sharedImportBtn: "Liste übernehmen",
      sharedDismissBtn: "Schließen",
      undoBtn: "Rückgängig",
      itemDeleted: (name) => `„${name}“ entfernt`,
      listDeleted: (name) => `Liste „${name}“ gelöscht`,
      stepMinus1: "Menge um 1 verringern",
      stepPlus1: "Menge um 1 erhöhen",
      stepPlus64: "1 Stack (+64) hinzufügen"
    },
    en: {
      shareBtn: "Share link",
      shareCopied: "Share link copied to clipboard!",
      shareManualTitle: "Copy share link",
      shareManualHint: "Your browser blocked automatic clipboard access (e.g. on file://). Copy the link manually:",
      shareManualCopy: "Copy",
      shareManualClose: "Close",
      sharedBannerTitle: "Shared project list detected",
      sharedBannerMeta: (name, count) => `"${name}" (${count} materials)`,
      sharedImportBtn: "Import list",
      sharedDismissBtn: "Dismiss",
      undoBtn: "Undo",
      itemDeleted: (name) => `Removed "${name}"`,
      listDeleted: (name) => `Deleted list "${name}"`,
      stepMinus1: "Decrease quantity by 1",
      stepPlus1: "Increase quantity by 1",
      stepPlus64: "Add 1 stack (+64)"
    }
  };

  function tr(key, ...args) {
    const entry = t[lang()][key];
    return typeof entry === "function" ? entry(...args) : entry;
  }

  /* =========================================================
     Storage-Helfer
     ========================================================= */
  function readState() {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;
      try {
        const parsed = JSON.parse(localStorage.getItem(key));
        if (parsed && Array.isArray(parsed.lists)) {
          return { key, data: parsed, isRootArray: false };
        }
        if (Array.isArray(parsed) && parsed[0] && Array.isArray(parsed[0].items)) {
          return { key, data: { lists: parsed }, isRootArray: true };
        }
      } catch {
        // kein JSON
      }
    }
    return null;
  }

  function writeStateAndRefresh(state) {
    const toSave = state.isRootArray ? state.data.lists : state.data;
    localStorage.setItem(state.key, JSON.stringify(toSave));
    if (typeof window.renderCraftLog === "function") {
      window.renderCraftLog();
    } else {
      location.reload();
    }
  }

  function getActiveList(state) {
    const lists = state?.data?.lists;
    if (!Array.isArray(lists) || lists.length === 0) return null;

    const activeId = state.data.activeListId || state.data.selectedListId;
    if (activeId) {
      const byId = lists.find(l => l.id === activeId);
      if (byId) return byId;
    }

    const pageTitle = document.querySelector("#workspace .page-title")?.textContent?.trim();
    if (pageTitle) {
      const byName = lists.find(l => l.name === pageTitle);
      if (byName) return byName;
    }

    return lists[0];
  }

  function getQtyField(item) {
    if (typeof item.quantity !== "undefined") return "quantity";
    if (typeof item.count !== "undefined") return "count";
    if (typeof item.amount !== "undefined") return "amount";
    return "quantity";
  }

  /* =========================================================
     Undo-Toast-System
     ========================================================= */
  let undoTimer = null;

  function showUndoToast(message, onUndo) {
    let host = document.getElementById("craftlog-qol-toast");
    if (!host) {
      host = document.createElement("div");
      host.id = "craftlog-qol-toast";
      host.className = "qol-toast";
      host.setAttribute("role", "status");
      host.setAttribute("aria-live", "polite");
      document.body.appendChild(host);
    }

    host.innerHTML = "";
    const text = document.createElement("span");
    text.className = "qol-toast-text";
    text.textContent = message;
    host.appendChild(text);

    if (typeof onUndo === "function") {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "qol-toast-undo";
      btn.textContent = tr("undoBtn");
      btn.addEventListener("click", () => {
        clearTimeout(undoTimer);
        host.classList.remove("is-visible");
        onUndo();
      });
      host.appendChild(btn);
    }

    requestAnimationFrame(() => host.classList.add("is-visible"));

    clearTimeout(undoTimer);
    undoTimer = setTimeout(() => {
      host.classList.remove("is-visible");
    }, 6000);
  }

  document.addEventListener(
    "click",
    event => {
      const removeBtn = event.target.closest(".remove-button");
      if (removeBtn) {
        const state = readState();
        const activeList = getActiveList(state);
        const itemCard = removeBtn.closest(".item");
        if (!state || !activeList || !itemCard) return;

        const itemName =
          itemCard.querySelector(".item-name")?.textContent?.trim() || "Item";
        const snapshot = structuredClone(activeList);

        setTimeout(() => {
          showUndoToast(tr("itemDeleted", itemName), () => {
            const current = readState();
            if (!current) return;
            const idx = current.data.lists.findIndex(l => l.id === snapshot.id);
            if (idx !== -1) {
              current.data.lists[idx] = snapshot;
              writeStateAndRefresh(current);
            }
          });
        }, 40);
        return;
      }

      const deleteListBtn = event.target.closest(".heading-actions .danger-button");
      if (deleteListBtn) {
        const state = readState();
        const activeList = getActiveList(state);
        if (!state || !activeList) return;

        const snapshot = structuredClone(state);
        const deletedName = activeList.name || "Liste";

        setTimeout(() => {
          const after = readState();
          if (after && after.data.lists.length < snapshot.data.lists.length) {
            showUndoToast(tr("listDeleted", deletedName), () => {
              writeStateAndRefresh(snapshot);
            });
          }
        }, 60);
      }
    },
    true
  );

  /* =========================================================
     Schnelle Mengen-Stepper (-1 / +1 / +64) OHNE Seiten-Reload
     ========================================================= */
  function adjustItemQuantity(itemCard, delta) {
    // Nutzt direkt das eingebaute „Menge ändern“-Formular der Karte (kein Reload, kein Flackern)
    let form = itemCard.querySelector(".quantity-edit-form");
    if (!form) {
      const editBtn = itemCard.querySelector(".edit-quantity-button");
      if (!editBtn) return;
      editBtn.click();
      form = itemCard.querySelector(".quantity-edit-form");
    }

    const input = form?.querySelector("input[type='number']");
    if (!form || !input) return;

    const current = Math.max(1, Number(input.value) || 1);
    const next = Math.max(1, current + delta);
    if (next === current) {
      form.querySelector(".quiet-button")?.click();
      return;
    }

    input.value = String(next);
    form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  }

  function enhanceItemCards() {
    const cards = document.querySelectorAll("#workspace .items .item");
    cards.forEach(card => {
      const actions = card.querySelector(".item-actions");
      if (!actions || actions.querySelector(".item-quick-stepper")) return;

      const stepper = document.createElement("div");
      stepper.className = "item-quick-stepper";

      const steps = [
        { delta: -1, label: "−1", title: tr("stepMinus1") },
        { delta: 1, label: "+1", title: tr("stepPlus1") },
        { delta: 64, label: "+64", title: tr("stepPlus64") }
      ];

      steps.forEach(({ delta, label, title }) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "item-step-btn";
        btn.textContent = label;
        btn.title = title;
        btn.setAttribute("aria-label", title);
        btn.addEventListener("click", e => {
          e.preventDefault();
          e.stopPropagation();
          adjustItemQuantity(card, delta);
        });
        stepper.appendChild(btn);
      });

      actions.insertBefore(stepper, actions.firstChild);
    });
  }

  /* =========================================================
     Teilen-Link (#share=...)
     ========================================================= */
  function bytesToBase64Url(bytes) {
    let binary = "";
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }

  function base64UrlToBytes(str) {
    const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    const binary = atob(padded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  }

  async function encodeSharePayload(payload) {
    const rawBytes = new TextEncoder().encode(JSON.stringify(payload));

    if (typeof CompressionStream !== "undefined") {
      const cs = new CompressionStream("deflate-raw");
      const writer = cs.writable.getWriter();
      writer.write(rawBytes);
      writer.close();
      const compressed = new Uint8Array(await new Response(cs.readable).arrayBuffer());
      return "z." + bytesToBase64Url(compressed);
    }

    return "u." + bytesToBase64Url(rawBytes);
  }

  async function decodeSharePayload(encoded) {
    if (encoded.startsWith("z.") && typeof DecompressionStream !== "undefined") {
      const bytes = base64UrlToBytes(encoded.slice(2));
      const ds = new DecompressionStream("deflate-raw");
      const writer = ds.writable.getWriter();
      writer.write(bytes);
      writer.close();
      const raw = await new Response(ds.readable).arrayBuffer();
      return JSON.parse(new TextDecoder().decode(raw));
    }

    const rawPart = encoded.startsWith("u.") ? encoded.slice(2) : encoded;
    return JSON.parse(new TextDecoder().decode(base64UrlToBytes(rawPart)));
  }

  function openManualCopyDialog(shareUrl) {
    let dialog = document.getElementById("qol-share-dialog");
    if (!dialog) {
      dialog = document.createElement("dialog");
      dialog.id = "qol-share-dialog";
      dialog.className = "tc-source-dialog";
      document.body.appendChild(dialog);
    }

    dialog.innerHTML = `
      <div class="tc-dialog-inner">
        <div class="tc-dialog-header">
          <div class="tc-dialog-title-group">
            <h3 class="tc-dialog-title">${tr("shareManualTitle")}</h3>
          </div>
          <button type="button" class="tc-dialog-close" aria-label="${tr("shareManualClose")}">×</button>
        </div>
        <div class="tc-dialog-body">
          <p class="tc-dialog-empty">${tr("shareManualHint")}</p>
          <input type="text" class="litematica-name-input" readonly>
          <div class="tc-dialog-actions">
            <button type="button" class="primary-button qol-manual-copy-btn">${tr("shareManualCopy")}</button>
            <button type="button" class="quiet-button qol-manual-close-btn">${tr("shareManualClose")}</button>
          </div>
        </div>
      </div>
    `;

    const input = dialog.querySelector("input");
    input.value = shareUrl;

    const close = () => dialog.close();
    dialog.querySelector(".tc-dialog-close").addEventListener("click", close);
    dialog.querySelector(".qol-manual-close-btn").addEventListener("click", close);
    dialog.querySelector(".qol-manual-copy-btn").addEventListener("click", () => {
      input.focus();
      input.select();
      document.execCommand("copy");
      showUndoToast(tr("shareCopied"));
      close();
    });

    dialog.showModal();
    input.focus();
    input.select();
  }

  async function copyShareLink() {
    const state = readState();
    const activeList = getActiveList(state);
    if (!activeList) return;

    const compact = {
      v: 1,
      n: String(activeList.name || "CraftLog Projekt").slice(0, 60),
      note: activeList.notes ? String(activeList.notes).slice(0, 1000) : "",
      i: (activeList.items || []).map(it => {
        const field = getQtyField(it);
        return [
          String(it.id || it.itemId || "").replace(/^minecraft:/, ""),
          Math.max(1, Number(it[field]) || 1),
          it.completed ? 1 : 0
        ];
      }),
      c: activeList.recipeChoices || {},
      g: activeList.ingredientChoices || {}
    };

    const token = await encodeSharePayload(compact);
    const baseUrl = window.location.href.split("#")[0];
    const shareUrl = `${baseUrl}#share=${token}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      showUndoToast(tr("shareCopied"));
    } catch {
      openManualCopyDialog(shareUrl);
    }
  }

  function enhanceHeadingActions() {
    const actions = document.querySelector("#workspace .heading-actions");
    if (!actions || actions.querySelector(".qol-share-btn")) return;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "quiet-button qol-share-btn";
    btn.textContent = "🔗 " + tr("shareBtn");
    btn.addEventListener("click", copyShareLink);

    actions.insertBefore(btn, actions.firstChild);
  }

  async function checkIncomingShareLink() {
    const hash = window.location.hash || "";
    if (!hash.startsWith("#share=")) return;

    const token = hash.slice("#share=".length);
    if (!token) return;

    try {
      const payload = await decodeSharePayload(token);
      if (!payload || !Array.isArray(payload.i)) return;

      const workspace = document.getElementById("workspace");
      if (!workspace || document.getElementById("qol-share-banner")) return;

      const banner = document.createElement("div");
      banner.id = "qol-share-banner";
      banner.className = "qol-share-banner";

      const info = document.createElement("div");
      info.className = "qol-share-banner-info";
      info.innerHTML = `
        <strong>${tr("sharedBannerTitle")}</strong>
        <span>${tr("sharedBannerMeta", payload.n || "Projekt", payload.i.length)}</span>
      `;

      const btns = document.createElement("div");
      btns.className = "qol-share-banner-actions";

      const importBtn = document.createElement("button");
      importBtn.type = "button";
      importBtn.className = "primary-button";
      importBtn.textContent = tr("sharedImportBtn");
      importBtn.addEventListener("click", () => {
        const state = readState();
        if (!state) return;

        const templateItem = state.data.lists[0]?.items?.[0];
        const qtyField = templateItem ? getQtyField(templateItem) : "quantity";
        const newListId = "list_" + Date.now().toString(36);

        const newList = {
          id: newListId,
          name: String(payload.n || "Geteilte Liste").slice(0, 60),
          notes: payload.note || "",
          items: payload.i.map(([shortId, qty, done]) => ({
            id: shortId.startsWith("minecraft:") ? shortId : `minecraft:${shortId}`,
            [qtyField]: Math.max(1, Number(qty) || 1),
            completed: Boolean(done)
          })),
          recipeChoices: payload.c || {},
          ingredientChoices: payload.g || {}
        };

        state.data.lists.unshift(newList);
        state.data.activeListId = newListId;
        history.replaceState(null, "", window.location.pathname + window.location.search);
        banner.remove();
        writeStateAndRefresh(state);
      });

      const closeBtn = document.createElement("button");
      closeBtn.type = "button";
      closeBtn.className = "quiet-button";
      closeBtn.textContent = tr("sharedDismissBtn");
      closeBtn.addEventListener("click", () => {
        history.replaceState(null, "", window.location.pathname + window.location.search);
        banner.remove();
      });

      btns.append(importBtn, closeBtn);
      banner.append(info, btns);
      workspace.prepend(banner);
    } catch (err) {
      console.warn("Geteilter Link konnte nicht gelesen werden:", err);
    }
  }

  function enhanceAll() {
    enhanceHeadingActions();
    enhanceItemCards();
  }

  window.addEventListener("DOMContentLoaded", () => {
    enhanceAll();
    checkIncomingShareLink();

    const workspace = document.getElementById("workspace");
    if (workspace) {
      const observer = new MutationObserver(() => enhanceAll());
      observer.observe(workspace, { childList: true, subtree: true });
    }
  });

  window.addEventListener("hashchange", checkIncomingShareLink);
})();