const LISTS_KEY = "minecraft-materiallisten-v2";
const OLD_LISTS_KEY = "minecraft-materiallisten-v1";
const LANGUAGE_KEY = "minecraft-materiallisten-language-v1";
const THEME_KEY = "materialbuch-theme";
const VERSION_KEY = "craftlog-app-version";

const SORT_MODES = [
  "manual",
  "quantity-desc",
  "quantity-asc",
  "name-asc",
  "name-desc"
];

const BLOCK_VARIANT_ALIASES = {
  carrots: "carrot",
  potatoes: "potato",
  beetroots: "beetroot",
  sweet_berry_bush: "sweet_berries",
  attached_melon_stem: "melon_seeds",
  melon_stem: "melon_seeds",
  attached_pumpkin_stem: "pumpkin_seeds",
  pumpkin_stem: "pumpkin_seeds",
  torchflower_crop: "torchflower_seeds",
  pitcher_crop: "pitcher_pod",
  cocoa: "cocoa_beans",
  wall_torch: "torch",
  soul_wall_torch: "soul_torch",
  redstone_wall_torch: "redstone_torch",
  redstone_wire: "redstone",
  redstone_dust: "redstone",
  tripwire: "string",
  water: "water_bucket",
  lava: "lava_bucket",
  powder_snow: "powder_snow_bucket",
  frosted_ice: "ice",
  piston_head: "piston",
  tall_seagrass: "seagrass",
  kelp_plant: "kelp",
  bamboo_sapling: "bamboo",
  big_dripleaf_stem: "big_dripleaf",
  cave_vines: "glow_berries",
  cave_vines_plant: "glow_berries",
  weeping_vines_plant: "weeping_vines",
  twisting_vines_plant: "twisting_vines"
};

const LITEMATICA_SKIP_BLOCKS = new Set([
  "minecraft:air",
  "minecraft:cave_air",
  "minecraft:void_air",
  "minecraft:structure_void",
  "minecraft:piston_head",
  "minecraft:moving_piston",
  "minecraft:bubble_column",
  "minecraft:fire",
  "minecraft:soul_fire",
  "minecraft:water",
  "minecraft:lava"
]);

const SOURCE_CATEGORY_META = {
  location: { icon: "⛏️", de: "Fundort", en: "Location" },
  farm: { icon: "🌾", de: "Farm", en: "Farm" },
  trade: { icon: "🤝", de: "Handel", en: "Trading" },
  loot: { icon: "💎", de: "Loot", en: "Loot" },
  craft: { icon: "🔨", de: "Herstellung", en: "Crafting" }
};

const translations = {
  de: {
    lists: "Meine Listen",
    newList: "Neue Liste",
    addList: "Liste erstellen",
    overview: "Projektübersicht",
    noListsTitle: "Noch keine Liste.",
    noListsText:
      "Erstelle links deine erste Liste, füge eine kopierte Liste per Strg+V ein oder importiere eine .litematic-Datei.",
    listDescription:
      "Plane benötigte Blöcke und Gegenstände für dein Projekt.",
    shareBtn: "🔗 Link teilen",
    shareCopiedBtn: "✓ Link kopiert!",
    shareManualTitle: "Teilen-Link kopieren",
    shareManualHint:
      "Dein Browser blockiert automatisches Kopieren. Kopiere den Link hier manuell:",
    shareManualCopy: "Kopieren",
    shareManualClose: "Schließen",
    sharedBannerTitle: "Geteilte Projektliste erkannt",
    sharedBannerMeta: (name, count) => `„${name}“ (${count} Materialien)`,
    sharedImportBtn: "Liste übernehmen",
    sharedDismissBtn: "Schließen",
    stepMinus1: "Menge um 1 verringern",
    stepPlus1: "Menge um 1 erhöhen",
    stepPlus64: "1 Stack (+64) hinzufügen",
    duplicate: "Duplizieren",
    duplicateTitle:
      "Liste inklusive Notizen und Rezeptwahl als neue Vorlage kopieren",
    duplicateListName: name => `${name} (Kopie)`,
    listDuplicatedNotice: name => `Liste „${name}“ als Vorlage dupliziert`,
    notesTitle: "Projekt-Notizen & Koordinaten",
    notesPlaceholder:
      "z. B. Baustelle: X 120 / Y 68 / Z -450 · Nether-Tunnel: Blau · Dach: Tiefenschieferziegel …",
    notesSavedHint: "Automatisch lokal gespeichert",
    notesClear: "Notizen leeren",
    rename: "Umbenennen",
    delete: "Löschen",
    deleteQuestion: name => `Liste „${name}“ wirklich löschen?`,
    renameQuestion: "Neuer Listenname:",
    progress: "Fortschritt",
    completed: (done, total) => `${done} von ${total} erledigt`,
    listCompleteTitle: "Liste abgeschlossen!",
    listCompleteSubtitle: name => `${name} · 100 % erledigt`,
    listCompleteText:
      "Du hast alle Einträge in dieser Liste erledigt. Möchtest du die Liste jetzt löschen oder alle Haken zurücksetzen?",
    resetList: "Liste zurücksetzen",
    deleteListAction: "Liste löschen",
    keepList: "Behalten",
    close: "Schließen",
    undoAction: "Rückgängig",
    undoDismiss: "Hinweis schließen",
    itemRemovedNotice: label => `„${label}“ entfernt`,
    listRemovedNotice: name => `Liste „${name}“ gelöscht`,
    backupHeading: "Import & Backup",
    litematicaImport: "Litematica (.litematic / .txt)",
    litematicaImportTitle:
      "Litematica-Bauwerk (.litematic) oder Materialliste (.txt / .csv) direkt als Projekt einlesen",
    clipboardImport: "Aus Zwischenablage (Strg+V)",
    clipboardImportTitle:
      "Kopierte Litematica-Tabelle oder Materialliste direkt aus der Zwischenablage einfügen",
    clipboardEmptyError:
      "Die Zwischenablage ist leer oder enthält keine erkennbare Materialliste.",
    clipboardPermissionError:
      "Zugriff auf die Zwischenablage blockiert. Drücke einfach Strg+V (oder Cmd+V) direkt auf der Seite.",
    litematicaDialogTitle: "Litematica-Import",
    litematicaDialogSubtitle: (itemCount, blockCount) =>
      `${itemCount} ${itemCount === 1 ? "Material" : "Materialien"} · ${blockCount.toLocaleString("de-DE")} Blöcke gesamt`,
    litematicaListNameLabel: "Projekt- bzw. Listenname",
    litematicaDefaultListName: "Litematica-Projekt",
    litematicaQuantityModeLabel: "Zu übernehmende Mengen",
    litematicaModeTotal: "Gesamtmenge (Total)",
    litematicaModeMissing: "Nur fehlende (Missing)",
    litematicaUnmatchedTitle: count =>
      `${count} ${count === 1 ? "Eintrag" : "Einträge"} nicht im Katalog gefunden (werden übersprungen):`,
    litematicaNoItemsInMode:
      "In dieser Auswahl sind keine offenen Mengen enthalten.",
    litematicaAddToCurrent: "Zur aktuellen Liste",
    litematicaCreateNew: "Neue Liste erstellen",
    litematicaInvalidError:
      "Der Inhalt konnte nicht als Litematica-Datei (.litematic) oder Materialliste (.txt / .csv) erkannt werden.",
    litematicaEmptyError:
      "In dieser Materialliste wurden keine gültigen Materialien gefunden.",
    litematicaReadError: "Die Datei konnte nicht gelesen werden.",
    litematicaCreatedNotice: (name, count) =>
      `Liste „${name}“ mit ${count} ${count === 1 ? "Material" : "Materialien"} erstellt`,
    litematicaMergedNotice: (name, count) =>
      `${count} ${count === 1 ? "Material" : "Materialien"} zu „${name}“ hinzugefügt`,
    backupExport: "Backup speichern",
    backupExportTitle:
      "Alle Listen als lokale JSON-Datei herunterladen (ohne Cookies)",
    backupImport: "Backup laden",
    backupImportTitle: "Gesicherte JSON-Datei vom Gerät wiederherstellen",
    backupDialogTitle: "Backup wiederherstellen",
    backupDialogSubtitle: count =>
      `${count} ${count === 1 ? "Liste" : "Listen"} in der Datei gefunden`,
    backupDialogText:
      "Du hast bereits Listen in diesem Browser. Möchtest du die Listen aus dem Backup zusätzlich hinzufügen oder deine aktuellen Listen damit ersetzen?",
    backupMergeAction: "Listen hinzufügen",
    backupReplaceAction: "Bestehende ersetzen",
    backupInvalidError:
      "Die ausgewählte Datei ist kein gültiges CraftLog-Backup.",
    backupEmptyError:
      "In dieser Backup-Datei sind keine Listen enthalten.",
    backupReadError: "Die Datei konnte nicht gelesen werden.",
    backupSuccessNotice: count =>
      `${count} ${count === 1 ? "Liste" : "Listen"} aus Backup geladen`,
    hideCompleted: "Erledigte ausblenden",
    hideCompletedCount: count => `Erledigte ausblenden (${count})`,
    showCompletedAction: "Erledigte wieder einblenden",
    allHiddenTitle: "Alle Einträge sind erledigt.",
    allHiddenText: "Erledigte Einträge sind aktuell ausgeblendet.",
    sortLabel: "Sortierung",
    sortManual: "Sortierung: Zuletzt zuerst",
    sortQuantityDesc: "Menge: Höchste zuerst",
    sortQuantityAsc: "Menge: Niedrigste zuerst",
    sortNameAsc: "Name: A → Z",
    sortNameDesc: "Name: Z → A",
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
    collapseMaterials: "Materialien einklappen",
    expandMaterials: "Materialien ausklappen",
    noItemsTitle: "Die Liste ist noch leer.",
    noItemsText: "Füge oben einen Block oder Gegenstand hinzu.",
    block: "Block",
    item: "Gegenstand",
    noResults: "Keine Treffer.",
    narrow: count => `${count} Treffer. Tippe weiter, um einzugrenzen.`,
    choose: "Bitte einen Eintrag aus den Suchvorschlägen auswählen.",
    invalidQuantity: "Bitte eine ganze Anzahl größer als 0 eingeben.",
    remove: "Eintrag entfernen",
    editQuantity: "Anzahl ändern",
    save: "Speichern",
    cancel: "Abbrechen",
    source: "Quellen",
    plannedQuantity: "Geplante Menge",
    showSourcesFor: name => `Beschaffungswege für ${name} anzeigen`,
    totalUnavailable:
      "Der Gesamtbedarf konnte nicht geladen werden. Prüfe, ob list-summary.js vor app.js eingebunden ist.",
    loading: "Minecraft-Daten werden geladen …",
    loaded: count =>
      `${count} Blöcke und Gegenstände geladen · Minecraft Java 1.21.4`,
    incompleteNames: count => `${count} Einträge ohne deutschen Namen.`,
    loadError:
      "minecraft-data.json konnte nicht geladen werden. Prüfe, ob die Datei im Projektordner liegt und der Webserver läuft.",
    footerStorage: "Listen werden lokal in diesem Browser gespeichert."
  },

  en: {
    lists: "My lists",
    newList: "New list",
    addList: "Create list",
    overview: "Project overview",
    noListsTitle: "No lists yet.",
    noListsText:
      "Create your first list on the left, paste a copied list with Ctrl+V, or import a .litematic schematic.",
    listDescription:
      "Plan the blocks and items needed for your project.",
    shareBtn: "🔗 Share link",
    shareCopiedBtn: "✓ Link copied!",
    shareManualTitle: "Copy share link",
    shareManualHint:
      "Your browser blocked automatic clipboard access. Copy the link manually:",
    shareManualCopy: "Copy",
    shareManualClose: "Close",
    sharedBannerTitle: "Shared project list detected",
    sharedBannerMeta: (name, count) => `"${name}" (${count} materials)`,
    sharedImportBtn: "Import list",
    sharedDismissBtn: "Dismiss",
    stepMinus1: "Decrease quantity by 1",
    stepPlus1: "Increase quantity by 1",
    stepPlus64: "Add 1 stack (+64)",
    duplicate: "Duplicate",
    duplicateTitle:
      "Copy list including notes and recipe choices as a fresh template",
    duplicateListName: name => `${name} (Copy)`,
    listDuplicatedNotice: name => `Duplicated “${name}” as a template`,
    notesTitle: "Project notes & coordinates",
    notesPlaceholder:
      "e.g. Build site: X 120 / Y 68 / Z -450 · Nether tunnel: Blue · Roof: Deepslate bricks …",
    notesSavedHint: "Saved locally automatically",
    notesClear: "Clear notes",
    rename: "Rename",
    delete: "Delete",
    deleteQuestion: name => `Delete the list “${name}”?`,
    renameQuestion: "New list name:",
    progress: "Progress",
    completed: (done, total) => `${done} of ${total} completed`,
    listCompleteTitle: "List completed!",
    listCompleteSubtitle: name => `${name} · 100% completed`,
    listCompleteText:
      "You have completed all items in this list. Would you like to delete the list or reset all checkmarks?",
    resetList: "Reset list",
    deleteListAction: "Delete list",
    keepList: "Keep",
    close: "Close",
    undoAction: "Undo",
    undoDismiss: "Dismiss notice",
    itemRemovedNotice: label => `Removed “${label}”`,
    listRemovedNotice: name => `Deleted list “${name}”`,
    backupHeading: "Import & backup",
    litematicaImport: "Litematica (.litematic / .txt)",
    litematicaImportTitle:
      "Import a Litematica schematic (.litematic) or material list (.txt / .csv) directly as a project",
    clipboardImport: "From clipboard (Ctrl+V)",
    clipboardImportTitle:
      "Paste a copied Litematica table or material list directly from your clipboard",
    clipboardEmptyError:
      "Your clipboard is empty or does not contain a recognizable material list.",
    clipboardPermissionError:
      "Clipboard access was blocked. Simply press Ctrl+V (or Cmd+V) directly on the page.",
    litematicaDialogTitle: "Litematica import",
    litematicaDialogSubtitle: (itemCount, blockCount) =>
      `${itemCount} ${itemCount === 1 ? "material" : "materials"} · ${blockCount.toLocaleString("en-US")} blocks total`,
    litematicaListNameLabel: "Project / list name",
    litematicaDefaultListName: "Litematica project",
    litematicaQuantityModeLabel: "Quantities to import",
    litematicaModeTotal: "Total required (Total)",
    litematicaModeMissing: "Missing only (Missing)",
    litematicaUnmatchedTitle: count =>
      `${count} ${count === 1 ? "entry" : "entries"} not found in catalog (will be skipped):`,
    litematicaNoItemsInMode: "No remaining quantities in this selection.",
    litematicaAddToCurrent: "Add to current list",
    litematicaCreateNew: "Create new list",
    litematicaInvalidError:
      "Could not recognize this content as a Litematica schematic (.litematic) or material list (.txt / .csv).",
    litematicaEmptyError:
      "No valid materials were found in this material list.",
    litematicaReadError: "Could not read the file.",
    litematicaCreatedNotice: (name, count) =>
      `Created list “${name}” with ${count} ${count === 1 ? "material" : "materials"}`,
    litematicaMergedNotice: (name, count) =>
      `Added ${count} ${count === 1 ? "material" : "materials"} to “${name}”`,
    backupExport: "Save backup",
    backupExportTitle:
      "Download all lists as a local JSON file (no cookies)",
    backupImport: "Load backup",
    backupImportTitle:
      "Restore a saved JSON backup file from your device",
    backupDialogTitle: "Restore backup",
    backupDialogSubtitle: count =>
      `${count} ${count === 1 ? "list" : "lists"} found in file`,
    backupDialogText:
      "You already have lists in this browser. Would you like to add the backup lists to your existing ones or replace your current lists?",
    backupMergeAction: "Add lists",
    backupReplaceAction: "Replace existing",
    backupInvalidError:
      "The selected file is not a valid CraftLog backup.",
    backupEmptyError: "This backup file does not contain any lists.",
    backupReadError: "Could not read the selected file.",
    backupSuccessNotice: count =>
      `Loaded ${count} ${count === 1 ? "list" : "lists"} from backup`,
    hideCompleted: "Hide completed",
    hideCompletedCount: count => `Hide completed (${count})`,
    showCompletedAction: "Show completed entries",
    allHiddenTitle: "All entries are completed.",
    allHiddenText: "Completed entries are currently hidden.",
    sortLabel: "Sort order",
    sortManual: "Sort: Newest first",
    sortQuantityDesc: "Quantity: High to low",
    sortQuantityAsc: "Quantity: Low to high",
    sortNameAsc: "Name: A → Z",
    sortNameDesc: "Name: Z → A",
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
    collapseMaterials: "Collapse materials",
    expandMaterials: "Expand materials",
    noItemsTitle: "This list is empty.",
    noItemsText: "Add a block or item above.",
    block: "Block",
    item: "Item",
    noResults: "No results.",
    narrow: count => `${count} results. Keep typing to narrow them down.`,
    choose: "Please select an entry from the suggestions.",
    invalidQuantity: "Please enter a whole number greater than 0.",
    remove: "Remove entry",
    editQuantity: "Edit quantity",
    save: "Save",
    cancel: "Cancel",
    source: "Sources",
    plannedQuantity: "Planned quantity",
    showSourcesFor: name => `Show acquisition methods for ${name}`,
    totalUnavailable:
      "Could not load total materials. Check that list-summary.js is included before app.js.",
    loading: "Loading Minecraft data …",
    loaded: count =>
      `${count} blocks and items loaded · Minecraft Java 1.21.4`,
    incompleteNames: count => `${count} entries without a German name.`,
    loadError:
      "Could not load minecraft-data.json. Check that it is in the project folder and the web server is running.",
    footerStorage: "Lists are stored locally in this browser."
  }
};

