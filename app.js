const LISTS_KEY = "minecraft-materiallisten-v2";
const OLD_LISTS_KEY = "minecraft-materiallisten-v1";
const LANGUAGE_KEY = "minecraft-materiallisten-language-v1";
const THEME_KEY = "materialbuch-theme";
const VERSION_KEY = "craftlog-app-version";

const SOURCE_CATEGORY_META = {
  location: {
    icon: "⛏️",
    de: "Fundort",
    en: "Location"
  },
  farm: {
    icon: "🌾",
    de: "Farm",
    en: "Farm"
  },
  trade: {
    icon: "🤝",
    de: "Handel",
    en: "Trading"
  },
  loot: {
    icon: "💎",
    de: "Loot",
    en: "Loot"
  },
  craft: {
    icon: "🔨",
    de: "Herstellung",
    en: "Crafting"
  }
};

const translations = {
  de: {
    lists: "Meine Listen",
    newList: "Neue Liste",
    addList: "Liste erstellen",
    overview: "Projektübersicht",
    noListsTitle: "Noch keine Liste.",
    noListsText:
      "Erstelle links deine erste Liste, um Materialien zu planen.",
    listDescription:
      "Plane benötigte Blöcke und Gegenstände für dein Projekt.",
    rename: "Umbenennen",
    delete: "Löschen",
    deleteQuestion: name =>
      `Liste „${name}“ wirklich löschen?`,
    renameQuestion: "Neuer Listenname:",
    progress: "Fortschritt",
    completed: (done, total) =>
      `${done} von ${total} erledigt`,
    listCompleteTitle: "Liste abgeschlossen!",
    listCompleteSubtitle: name =>
      `${name} · 100 % erledigt`,
    listCompleteText:
      "Du hast alle Einträge in dieser Liste erledigt. Möchtest du die Liste jetzt löschen oder alle Haken zurücksetzen?",
    resetList: "Liste zurücksetzen",
    deleteListAction: "Liste löschen",
    keepList: "Behalten",
    close: "Schließen",
    addHeading: "Material hinzufügen",
    addDescription:
      "Suche einen Eintrag und wähle ihn aus den Vorschlägen.",
    search: "Block oder Gegenstand suchen",
    clearSearch: "Suche leeren",
    quantity: "Anzahl",
    addPlus16: "+16 hinzufügen",
    addPlus64: "+64 hinzufügen (1 Stack)",
    add: "Hinzufügen",
    materials: "Materialien",
    noItemsTitle: "Die Liste ist noch leer.",
    noItemsText:
      "Füge oben einen Block oder Gegenstand hinzu.",
    block: "Block",
    item: "Gegenstand",
    noResults: "Keine Treffer.",
    narrow: count =>
      `${count} Treffer. Tippe weiter, um einzugrenzen.`,
    choose:
      "Bitte einen Eintrag aus den Suchvorschlägen auswählen.",
    invalidQuantity:
      "Bitte eine ganze Anzahl größer als 0 eingeben.",
    remove: "Eintrag entfernen",
    editQuantity: "Anzahl ändern",
    save: "Speichern",
    cancel: "Abbrechen",
    crafting_shaped: "Werkbank",
    crafting_shapeless: "Werkbank",
    smelting: "Ofen",
    blasting: "Hochofen",
    smoking: "Räucherofen",
    campfire_cooking: "Lagerfeuer",
    stonecutting: "Steinsäge",
    smithing_transform: "Schmiedetisch",
    source: "Quellen",
    plannedQuantity: "Geplante Menge",
    showSourcesFor: name =>
      `Beschaffungswege für ${name} anzeigen`,
    sourceCraftableText: stations =>
      `Herstellung über ${stations} möglich. Den kompletten Herstellungsbaum findest du unten unter „Gesamtbedarf & Crafting-Checkliste“.`,
    sourceOpenText:
      "Ein geprüfter Beschaffungsweg ist noch nicht hinterlegt.",
    totalUnavailable:
      "Der Gesamtbedarf konnte nicht geladen werden. Prüfe, ob list-summary.js vor app.js eingebunden ist.",
    loading: "Minecraft-Daten werden geladen …",
    loaded: count =>
      `${count} Blöcke und Gegenstände geladen · Minecraft Java 1.21.4`,
    incompleteNames: count =>
      `${count} Einträge ohne deutschen Namen.`,
    loadError:
      "minecraft-data.json konnte nicht geladen werden. Prüfe, ob die Datei im Projektordner liegt und der Webserver läuft.",
    footerStorage:
      "Listen werden lokal in diesem Browser gespeichert."
  },

  en: {
    lists: "My lists",
    newList: "New list",
    addList: "Create list",
    overview: "Project overview",
    noListsTitle: "No lists yet.",
    noListsText:
      "Create your first list on the left to plan materials.",
    listDescription:
      "Plan the blocks and items needed for your project.",
    rename: "Rename",
    delete: "Delete",
    deleteQuestion: name =>
      `Delete the list “${name}”?`,
    renameQuestion: "New list name:",
    progress: "Progress",
    completed: (done, total) =>
      `${done} of ${total} completed`,
    listCompleteTitle: "List completed!",
    listCompleteSubtitle: name =>
      `${name} · 100% completed`,
    listCompleteText:
      "You have completed all items in this list. Would you like to delete the list or reset all checkmarks?",
    resetList: "Reset list",
    deleteListAction: "Delete list",
    keepList: "Keep",
    close: "Close",
    addHeading: "Add material",
    addDescription:
      "Search for an entry and select it from the suggestions.",
    search: "Search for a block or item",
    clearSearch: "Clear search",
    quantity: "Quantity",
    addPlus16: "Add +16",
    addPlus64: "Add +64 (1 Stack)",
    add: "Add",
    materials: "Materials",
    noItemsTitle: "This list is empty.",
    noItemsText: "Add a block or item above.",
    block: "Block",
    item: "Item",
    noResults: "No results.",
    narrow: count =>
      `${count} results. Keep typing to narrow them down.`,
    choose:
      "Please select an entry from the suggestions.",
    invalidQuantity:
      "Please enter a whole number greater than 0.",
    remove: "Remove entry",
    editQuantity: "Edit quantity",
    save: "Save",
    cancel: "Cancel",
    crafting_shaped: "Crafting Table",
    crafting_shapeless: "Crafting Table",
    smelting: "Furnace",
    blasting: "Blast Furnace",
    smoking: "Smoker",
    campfire_cooking: "Campfire",
    stonecutting: "Stonecutter",
    smithing_transform: "Smithing Table",
    source: "Sources",
    plannedQuantity: "Planned quantity",
    showSourcesFor: name =>
      `Show acquisition methods for ${name}`,
    sourceCraftableText: stations =>
      `Can be made using ${stations}. Open “Total materials & crafting checklist” below for the full crafting tree.`,
    sourceOpenText:
      "A verified acquisition method has not been added yet.",
    totalUnavailable:
      "Could not load total materials. Check that list-summary.js is included before app.js.",
    loading: "Loading Minecraft data …",
    loaded: count =>
      `${count} blocks and items loaded · Minecraft Java 1.21.4`,
    incompleteNames: count =>
      `${count} entries without a German name.`,
    loadError:
      "Could not load minecraft-data.json. Check that it is in the project folder and the web server is running.",
    footerStorage:
      "Lists are stored locally in this browser."
  }
};

