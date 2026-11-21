(function initCraftLogQoL() {
  const LISTS_KEY = "minecraft-materiallisten-v2";
  const lang = () => (document.documentElement.lang === "en" ? "en" : "de");

  const t = {
    de: {
      shareBtn: "🔗 Link teilen",
      shareCopiedBtn: "✓ Link kopiert!",
      shareManualTitle: "Teilen-Link kopieren",
      shareManualHint: "Dein Browser blockiert automatisches Kopieren (z. B. unter file://). Kopiere den Link hier manuell:",
      shareManualCopy: "Kopieren",
      shareManualClose: "Schließen",
      sharedBannerTitle: "Geteilte Projektliste erkannt",
      sharedBannerMeta: (name, count) => `„${name}“ (${count} Materialien)`,
      sharedImportBtn: "Liste übernehmen",
      sharedDismissBtn: "Schließen",
      stepMinus1: "Menge um 1 verringern",
      stepPlus1: "Menge um 1 erhöhen",
      stepPlus64: "1 Stack (+64) hinzufügen"
    },
    en: {
      shareBtn: "🔗 Share link",
      shareCopiedBtn: "✓ Link copied!",
      shareManualTitle: "Copy share link",
      shareManualHint: "Your browser blocked automatic clipboard access (e.g. on file://). Copy the link manually:",
      shareManualCopy: "Copy",
      shareManualClose: "Close",
      sharedBannerTitle: "Shared project list detected",
      sharedBannerMeta: (name, count) => `"${name}" (${count} materials)`,
      sharedImportBtn: "Import list",
      sharedDismissBtn: "Dismiss",
      stepMinus1: "Decrease quantity by 1",
      stepPlus1: "Increase quantity by 1",
      stepPlus64: "Add 1 stack (+64)"
    }
  };

  function tr(key, ...args) {
    const entry = t[lang()][key];
    return typeof entry === "function" ? entry(...args) : entry;
  }

  function readAppState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(LISTS_KEY));
      if (parsed && Array.isArray(parsed.lists)) return parsed;
    } catch {
      // Fallback
    }
    return null;
  }

  function getActiveList(state) {
    if (!state || !Array.isArray(state.lists) || state.lists.length === 0) return null;

    const activeNav = document.querySelector("#list-navigation button.active .list-name");
    const activeName =
      activeNav?.textContent?.trim() ||
      document.querySelector("#workspace .page-title")?.textContent?.trim();

    if (activeName) {
      const byName = state.lists.find(l => l.name === activeName);
      if (byName) return byName;
    }

    return state.lists[0];
  }

  function adjustItemQuantity(itemCard, delta) {
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

  let shareResetTimer = null;

  function triggerShareSuccessAnimation() {
    const btn = document.querySelector("#workspace .qol-share-btn");
    if (!btn) return;

    btn.classList.remove("is-copied");
    void btn.offsetWidth;
    btn.classList.add("is-copied");
    btn.textContent = tr("shareCopiedBtn");

    clearTimeout(shareResetTimer);
    shareResetTimer = setTimeout(() => {
      const currentBtn = document.querySelector("#workspace .qol-share-btn");
      if (currentBtn) {
        currentBtn.classList.remove("is-copied");
        currentBtn.textContent = tr("shareBtn");
      }
    }, 2200);
  }

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
      try {
        const cs = new CompressionStream("deflate-raw");
        const writer = cs.writable.getWriter();
        writer.write(rawBytes);
        writer.close();
        const compressed = new Uint8Array(await new Response(cs.readable).arrayBuffer());
        return "z." + bytesToBase64Url(compressed);
      } catch {
        // Fallback
      }
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
      close();
      triggerShareSuccessAnimation();
    });

    dialog.showModal();
    input.focus();
    input.select();
  }

  async function copyShareLink() {
    const state = readAppState();
    const activeList = getActiveList(state);
    if (!activeList) return;

    const compact = {
      v: 2,
      n: String(activeList.name || "CraftLog Projekt").slice(0, 60),
      note: activeList.notes ? String(activeList.notes).slice(0, 1000) : "",
      i: (activeList.items || []).map(it => [
        String(it.blockId || "").replace(/^minecraft:/, ""),
        Math.max(1, Number(it.quantity) || 1),
        it.done ? 1 : 0
      ]),
      c: activeList.summaryChoices || {}
    };

    const token = await encodeSharePayload(compact);
    const baseUrl = window.location.href.split("#")[0];
    const shareUrl = `${baseUrl}#share=${token}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      triggerShareSuccessAnimation();
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
    btn.textContent = tr("shareBtn");
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
        const state = readAppState() || {
          lists: [],
          hideCompleted: false,
          sortBy: "manual"
        };

        const newList = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          name: String(payload.n || "Geteilte Liste").slice(0, 60),
          notes: payload.note || "",
          notesOpen: Boolean(payload.note && payload.note.trim()),
          itemsOpen: true,
          summaryChoices: payload.c || {},
          items: payload.i
            .filter(([shortId]) => Boolean(shortId))
            .map(([shortId, qty, done], idx) => ({
              id: `${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 7)}`,
              blockId: shortId.startsWith("minecraft:") ? shortId : `minecraft:${shortId}`,
              quantity: Math.max(1, Number(qty) || 1),
              done: Boolean(done)
            }))
        };

        state.lists.unshift(newList);
        localStorage.setItem(LISTS_KEY, JSON.stringify(state));

        history.replaceState(null, "", window.location.pathname + window.location.search);
        banner.remove();
        location.reload();
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

  function boot() {
    enhanceAll();
    checkIncomingShareLink();

    const workspace = document.getElementById("workspace");
    if (workspace) {
      const observer = new MutationObserver(() => enhanceAll());
      observer.observe(workspace, { childList: true, subtree: true });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  window.addEventListener("hashchange", checkIncomingShareLink);
})();