let language = "de";
try {
  language = localStorage.getItem(LANGUAGE_KEY) === "en" ? "en" : "de";
} catch {
  language = "de";
}

let appVersion = "0.0.41";
try {
  const cachedVersion = localStorage.getItem(VERSION_KEY);
  if (cachedVersion) appVersion = cachedVersion;
} catch {
  // Standardversion behalten
}

let minecraft = null;
let catalog = [];
let catalogById = new Map();
let catalogByLookup = new Map();
let loadError = false;
let highlightedItemId = null;

let incomingSharePayload = null;
let shareCopyResetTimer = null;

let activeToast = null;
let toastTimerId = null;
let toastEffectTimerId = null;
let mcToastStyleInjected = false;

const failedIconIds = new Set();
const themeToggle = document.querySelector("#theme-toggle");

function t() {
  return translations[language];
}

function newId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function normalizeId(id) {
  if (typeof id !== "string") return "";
  return id.startsWith("minecraft:") ? id : `minecraft:${id}`;
}

function resolveCanonicalItemId(rawId) {
  const normalized = normalizeId(rawId);
  const short = normalized.replace(/^minecraft:/, "");
  if (!short) return normalized;

  if (BLOCK_VARIANT_ALIASES[short]) {
    return `minecraft:${BLOCK_VARIANT_ALIASES[short]}`;
  }
  if (short.startsWith("potted_")) {
    return `minecraft:${short.slice(7)}`;
  }
  if (short === "candle_cake" || short.endsWith("_candle_cake")) {
    return "minecraft:cake";
  }
  if (short.endsWith("_cauldron")) {
    return "minecraft:cauldron";
  }

  const wallMatch = short.match(
    /^(.+)_wall_(sign|hanging_sign|banner|head|skull|fan)$/
  );
  if (wallMatch) {
    return `minecraft:${wallMatch[1]}_${wallMatch[2]}`;
  }

  return normalized;
}

function isTechnicalBlockState(id) {
  const short = String(id || "").replace(/^minecraft:/, "");
  if (!short) return false;
  if (BLOCK_VARIANT_ALIASES[short]) return true;
  if (
    /^(air|cave_air|void_air|moving_piston|fire|soul_fire|nether_portal|end_portal|end_gateway|bubble_column)$/.test(
      short
    )
  ) {
    return true;
  }
  return resolveCanonicalItemId(`minecraft:${short}`) !== `minecraft:${short}`;
}

function openModalDialog(dialog, closeBtn) {
  const closeDialog = () => {
    if (dialog.open) dialog.close();
    dialog.remove();
  };

  if (closeBtn) {
    closeBtn.addEventListener("click", closeDialog);
  }
  dialog.addEventListener("click", event => {
    if (event.target === dialog) closeDialog();
  });
  dialog.addEventListener("close", () => dialog.remove());

  document.body.append(dialog);
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "");
  }

  return closeDialog;
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(LISTS_KEY));
    if (saved && Array.isArray(saved.lists)) {
      return {
        lists: saved.lists,
        hideCompleted: Boolean(saved.hideCompleted),
        sortBy: SORT_MODES.includes(saved.sortBy) ? saved.sortBy : "manual"
      };
    }
  } catch {
    // Weiter zu altem Schlüssel
  }

  try {
    const previous = JSON.parse(localStorage.getItem(OLD_LISTS_KEY));
    if (previous && Array.isArray(previous.folders)) {
      return {
        lists: previous.folders.flatMap(folder =>
          Array.isArray(folder.lists) ? folder.lists : []
        ),
        hideCompleted: false,
        sortBy: "manual"
      };
    }
  } catch {
    // Keine Alt-Daten vorhanden
  }

  return { lists: [], hideCompleted: false, sortBy: "manual" };
}

const state = loadState();
let activeListId = state.lists[0]?.id || null;