let language = "de";

try {
  language =
    localStorage.getItem(LANGUAGE_KEY) === "en"
      ? "en"
      : "de";
} catch {
  language = "de";
}

let appVersion = "0.0.21";

try {
  const cachedVersion = localStorage.getItem(VERSION_KEY);
  if (cachedVersion) {
    appVersion = cachedVersion;
  }
} catch {
  // Standardversion verwenden.
}

let minecraft = null;
let catalog = [];
let catalogById = new Map();
let loadError = false;
let highlightedItemId = null;

const themeToggle = document.querySelector("#theme-toggle");

function t() {
  return translations[language];
}

function newId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function loadState() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(LISTS_KEY)
    );

    if (saved && Array.isArray(saved.lists)) {
      return saved;
    }
  } catch {
    // Keine gültigen Daten unter dem aktuellen Schlüssel.
  }

  try {
    const previous = JSON.parse(
      localStorage.getItem(OLD_LISTS_KEY)
    );

    if (previous && Array.isArray(previous.folders)) {
      return {
        lists: previous.folders.flatMap(folder =>
          Array.isArray(folder.lists)
            ? folder.lists
            : []
        )
      };
    }
  } catch {
    // Keine alten Listen vorhanden.
  }

  return { lists: [] };
}

const state = loadState();
let activeListId = state.lists[0]?.id || null;

function save() {
  try {
    localStorage.setItem(
      LISTS_KEY,
      JSON.stringify(state)
    );
  } catch (error) {
    console.error(
      "Listen konnten nicht gespeichert werden:",
      error
    );
  }
}

save();

function normalizeId(id) {
  if (typeof id !== "string") {
    return "";
  }

  return id.startsWith("minecraft:")
    ? id
    : `minecraft:${id}`;
}

function nameOf(id) {
  const entry = catalogById.get(
    normalizeId(id)
  );

  if (!entry) {
    return String(id).replace(/^minecraft:/, "");
  }

  return language === "de"
    ? entry.de || entry.en
    : entry.en;
}

function formatStackHint(quantity) {
  const count = Math.floor(Number(quantity) || 0);
  if (count < 64) {
    return "";
  }

  const stacks = Math.floor(count / 64);
  const rest = count % 64;
  const stackWord = language === "de"
    ? (stacks === 1 ? "Stack" : "Stacks")
    : (stacks === 1 ? "stack" : "stacks");

  return rest > 0
    ? `${stacks} ${stackWord} + ${rest}`
    : `${stacks} ${stackWord}`;
}

function createItemIcon(id, isBlock) {
  const icon = document.createElement("span");
  icon.className = `mc-list-icon${isBlock === false ? " is-item" : ""}`;
  icon.setAttribute("aria-hidden", "true");

  const H = window.CraftLogHelpers;
  if (H?.colorForItem) {
    icon.style.setProperty("--swatch-color", H.colorForItem(id));
  }
  if (H?.applyItemIcon) {
    H.applyItemIcon(icon, id);
  }

  return icon;
}

function makeButton(label, className, action) {
  const button = document.createElement("button");

  button.type = "button";
  button.className = className;
  button.textContent = label;
  button.addEventListener("click", action);

  return button;
}

