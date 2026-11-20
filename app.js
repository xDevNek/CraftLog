const LISTS_KEY = "minecraft-materiallisten-v2";
const OLD_LISTS_KEY = "minecraft-materiallisten-v1";
const LANGUAGE_KEY = "minecraft-materiallisten-language-v1";
const THEME_KEY = "materialbuch-theme";

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
    addHeading: "Material hinzufügen",
    addDescription:
      "Suche einen Eintrag und wähle ihn aus den Vorschlägen.",
    search: "Block oder Gegenstand suchen",
    quantity: "Anzahl",
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
    recipes: "Rezepte anzeigen",
    noRecipe: "Kein berechenbares Rezept hinterlegt.",
    crafting_shaped: "Werkbank",
    crafting_shapeless: "Werkbank",
    smelting: "Ofen",
    blasting: "Hochofen",
    smoking: "Räucherofen",
    campfire_cooking: "Lagerfeuer",
    stonecutting: "Steinsäge",
    smithing_transform: "Schmiedetisch",
    batches: count => `${count} Herstellungsvorgänge`,
    oneOf: "Eine dieser Zutaten verwenden",
    result: "Ergebnis",
    tag: name => `Gruppe ${name}`,
    unknown: "Unbekannte Zutat",
    source: "Woher bekomme ich das?",
    sourceCount: count =>
      `${count} ${count === 1 ? "Weg" : "Wege"}`,
    sourceCraftableText: stations =>
      `Herstellung über ${stations} möglich. Die Zutaten stehen unter „Rezepte anzeigen“.`,
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
    addHeading: "Add material",
    addDescription:
      "Search for an entry and select it from the suggestions.",
    search: "Search for a block or item",
    quantity: "Quantity",
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
    recipes: "Show recipes",
    noRecipe: "No calculable recipe available.",
    crafting_shaped: "Crafting Table",
    crafting_shapeless: "Crafting Table",
    smelting: "Furnace",
    blasting: "Blast Furnace",
    smoking: "Smoker",
    campfire_cooking: "Campfire",
    stonecutting: "Stonecutter",
    smithing_transform: "Smithing Table",
    batches: count => `${count} crafting operations`,
    oneOf: "Use one of these ingredients",
    result: "Result",
    tag: name => `Group ${name}`,
    unknown: "Unknown ingredient",
    source: "How do I get this?",
    sourceCount: count =>
      `${count} ${count === 1 ? "way" : "ways"}`,
    sourceCraftableText: stations =>
      `Can be made using ${stations}. See “Show recipes” for ingredients.`,
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

let minecraft = null;
let catalog = [];
let catalogById = new Map();
let loadError = false;

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

function makeButton(label, className, action) {
  const button = document.createElement("button");

  button.type = "button";
  button.className = className;
  button.textContent = label;
  button.addEventListener("click", action);

  return button;
}

function ingredientOptions(ingredient) {
  if (ingredient?.item) {
    return [nameOf(ingredient.item)];
  }

  if (ingredient?.tag) {
    return [t().tag(ingredient.tag)];
  }

  if (Array.isArray(ingredient?.alternatives)) {
    const names = ingredient.alternatives.flatMap(
      ingredientOptions
    );

    return [...new Set(names)];
  }

  return [t().unknown];
}