function save() {
  try {
    localStorage.setItem(LISTS_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Listen konnten nicht gespeichert werden:", error);
  }
}

save();

/* === Projektlisten als komprimierten Link teilen & importieren === */
function bytesToBase64Url(bytes) {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlToBytes(str) {
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function encodeSharePayload(payload) {
  const rawBytes = new TextEncoder().encode(JSON.stringify(payload));
  if (typeof CompressionStream !== "undefined") {
    try {
      const cs = new CompressionStream("deflate-raw");
      const writer = cs.writable.getWriter();
      await writer.write(rawBytes);
      await writer.close();
      const compressed = new Uint8Array(await new Response(cs.readable).arrayBuffer());
      return "z." + bytesToBase64Url(compressed);
    } catch {
      // Fallback auf unkomprimiertes Base64URL
    }
  }
  return "u." + bytesToBase64Url(rawBytes);
}

async function decodeSharePayload(encoded) {
  if (encoded.startsWith("z.") && typeof DecompressionStream !== "undefined") {
    const bytes = base64UrlToBytes(encoded.slice(2));
    const ds = new DecompressionStream("deflate-raw");
    const writer = ds.writable.getWriter();
    await writer.write(bytes);
    await writer.close();
    const raw = await new Response(ds.readable).arrayBuffer();
    return JSON.parse(new TextDecoder().decode(raw));
  }
  const rawPart = encoded.startsWith("u.") ? encoded.slice(2) : encoded;
  return JSON.parse(new TextDecoder().decode(base64UrlToBytes(rawPart)));
}

function animateShareButtonCopied(buttonEl) {
  if (!buttonEl) return;
  buttonEl.classList.remove("is-copied");
  void buttonEl.offsetWidth;
  buttonEl.classList.add("is-copied");
  buttonEl.textContent = t().shareCopiedBtn;

  clearTimeout(shareCopyResetTimer);
  shareCopyResetTimer = setTimeout(() => {
    if (buttonEl.isConnected) {
      buttonEl.classList.remove("is-copied");
      buttonEl.textContent = t().shareBtn;
    }
  }, 2200);
}

function openManualShareDialog(shareUrl, buttonEl) {
  document.getElementById("qol-share-dialog")?.remove();

  const dialog = document.createElement("dialog");
  dialog.id = "qol-share-dialog";
  dialog.className = "tc-source-dialog";

  const inner = document.createElement("div");
  inner.className = "tc-dialog-inner";

  const header = document.createElement("div");
  header.className = "tc-dialog-header";

  const titleGroup = document.createElement("div");
  titleGroup.className = "tc-dialog-title-group";

  const title = document.createElement("h3");
  title.className = "tc-dialog-title";
  title.textContent = t().shareManualTitle;
  titleGroup.append(title);

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "tc-dialog-close";
  closeBtn.textContent = "×";
  closeBtn.setAttribute("aria-label", t().shareManualClose);

  header.append(titleGroup, closeBtn);

  const body = document.createElement("div");
  body.className = "tc-dialog-body";

  const hint = document.createElement("p");
  hint.className = "tc-dialog-empty";
  hint.textContent = t().shareManualHint;

  const input = document.createElement("input");
  input.type = "text";
  input.className = "litematica-name-input";
  input.readOnly = true;
  input.value = shareUrl;

  const actions = document.createElement("div");
  actions.className = "tc-dialog-actions";

  let closeDialog = () => {};
  const copyBtn = makeButton(t().shareManualCopy, "primary-button", () => {
    input.focus();
    input.select();
    document.execCommand("copy");
    closeDialog();
    animateShareButtonCopied(buttonEl);
  });
  const cancelBtn = makeButton(t().shareManualClose, "quiet-button", () => closeDialog());

  actions.append(copyBtn, cancelBtn);
  body.append(hint, input, actions);
  inner.append(header, body);
  dialog.append(inner);

  closeDialog = openModalDialog(dialog, closeBtn);
  input.focus();
  input.select();
}

async function shareProjectList(list, buttonEl) {
  if (!list) return;

  const compact = {
    v: 2,
    n: String(list.name || "CraftLog Projekt").slice(0, 60),
    note: list.notes ? String(list.notes).slice(0, 1000) : "",
    i: (list.items || []).map(it => [
      String(it.blockId || "").replace(/^minecraft:/, ""),
      Math.max(1, Number(it.quantity) || 1),
      it.done ? 1 : 0
    ]),
    c: list.summaryChoices || {}
  };

  const token = await encodeSharePayload(compact);
  const baseUrl = window.location.href.split("#")[0];
  const shareUrl = `${baseUrl}#share=${token}`;

  try {
    await navigator.clipboard.writeText(shareUrl);
    animateShareButtonCopied(buttonEl);
  } catch {
    openManualShareDialog(shareUrl, buttonEl);
  }
}

function createIncomingShareBanner() {
  if (!incomingSharePayload) return null;

  const payload = incomingSharePayload;
  const banner = document.createElement("div");
  banner.id = "qol-share-banner";
  banner.className = "qol-share-banner";

  const info = document.createElement("div");
  info.className = "qol-share-banner-info";

  const title = document.createElement("strong");
  title.textContent = t().sharedBannerTitle;

  const meta = document.createElement("span");
  meta.textContent = t().sharedBannerMeta(payload.n || "Projekt", payload.i.length);

  info.append(title, meta);

  const btns = document.createElement("div");
  btns.className = "qol-share-banner-actions";

  const importBtn = makeButton(t().sharedImportBtn, "primary-button", () => {
    const importedList = {
      id: newId(),
      name: String(payload.n || "Geteilte Liste").slice(0, 60),
      notes: payload.note || "",
      notesOpen: Boolean(payload.note && payload.note.trim()),
      itemsOpen: true,
      summaryChoices: payload.c || {},
      items: payload.i
        .filter(([shortId]) => Boolean(shortId))
        .map(([shortId, qty, done]) => ({
          id: newId(),
          blockId: normalizeId(shortId),
          quantity: Math.max(1, Number(qty) || 1),
          done: Boolean(done)
        }))
    };

    state.lists.unshift(importedList);
    activeListId = importedList.id;
    incomingSharePayload = null;
    history.replaceState(null, "", window.location.pathname + window.location.search);
    save();
    render();
  });

  const closeBtn = makeButton(t().sharedDismissBtn, "quiet-button", () => {
    incomingSharePayload = null;
    history.replaceState(null, "", window.location.pathname + window.location.search);
    render();
  });

  btns.append(importBtn, closeBtn);
  banner.append(info, btns);
  return banner;
}

async function readIncomingShareHash() {
  const hash = window.location.hash || "";
  if (!hash.startsWith("#share=")) return;

  const token = hash.slice("#share=".length);
  if (!token) return;

  try {
    const payload = await decodeSharePayload(token);
    if (payload && Array.isArray(payload.i)) {
      incomingSharePayload = payload;
      render();
    }
  } catch (err) {
    console.warn("Geteilter Link konnte nicht gelesen werden:", err);
  }
}

function ensureMinecraftToastStyles() {
  if (mcToastStyleInjected || document.getElementById("craftlog-mc-toast-styles")) {
    mcToastStyleInjected = true;
    return;
  }

  const style = document.createElement("style");
  style.id = "craftlog-mc-toast-styles";
  style.textContent = `
    #craftlog-toast.craftlog-toast {
      position: fixed !important;
      top: calc(env(safe-area-inset-top, 0px) + 0.9rem) !important;
      left: 50% !important;
      right: auto !important;
      bottom: auto !important;
      transform: translateX(-50%) !important;
      z-index: 2147483647 !important;
      width: min(450px, calc(100vw - 1.5rem)) !important;
      margin: 0 !important;
      padding: 0 !important;
      display: block !important;
      overflow: visible !important;
      background: #212421 !important;
      color: #ffffff !important;
      border: 3px solid #101210 !important;
      border-radius: 2px !important;
      box-shadow:
        inset 2px 2px 0 #555c55,
        inset -2px -2px 0 #141614,
        0 14px 32px rgba(0, 0, 0, 0.52) !important;
    }

    #craftlog-toast.craftlog-toast.is-animated {
      animation: mcToastSlideIn 300ms cubic-bezier(0.18, 0.89, 0.32, 1.18) forwards;
    }

    #craftlog-toast.craftlog-toast--create {
      background: #222019 !important;
      border-color: #141109 !important;
      box-shadow:
        inset 2px 2px 0 #fcee4b,
        inset -2px -2px 0 #9c6b16,
        0 0 0 2px #141109,
        0 14px 32px rgba(0, 0, 0, 0.55) !important;
    }

    .mc-toast-body {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      padding: 0.72rem 0.9rem 0.68rem;
    }

    .mc-toast-icon {
      position: relative;
      width: 40px;
      height: 40px;
      flex: 0 0 40px;
      border-radius: 2px;
      box-shadow:
        inset 2px 2px 0 rgba(255, 255, 255, 0.28),
        inset -2px -2px 0 rgba(0, 0, 0, 0.38),
        0 0 0 2px #101210;
    }

    .craftlog-toast--delete .mc-toast-icon {
      background: linear-gradient(
        to bottom,
        #6ab04c 0 28%,
        #4e8d36 28% 36%,
        #8b5a2b 36% 100%
      );
      animation: mcBlockBreakAnim 540ms 140ms ease-out forwards;
    }

    .craftlog-toast--create .mc-toast-icon {
      overflow: hidden;
      background: linear-gradient(135deg, #fff176 0 25%, #fbc02d 25% 65%, #c77c14 65% 100%);
      box-shadow:
        inset 2px 2px 0 #fff9c4,
        inset -2px -2px 0 #8d5508,
        0 0 0 2px #141109;
      animation: mcAdvancementPop 520ms 120ms cubic-bezier(0.2, 1.35, 0.4, 1) forwards;
    }

    .craftlog-toast--create .mc-toast-icon::before {
      content: "+";
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      color: #ffffff;
      font-size: 1.45rem;
      font-weight: bold;
      text-shadow: 2px 2px 0 #6d3f04;
    }

    .craftlog-toast--create .mc-toast-icon::after {
      content: "";
      position: absolute;
      top: -20%;
      left: -60%;
      width: 45%;
      height: 140%;
      background: rgba(255, 255, 255, 0.65);
      transform: rotate(22deg);
      animation: mcGoldShine 750ms 240ms ease-out forwards;
    }

    .craftlog-toast--info .mc-toast-icon {
      background: linear-gradient(135deg, #64b5f6 0 35%, #1e88e5 35% 100%);
    }

    .craftlog-toast--info .mc-toast-icon::before {
      content: "✓";
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      color: #ffffff;
      font-size: 1.25rem;
      font-weight: bold;
      text-shadow: 1px 1px 0 #101210;
    }

    .mc-toast-cracks {
      position: absolute;
      inset: 2px;
      opacity: 0;
      background-image:
        linear-gradient(45deg, transparent 40%, #111 40% 54%, transparent 54%),
        linear-gradient(-45deg, transparent 42%, #111 42% 55%, transparent 55%),
        linear-gradient(90deg, transparent 45%, #111 45% 55%, transparent 55%);
      background-size: 16px 16px, 18px 18px, 14px 14px;
      background-position: 2px 3px, 10px 8px, 6px 12px;
      animation: mcCrackSteps 450ms 140ms steps(1) forwards;
    }

    .mc-toast-glyph {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      color: #ffffff;
      font-size: 1.2rem;
      font-weight: bold;
      text-shadow: 2px 2px 0 #101210;
      opacity: 0;
      animation: mcGlyphFadeIn 220ms 500ms ease-out forwards;
    }

    .mc-toast-content {
      min-width: 0;
      flex: 1 1 auto;
    }

    .mc-toast-kicker {
      margin: 0 0 0.14rem;
      font-size: 0.7rem;
      font-weight: bold;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      text-shadow: 1px 1px 0 #101210;
    }

    .craftlog-toast--delete .mc-toast-kicker { color: #ff7675; }
    .craftlog-toast--create .mc-toast-kicker { color: #ffff55; }
    .craftlog-toast--info .mc-toast-kicker { color: #80ff20; }

    .craftlog-toast-text {
      display: block;
      margin: 0;
      font-size: 0.9rem;
      font-weight: bold;
      color: #ffffff;
      text-shadow: 1px 1px 0 #101210;
      overflow-wrap: anywhere;
    }

    .craftlog-toast-actions {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      flex: 0 0 auto;
    }

    .craftlog-toast-undo {
      padding: 0.35rem 0.65rem;
      border: 2px solid #101210;
      border-radius: 2px;
      background: #4e8d36;
      color: #ffffff;
      font-size: 0.78rem;
      font-weight: bold;
      text-shadow: 1px 1px 0 #101210;
      box-shadow:
        inset 1px 1px 0 #8ad468,
        inset -1px -1px 0 #2d571d;
      cursor: pointer;
    }

    .craftlog-toast-undo:hover { background: #5ea642; }

    .craftlog-toast-close {
      width: 26px;
      height: 26px;
      padding: 0;
      border: 2px solid #101210;
      border-radius: 2px;
      background: #353a35;
      color: #d6dbd6;
      font-size: 0.95rem;
      line-height: 1;
      cursor: pointer;
    }

    .craftlog-toast-close:hover {
      background: #4a504a;
      color: #ffffff;
    }

    .craftlog-toast-progress {
      position: relative;
      display: block;
      height: 10px;
      width: 100%;
      background: #111511;
      border-top: 2px solid #101210;
      transform-origin: left center;
      background-image: linear-gradient(to bottom, #9cff3b 0 45%, #55c918 45% 100%);
      box-shadow: inset 0 -2px 0 #2e7d0b;
      animation: mcToastTimerRun linear forwards;
    }

    .craftlog-toast--create .craftlog-toast-progress {
      background-image: linear-gradient(to bottom, #fff176 0 45%, #fbc02d 45% 100%);
      box-shadow: inset 0 -2px 0 #a66c08;
    }

    .mc-pixel-particle {
      position: absolute;
      top: 26px;
      left: 30px;
      z-index: 30;
      width: var(--size, 9px);
      height: var(--size, 9px);
      background: var(--particle-color, #6ab04c);
      box-shadow:
        inset 1px 1px 0 rgba(255, 255, 255, 0.35),
        0 0 0 1.5px #101210;
      pointer-events: none;
      animation: mcPixelArc 950ms cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
    }

    @keyframes mcToastSlideIn {
      0% { opacity: 0; transform: translate(-50%, -28px) scale(0.92); }
      70% { opacity: 1; transform: translate(-50%, 4px) scale(1.02); }
      100% { opacity: 1; transform: translate(-50%, 0) scale(1); }
    }

    @keyframes mcCrackSteps {
      0% { opacity: 0.35; transform: scale(0.85); }
      33% { opacity: 0.72; transform: scale(0.95); }
      66% { opacity: 1; transform: scale(1); }
      100% { opacity: 0; }
    }

    @keyframes mcBlockBreakAnim {
      0% { transform: scale(1) rotate(0deg); }
      22% { transform: scale(1.08) rotate(-7deg); }
      46% { transform: scale(0.92) rotate(7deg); }
      72% { transform: scale(1.18) rotate(-4deg); filter: brightness(1.35); }
      86% { transform: scale(0.76); opacity: 0.6; }
      100% { transform: scale(1) rotate(0deg); opacity: 1; filter: brightness(1); }
    }

    @keyframes mcAdvancementPop {
      0% { transform: scale(0.85) rotate(-6deg); }
      55% { transform: scale(1.16) rotate(4deg); }
      100% { transform: scale(1) rotate(0deg); }
    }

    @keyframes mcGoldShine {
      0% { left: -60%; }
      100% { left: 140%; }
    }

    @keyframes mcGlyphFadeIn {
      0% { opacity: 0; transform: scale(0.5); }
      100% { opacity: 1; transform: scale(1); }
    }

    @keyframes mcToastTimerRun {
      from { transform: scaleX(1); }
      to { transform: scaleX(0); }
    }

    @keyframes mcPixelArc {
      0% { opacity: 1; transform: translate(0, 0) scale(1) rotate(0deg); }
      32% { opacity: 1; transform: translate(calc(var(--dx) * 0.45), var(--dy-peak, -28px)) scale(1.1) rotate(95deg); }
      100% { opacity: 0; transform: translate(var(--dx, 45px), var(--dy-end, 65px)) scale(0.4) rotate(220deg); }
    }
  `;
  document.head.appendChild(style);
  mcToastStyleInjected = true;
}

function playMinecraftToastSound(variant) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    if (variant === "create") {
      [659.25, 987.77].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);
        gain.gain.setValueAtTime(0.07, now + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.24);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 0.25);
      });
    } else if (variant === "delete") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(195, now);
      osc.frequency.exponentialRampToValueAtTime(72, now + 0.12);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.14);
    }
  } catch {
    // Audio optional
  }
}

function spawnMinecraftToastParticles(toastEl, variant) {
  if (variant !== "create" && variant !== "delete") return;
  const colors =
    variant === "create"
      ? ["#fff176", "#fbc02d", "#80ff20", "#ffffff", "#ffd54f"]
      : ["#6ab04c", "#4e8d36", "#8b5a2b", "#a87444", "#9cff3b"];

  const count = variant === "create" ? 18 : 22;
  for (let i = 0; i < count; i += 1) {
    const pixel = document.createElement("span");
    pixel.className = "mc-pixel-particle";

    const spreadX = (Math.random() - 0.35) * 200;
    const peakY = variant === "create" ? -28 - Math.random() * 42 : -18 - Math.random() * 34;
    const endY = variant === "create" ? 12 + Math.random() * 44 : 44 + Math.random() * 58;
    const size = 7 + Math.floor(Math.random() * 5);

    pixel.style.setProperty("--dx", `${Math.round(spreadX)}px`);
    pixel.style.setProperty("--dy-peak", `${Math.round(peakY)}px`);
    pixel.style.setProperty("--dy-end", `${Math.round(endY)}px`);
    pixel.style.setProperty("--size", `${size}px`);
    pixel.style.setProperty("--particle-color", colors[i % colors.length]);

    toastEl.appendChild(pixel);
    setTimeout(() => pixel.remove(), 980);
  }
}

function clearToast() {
  clearTimeout(toastTimerId);
  clearTimeout(toastEffectTimerId);
  toastTimerId = null;
  toastEffectTimerId = null;
  activeToast = null;
  document.getElementById("craftlog-toast")?.remove();
}