function openListCompleteDialog(list) {
  if (!list) return;

  const existingDialog = document.getElementById("craftlog-complete-dialog");
  if (existingDialog) {
    existingDialog.remove();
  }

  const dialog = document.createElement("dialog");
  dialog.id = "craftlog-complete-dialog";
  dialog.className = "tc-source-dialog";

  const inner = document.createElement("div");
  inner.className = "tc-dialog-inner";

  const header = document.createElement("div");
  header.className = "tc-dialog-header";

  const titleGroup = document.createElement("div");
  titleGroup.className = "tc-dialog-title-group";

  const badgeIcon = document.createElement("span");
  badgeIcon.className = "tc-complete-badge";
  badgeIcon.setAttribute("aria-hidden", "true");
  badgeIcon.textContent = "✓";

  const titleText = document.createElement("div");
  titleText.className = "tc-dialog-title-text";

  const title = document.createElement("h3");
  title.className = "tc-dialog-title";
  title.textContent = t().listCompleteTitle;

  const subtitle = document.createElement("span");
  subtitle.className = "tc-dialog-subtitle";
  subtitle.textContent = t().listCompleteSubtitle(list.name);

  titleText.append(title, subtitle);
  titleGroup.append(badgeIcon, titleText);

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "tc-dialog-close";
  closeBtn.textContent = "×";
  closeBtn.title = t().close;
  closeBtn.setAttribute("aria-label", t().close);

  header.append(titleGroup, closeBtn);
  inner.append(header);

  const dialogBody = document.createElement("div");
  dialogBody.className = "tc-dialog-body";

  const message = document.createElement("p");
  message.className = "tc-dialog-way-text";
  message.textContent = t().listCompleteText;

  const actions = document.createElement("div");
  actions.className = "tc-dialog-actions";

  const closeDialog = () => {
    if (dialog.open) {
      dialog.close();
    }
    dialog.remove();
  };

  const resetBtn = makeButton(
    t().resetList,
    "quiet-button",
    () => {
      if (Array.isArray(list.items)) {
        for (const entry of list.items) {
          entry.done = false;
        }
      }
      list.summaryInventory = {};
      closeDialog();
      save();
      render();
    }
  );

  const deleteBtn = makeButton(
    t().deleteListAction,
    "danger-button",
    () => {
      state.lists = state.lists.filter(
        entry => entry.id !== list.id
      );
      if (activeListId === list.id) {
        activeListId = state.lists[0]?.id || null;
      }
      closeDialog();
      save();
      render();
    }
  );

  const keepBtn = makeButton(
    t().keepList,
    "primary-button",
    closeDialog
  );

  actions.append(resetBtn, deleteBtn, keepBtn);
  dialogBody.append(message, actions);
  inner.append(dialogBody);
  dialog.append(inner);

  closeBtn.addEventListener("click", closeDialog);
  dialog.addEventListener("click", event => {
    if (event.target === dialog) {
      closeDialog();
    }
  });
  dialog.addEventListener("close", () => {
    dialog.remove();
  });

  document.body.append(dialog);
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "");
  }
}

window.openListCompleteDialog = openListCompleteDialog;

function normalizeSearchText(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/^minecraft:/, "")
    .replace(/_/g, " ")
    .trim();
}

function editDistance(a, b) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);

  for (let i = 1; i <= a.length; i++) {
    const curr = [i];
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(
        curr[j - 1] + 1,
        prev[j] + 1,
        prev[j - 1] + cost
      );
    }
    prev = curr;
  }

  return prev[b.length];
}

function scoreTarget(query, tokens, target) {
  if (!target) return 0;

  if (target === query) return 1000;
  if (target.startsWith(query)) {
    return 850 - Math.min(target.length - query.length, 50);
  }

  const words = target.split(/[\s-]+/);

  if (words.some(word => word.startsWith(query))) {
    return 700 - Math.min(target.length, 50);
  }

  const index = target.indexOf(query);
  if (index !== -1) {
    return 550 - Math.min(index, 50);
  }

  if (tokens.length > 1 && tokens.every(token => target.includes(token))) {
    return 480 - Math.min(target.length, 50);
  }

  if (query.length >= 3) {
    const maxDist = query.length <= 4 ? 1 : query.length <= 7 ? 2 : 3;
    let bestDist = editDistance(query, target);

    for (const word of words) {
      if (Math.abs(word.length - query.length) <= maxDist) {
        bestDist = Math.min(bestDist, editDistance(query, word));
      }
    }

    if (bestDist <= maxDist) {
      return 300 - bestDist * 70 - Math.min(target.length, 40);
    }
  }

  return 0;
}