function renderRecipe(recipe, requested, resultId) {
  const perBatch = Number(recipe.count) || 1;
  const batches = Math.ceil(requested / perBatch);

  const card = document.createElement("div");
  card.className = "recipe-card";

  const header = document.createElement("div");
  header.className = "recipe-card-header";

  const station = document.createElement("span");
  station.className = "recipe-station";
  station.textContent =
    t()[recipe.type] || recipe.type;

  const batchLabel = document.createElement("span");
  batchLabel.className = "recipe-batches";
  batchLabel.textContent = t().batches(batches);

  header.append(station, batchLabel);
  card.append(header);

  const grouped = new Map();

  for (const ingredient of recipe.ingredients || []) {
    const key = JSON.stringify(ingredient);

    if (!grouped.has(key)) {
      grouped.set(key, {
        ingredient,
        count: 0
      });
    }

    grouped.get(key).count++;
  }

  for (const group of grouped.values()) {
    const row = document.createElement("div");
    row.className = "recipe-ingredient";

    const amount = document.createElement("span");
    amount.className = "ingredient-amount";
    amount.textContent =
      `${group.count * batches} ×`;

    const content = document.createElement("div");
    const names = document.createElement("div");
    names.className = "ingredient-names";

    const options = ingredientOptions(
      group.ingredient
    );

    for (const name of options) {
      const chip = document.createElement("span");
      chip.className = "ingredient-chip";
      chip.textContent = name;
      names.append(chip);
    }

    content.append(names);

    if (options.length > 1) {
      const note = document.createElement("p");
      note.className = "alternative-note";
      note.textContent = t().oneOf;
      content.append(note);
    }

    row.append(amount, content);
    card.append(row);
  }

  const output = document.createElement("div");
  output.className = "recipe-output";

  const outputLabel = document.createElement("span");
  outputLabel.textContent = t().result;

  const outputAmount = document.createElement("span");
  outputAmount.textContent =
    `${batches * perBatch} × ${nameOf(resultId)}`;

  output.append(outputLabel, outputAmount);
  card.append(output);

  return card;
}