function renderToast(animate = true) {
  ensureMinecraftToastStyles();

  const existing = document.getElementById("craftlog-toast");
  if (!activeToast) {
    existing?.remove();
    return;
  }

  if (!animate && existing) {
    const textEl = existing.querySelector(".craftlog-toast-text");
    if (textEl) textEl.textContent = activeToast.getMessage();
    return;
  }

  existing?.remove();

  const variant = activeToast.variant || "info";
  const kickerText =
    variant === "create"
      ? (language === "de" ? "Fortschritt erzielt!" : "Advancement Made!")
      : variant === "delete"
        ? (language === "de" ? "Block abgebaut" : "Block Broken")
        : "CraftLog";

  const toast = document.createElement("div");
  toast.id = "craftlog-toast";
  toast.className = `craftlog-toast craftlog-toast--${variant}${animate ? " is-animated" : ""}`;
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");

  const body = document.createElement("div");
  body.className = "mc-toast-body";

  const icon = document.createElement("span");
  icon.className = "mc-toast-icon";
  icon.setAttribute("aria-hidden", "true");
  if (variant === "delete") {
    icon.innerHTML = '<span class="mc-toast-cracks"></span><span class="mc-toast-glyph">×</span>';
  }

  const content = document.createElement("div");
  content.className = "mc-toast-content";

  const kicker = document.createElement("p");
  kicker.className = "mc-toast-kicker";
  kicker.textContent = kickerText;

  const message = document.createElement("span");
  message.className = "craftlog-toast-text";
  message.textContent = activeToast.getMessage();

  content.append(kicker, message);

  const actions = document.createElement("div");
  actions.className = "craftlog-toast-actions";

  if (typeof activeToast.onUndo === "function") {
    const undoBtn = document.createElement("button");
    undoBtn.type = "button";
    undoBtn.className = "craftlog-toast-undo";
    undoBtn.textContent = t().undoAction;
    undoBtn.addEventListener("click", () => {
      const handler = activeToast?.onUndo;
      clearToast();
      handler?.();
    });
    actions.append(undoBtn);
  }

  const dismissBtn = document.createElement("button");
  dismissBtn.type = "button";
  dismissBtn.className = "craftlog-toast-close";
  dismissBtn.textContent = "×";
  dismissBtn.title = t().undoDismiss;
  dismissBtn.setAttribute("aria-label", t().undoDismiss);
  dismissBtn.addEventListener("click", clearToast);
  actions.append(dismissBtn);

  body.append(icon, content, actions);

  const timerBar = document.createElement("span");
  timerBar.className = "craftlog-toast-progress";
  timerBar.style.animationDuration = `${activeToast.duration}ms`;

  toast.append(body, timerBar);
  document.body.append(toast);

  if (animate && (variant === "create" || variant === "delete")) {
    const delay = variant === "create" ? 180 : 420;
    toastEffectTimerId = setTimeout(() => {
      if (toast.isConnected) {
        spawnMinecraftToastParticles(toast, variant);
        playMinecraftToastSound(variant);
      }
    }, delay);
  }
}

function showToast({ getMessage, onUndo = null, duration = 5000, variant = "info" }) {
  clearToast();
  activeToast = { getMessage, onUndo, duration, variant };
  renderToast(true);
  toastTimerId = setTimeout(clearToast, duration);
}

function deleteListWithUndo(list) {
  if (!list) return;

  const listIndex = state.lists.findIndex(entry => entry.id === list.id);
  if (listIndex === -1) return;

  const listSnapshot = JSON.parse(JSON.stringify(list));
  const previousActiveId = activeListId;

  state.lists.splice(listIndex, 1);

  if (activeListId === list.id) {
    activeListId =
      state.lists[listIndex]?.id ||
      state.lists[listIndex - 1]?.id ||
      state.lists[0]?.id ||
      null;
  }

  save();
  render();

  showToast({
    getMessage: () => t().listRemovedNotice(listSnapshot.name),
    variant: "delete",
    duration: 5500,
    onUndo: () => {
      const insertAt = Math.min(listIndex, state.lists.length);
      state.lists.splice(insertAt, 0, listSnapshot);
      activeListId = previousActiveId || listSnapshot.id;
      save();
      render();
    }
  });
}

function duplicateListAsTemplate(list) {
  if (!list) return;

  const listIndex = state.lists.findIndex(entry => entry.id === list.id);
  const copyName = t().duplicateListName(list.name);

  const clonedList = {
    ...JSON.parse(JSON.stringify(list)),
    id: newId(),
    name: copyName,
    notesOpen: Boolean(list.notes && list.notes.trim()),
    itemsOpen: typeof list.itemsOpen === "boolean" ? list.itemsOpen : true,
    summaryInventory: {},
    items: Array.isArray(list.items)
      ? list.items.map(entry => ({
          id: newId(),
          blockId: entry.blockId,
          quantity: entry.quantity,
          done: false
        }))
      : []
  };

  const insertAt = listIndex >= 0 ? listIndex + 1 : state.lists.length;
  state.lists.splice(insertAt, 0, clonedList);
  activeListId = clonedList.id;

  save();
  render();

  showToast({
    getMessage: () => t().listDuplicatedNotice(copyName),
    variant: "create",
    duration: 4200
  });
}