function searchCatalog(rawQuery) {
  const query = normalizeSearchText(rawQuery);
  if (!query) return [];

  const tokens = query.split(/\s+/).filter(Boolean);
  const results = [];

  for (const entry of catalog) {
    const deText = entry._searchDe ?? normalizeSearchText(entry.de);
    const enText = entry._searchEn ?? normalizeSearchText(entry.en || entry.id);

    const primaryText = language === "de" ? deText : enText;
    const secondaryText = language === "de" ? enText : deText;

    const primaryScore = scoreTarget(query, tokens, primaryText);
    const secondaryScore = scoreTarget(query, tokens, secondaryText);

    const totalPrimary = primaryScore > 0 ? primaryScore + 25 : 0;
    const bestScore = Math.max(totalPrimary, secondaryScore);

    if (bestScore > 0) {
      results.push({
        entry,
        score: bestScore,
        matchedSecondary: secondaryScore > totalPrimary
      });
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results;
}

function createSearch(form, quantityInput, list) {
  const wrapper = document.createElement("div");
  wrapper.className = "search";

  const selectedIcon = document.createElement("span");
  selectedIcon.className = "mc-list-icon search-selected-icon";
  selectedIcon.setAttribute("aria-hidden", "true");
  selectedIcon.hidden = true;

  const input = document.createElement("input");
  input.className = "search-input";
  input.type = "text";
  input.placeholder = t().search;
  input.setAttribute("aria-label", t().search);
  input.autocomplete = "off";
  input.required = true;
  input.disabled = !minecraft;

  const clearButton = document.createElement("button");
  clearButton.type = "button";
  clearButton.className = "search-clear-btn";
  clearButton.textContent = "×";
  clearButton.title = t().clearSearch;
  clearButton.setAttribute("aria-label", t().clearSearch);
  clearButton.hidden = true;

  const suggestions = document.createElement("div");
  suggestions.className = "suggestions";
  suggestions.hidden = true;

  let selectedId = null;
  let matches = [];
  let activeIndex = 0;

  function updateClearButton() {
    const hasText = input.value.length > 0 && !input.disabled;
    clearButton.hidden = !hasText;
    wrapper.classList.toggle("has-clear-btn", hasText);
  }

  function clearSelectedIcon() {
    selectedIcon.hidden = true;
    wrapper.classList.remove("has-selected-icon");
  }

  function showSelectedIcon(entry) {
    selectedIcon.className = `mc-list-icon search-selected-icon${entry.isBlock === false ? " is-item" : ""}`;
    selectedIcon.classList.remove("has-icon");

    const oldImg = selectedIcon.querySelector("img.mc-icon-img");
    if (oldImg) {
      oldImg.remove();
    }

    const H = window.CraftLogHelpers;
    if (H?.colorForItem) {
      selectedIcon.style.setProperty("--swatch-color", H.colorForItem(entry.id));
    }
    if (H?.applyItemIcon) {
      H.applyItemIcon(selectedIcon, entry.id);
    }

    selectedIcon.hidden = false;
    wrapper.classList.add("has-selected-icon");
  }

  function closeSuggestions() {
    suggestions.hidden = true;
    suggestions.replaceChildren();
  }

  function resetSearchField() {
    input.value = "";
    selectedId = null;
    matches = [];
    clearSelectedIcon();
    updateClearButton();
    closeSuggestions();
    input.focus();
  }

  function choose(entry) {
    selectedId = entry.id;
    input.value = nameOf(entry.id);
    showSelectedIcon(entry);
    updateClearButton();
    closeSuggestions();
    quantityInput.focus();
  }

  function updateSuggestions() {
    const query = input.value.trim();

    suggestions.replaceChildren();

    if (!query) {
      matches = [];
      closeSuggestions();
      return;
    }

    const searchResults = searchCatalog(query);
    matches = searchResults.map(result => result.entry);
    activeIndex = 0;

    for (const { entry, matchedSecondary } of searchResults.slice(0, 40)) {
      const option = document.createElement("button");
      option.type = "button";

      const main = document.createElement("span");
      main.className = "suggestion-main";

      const icon = createItemIcon(entry.id, entry.isBlock);

      const title = document.createElement("span");
      title.className = "suggestion-title";
      const primaryName = nameOf(entry.id);
      const secondaryName = language === "de" ? entry.en : entry.de;

      title.textContent =
        matchedSecondary && secondaryName && secondaryName !== primaryName
          ? `${primaryName} (${secondaryName})`
          : primaryName;

      main.append(icon, title);

      const type = document.createElement("span");
      type.className = "suggestion-type";
      type.textContent =
        entry.isBlock ? t().block : t().item;

      option.append(main, type);

      option.addEventListener(
        "mousedown",
        event => event.preventDefault()
      );

      option.addEventListener("click", () => {
        choose(entry);
      });

      suggestions.append(option);
    }

    if (matches.length === 0 || matches.length > 40) {
      const note = document.createElement("div");
      note.className = "suggestion-note";

      note.textContent =
        matches.length === 0
          ? t().noResults
          : t().narrow(matches.length);

      suggestions.append(note);
    }

    suggestions.hidden = false;
  }

  clearButton.addEventListener("mousedown", event => {
    event.preventDefault();
  });

  clearButton.addEventListener("click", () => {
    resetSearchField();
  });

  input.addEventListener("input", () => {
    selectedId = null;
    clearSelectedIcon();
    updateClearButton();
    updateSuggestions();
  });

  input.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      if (!suggestions.hidden) {
        closeSuggestions();
      } else if (input.value) {
        resetSearchField();
      }
      return;
    }

    if (
      suggestions.hidden ||
      matches.length === 0
    ) {
      return;
    }

    const visibleCount = Math.min(
      matches.length,
      40
    );

    if (event.key === "ArrowDown") {
      event.preventDefault();
      activeIndex =
        (activeIndex + 1) % visibleCount;
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      activeIndex =
        (activeIndex - 1 + visibleCount) %
        visibleCount;
    } else if (event.key === "Enter") {
      event.preventDefault();
      choose(matches[activeIndex]);
      return;
    } else {
      return;
    }

    suggestions
      .querySelectorAll("button")
      .forEach((option, index) => {
        option.classList.toggle(
          "active",
          index === activeIndex
        );
      });
  });

  input.addEventListener("blur", () => {
    setTimeout(closeSuggestions, 150);
  });

  form.addEventListener("submit", event => {
    event.preventDefault();

    if (!selectedId) {
      alert(t().choose);
      input.focus();
      return;
    }

    const quantity = Number(quantityInput.value);

    if (
      !Number.isSafeInteger(quantity) ||
      quantity < 1
    ) {
      alert(t().invalidQuantity);
      return;
    }

    const normalizedSelected = normalizeId(selectedId);
    const existingItem = list.items.find(
      entry => normalizeId(entry.blockId) === normalizedSelected
    );

    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.done = false;
      list.items = [
        existingItem,
        ...list.items.filter(entry => entry.id !== existingItem.id)
      ];
      highlightedItemId = existingItem.id;
    } else {
      const createdItem = {
        id: newId(),
        blockId: selectedId,
        quantity,
        done: false
      };
      list.items.unshift(createdItem);
      highlightedItemId = createdItem.id;
    }

    save();
    render({ focusSearch: true });
  });

  wrapper.append(selectedIcon, input, clearButton, suggestions);
  return wrapper;
}