function createSearch(form, quantityInput, list) {
  const wrapper = document.createElement("div");
  wrapper.className = "search";

  const input = document.createElement("input");
  input.className = "search-input";
  input.type = "text";
  input.placeholder = t().search;
  input.setAttribute("aria-label", t().search);
  input.autocomplete = "off";
  input.required = true;
  input.disabled = !minecraft;

  const suggestions = document.createElement("div");
  suggestions.className = "suggestions";
  suggestions.hidden = true;

  let selectedId = null;
  let matches = [];
  let activeIndex = 0;

  function closeSuggestions() {
    suggestions.hidden = true;
    suggestions.replaceChildren();
  }

  function choose(entry) {
    selectedId = entry.id;
    input.value = nameOf(entry.id);
    closeSuggestions();
    quantityInput.focus();
  }

  function updateSuggestions() {
    const query = input.value
      .trim()
      .toLocaleLowerCase(language);

    suggestions.replaceChildren();

    if (!query) {
      matches = [];
      closeSuggestions();
      return;
    }

    matches = catalog.filter(entry =>
      nameOf(entry.id)
        .toLocaleLowerCase(language)
        .includes(query)
    );

    activeIndex = 0;

    for (const entry of matches.slice(0, 40)) {
      const option = document.createElement("button");
      option.type = "button";

      const title = document.createElement("span");
      title.textContent = nameOf(entry.id);

      const type = document.createElement("span");
      type.className = "suggestion-type";
      type.textContent =
        entry.isBlock ? t().block : t().item;

      option.append(title, type);

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

  input.addEventListener("input", () => {
    selectedId = null;
    updateSuggestions();
  });

  input.addEventListener("keydown", event => {
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
    } else if (event.key === "Escape") {
      closeSuggestions();
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

    // Neue Einträge erscheinen oben.
    list.items.unshift({
      id: newId(),
      blockId: selectedId,
      quantity,
      done: false
    });

    save();
    render();
  });

  wrapper.append(input, suggestions);
  return wrapper;
}

function createSourcePanel(item) {
  const id = normalizeId(item.blockId);
  const source = window.materialSources?.[id];
  const recipes = minecraft?.recipes?.[id] || [];

  const ways = Array.isArray(source?.ways)
    ? source.ways
    : [];

  const typeNames = {
    de: {
      location: "Fundort",
      farm: "Farm",
      trade: "Handel",
      loot: "Loot",
      craft: "Herstellung"
    },
    en: {
      location: "Location",
      farm: "Farm",
      trade: "Trading",
      loot: "Loot",
      craft: "Crafting"
    }
  };

  const panel = document.createElement("details");
  panel.className = "source-panel";

  const summary = document.createElement("summary");
  summary.className = "source-heading";

  const icon = document.createElement("span");
  icon.className = "source-icon";
  icon.setAttribute("aria-hidden", "true");

  const label = document.createElement("span");
  label.className = "source-label";
  label.textContent = t().source;

  summary.append(icon, label);

  if (ways.length > 0) {
    const count = document.createElement("span");
    count.className = "source-count";
    count.textContent = t().sourceCount(
      ways.length
    );

    summary.append(count);
  }

  panel.append(summary);

  if (ways.length > 0) {
    const waysList = document.createElement("div");
    waysList.className = "source-ways";

    for (const way of ways) {
      const row = document.createElement("div");
      row.className = "source-way";

      const badge = document.createElement("span");
      badge.className =
        `source-way-type source-way-type--${way.type}`;

      badge.textContent =
        typeNames[language][way.type] ||
        way.type;

      const description = document.createElement("p");
      description.className = "source-description";
      description.textContent =
        way[language] || way.en || "";

      row.append(badge, description);
      waysList.append(row);
    }

    panel.append(waysList);
  } else {
    const description = document.createElement("p");
    description.className = "source-description";

    if (recipes.length > 0) {
      const stations = [
        ...new Set(
          recipes.map(recipe =>
            t()[recipe.type] || recipe.type
          )
        )
      ];

      description.textContent =
        t().sourceCraftableText(
          stations.join(", ")
        );
    } else {
      description.textContent =
        t().sourceOpenText;
    }

    panel.append(description);
  }

  return panel;
}

function renderItem(list, item) {
  const card = document.createElement("div");
  card.className =
    `item${item.done ? " completed" : ""}`;

  const top = document.createElement("div");
  top.className = "item-top";

  const label = document.createElement("label");
  label.className = "item-label";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = Boolean(item.done);

  checkbox.addEventListener("change", () => {
    item.done = checkbox.checked;
    save();
    render();
  });

  const titleWrapper = document.createElement("span");

  const title = document.createElement("span");
  title.className = "item-name";
  title.textContent =
    `${item.quantity} × ${nameOf(item.blockId)}`;

  const type = document.createElement("span");
  type.className = "item-meta";

  const entry = catalogById.get(
    normalizeId(item.blockId)
  );

  type.textContent =
    entry?.isBlock ? t().block : t().item;

  titleWrapper.append(title, type);
  label.append(checkbox, titleWrapper);
  top.append(label);

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
        save();
        render();
      });

      top.after(form);
      input.focus();
      input.select();
    }
  );

  top.append(edit, remove);
  card.append(top);

  card.append(createSourcePanel(item));

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

  const quantity = document.createElement("input");
  quantity.className = "quantity-input";
  quantity.type = "number";
  quantity.min = "1";
  quantity.step = "1";
  quantity.value = "1";
  quantity.required = true;
  quantity.setAttribute(
    "aria-label",
    t().quantity
  );

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

  form.append(search, quantity, addButton);
  panel.append(panelHeader, form);

  const itemsTitle = document.createElement("h2");
  itemsTitle.className =
    "section-label items-heading";
  itemsTitle.textContent =
    `${t().materials} · ${list.items.length}`;

  const items = document.createElement("div");
  items.className = "items";

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
  headingRow,
  status,
  progress,
  panel,
  itemsTitle,
  items
);

// Der Gesamtbedarf steht unter den einzelnen Listeneinträgen.
if (minecraft) {
  if (typeof window.createListSummary === "function") {
    workspace.append(
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
    workspace.append(error);
  }
}
  workspace.append(itemsTitle, items);
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
      "CraftLog · Version 0.0.1";
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

function render() {
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

// Die bereits erzeugte Gesamtbedarfs-Karte
// hinter alle Listeneinträge verschieben.
const totalCard = document.querySelector(
  "#workspace > .list-summary"
);

if (totalCard) {
  document.querySelector("#workspace").append(totalCard);
}

renderFooter();
updateThemeToggle();

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
  render();
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
    catalog = data.catalog;

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
loadData();