function normalizeLookupKey(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/^minecraft:/, "")
    .replace(/[_-]+/g, " ")
    .replace(/['’".,()]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function buildCatalogLookup(entries) {
  const map = new Map();

  for (const entry of entries) {
    const idSlug = entry.id.replace(/^minecraft:/, "");
    for (const key of [
      normalizeLookupKey(entry.en),
      normalizeLookupKey(entry.de),
      normalizeLookupKey(idSlug)
    ]) {
      if (key && !map.has(key)) {
        map.set(key, entry);
      }
    }
  }

  return map;
}

function resolveLitematicaEntry(rawName) {
  const cleaned = String(rawName || "").trim();
  if (!cleaned) return null;

  if (/^[a-z0-9_:-]+$/i.test(cleaned)) {
    const canonicalId = resolveCanonicalItemId(cleaned);
    if (catalogById.has(canonicalId)) {
      return catalogById.get(canonicalId);
    }
  }

  const normalized = normalizeLookupKey(cleaned);
  if (!normalized) return null;

  if (catalogByLookup.has(normalized)) {
    return catalogByLookup.get(normalized);
  }

  const slug = normalized.replace(/\s+/g, "_");
  const canonicalFromSlug = resolveCanonicalItemId(slug);
  if (catalogById.has(canonicalFromSlug)) {
    return catalogById.get(canonicalFromSlug);
  }

  if (normalized.includes(" wall ")) {
    const withoutWall = normalized.replace(/\s+wall\s+/g, " ").trim();
    if (catalogByLookup.has(withoutWall)) {
      return catalogByLookup.get(withoutWall);
    }
  }

  return null;
}

function parseIntegerCell(rawValue) {
  const digits = String(rawValue || "").replace(/[^\d]/g, "");
  if (!digits) return null;
  const num = Number.parseInt(digits, 10);
  return Number.isSafeInteger(num) && num >= 0 ? num : null;
}

function parseCsvLine(line, delimiter) {
  const cells = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === delimiter && !inQuotes) {
      cells.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  cells.push(current.trim());
  return cells;
}

function extractTitleFromFilename(fileName) {
  const base = String(fileName || "")
    .replace(/\.(litematic|txt|csv)$/i, "")
    .replace(/^material[_ -]?list[_ -]?/i, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return base || t().litematicaDefaultListName;
}

async function gunzipBufferIfNeeded(arrayBuffer) {
  const bytes = new Uint8Array(arrayBuffer);

  if (bytes.length >= 2 && bytes[0] === 0x1f && bytes[1] === 0x8b) {
    if (typeof DecompressionStream !== "function") {
      throw new Error("DecompressionStream is not supported in this browser.");
    }

    const decompressedStream = new Blob([bytes])
      .stream()
      .pipeThrough(new DecompressionStream("gzip"));

    return new Uint8Array(await new Response(decompressedStream).arrayBuffer());
  }

  return bytes;
}

function parseNbtRoot(bytes) {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const utf8Decoder = new TextDecoder("utf-8");
  let offset = 0;

  function ensureBytes(count) {
    if (offset + count > bytes.length) {
      throw new Error("Unexpected end of NBT data");
    }
  }

  function readString() {
    ensureBytes(2);
    const len = view.getUint16(offset, false);
    offset += 2;
    ensureBytes(len);
    const str = utf8Decoder.decode(bytes.subarray(offset, offset + len));
    offset += len;
    return str;
  }

  function readPayload(tagType) {
    switch (tagType) {
      case 1: {
        ensureBytes(1);
        const val = view.getInt8(offset);
        offset += 1;
        return val;
      }
      case 2: {
        ensureBytes(2);
        const val = view.getInt16(offset, false);
        offset += 2;
        return val;
      }
      case 3: {
        ensureBytes(4);
        const val = view.getInt32(offset, false);
        offset += 4;
        return val;
      }
      case 4: {
        ensureBytes(8);
        const val = view.getBigInt64(offset, false);
        offset += 8;
        return val;
      }
      case 5: {
        ensureBytes(4);
        const val = view.getFloat32(offset, false);
        offset += 4;
        return val;
      }
      case 6: {
        ensureBytes(8);
        const val = view.getFloat64(offset, false);
        offset += 8;
        return val;
      }
      case 7: {
        ensureBytes(4);
        const len = view.getInt32(offset, false);
        if (len < 0) throw new Error("Negative ByteArray length");
        offset += 4;
        ensureBytes(len);
        const arr = bytes.slice(offset, offset + len);
        offset += len;
        return arr;
      }
      case 8:
        return readString();
      case 9: {
        ensureBytes(5);
        const elemType = view.getInt8(offset);
        const len = view.getInt32(offset + 1, false);
        offset += 5;
        if (len < 0) throw new Error("Negative List length");
        const list = [];
        for (let i = 0; i < len; i++) {
          list.push(readPayload(elemType));
        }
        return list;
      }
      case 10: {
        const obj = Object.create(null);
        while (true) {
          ensureBytes(1);
          const childType = view.getInt8(offset);
          offset += 1;
          if (childType === 0) break;
          const childName = readString();
          obj[childName] = readPayload(childType);
        }
        return obj;
      }
      case 11: {
        ensureBytes(4);
        const len = view.getInt32(offset, false);
        if (len < 0) throw new Error("Negative IntArray length");
        offset += 4;
        ensureBytes(len * 4);
        const arr = new Int32Array(len);
        for (let i = 0; i < len; i++) {
          arr[i] = view.getInt32(offset, false);
          offset += 4;
        }
        return arr;
      }
      case 12: {
        ensureBytes(4);
        const len = view.getInt32(offset, false);
        if (len < 0) throw new Error("Negative LongArray length");
        offset += 4;
        ensureBytes(len * 8);
        const arr = new Array(len);
        for (let i = 0; i < len; i++) {
          arr[i] = view.getBigInt64(offset, false);
          offset += 8;
        }
        return arr;
      }
      default:
        throw new Error(`Unknown NBT tag type: ${tagType}`);
    }
  }

  ensureBytes(1);
  const rootType = view.getInt8(offset);
  offset += 1;

  if (rootType !== 10) {
    throw new Error("NBT root is not a TAG_Compound");
  }

  readString();
  return readPayload(10);
}

function getBlockStateContributions(paletteEntry) {
  if (!paletteEntry || typeof paletteEntry.Name !== "string") {
    return [];
  }

  const blockId = normalizeId(paletteEntry.Name.trim());
  const props = paletteEntry.Properties || {};

  if (LITEMATICA_SKIP_BLOCKS.has(blockId) || props.half === "upper" || props.part === "head") {
    return [];
  }

  if (blockId.startsWith("minecraft:potted_")) {
    return [
      { rawName: "minecraft:flower_pot", count: 1 },
      { rawName: blockId.replace("minecraft:potted_", "minecraft:"), count: 1 }
    ];
  }

  let count = 1;
  if (props.type === "double") {
    count = 2;
  } else {
    for (const propKey of ["candles", "pickles", "eggs", "flower_amount", "layers"]) {
      if (props[propKey] !== undefined) {
        count = Math.max(1, Number.parseInt(props[propKey], 10) || 1);
        break;
      }
    }
  }

  return [{ rawName: blockId, count }];
}

function countRegionBlocks(region) {
  const palette = Array.isArray(region?.BlockStatePalette) ? region.BlockStatePalette : null;
  const blockStates = Array.isArray(region?.BlockStates) ? region.BlockStates : null;
  const size = region?.Size;

  if (!palette || palette.length === 0 || !blockStates || !size) {
    return [];
  }

  const volume =
    Math.abs(Number(size.x) || 0) *
    Math.abs(Number(size.y) || 0) *
    Math.abs(Number(size.z) || 0);

  if (volume <= 0) return [];

  const paletteSize = palette.length;
  const bitsPerEntry = Math.max(2, 32 - Math.clz32(Math.max(1, paletteSize - 1)));
  const mask = (1n << BigInt(bitsPerEntry)) - 1n;
  const stateCounts = new Uint32Array(paletteSize);

  const expectedSpanningLongs = Math.ceil((volume * bitsPerEntry) / 64);
  const entriesPerLong = Math.floor(64 / bitsPerEntry);
  const expectedPaddedLongs = Math.ceil(volume / entriesPerLong);
  const usePaddedLayout =
    blockStates.length !== expectedSpanningLongs &&
    blockStates.length === expectedPaddedLongs;

  if (usePaddedLayout) {
    for (let i = 0; i < volume; i++) {
      const longIndex = Math.floor(i / entriesPerLong);
      if (longIndex >= blockStates.length) break;
      const bitOffset = BigInt((i % entriesPerLong) * bitsPerEntry);
      const word = BigInt.asUintN(64, blockStates[longIndex]);
      const paletteIndex = Number((word >> bitOffset) & mask);
      if (paletteIndex < paletteSize) stateCounts[paletteIndex]++;
    }
  } else {
    for (let i = 0; i < volume; i++) {
      const startBit = i * bitsPerEntry;
      const startArrIndex = Math.floor(startBit / 64);
      if (startArrIndex >= blockStates.length) break;

      const endArrIndex = Math.floor((startBit + bitsPerEntry - 1) / 64);
      const startBitOffset = BigInt(startBit % 64);
      const lowWord = BigInt.asUintN(64, blockStates[startArrIndex]);

      const paletteIndex =
        startArrIndex === endArrIndex || endArrIndex >= blockStates.length
          ? Number((lowWord >> startBitOffset) & mask)
          : Number(
              ((lowWord >> startBitOffset) |
                (BigInt.asUintN(64, blockStates[endArrIndex]) << (64n - startBitOffset))) &
                mask
            );

      if (paletteIndex < paletteSize) stateCounts[paletteIndex]++;
    }
  }

  const contributions = [];
  for (let idx = 0; idx < paletteSize; idx++) {
    const blockCount = stateCounts[idx];
    if (blockCount === 0) continue;

    for (const part of getBlockStateContributions(palette[idx])) {
      contributions.push({
        rawName: part.rawName,
        total: blockCount * part.count,
        missing: blockCount * part.count
      });
    }
  }

  return contributions;
}

function finalizeLitematicaRows(rawRows, title) {
  if (!Array.isArray(rawRows) || rawRows.length === 0) return null;

  const matchedById = new Map();
  const unmatched = [];

  for (const row of rawRows) {
    if (!row || row.total <= 0) continue;

    const entry = resolveLitematicaEntry(row.rawName);
    if (!entry) {
      unmatched.push(row.rawName.replace(/^minecraft:/, ""));
      continue;
    }

    const existing = matchedById.get(entry.id);
    if (existing) {
      existing.total += row.total;
      existing.missing += row.missing;
    } else {
      matchedById.set(entry.id, {
        blockId: entry.id,
        isBlock: entry.isBlock,
        total: row.total,
        missing: row.missing
      });
    }
  }

  return {
    title,
    matched: [...matchedById.values()],
    unmatched: [...new Set(unmatched)]
  };
}

async function parseLitematicBinaryFile(file) {
  const arrayBuffer = await file.arrayBuffer();
  const uncompressedBytes = await gunzipBufferIfNeeded(arrayBuffer);
  const root = parseNbtRoot(uncompressedBytes);

  if (!root || typeof root.Regions !== "object" || !root.Regions) {
    return null;
  }

  const metaName =
    typeof root.Metadata?.Name === "string" && root.Metadata.Name.trim()
      ? root.Metadata.Name.trim()
      : "";

  const rawRows = [];
  for (const region of Object.values(root.Regions)) {
    rawRows.push(...countRegionBlocks(region));
  }

  return finalizeLitematicaRows(
    rawRows,
    metaName || extractTitleFromFilename(file.name)
  );
}

function parseLitematicaContent(rawText, fileName = "") {
  const lines = String(rawText || "")
    .replace(/^\uFEFF/, "")
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean);

  if (lines.length === 0) return null;

  let detectedTitle = "";
  const rawRows = [];
  const headerWords = new Set(["item", "items", "block", "material", "gegenstand", "name"]);
  const isAsciiTable = lines.some(line => line.startsWith("|") && line.endsWith("|"));

  if (isAsciiTable) {
    for (const line of lines) {
      if (/^[+=-]+$/.test(line) || !line.startsWith("|") || !line.endsWith("|")) {
        continue;
      }

      const cells = line.slice(1, -1).split("|").map(cell => cell.trim());
      if (!cells[0]) continue;

      const titleMatch = cells[0].match(
        /^(?:Material\s+List\s+for|Materialliste\s+f(?:ü|ue)r)\s+['"„“]?(.+?)['"”“]?$/i
      );
      if (titleMatch?.[1]) {
        detectedTitle = titleMatch[1].trim();
        continue;
      }

      if (headerWords.has(cells[0].toLowerCase())) continue;

      const total = parseIntegerCell(cells[1]);
      if (total === null) continue;

      const missing = cells.length >= 3 ? parseIntegerCell(cells[2]) : total;
      rawRows.push({
        rawName: cells[0],
        total,
        missing: missing !== null ? missing : total
      });
    }
  } else {
    const firstLine = lines[0];
    const delimiter =
      (firstLine.match(/;/g) || []).length > (firstLine.match(/,/g) || []).length
        ? ";"
        : ",";

    for (const line of lines) {
      if (line.startsWith("#")) continue;

      const cells = parseCsvLine(line, delimiter);
      if (cells.length < 2 || !cells[0] || headerWords.has(cells[0].toLowerCase())) {
        continue;
      }

      const total = parseIntegerCell(cells[1]);
      if (total === null) continue;

      const missing = cells.length >= 3 ? parseIntegerCell(cells[2]) : total;
      rawRows.push({
        rawName: cells[0],
        total,
        missing: missing !== null ? missing : total
      });
    }
  }

  return finalizeLitematicaRows(
    rawRows,
    detectedTitle || extractTitleFromFilename(fileName)
  );
}

function openLitematicaImportDialog(parsed) {
  document.getElementById("craftlog-litematica-dialog")?.remove();

  const hasDifferentMissing = parsed.matched.some(entry => entry.missing !== entry.total);
  let quantityMode = "total";

  function getActiveEntries() {
    return parsed.matched
      .map(entry => ({
        blockId: entry.blockId,
        isBlock: entry.isBlock,
        quantity: quantityMode === "missing" ? entry.missing : entry.total
      }))
      .filter(entry => entry.quantity > 0);
  }

  const dialog = document.createElement("dialog");
  dialog.id = "craftlog-litematica-dialog";
  dialog.className = "tc-source-dialog litematica-dialog";

  const inner = document.createElement("div");
  inner.className = "tc-dialog-inner";

  const header = document.createElement("div");
  header.className = "tc-dialog-header";

  const titleGroup = document.createElement("div");
  titleGroup.className = "tc-dialog-title-group";

  const badgeIcon = document.createElement("span");
  badgeIcon.className = "tc-complete-badge";
  badgeIcon.setAttribute("aria-hidden", "true");
  badgeIcon.textContent = "📐";

  const titleText = document.createElement("div");
  titleText.className = "tc-dialog-title-text";

  const title = document.createElement("h3");
  title.className = "tc-dialog-title";
  title.textContent = t().litematicaDialogTitle;

  const subtitle = document.createElement("span");
  subtitle.className = "tc-dialog-subtitle";

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
  dialogBody.className = "tc-dialog-body litematica-dialog-body";

  const nameField = document.createElement("label");
  nameField.className = "litematica-field";

  const nameLabel = document.createElement("span");
  nameLabel.className = "litematica-field-label";
  nameLabel.textContent = t().litematicaListNameLabel;

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.className = "litematica-name-input";
  nameInput.value = parsed.title;
  nameInput.placeholder = t().litematicaDefaultListName;

  nameField.append(nameLabel, nameInput);
  dialogBody.append(nameField);

  if (hasDifferentMissing) {
    const modeRow = document.createElement("div");
    modeRow.className = "litematica-mode-row";

    const modeLabel = document.createElement("span");
    modeLabel.className = "litematica-field-label";
    modeLabel.textContent = t().litematicaQuantityModeLabel;

    const modeSwitch = document.createElement("div");
    modeSwitch.className = "litematica-mode-switch";

    const totalBtn = makeButton(t().litematicaModeTotal, "litematica-mode-btn is-active", () => {
      quantityMode = "total";
      totalBtn.classList.add("is-active");
      missingBtn.classList.remove("is-active");
      refreshPreview();
    });

    const missingBtn = makeButton(t().litematicaModeMissing, "litematica-mode-btn", () => {
      quantityMode = "missing";
      missingBtn.classList.add("is-active");
      totalBtn.classList.remove("is-active");
      refreshPreview();
    });

    modeSwitch.append(totalBtn, missingBtn);
    modeRow.append(modeLabel, modeSwitch);
    dialogBody.append(modeRow);
  }

  const previewList = document.createElement("div");
  previewList.className = "litematica-preview-list";
  dialogBody.append(previewList);

  if (parsed.unmatched.length > 0) {
    const warning = document.createElement("div");
    warning.className = "litematica-unmatched-box";

    const warnTitle = document.createElement("strong");
    warnTitle.textContent = t().litematicaUnmatchedTitle(parsed.unmatched.length);

    const warnText = document.createElement("span");
    warnText.textContent = parsed.unmatched.join(", ");

    warning.append(warnTitle, warnText);
    dialogBody.append(warning);
  }

  const actions = document.createElement("div");
  actions.className = "tc-dialog-actions";

  let closeDialog = () => {};
  const cancelBtn = makeButton(t().cancel, "quiet-button", () => closeDialog());

  const currentList = state.lists.find(entry => entry.id === activeListId);
  const addToCurrentBtn = currentList
    ? makeButton(t().litematicaAddToCurrent, "quiet-button", () => {
        const entries = getActiveEntries();
        if (entries.length === 0) return;

        if (!Array.isArray(currentList.items)) currentList.items = [];

        for (const imported of entries) {
          const normalized = normalizeId(imported.blockId);
          const existing = currentList.items.find(
            item => normalizeId(item.blockId) === normalized
          );

          if (existing) {
            existing.quantity += imported.quantity;
            existing.done = false;
          } else {
            currentList.items.push({
              id: newId(),
              blockId: imported.blockId,
              quantity: imported.quantity,
              done: false
            });
          }
        }

        currentList.itemsOpen = true;
        closeDialog();
        save();
        render();

        showToast({
          getMessage: () => t().litematicaMergedNotice(currentList.name, entries.length),
          duration: 4500
        });
      })
    : null;

  const createNewBtn = makeButton(t().litematicaCreateNew, "primary-button", () => {
    const entries = getActiveEntries();
    if (entries.length === 0) return;

    const listName = nameInput.value.trim() || t().litematicaDefaultListName;
    const createdList = {
      id: newId(),
      name: listName,
      itemsOpen: true,
      items: entries.map(entry => ({
        id: newId(),
        blockId: entry.blockId,
        quantity: entry.quantity,
        done: false
      }))
    };

    state.lists.push(createdList);
    activeListId = createdList.id;

    closeDialog();
    save();
    render();

    showToast({
      getMessage: () => t().litematicaCreatedNotice(listName, entries.length),
      variant: "create",
      duration: 4500
    });
  });

  actions.append(cancelBtn);
  if (addToCurrentBtn) actions.append(addToCurrentBtn);
  actions.append(createNewBtn);
  dialogBody.append(actions);

  inner.append(dialogBody);
  dialog.append(inner);

  function refreshPreview() {
    const entries = getActiveEntries().sort((a, b) => b.quantity - a.quantity);
    const totalBlocks = entries.reduce((sum, entry) => sum + entry.quantity, 0);

    subtitle.textContent = t().litematicaDialogSubtitle(entries.length, totalBlocks);
    previewList.replaceChildren();

    if (entries.length === 0) {
      const emptyNote = document.createElement("p");
      emptyNote.className = "litematica-preview-empty";
      emptyNote.textContent = t().litematicaNoItemsInMode;
      previewList.append(emptyNote);
      createNewBtn.disabled = true;
      if (addToCurrentBtn) addToCurrentBtn.disabled = true;
      return;
    }

    createNewBtn.disabled = false;
    if (addToCurrentBtn) addToCurrentBtn.disabled = false;

    for (const entry of entries) {
      const row = document.createElement("div");
      row.className = "litematica-preview-row";

      const left = document.createElement("span");
      left.className = "litematica-preview-item";

      const icon = createItemIcon(entry.blockId, entry.isBlock);
      const itemTitle = document.createElement("span");
      itemTitle.className = "litematica-preview-name";
      itemTitle.textContent = nameOf(entry.blockId);

      left.append(icon, itemTitle);

      const qty = document.createElement("span");
      qty.className = "litematica-preview-qty";
      const stackHint = formatStackHint(entry.quantity);
      qty.textContent = stackHint
        ? `${entry.quantity} × (${stackHint})`
        : `${entry.quantity} ×`;

      row.append(left, qty);
      previewList.append(row);
    }
  }

  refreshPreview();
  closeDialog = openModalDialog(dialog, closeBtn);
}

function importRawMaterialText(rawText, silent = false) {
  if (!minecraft) return false;
  const trimmed = String(rawText || "").trim();
  if (!trimmed) {
    if (!silent) alert(t().clipboardEmptyError);
    return false;
  }

  const parsed = parseLitematicaContent(trimmed, "");
  if (!parsed) {
    if (!silent) alert(t().litematicaInvalidError);
    return false;
  }

  if (parsed.matched.length === 0) {
    if (!silent) alert(t().litematicaEmptyError);
    return false;
  }

  openLitematicaImportDialog(parsed);
  return true;
}

async function triggerClipboardImport() {
  if (!minecraft) return;

  if (!navigator.clipboard || typeof navigator.clipboard.readText !== "function") {
    alert(t().clipboardPermissionError);
    return;
  }

  try {
    const text = await navigator.clipboard.readText();
    importRawMaterialText(text, false);
  } catch {
    alert(t().clipboardPermissionError);
  }
}

async function handleLitematicaFileSelection(file) {
  if (!file) return;

  try {
    const parsed = /\.litematic$/i.test(file.name)
      ? await parseLitematicBinaryFile(file)
      : parseLitematicaContent(await file.text(), file.name);

    if (!parsed) {
      alert(t().litematicaInvalidError);
      return;
    }

    if (parsed.matched.length === 0) {
      alert(t().litematicaEmptyError);
      return;
    }

    openLitematicaImportDialog(parsed);
  } catch (error) {
    console.error("Litematica-Import fehlgeschlagen:", error);
    alert(t().litematicaReadError);
  }
}

function triggerLitematicaPicker() {
  if (!minecraft) return;

  const picker = document.createElement("input");
  picker.type = "file";
  picker.accept = ".litematic,.txt,.csv,text/plain,text/csv,application/octet-stream";
  picker.hidden = true;

  picker.addEventListener("change", async () => {
    const selectedFile = picker.files?.[0];
    picker.remove();
    await handleLitematicaFileSelection(selectedFile);
  });

  document.body.append(picker);
  picker.click();
}

function exportBackupFile() {
  const dateStamp = new Date().toISOString().slice(0, 10);
  const payload = {
    app: "CraftLog",
    formatVersion: 1,
    exportedAt: new Date().toISOString(),
    lists: state.lists
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json;charset=utf-8"
  });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `craftlog-backup-${dateStamp}.json`;
  document.body.append(link);
  link.click();
  link.remove();

  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function sanitizeImportedLists(rawLists) {
  if (!Array.isArray(rawLists)) return null;

  const sanitized = [];

  for (const rawList of rawLists) {
    if (!rawList || typeof rawList !== "object") continue;

    const name =
      typeof rawList.name === "string" && rawList.name.trim()
        ? rawList.name.trim()
        : null;

    if (!name || !Array.isArray(rawList.items)) continue;

    const cleanItems = rawList.items
      .filter(
        rawItem =>
          rawItem &&
          typeof rawItem === "object" &&
          typeof rawItem.blockId === "string" &&
          rawItem.blockId.trim() &&
          Number.isSafeInteger(Number(rawItem.quantity)) &&
          Number(rawItem.quantity) >= 1
      )
      .map(rawItem => ({
        id:
          typeof rawItem.id === "string" && rawItem.id.trim()
            ? rawItem.id
            : newId(),
        blockId: rawItem.blockId.trim(),
        quantity: Number(rawItem.quantity),
        done: Boolean(rawItem.done)
      }));

    const cleanList = {
      id:
        typeof rawList.id === "string" && rawList.id.trim()
          ? rawList.id
          : newId(),
      name,
      items: cleanItems
    };

    for (const [key, expectedType] of [
      ["notes", "string"],
      ["notesOpen", "boolean"],
      ["itemsOpen", "boolean"],
      ["summaryFuel", "string"],
      ["summaryUnitMode", "string"],
      ["summaryOpen", "boolean"],
      ["summaryFarmMode", "boolean"]
    ]) {
      if (typeof rawList[key] === expectedType) {
        cleanList[key] = rawList[key];
      }
    }

    for (const objKey of ["summaryChoices", "summaryInventory", "summarySections"]) {
      if (rawList[objKey] && typeof rawList[objKey] === "object") {
        cleanList[objKey] = { ...rawList[objKey] };
      }
    }

    sanitized.push(cleanList);
  }

  return sanitized;
}

function applyImportedLists(importedLists, mode) {
  if (mode === "replace") {
    state.lists = importedLists;
    activeListId = state.lists[0]?.id || null;
  } else {
    const usedIds = new Set(state.lists.map(entry => entry.id));

    for (const entry of importedLists) {
      if (usedIds.has(entry.id)) {
        entry.id = newId();
      }
      usedIds.add(entry.id);
      state.lists.push(entry);
    }

    if (importedLists[0]) {
      activeListId = importedLists[0].id;
    }
  }

  clearToast();
  save();
  render();

  showToast({
    getMessage: () => t().backupSuccessNotice(importedLists.length),
    duration: 4000
  });
}

function openBackupImportDialog(importedLists) {
  document.getElementById("craftlog-backup-dialog")?.remove();

  const dialog = document.createElement("dialog");
  dialog.id = "craftlog-backup-dialog";
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
  badgeIcon.textContent = "↑";

  const titleText = document.createElement("div");
  titleText.className = "tc-dialog-title-text";

  const title = document.createElement("h3");
  title.className = "tc-dialog-title";
  title.textContent = t().backupDialogTitle;

  const subtitle = document.createElement("span");
  subtitle.className = "tc-dialog-subtitle";
  subtitle.textContent = t().backupDialogSubtitle(importedLists.length);

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
  message.textContent = t().backupDialogText;

  const actions = document.createElement("div");
  actions.className = "tc-dialog-actions";

  let closeDialog = () => {};
  const cancelBtn = makeButton(t().cancel, "quiet-button", () => closeDialog());
  const replaceBtn = makeButton(t().backupReplaceAction, "danger-button", () => {
    closeDialog();
    applyImportedLists(importedLists, "replace");
  });
  const mergeBtn = makeButton(t().backupMergeAction, "primary-button", () => {
    closeDialog();
    applyImportedLists(importedLists, "merge");
  });

  actions.append(cancelBtn, replaceBtn, mergeBtn);
  dialogBody.append(message, actions);
  inner.append(dialogBody);
  dialog.append(inner);

  closeDialog = openModalDialog(dialog, closeBtn);
}

async function handleBackupFileSelection(file) {
  if (!file) return;

  try {
    const parsed = JSON.parse(await file.text());
    const rawLists = Array.isArray(parsed) ? parsed : parsed?.lists;
    const importedLists = sanitizeImportedLists(rawLists);

    if (!importedLists) {
      alert(t().backupInvalidError);
      return;
    }

    if (importedLists.length === 0) {
      alert(t().backupEmptyError);
      return;
    }

    if (state.lists.length === 0) {
      applyImportedLists(importedLists, "replace");
    } else {
      openBackupImportDialog(importedLists);
    }
  } catch (error) {
    console.error("Backup-Import fehlgeschlagen:", error);
    alert(error instanceof SyntaxError ? t().backupInvalidError : t().backupReadError);
  }
}

function nameOf(id) {
  const entry = catalogById.get(normalizeId(id));
  if (!entry) return String(id).replace(/^minecraft:/, "");
  return language === "de" ? entry.de || entry.en : entry.en;
}

function formatStackHint(quantity) {
  const count = Math.floor(Number(quantity) || 0);
  if (count < 64) return "";

  const stacks = Math.floor(count / 64);
  const rest = count % 64;
  const stackWord =
    language === "de"
      ? (stacks === 1 ? "Stack" : "Stacks")
      : (stacks === 1 ? "stack" : "stacks");

  return rest > 0 ? `${stacks} ${stackWord} + ${rest}` : `${stacks} ${stackWord}`;
}

function installSafeIconHelper() {
  const H = window.CraftLogHelpers;
  if (!H || typeof H.applyItemIcon !== "function" || H.applyItemIcon._isSafeWrapped) {
    return;
  }

  const originalApplyItemIcon = H.applyItemIcon.bind(H);
  const originalColorForItem =
    typeof H.colorForItem === "function" ? H.colorForItem.bind(H) : null;

  if (originalColorForItem) {
    H.colorForItem = rawId => originalColorForItem(resolveCanonicalItemId(rawId));
  }

  H.applyItemIcon = function safeApplyItemIcon(iconEl, rawId) {
    const resolvedId = resolveCanonicalItemId(rawId);

    if (originalColorForItem && iconEl) {
      iconEl.style.setProperty("--swatch-color", originalColorForItem(resolvedId));
    }

    if (!iconEl || failedIconIds.has(resolvedId)) return;

    originalApplyItemIcon(iconEl, resolvedId);

    const img = iconEl.querySelector("img");
    if (img) {
      img.decoding = "async";
      if (!img.dataset.safeErrorBound) {
        img.dataset.safeErrorBound = "1";
        img.addEventListener(
          "error",
          () => {
            failedIconIds.add(resolvedId);
            img.remove();
            iconEl.classList.remove("has-icon");
          },
          { once: true }
        );
      }
    }
  };

  H.applyItemIcon._isSafeWrapped = true;
}

function createItemIcon(id, isBlock) {
  installSafeIconHelper();

  const icon = document.createElement("span");
  icon.className = `mc-list-icon${isBlock === false ? " is-item" : ""}`;
  icon.setAttribute("aria-hidden", "true");
  window.CraftLogHelpers?.applyItemIcon?.(icon, id);

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

const BACKUP_ICONS = {
  litematica: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/></svg>`,
  clipboard: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="2" width="6" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 12h6"/><path d="M9 16h6"/></svg>`,
  export: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>`,
  import: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V3"/><path d="m7 8 5-5 5 5"/><path d="M5 21h14"/></svg>`
};

function createBackupButton(mode, labelText, titleText, action) {
  const isAccent = mode === "litematica" || mode === "clipboard";
  const button = makeButton(
    "",
    `quiet-button sidebar-backup-btn${isAccent ? " sidebar-litematica-btn" : ""}`,
    action
  );
  button.title = titleText;
  button.setAttribute("aria-label", labelText);

  const iconWrap = document.createElement("span");
  iconWrap.className = "sidebar-backup-btn-icon";
  iconWrap.setAttribute("aria-hidden", "true");
  iconWrap.innerHTML = BACKUP_ICONS[mode] || "";

  const labelSpan = document.createElement("span");
  labelSpan.className = "sidebar-backup-btn-text";
  labelSpan.textContent = labelText;

  button.append(iconWrap, labelSpan);
  return button;
}

function createProjectNotesPanel(list) {
  const details = document.createElement("details");
  details.className = "project-notes-panel";
  details.open = Boolean(list.notesOpen);

  const summary = document.createElement("summary");
  summary.className = "project-notes-summary";

  const titleGroup = document.createElement("span");
  titleGroup.className = "project-notes-summary-left";

  const chevron = document.createElement("span");
  chevron.className = "project-notes-chevron";
  chevron.setAttribute("aria-hidden", "true");
  chevron.textContent = "▸";

  const icon = document.createElement("span");
  icon.className = "project-notes-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = "🧭";

  const title = document.createElement("span");
  title.className = "project-notes-title";
  title.textContent = t().notesTitle;

  titleGroup.append(chevron, icon, title);

  const formatPreview = raw => String(raw || "").trim().replace(/\s*\n+\s*/g, " · ");
  const preview = document.createElement("span");
  preview.className = "project-notes-preview";
  preview.textContent = formatPreview(list.notes);

  summary.append(titleGroup, preview);

  const body = document.createElement("div");
  body.className = "project-notes-body";

  const textarea = document.createElement("textarea");
  textarea.className = "project-notes-textarea";
  textarea.rows = 3;
  textarea.placeholder = t().notesPlaceholder;
  textarea.setAttribute("aria-label", t().notesTitle);
  textarea.value = typeof list.notes === "string" ? list.notes : "";

  const footer = document.createElement("div");
  footer.className = "project-notes-footer";

  const hint = document.createElement("span");
  hint.className = "project-notes-hint";
  hint.textContent = t().notesSavedHint;

  const clearBtn = makeButton(t().notesClear, "project-notes-clear", () => {
    textarea.value = "";
    list.notes = "";
    preview.textContent = "";
    clearBtn.hidden = true;
    save();
    textarea.focus();
  });
  clearBtn.hidden = textarea.value.trim().length === 0;

  textarea.addEventListener("input", () => {
    list.notes = textarea.value;
    preview.textContent = formatPreview(list.notes);
    clearBtn.hidden = textarea.value.trim().length === 0;
    save();
  });

  details.addEventListener("toggle", () => {
    list.notesOpen = details.open;
    save();
  });

  footer.append(hint, clearBtn);
  body.append(textarea, footer);
  details.append(summary, body);

  return details;
}

function openListCompleteDialog(list) {
  if (!list) return;

  document.getElementById("craftlog-complete-dialog")?.remove();

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

  let closeDialog = () => {};

  const resetBtn = makeButton(t().resetList, "quiet-button", () => {
    if (Array.isArray(list.items)) {
      for (const entry of list.items) entry.done = false;
    }
    list.summaryInventory = {};
    closeDialog();
    save();
    render();
  });

  const deleteBtn = makeButton(t().deleteListAction, "danger-button", () => {
    closeDialog();
    deleteListWithUndo(list);
  });

  const keepBtn = makeButton(t().keepList, "primary-button", () => closeDialog());

  actions.append(resetBtn, deleteBtn, keepBtn);
  dialogBody.append(message, actions);
  inner.append(dialogBody);
  dialog.append(inner);

  closeDialog = openModalDialog(dialog, closeBtn);
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
      curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
    }
    prev = curr;
  }

  return prev[b.length];
}

function scoreTarget(query, tokens, target) {
  if (!target) return 0;
  if (target === query) return 1000;
  if (target.startsWith(query)) return 850 - Math.min(target.length - query.length, 50);

  const words = target.split(/[\s-]+/);
  if (words.some(word => word.startsWith(query))) return 700 - Math.min(target.length, 50);

  const index = target.indexOf(query);
  if (index !== -1) return 550 - Math.min(index, 50);

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
    if (isTechnicalBlockState(entry.id)) continue;

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

  return results.sort((a, b) => b.score - a.score);
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
    installSafeIconHelper();

    selectedIcon.className = `mc-list-icon search-selected-icon${entry.isBlock === false ? " is-item" : ""}`;
    selectedIcon.classList.remove("has-icon");
    selectedIcon.querySelector("img.mc-icon-img")?.remove();

    window.CraftLogHelpers?.applyItemIcon?.(selectedIcon, entry.id);

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
      type.textContent = entry.isBlock ? t().block : t().item;

      option.append(main, type);
      option.addEventListener("mousedown", event => event.preventDefault());
      option.addEventListener("click", () => choose(entry));

      suggestions.append(option);
    }

    if (matches.length === 0 || matches.length > 40) {
      const note = document.createElement("div");
      note.className = "suggestion-note";
      note.textContent =
        matches.length === 0 ? t().noResults : t().narrow(matches.length);
      suggestions.append(note);
    }

    suggestions.hidden = false;
  }

  clearButton.addEventListener("mousedown", event => event.preventDefault());
  clearButton.addEventListener("click", resetSearchField);

  input.addEventListener("input", () => {
    selectedId = null;
    clearSelectedIcon();
    updateClearButton();
    updateSuggestions();
  });

  input.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      if (!suggestions.hidden) closeSuggestions();
      else if (input.value) resetSearchField();
      return;
    }

    if (suggestions.hidden || matches.length === 0) return;

    const visibleCount = Math.min(matches.length, 40);

    if (event.key === "ArrowDown") {
      event.preventDefault();
      activeIndex = (activeIndex + 1) % visibleCount;
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      activeIndex = (activeIndex - 1 + visibleCount) % visibleCount;
    } else if (event.key === "Enter") {
      event.preventDefault();
      choose(matches[activeIndex]);
      return;
    } else {
      return;
    }

    suggestions.querySelectorAll("button").forEach((option, index) => {
      option.classList.toggle("active", index === activeIndex);
    });
  });

  input.addEventListener("blur", () => setTimeout(closeSuggestions, 150));

  form.addEventListener("submit", event => {
    event.preventDefault();

    if (!selectedId) {
      alert(t().choose);
      input.focus();
      return;
    }

    const quantity = Number(quantityInput.value);
    if (!Number.isSafeInteger(quantity) || quantity < 1) {
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

    list.itemsOpen = true;
    save();
    render({ focusSearch: true });
  });

  wrapper.append(selectedIcon, input, clearButton, suggestions);
  return wrapper;
}