function openItemSourceDialog(item, initialFilter = "all") {
  const id = normalizeId(item.blockId);

  if (typeof window.openMaterialSourceDialog === "function") {
    window.openMaterialSourceDialog({
      id,
      totalNeeded: item.quantity,
      quantityLabel: t().plannedQuantity,
      initialFilter
    });
  }
}

function createSourceBadges(item) {
  const id = normalizeId(item.blockId);
  const itemName = nameOf(id);
  const source = window.materialSources?.[id];
  const ways = Array.isArray(source?.ways) ? source.ways : [];
  const recipes = window.CraftLogHelpers?.getEffectiveRecipes
    ? window.CraftLogHelpers.getEffectiveRecipes(id, minecraft)
    : (minecraft?.recipes?.[id] || []);

  const row = document.createElement("div");
  row.className = "item-source-badges";

  if (ways.length > 0) {
    const canonicalOrder = ["location", "farm", "trade", "loot", "craft"];
    const counts = new Map();

    for (const way of ways) {
      const type = way.type || "other";
      counts.set(type, (counts.get(type) || 0) + 1);
    }

    const orderedTypes = [
      ...canonicalOrder.filter(type => counts.has(type)),
      ...[...counts.keys()].filter(type => !canonicalOrder.includes(type))
    ];

    for (const type of orderedTypes) {
      const meta = SOURCE_CATEGORY_META[type];
      const count = counts.get(type) || 0;
      const labelText = meta
        ? (language === "de" ? meta.de : meta.en)
        : type;

      const badge = document.createElement("button");
      badge.type = "button";
      badge.className = `item-source-badge item-source-badge--${type}`;
      badge.title = t().showSourcesFor(itemName);
      badge.setAttribute("aria-label", `${itemName}: ${labelText} (${count})`);

      if (meta?.icon) {
        const iconSpan = document.createElement("span");
        iconSpan.className = "item-source-badge-icon";
        iconSpan.setAttribute("aria-hidden", "true");
        iconSpan.textContent = meta.icon;
        badge.append(iconSpan);
      }

      const textSpan = document.createElement("span");
      textSpan.textContent = labelText;
      badge.append(textSpan);

      if (count > 1) {
        const countSpan = document.createElement("span");
        countSpan.className = "item-source-badge-count";
        countSpan.textContent = String(count);
        badge.append(countSpan);
      }

      badge.addEventListener("click", () => {
        openItemSourceDialog(item, type);
      });

      row.append(badge);
    }

    return row;
  }

  if (recipes.length > 0) {
    const meta = SOURCE_CATEGORY_META.craft;
    const badge = document.createElement("button");
    badge.type = "button";
    badge.className = "item-source-badge item-source-badge--craft";
    badge.title = t().showSourcesFor(itemName);

    const iconSpan = document.createElement("span");
    iconSpan.className = "item-source-badge-icon";
    iconSpan.setAttribute("aria-hidden", "true");
    iconSpan.textContent = meta.icon;

    const textSpan = document.createElement("span");
    textSpan.textContent = language === "de" ? meta.de : meta.en;

    badge.append(iconSpan, textSpan);
    badge.addEventListener("click", () => {
      openItemSourceDialog(item, "all");
    });

    row.append(badge);
    return row;
  }

  const fallbackBadge = document.createElement("button");
  fallbackBadge.type = "button";
  fallbackBadge.className = "item-source-badge item-source-badge--empty";
  fallbackBadge.title = t().showSourcesFor(itemName);
  fallbackBadge.textContent = `ⓘ ${t().source}`;
  fallbackBadge.addEventListener("click", () => {
    openItemSourceDialog(item, "all");
  });

  row.append(fallbackBadge);
  return row;
}