function openItemSourceDialog(item, initialFilter = "all") {
  window.openMaterialSourceDialog?.({
    id: normalizeId(item.blockId),
    totalNeeded: item.quantity,
    quantityLabel: t().plannedQuantity,
    initialFilter
  });
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
      const labelText = meta ? (language === "de" ? meta.de : meta.en) : type;

      const badge = makeButton("", `item-source-badge item-source-badge--${type}`, () => {
        openItemSourceDialog(item, type);
      });
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

      row.append(badge);
    }

    return row;
  }

  if (recipes.length > 0) {
    const meta = SOURCE_CATEGORY_META.craft;
    const badge = makeButton("", "item-source-badge item-source-badge--craft", () => {
      openItemSourceDialog(item, "all");
    });
    badge.title = t().showSourcesFor(itemName);

    const iconSpan = document.createElement("span");
    iconSpan.className = "item-source-badge-icon";
    iconSpan.setAttribute("aria-hidden", "true");
    iconSpan.textContent = meta.icon;

    const textSpan = document.createElement("span");
    textSpan.textContent = language === "de" ? meta.de : meta.en;

    badge.append(iconSpan, textSpan);
    row.append(badge);
    return row;
  }

  const fallbackBadge = makeButton(
    `ⓘ ${t().source}`,
    "item-source-badge item-source-badge--empty",
    () => openItemSourceDialog(item, "all")
  );
  fallbackBadge.title = t().showSourcesFor(itemName);
  row.append(fallbackBadge);

  return row;
}

function renderItem(list, item) {
  const card = document.createElement("div");
  card.className = `item${item.done ? " completed" : ""}`;

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
    const wasAllDone = list.items.length > 0 && list.items.every(entry => Boolean(entry.done));
    item.done = checkbox.checked;
    const isNowAllDone = list.items.length > 0 && list.items.every(entry => Boolean(entry.done));

    save();
    render();

    if (!wasAllDone && isNowAllDone) {
      openListCompleteDialog(list);
    }
  });

  const entry = catalogById.get(normalizeId(item.blockId));
  const icon = createItemIcon(item.blockId, entry?.isBlock);

  const titleWrapper = document.createElement("span");
  titleWrapper.className = "item-text-group";

  const title = document.createElement("span");
  title.className = "item-name";
  title.textContent = `${item.quantity} × ${nameOf(item.blockId)}`;

  const type = document.createElement("span");
  type.className = "item-meta";
  const baseType = entry?.isBlock ? t().block : t().item;
  const stackHint = formatStackHint(item.quantity);
  type.textContent = stackHint ? `${baseType} · ${stackHint}` : baseType;

  titleWrapper.append(title, type);
  label.append(checkbox, icon, titleWrapper);

  const remove = makeButton("×", "remove-button", () => {
    const removedIndex = list.items.findIndex(entry => entry.id === item.id);
    if (removedIndex === -1) return;

    const removedItem = { ...list.items[removedIndex] };
    const targetListId = list.id;

    list.items.splice(removedIndex, 1);
    save();
    render();

    showToast({
      getMessage: () =>
        t().itemRemovedNotice(`${removedItem.quantity} × ${nameOf(removedItem.blockId)}`),
      onUndo: () => {
        const targetList = state.lists.find(entry => entry.id === targetListId);
        if (!targetList) return;
        if (!Array.isArray(targetList.items)) targetList.items = [];

        targetList.items.splice(Math.min(removedIndex, targetList.items.length), 0, removedItem);
        activeListId = targetList.id;
        highlightedItemId = removedItem.id;
        save();
        render();
      }
    });
  });

  remove.setAttribute("aria-label", t().remove);
  remove.title = t().remove;

  const edit = makeButton(t().editQuantity, "edit-quantity-button", () => {
    const existingForm = card.querySelector(".quantity-edit-form");
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
    input.setAttribute("aria-label", t().quantity);

    const submit = document.createElement("button");
    submit.type = "submit";
    submit.className = "primary-button";
    submit.textContent = t().save;

    const cancel = makeButton(t().cancel, "quiet-button", () => form.remove());

    form.append(input, submit, cancel);
    form.addEventListener("submit", event => {
      event.preventDefault();

      const quantity = Number(input.value);
      if (!Number.isSafeInteger(quantity) || quantity < 1) {
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
  });

  const stepper = document.createElement("div");
  stepper.className = "item-quick-stepper";

  for (const [delta, stepLabel, titleText] of [
    [-1, "−1", t().stepMinus1],
    [1, "+1", t().stepPlus1],
    [64, "+64", t().stepPlus64]
  ]) {
    const stepBtn = makeButton(stepLabel, "item-step-btn", () => {
      const next = Math.max(1, item.quantity + delta);
      if (next === item.quantity) return;
      item.quantity = next;
      highlightedItemId = item.id;
      save();
      render();
    });
    stepBtn.title = titleText;
    stepBtn.setAttribute("aria-label", titleText);
    if (delta < 0 && item.quantity <= 1) stepBtn.disabled = true;
    stepper.append(stepBtn);
  }

  const actions = document.createElement("div");
  actions.className = "item-actions";
  actions.append(stepper, edit, remove);

  top.append(label, actions);
  card.append(top, createSourceBadges(item));

  return card;
}

function createItemsToolbar(doneCount) {
  const toolbar = document.createElement("div");
  toolbar.className = "items-toolbar";

  const hideCompleted = Boolean(state.hideCompleted);
  const filterBtn = makeButton(
    "",
    `items-filter-toggle${hideCompleted ? " is-active" : ""}`,
    () => {
      state.hideCompleted = !Boolean(state.hideCompleted);
      save();
      render();
    }
  );
  filterBtn.setAttribute("aria-pressed", String(hideCompleted));

  const iconSpan = document.createElement("span");
  iconSpan.className = "items-filter-toggle-icon";
  iconSpan.setAttribute("aria-hidden", "true");
  iconSpan.innerHTML = hideCompleted
    ? `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>`
    : `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`;

  const labelSpan = document.createElement("span");
  labelSpan.textContent =
    hideCompleted && doneCount > 0 ? t().hideCompletedCount(doneCount) : t().hideCompleted;

  filterBtn.append(iconSpan, labelSpan);

  const sortSelect = document.createElement("select");
  sortSelect.className = "items-sort-select";
  sortSelect.setAttribute("aria-label", t().sortLabel);

  for (const opt of [
    { value: "manual", label: t().sortManual },
    { value: "quantity-desc", label: t().sortQuantityDesc },
    { value: "quantity-asc", label: t().sortQuantityAsc },
    { value: "name-asc", label: t().sortNameAsc },
    { value: "name-desc", label: t().sortNameDesc }
  ]) {
    const option = document.createElement("option");
    option.value = opt.value;
    option.textContent = opt.label;
    sortSelect.append(option);
  }

  sortSelect.value = SORT_MODES.includes(state.sortBy) ? state.sortBy : "manual";
  sortSelect.addEventListener("change", () => {
    state.sortBy = SORT_MODES.includes(sortSelect.value) ? sortSelect.value : "manual";
    save();
    render();
  });

  toolbar.append(filterBtn, sortSelect);
  return toolbar;
}

function renderWorkspace() {
  const workspace = document.querySelector("#workspace");
  workspace.replaceChildren();

  const shareBanner = createIncomingShareBanner();
  if (shareBanner) workspace.append(shareBanner);

  const status = document.createElement("p");
  status.className = "status";
  status.setAttribute("role", "status");

  if (loadError) {
    status.textContent = t().loadError;
  } else if (!minecraft) {
    status.textContent = t().loading;
  } else {
    status.textContent = t().loaded(catalog.length);
    const missing = minecraft.missingGerman?.length || 0;
    if (language === "de" && missing > 0) {
      status.textContent += ` ${t().incompleteNames(missing)}`;
    }
  }

  const list = state.lists.find(entry => entry.id === activeListId);

  if (!list) {
    const eyebrow = document.createElement("p");
    eyebrow.className = "eyebrow";
    eyebrow.textContent = t().overview;

    const heading = document.createElement("h1");
    heading.className = "page-title";
    heading.textContent = t().noListsTitle;

    const empty = document.createElement("div");
    empty.className = "empty-state empty-filter-state";

    const emptyText = document.createElement("span");
    emptyText.textContent = t().noListsText;

    const emptyActions = document.createElement("div");
    emptyActions.className = "heading-actions";

    const importBtn = makeButton(t().litematicaImport, "quiet-button", triggerLitematicaPicker);
    importBtn.disabled = !minecraft;

    const pasteBtn = makeButton(t().clipboardImport, "quiet-button", triggerClipboardImport);
    pasteBtn.disabled = !minecraft;

    emptyActions.append(importBtn, pasteBtn);
    empty.append(emptyText, emptyActions);
    workspace.append(eyebrow, heading, status, empty);
    return;
  }

  if (!Array.isArray(list.items)) list.items = [];

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

  headingText.append(eyebrow, heading, description);

  const actions = document.createElement("div");
  actions.className = "heading-actions";

  const shareBtn = makeButton(t().shareBtn, "quiet-button qol-share-btn", () =>
    shareProjectList(list, shareBtn)
  );

  const duplicateBtn = makeButton(t().duplicate, "quiet-button", () =>
    duplicateListAsTemplate(list)
  );
  duplicateBtn.title = t().duplicateTitle;

  actions.append(
    shareBtn,
    duplicateBtn,
    makeButton(t().rename, "quiet-button", () => {
      const name = prompt(t().renameQuestion, list.name)?.trim();
      if (!name) return;
      list.name = name;
      save();
      render();
    }),
    makeButton(t().delete, "danger-button", () => {
      if (confirm(t().deleteQuestion(list.name))) {
        deleteListWithUndo(list);
      }
    })
  );

  headingRow.append(headingText, actions);

  const done = list.items.filter(item => item.done).length;

  const progress = document.createElement("div");
  const track = document.createElement("div");
  track.className = "progress-track";

  const fill = document.createElement("div");
  fill.className = "progress-fill";
  fill.style.width = list.items.length ? `${(done / list.items.length) * 100}%` : "0%";
  track.append(fill);

  const progressLabel = document.createElement("div");
  progressLabel.className = "progress-label";

  const progressTitle = document.createElement("span");
  progressTitle.textContent = t().progress;

  const progressCount = document.createElement("span");
  progressCount.textContent = t().completed(done, list.items.length);

  progressLabel.append(progressTitle, progressCount);
  progress.append(track, progressLabel);

  const panel = document.createElement("section");
  panel.className = "panel";

  const panelHeader = document.createElement("div");
  panelHeader.className = "panel-header";

  const panelTitle = document.createElement("h2");
  panelTitle.className = "panel-title";
  panelTitle.textContent = t().addHeading;

  const panelDescription = document.createElement("p");
  panelDescription.className = "panel-description";
  panelDescription.textContent = t().addDescription;

  panelHeader.append(panelTitle, panelDescription);

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
  quantity.setAttribute("aria-label", t().quantity);

  let isInitialQuantity = true;
  quantity.addEventListener("input", () => {
    isInitialQuantity = false;
  });

  function applyQuickAmount(step) {
    const current = Math.floor(Number(quantity.value) || 0);
    quantity.value = String(isInitialQuantity || current < 1 ? step : current + step);
    isInitialQuantity = false;
    quantity.focus();
  }

  const quickButtons = document.createElement("div");
  quickButtons.className = "quantity-quick-buttons";

  const quick16 = makeButton("+16", "quantity-quick-btn", () => applyQuickAmount(16));
  quick16.title = t().addPlus16;
  quick16.setAttribute("aria-label", t().addPlus16);
  quick16.disabled = !minecraft;

  const quick64 = makeButton("+64", "quantity-quick-btn", () => applyQuickAmount(64));
  quick64.title = t().addPlus64;
  quick64.setAttribute("aria-label", t().addPlus64);
  quick64.disabled = !minecraft;

  quickButtons.append(quick16, quick64);
  quantityGroup.append(quantity, quickButtons);

  const search = createSearch(form, quantity, list);

  const addButton = document.createElement("button");
  addButton.type = "submit";
  addButton.className = "primary-button";
  addButton.textContent = t().add;
  addButton.disabled = !minecraft;

  form.append(search, quantityGroup, addButton);
  panel.append(panelHeader, form);

  const isItemsOpen = list.itemsOpen !== false;

  const itemsTitle = document.createElement("h2");
  itemsTitle.className = "section-label items-heading";

  const itemsToggleBtn = document.createElement("button");
  itemsToggleBtn.type = "button";
  itemsToggleBtn.className = "items-heading-toggle";
  itemsToggleBtn.setAttribute("aria-expanded", String(isItemsOpen));
  itemsToggleBtn.title = isItemsOpen ? t().collapseMaterials : t().expandMaterials;

  const itemsChevron = document.createElement("span");
  itemsChevron.className = "items-heading-chevron";
  itemsChevron.setAttribute("aria-hidden", "true");
  itemsChevron.textContent = isItemsOpen ? "▾" : "▸";

  const itemsLabelText = document.createElement("span");
  itemsLabelText.textContent = t().materials;

  const itemsLeft = document.createElement("span");
  itemsLeft.className = "items-heading-left";
  itemsLeft.append(itemsChevron, itemsLabelText);

  const itemsBadge = document.createElement("span");
  itemsBadge.className = "items-heading-badge";
  itemsBadge.textContent = `${done} / ${list.items.length}`;

  itemsToggleBtn.append(itemsLeft, itemsBadge);
  itemsTitle.append(itemsToggleBtn);

  const items = document.createElement("div");
  items.className = "items";

  const hideCompleted = Boolean(state.hideCompleted);
  const sortBy = SORT_MODES.includes(state.sortBy) ? state.sortBy : "manual";

  const visibleItems = hideCompleted
    ? list.items.filter(item => !item.done)
    : [...list.items];

  const sorters = {
    "quantity-desc": (a, b) =>
      b.quantity - a.quantity || nameOf(a.blockId).localeCompare(nameOf(b.blockId), language),
    "quantity-asc": (a, b) =>
      a.quantity - b.quantity || nameOf(a.blockId).localeCompare(nameOf(b.blockId), language),
    "name-asc": (a, b) => nameOf(a.blockId).localeCompare(nameOf(b.blockId), language),
    "name-desc": (a, b) => nameOf(b.blockId).localeCompare(nameOf(a.blockId), language)
  };

  if (sorters[sortBy]) {
    visibleItems.sort(sorters[sortBy]);
  }

  if (list.items.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";

    const emptyTitle = document.createElement("strong");
    emptyTitle.textContent = t().noItemsTitle;

    const emptyText = document.createElement("span");
    emptyText.textContent = t().noItemsText;

    empty.append(emptyTitle, emptyText);
    items.append(empty);
  } else if (visibleItems.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state empty-filter-state";

    const emptyTitle = document.createElement("strong");
    emptyTitle.textContent = t().allHiddenTitle;

    const emptyText = document.createElement("span");
    emptyText.textContent = t().allHiddenText;

    const showAllBtn = makeButton(t().showCompletedAction, "quiet-button", () => {
      state.hideCompleted = false;
      save();
      render();
    });

    empty.append(emptyTitle, emptyText, showAllBtn);
    items.append(empty);
  } else {
    for (const item of visibleItems) {
      items.append(renderItem(list, item));
    }
  }

  const itemsToolbar = list.items.length > 0 ? createItemsToolbar(done) : null;

  if (!isItemsOpen) {
    items.hidden = true;
    if (itemsToolbar) itemsToolbar.hidden = true;
  }

  itemsToggleBtn.addEventListener("click", () => {
    const nextOpen = list.itemsOpen === false;
    list.itemsOpen = nextOpen;
    items.hidden = !nextOpen;
    if (itemsToolbar) itemsToolbar.hidden = !nextOpen;
    itemsChevron.textContent = nextOpen ? "▾" : "▸";
    itemsToggleBtn.setAttribute("aria-expanded", String(nextOpen));
    itemsToggleBtn.title = nextOpen ? t().collapseMaterials : t().expandMaterials;
    save();
  });

  workspace.append(
    status,
    headingRow,
    createProjectNotesPanel(list),
    progress,
    panel,
    itemsTitle
  );

  if (itemsToolbar) workspace.append(itemsToolbar);
  workspace.append(items);

  if (minecraft) {
    const summarySlot = document.createElement("div");
    summarySlot.className = "list-summary-slot";

    if (typeof window.createListSummary === "function") {
      summarySlot.append(
        window.createListSummary(list, minecraft, nameOf, language, save)
      );
    } else {
      const error = document.createElement("p");
      error.className = "status";
      error.textContent = t().totalUnavailable;
      summarySlot.append(error);
    }

    workspace.append(summarySlot);
  }
}

function renderBackupControls(container) {
  if (!container) return;

  let backupSection = document.getElementById("craftlog-backup-section");
  if (!backupSection) {
    backupSection = document.createElement("div");
    backupSection.id = "craftlog-backup-section";
    backupSection.className = "sidebar-backup";
    container.append(backupSection);
  }

  backupSection.replaceChildren();

  const label = document.createElement("p");
  label.className = "section-label sidebar-backup-label";
  label.textContent = t().backupHeading;

  const buttonRow = document.createElement("div");
  buttonRow.className = "sidebar-backup-actions";

  const litematicaBtn = createBackupButton(
    "litematica",
    t().litematicaImport,
    t().litematicaImportTitle,
    triggerLitematicaPicker
  );
  litematicaBtn.disabled = !minecraft;

  const clipboardBtn = createBackupButton(
    "clipboard",
    t().clipboardImport,
    t().clipboardImportTitle,
    triggerClipboardImport
  );
  clipboardBtn.disabled = !minecraft;

  const exportBtn = createBackupButton(
    "export",
    t().backupExport,
    t().backupExportTitle,
    exportBackupFile
  );
  exportBtn.disabled = state.lists.length === 0;

  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = ".json,application/json";
  fileInput.hidden = true;

  fileInput.addEventListener("change", async () => {
    const selectedFile = fileInput.files?.[0];
    fileInput.value = "";
    await handleBackupFileSelection(selectedFile);
  });

  const importBtn = createBackupButton(
    "import",
    t().backupImport,
    t().backupImportTitle,
    () => fileInput.click()
  );

  buttonRow.append(litematicaBtn, clipboardBtn, exportBtn, importBtn, fileInput);
  backupSection.append(label, buttonRow);
}

function renderNavigation() {
  const navigation = document.querySelector("#list-navigation");
  navigation.replaceChildren();

  for (const list of state.lists) {
    const button = makeButton("", list.id === activeListId ? "active" : "", () => {
      activeListId = list.id;
      render();
    });

    if (list.id === activeListId) {
      button.setAttribute("aria-current", "page");
    }

    const name = document.createElement("span");
    name.className = "list-name";
    name.textContent = list.name;

    const count = document.createElement("span");
    count.className = "list-count";
    count.textContent = String(Array.isArray(list.items) ? list.items.length : 0);

    button.append(name, count);
    navigation.append(button);
  }

  renderBackupControls(navigation.parentElement);
}

function updateThemeToggle() {
  if (!themeToggle) return;

  const isDark = document.documentElement.dataset.theme === "dark";
  themeToggle.setAttribute("aria-checked", String(isDark));

  const label = themeToggle.querySelector(".theme-label");
  if (label) {
    label.textContent =
      language === "de" ? (isDark ? "Dunkel" : "Hell") : (isDark ? "Dark" : "Light");
  }

  themeToggle.setAttribute(
    "aria-label",
    language === "de"
      ? `Farbschema: ${isDark ? "Dunkel" : "Hell"}. Zum Wechseln klicken.`
      : `Theme: ${isDark ? "Dark" : "Light"}. Click to switch.`
  );
}

function renderFooter() {
  const project = document.querySelector("#footer-project");
  const storage = document.querySelector("#footer-storage");
  const footerData = document.querySelector("#footer-data");

  if (project) project.textContent = `CraftLog · Version ${appVersion}`;
  if (storage) storage.textContent = t().footerStorage;

  const status = document.querySelector("#workspace .status");
  if (status && !loadError) status.remove();

  if (footerData) {
    footerData.replaceChildren();
    if (loadError && status) footerData.append(status);
    footerData.hidden = !loadError;
  }
}

function render(options = {}) {
  installSafeIconHelper();
  document.documentElement.lang = language;

  document.querySelector("#lists-label").textContent = t().lists;
  document.querySelector("#new-list-name").placeholder = t().newList;
  document.querySelector("#create-list-button").setAttribute("aria-label", t().addList);

  for (const code of ["de", "en"]) {
    document
      .querySelector(`#language-${code}`)
      .setAttribute("aria-pressed", String(language === code));
  }

  renderNavigation();
  renderWorkspace();
  renderFooter();
  updateThemeToggle();

  if (activeToast) renderToast(false);

  if (options.focusSearch) {
    const nextSearch = document.querySelector("#workspace .search-input");
    if (nextSearch && !nextSearch.disabled) nextSearch.focus();
  }
}

document.addEventListener("paste", event => {
  if (!minecraft) return;

  const active = document.activeElement;
  const tag = active?.tagName?.toUpperCase();
  if (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    active?.isContentEditable ||
    document.querySelector("dialog[open]")
  ) {
    return;
  }

  const pastedText = event.clipboardData?.getData("text/plain");
  if (pastedText && importRawMaterialText(pastedText, true)) {
    event.preventDefault();
  }
});

document.querySelector("#create-list-form").addEventListener("submit", event => {
  event.preventDefault();

  const input = document.querySelector("#new-list-name");
  const name = input.value.trim();
  if (!name) return;

  const list = { id: newId(), name, items: [] };
  state.lists.push(list);
  activeListId = list.id;

  input.value = "";
  save();
  render({ focusSearch: true });

  showToast({
    getMessage: () =>
      language === "de" ? `Liste „${name}“ erstellt` : `List “${name}” created`,
    variant: "create",
    duration: 4200
  });
});

for (const code of ["de", "en"]) {
  document.querySelector(`#language-${code}`).addEventListener("click", () => {
    language = code;
    try {
      localStorage.setItem(LANGUAGE_KEY, code);
    } catch {
      // Optional
    }
    render();
  });
}

themeToggle?.addEventListener("click", () => {
  const nextTheme =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = nextTheme;
  try {
    localStorage.setItem(THEME_KEY, nextTheme);
  } catch {
    // Optional
  }
  updateThemeToggle();
});

async function loadAppVersion() {
  try {
    const response = await fetch("./sw.js", { cache: "no-cache" });
    if (!response.ok) return;

    const match = (await response.text()).match(
      /CACHE_NAME\s*=\s*['"][^'"]*?(?:[-_]|v)(\d+(?:\.\d+)*)['"]/i
    );

    if (match?.[1]) {
      appVersion = match[1];
      try {
        localStorage.setItem(VERSION_KEY, appVersion);
      } catch {
        // Optional
      }
      renderFooter();
    }
  } catch {
    // Offline-Fallback behalten
  }
}

async function loadData() {
  try {
    const [dataResponse, defaultSourcesResponse] = await Promise.all([
      fetch("./minecraft-data.json"),
      fetch("./data/sources/1.21.4.json").catch(() => null)
    ]);

    if (!dataResponse.ok) {
      throw new Error(`Minecraft-Daten: HTTP ${dataResponse.status}`);
    }

    const data = await dataResponse.json();
    if (
      !Array.isArray(data.catalog) ||
      !data.recipes ||
      typeof data.recipes !== "object" ||
      typeof data.version !== "string"
    ) {
      throw new Error("Ungültige Minecraft-Datendatei");
    }

    minecraft = data;
    catalog = data.catalog.map(entry => ({
      ...entry,
      _searchDe: normalizeSearchText(entry.de),
      _searchEn: normalizeSearchText(entry.en || entry.id)
    }));

    catalogById = new Map(catalog.map(entry => [entry.id, entry]));
    catalogByLookup = buildCatalogLookup(catalog);

    try {
      const sourcesResponse =
        data.version === "1.21.4" && defaultSourcesResponse
          ? defaultSourcesResponse
          : await fetch(`./data/sources/${encodeURIComponent(data.version)}.json`);

      if (!sourcesResponse?.ok) {
        throw new Error(`HTTP ${sourcesResponse?.status || "offline"}`);
      }

      const sourceData = await sourcesResponse.json();
      if (
        sourceData.version !== data.version ||
        !sourceData.entries ||
        typeof sourceData.entries !== "object"
      ) {
        throw new Error("Beschaffungsdaten passen nicht zur Version.");
      }

      window.materialSources = sourceData.entries;
    } catch (sourceError) {
      window.materialSources = window.materialSources || {};
      console.warn("Beschaffungsdaten nicht geladen:", sourceError);
    }
  } catch (error) {
    loadError = true;
    console.error(error);
  }

  render();
}

installSafeIconHelper();
render();
loadAppVersion();
loadData();
window.renderCraftLog = render;
readIncomingShareHash();
window.addEventListener("hashchange", readIncomingShareHash);