function renderItem(list, item) {
  const card = document.createElement("div");
  card.className =
    `item${item.done ? " completed" : ""}`;

  if (item.id === highlightedItemId) {
    card.classList.add("is-highlighted");
    highlightedItemId = null;
  }

  const top = document.createElement("div");
  top.className = "item-top";

  const label = document.createElement("label");
  label.className = "item-label";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = Boolean(item.done);

  checkbox.addEventListener("change", () => {
    const wasAllDone =
      list.items.length > 0 &&
      list.items.every(entry => Boolean(entry.done));

    item.done = checkbox.checked;

    const isNowAllDone =
      list.items.length > 0 &&
      list.items.every(entry => Boolean(entry.done));

    save();
    render();

    if (!wasAllDone && isNowAllDone) {
      openListCompleteDialog(list);
    }
  });

  const entry = catalogById.get(
    normalizeId(item.blockId)
  );

  const icon = createItemIcon(
    item.blockId,
    entry?.isBlock
  );

  const titleWrapper = document.createElement("span");
  titleWrapper.className = "item-text-group";

  const title = document.createElement("span");
  title.className = "item-name";
  title.textContent =
    `${item.quantity} × ${nameOf(item.blockId)}`;

  const type = document.createElement("span");
  type.className = "item-meta";

  const baseType = entry?.isBlock ? t().block : t().item;
  const stackHint = formatStackHint(item.quantity);
  type.textContent = stackHint
    ? `${baseType} · ${stackHint}`
    : baseType;

  titleWrapper.append(title, type);
  label.append(checkbox, icon, titleWrapper);

  const remove = makeButton(
    "×",
    "remove-button",
    () => {
      list.items = list.items.filter(
        entry => entry.id !== item.id
      );

      save();
      render();
    }
  );

  remove.setAttribute("aria-label", t().remove);
  remove.title = t().remove;

  const edit = makeButton(
    t().editQuantity,
    "edit-quantity-button",
    () => {
      const existingForm = card.querySelector(
        ".quantity-edit-form"
      );

      if (existingForm) {
        existingForm.remove();
        return;
      }

      const form = document.createElement("form");
      form.className = "quantity-edit-form";

      const input = document.createElement("input");
      input.className = "quantity-edit-input";
      input.type = "number";
      input.min = "1";
      input.step = "1";
      input.required = true;
      input.value = String(item.quantity);
      input.setAttribute(
        "aria-label",
        t().quantity
      );

      const submit = document.createElement("button");
      submit.type = "submit";
      submit.className = "primary-button";
      submit.textContent = t().save;

      const cancel = makeButton(
        t().cancel,
        "quiet-button",
        () => form.remove()
      );

      form.append(input, submit, cancel);

      form.addEventListener("submit", event => {
        event.preventDefault();

        const quantity = Number(input.value);

        if (
          !Number.isSafeInteger(quantity) ||
          quantity < 1
        ) {
          alert(t().invalidQuantity);
          input.focus();
          return;
        }

        item.quantity = quantity;
        highlightedItemId = item.id;
        save();
        render();
      });

      card.append(form);
      input.focus();
      input.select();
    }
  );

  const actions = document.createElement("div");
  actions.className = "item-actions";
  actions.append(edit, remove);

  top.append(label, actions);
  card.append(top, createSourceBadges(item));

  return card;
}

function renderWorkspace() {
  const workspace =
    document.querySelector("#workspace");

  workspace.replaceChildren();

  const status = document.createElement("p");
  status.className = "status";
  status.setAttribute("role", "status");

  if (loadError) {
    status.textContent = t().loadError;
  } else if (!minecraft) {
    status.textContent = t().loading;
  } else {
    status.textContent =
      t().loaded(catalog.length);

    const missing =
      minecraft.missingGerman?.length || 0;

    if (language === "de" && missing > 0) {
      status.textContent +=
        ` ${t().incompleteNames(missing)}`;
    }
  }

  const list = state.lists.find(
    entry => entry.id === activeListId
  );

  if (!list) {
    const eyebrow = document.createElement("p");
    eyebrow.className = "eyebrow";
    eyebrow.textContent = t().overview;

    const heading = document.createElement("h1");
    heading.className = "page-title";
    heading.textContent = t().noListsTitle;

    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = t().noListsText;

    workspace.append(
      eyebrow,
      heading,
      status,
      empty
    );

    return;
  }

  if (!Array.isArray(list.items)) {
    list.items = [];
  }

  const headingRow = document.createElement("div");
  headingRow.className = "workspace-heading";

  const headingText = document.createElement("div");

  const eyebrow = document.createElement("p");
  eyebrow.className = "eyebrow";
  eyebrow.textContent = t().overview;

  const heading = document.createElement("h1");
  heading.className = "page-title";
  heading.textContent = list.name;

  const description = document.createElement("p");
  description.className = "description";
  description.textContent = t().listDescription;

  headingText.append(
    eyebrow,
    heading,
    description
  );

  const actions = document.createElement("div");
  actions.className = "heading-actions";

  actions.append(
    makeButton(t().rename, "quiet-button", () => {
      const name = prompt(
        t().renameQuestion,
        list.name
      )?.trim();

      if (!name) return;

      list.name = name;
      save();
      render();
    }),

    makeButton(t().delete, "danger-button", () => {
      if (!confirm(t().deleteQuestion(list.name))) {
        return;
      }

      state.lists = state.lists.filter(
        entry => entry.id !== list.id
      );

      activeListId = state.lists[0]?.id || null;
      save();
      render();
    })
  );

  headingRow.append(headingText, actions);

  const done = list.items.filter(
    item => item.done
  ).length;

  const progress = document.createElement("div");

  const track = document.createElement("div");
  track.className = "progress-track";

  const fill = document.createElement("div");
  fill.className = "progress-fill";

  fill.style.width = list.items.length
    ? `${done / list.items.length * 100}%`
    : "0%";

  track.append(fill);

  const progressLabel = document.createElement("div");
  progressLabel.className = "progress-label";

  const progressTitle = document.createElement("span");
  progressTitle.textContent = t().progress;

  const progressCount = document.createElement("span");
  progressCount.textContent =
    t().completed(done, list.items.length);

  progressLabel.append(
    progressTitle,
    progressCount
  );

  progress.append(track, progressLabel);

  const panel = document.createElement("section");
  panel.className = "panel";

  const panelHeader = document.createElement("div");
  panelHeader.className = "panel-header";

  const panelTitle = document.createElement("h2");
  panelTitle.className = "panel-title";
  panelTitle.textContent = t().addHeading;

  const panelDescription =
    document.createElement("p");

  panelDescription.className =
    "panel-description";

  panelDescription.textContent =
    t().addDescription;

  panelHeader.append(
    panelTitle,
    panelDescription
  );

  const form = document.createElement("form");
  form.className = "add-form";

  const quantityGroup = document.createElement("div");
  quantityGroup.className = "quantity-group";

  const quantity = document.createElement("input");
  quantity.className = "quantity-input";
  quantity.type = "number";
  quantity.min = "1";
  quantity.step = "1";
  quantity.value = "1";
  quantity.required = true;
  quantity.disabled = !minecraft;
  quantity.setAttribute(
    "aria-label",
    t().quantity
  );

  let isInitialQuantity = true;

  quantity.addEventListener("input", () => {
    isInitialQuantity = false;
  });

  function applyQuickAmount(step) {
    const current = Math.floor(Number(quantity.value) || 0);
    if (isInitialQuantity || current < 1) {
      quantity.value = String(step);
    } else {
      quantity.value = String(current + step);
    }
    isInitialQuantity = false;
    quantity.focus();
  }

  const quickButtons = document.createElement("div");
  quickButtons.className = "quantity-quick-buttons";

  const quick16 = makeButton("+16", "quantity-quick-btn", () => {
    applyQuickAmount(16);
  });
  quick16.title = t().addPlus16;
  quick16.setAttribute("aria-label", t().addPlus16);
  quick16.disabled = !minecraft;

  const quick64 = makeButton("+64", "quantity-quick-btn", () => {
    applyQuickAmount(64);
  });
  quick64.title = t().addPlus64;
  quick64.setAttribute("aria-label", t().addPlus64);
  quick64.disabled = !minecraft;

  quickButtons.append(quick16, quick64);
  quantityGroup.append(quantity, quickButtons);

  const search = createSearch(
    form,
    quantity,
    list
  );

  const addButton = document.createElement("button");
  addButton.type = "submit";
  addButton.className = "primary-button";
  addButton.textContent = t().add;
  addButton.disabled = !minecraft;

  form.append(search, quantityGroup, addButton);
  panel.append(panelHeader, form);

  const itemsTitle = document.createElement("h2");
  itemsTitle.className =
    "section-label items-heading";
  itemsTitle.textContent =
    `${t().materials} · ${list.items.length}`;

  const items = document.createElement("div");
  items.className = "items";

  const summarySlot = document.createElement("div");
  summarySlot.className = "list-summary-slot";

  function renderSummarySlot() {
    if (!minecraft) return;

    summarySlot.replaceChildren();

    if (typeof window.createListSummary === "function") {
      summarySlot.append(
        window.createListSummary(
          list,
          minecraft,
          nameOf,
          language,
          save
        )
      );
    } else {
      const error = document.createElement("p");
      error.className = "status";
      error.textContent = t().totalUnavailable;
      summarySlot.append(error);
    }
  }

  if (list.items.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";

    const emptyTitle =
      document.createElement("strong");
    emptyTitle.textContent = t().noItemsTitle;

    const emptyText =
      document.createElement("span");
    emptyText.textContent = t().noItemsText;

    empty.append(emptyTitle, emptyText);
    items.append(empty);
  } else {
    for (const item of list.items) {
      items.append(renderItem(list, item));
    }
  }

  workspace.append(
    status,
    headingRow,
    progress,
    panel,
    itemsTitle,
    items
  );

  // Der Gesamtbedarf steht direkt unter den einzelnen Listeneinträgen.
  if (minecraft) {
    renderSummarySlot();
    workspace.append(summarySlot);
  }
}

function renderNavigation() {
  const navigation = document.querySelector(
    "#list-navigation"
  );

  navigation.replaceChildren();

  for (const list of state.lists) {
    const button = document.createElement("button");
    button.type = "button";

    if (list.id === activeListId) {
      button.className = "active";
      button.setAttribute(
        "aria-current",
        "page"
      );
    }

    const name = document.createElement("span");
    name.className = "list-name";
    name.textContent = list.name;

    const count = document.createElement("span");
    count.className = "list-count";
    count.textContent = String(
      Array.isArray(list.items)
        ? list.items.length
        : 0
    );

    button.append(name, count);

    button.addEventListener("click", () => {
      activeListId = list.id;
      render();
    });

    navigation.append(button);
  }
}

function updateThemeToggle() {
  if (!themeToggle) return;

  const isDark =
    document.documentElement.dataset.theme === "dark";

  themeToggle.setAttribute(
    "aria-checked",
    String(isDark)
  );

  const label = themeToggle.querySelector(
    ".theme-label"
  );

  if (label) {
    label.textContent = language === "de"
      ? (isDark ? "Dunkel" : "Hell")
      : (isDark ? "Dark" : "Light");
  }

  themeToggle.setAttribute(
    "aria-label",
    language === "de"
      ? `Farbschema: ${isDark ? "Dunkel" : "Hell"}. Zum Wechseln klicken.`
      : `Theme: ${isDark ? "Dark" : "Light"}. Click to switch.`
  );
}

function renderFooter() {
  const project = document.querySelector(
    "#footer-project"
  );

  const storage = document.querySelector(
    "#footer-storage"
  );

  const footerData = document.querySelector(
    "#footer-data"
  );

  if (project) {
    project.textContent =
      `CraftLog · Version ${appVersion}`;
  }

  if (storage) {
    storage.textContent = t().footerStorage;
  }

  // Technischen Erfolgsstatus nicht in der Projektansicht zeigen.
  const status = document.querySelector(
    "#workspace .status"
  );

  if (status && !loadError) {
    status.remove();
  }

  if (footerData) {
    footerData.replaceChildren();

    if (loadError && status) {
      footerData.append(status);
    }

    footerData.hidden = !loadError;
  }
}

function render(options = {}) {
  document.documentElement.lang = language;

  document.querySelector(
    "#lists-label"
  ).textContent = t().lists;

  document.querySelector(
    "#new-list-name"
  ).placeholder = t().newList;

  document.querySelector(
    "#create-list-button"
  ).setAttribute(
    "aria-label",
    t().addList
  );

  for (const code of ["de", "en"]) {
    document.querySelector(
      `#language-${code}`
    ).setAttribute(
      "aria-pressed",
      String(language === code)
    );
  }

  renderNavigation();
  renderWorkspace();
  renderFooter();
  updateThemeToggle();

  if (options.focusSearch) {
    const nextSearch = document.querySelector(
      "#workspace .search-input"
    );
    if (nextSearch && !nextSearch.disabled) {
      nextSearch.focus();
    }
  }
}

document.querySelector(
  "#create-list-form"
).addEventListener("submit", event => {
  event.preventDefault();

  const input = document.querySelector(
    "#new-list-name"
  );

  const name = input.value.trim();

  if (!name) return;

  const list = {
    id: newId(),
    name,
    items: []
  };

  state.lists.push(list);
  activeListId = list.id;

  input.value = "";
  save();
  render({ focusSearch: true });
});

for (const code of ["de", "en"]) {
  document.querySelector(
    `#language-${code}`
  ).addEventListener("click", () => {
    language = code;

    try {
      localStorage.setItem(
        LANGUAGE_KEY,
        code
      );
    } catch {
      // Sprache bleibt bis zum Neuladen aktiv.
    }

    render();
  });
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme =
      document.documentElement.dataset.theme === "dark"
        ? "light"
        : "dark";

    document.documentElement.dataset.theme =
      nextTheme;

    try {
      localStorage.setItem(
        THEME_KEY,
        nextTheme
      );
    } catch {
      // Farbschema bleibt bis zum Neuladen aktiv.
    }

    updateThemeToggle();
  });
}

async function loadAppVersion() {
  try {
    const response = await fetch("./sw.js", {
      cache: "no-cache"
    });

    if (!response.ok) return;

    const swCode = await response.text();
    const match = swCode.match(
      /CACHE_NAME\s*=\s*['"][^'"]*?(?:[-_]|v)(\d+(?:\.\d+)*)['"]/i
    );

    if (match && match[1]) {
      appVersion = match[1];
      try {
        localStorage.setItem(VERSION_KEY, appVersion);
      } catch {
        // Speichern optional.
      }
      renderFooter();
    }
  } catch {
    // Offline-Fallback bleibt aktiv.
  }
}

async function loadData() {
  try {
    const response = await fetch(
      "./minecraft-data.json"
    );

    if (!response.ok) {
      throw new Error(
        `Minecraft-Daten: HTTP ${response.status}`
      );
    }

    const data = await response.json();

    if (
      !Array.isArray(data.catalog) ||
      !data.recipes ||
      typeof data.recipes !== "object" ||
      typeof data.version !== "string"
    ) {
      throw new Error(
        "Ungültige Minecraft-Datendatei"
      );
    }

    minecraft = data;
    catalog = data.catalog.map(entry => ({
      ...entry,
      _searchDe: normalizeSearchText(entry.de),
      _searchEn: normalizeSearchText(entry.en || entry.id)
    }));

    catalogById = new Map(
      catalog.map(entry => [
        entry.id,
        entry
      ])
    );

    // Beschaffungsdaten sind optional. Listen und
    // Gesamtbedarf funktionieren auch ohne diese Datei.
    try {
      const sourcesResponse = await fetch(
        `./data/sources/${encodeURIComponent(data.version)}.json`
      );

      if (!sourcesResponse.ok) {
        throw new Error(
          `HTTP ${sourcesResponse.status}`
        );
      }

      const sourceData =
        await sourcesResponse.json();

      if (
        sourceData.version !== data.version ||
        !sourceData.entries ||
        typeof sourceData.entries !== "object"
      ) {
        throw new Error(
          "Beschaffungsdaten passen nicht zur Version."
        );
      }

      window.materialSources =
        sourceData.entries;
    } catch (sourceError) {
      window.materialSources =
        window.materialSources || {};

      console.warn(
        "Beschaffungsdaten nicht geladen:",
        sourceError
      );
    }
  } catch (error) {
    loadError = true;
    console.error(error);
  }

  render();
}

render();
loadAppVersion();
loadData();