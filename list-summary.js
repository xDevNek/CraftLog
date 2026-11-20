window.createListSummary = function createListSummary(
  list,
  minecraft,
  nameOf,
  language,
  save
) {
  const de = language === "de";
  const H = window.CraftLogHelpers;
  const recipeTypeNames = H.getRecipeTypeNames(language);
  const sourceCategoryLabels = H.getSourceCategoryLabels(language);
  const fuels = H.fuels;

  const CATEGORY_META = {
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

  const isBlockById = new Map(
    (minecraft.catalog || []).map(entry => [
      entry.id,
      Boolean(entry.isBlock)
    ])
  );

  function createCyclingSlot(optionIds, lockedId = "") {
    const container = document.createElement("div");
    container.className = "crafting-slot";

    const validIds = optionIds.length > 0 ? optionIds : ["minecraft:air"];
    const isCycling = !lockedId && validIds.length > 1;
    let index = 0;

    if (lockedId && validIds.includes(lockedId)) {
      index = validIds.indexOf(lockedId);
    }

    const slotMain = document.createElement("div");
    slotMain.className =
      `crafting-slot-box${isCycling ? " is-cycling" : ""}${lockedId ? " is-locked" : ""}`;

    if (isCycling) {
      slotMain.title = de
        ? "Klicken für nächste Variante"
        : "Click for next variant";
      slotMain.setAttribute("role", "button");
      slotMain.tabIndex = 0;
    }

    const frame = document.createElement("span");
    frame.className = "crafting-slot-frame";
    frame.setAttribute("aria-hidden", "true");

    const blockIcon = document.createElement("span");
    blockIcon.className = "crafting-slot-icon";
    frame.append(blockIcon);

    const info = document.createElement("span");
    info.className = "crafting-slot-info";

    const itemName = document.createElement("span");
    itemName.className = "crafting-slot-name";
    info.append(itemName);

    let counter = null;
    if (validIds.length > 1) {
      counter = document.createElement("span");
      counter.className = "crafting-slot-counter";
      info.append(counter);
    }

    slotMain.append(frame, info);
    container.append(slotMain);

    function showIndex(nextIndex, animate = false) {
      const currentId = H.fullId(validIds[nextIndex] || validIds[0]);
      const isBlock = isBlockById.get(currentId);
      const label = nameOf(currentId);

      blockIcon.style.setProperty("--slot-color", H.colorForItem(currentId));
      blockIcon.classList.toggle("is-item", isBlock === false);
      H.applyItemIcon?.(blockIcon, currentId);
      itemName.textContent = label;
      itemName.title = label;

      if (counter) {
        counter.textContent = `${nextIndex + 1} / ${validIds.length}`;
      }

      if (animate) {
        slotMain.classList.remove("is-swapping");
        void slotMain.offsetWidth;
        slotMain.classList.add("is-swapping");
      }
    }

    showIndex(index, false);

    if (isCycling) {
      let paused = false;

      const advance = () => {
        index = (index + 1) % validIds.length;
        showIndex(index, true);
      };

      slotMain.addEventListener("click", event => {
        event.preventDefault();
        advance();
      });
      slotMain.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          advance();
        }
      });

      slotMain.addEventListener("mouseenter", () => {
        paused = true;
      });
      slotMain.addEventListener("mouseleave", () => {
        paused = false;
      });
      slotMain.addEventListener("focusin", () => {
        paused = true;
      });
      slotMain.addEventListener("focusout", () => {
        paused = false;
      });

      const prefersReducedMotion =
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!prefersReducedMotion) {
        const timer = setInterval(() => {
          if (!slotMain.isConnected) {
            clearInterval(timer);
            return;
          }
          if (paused) return;
          advance();
        }, 1400);
      }
    }

    return container;
  }

  if (!list.summaryChoices || typeof list.summaryChoices !== "object") {
    list.summaryChoices = {};
  }

  if (!list.summaryInventory || typeof list.summaryInventory !== "object") {
    list.summaryInventory = {};
  }

  if (!fuels.some(fuel => fuel.id === list.summaryFuel)) {
    list.summaryFuel = "minecraft:coal";
  }

  if (!["items", "stacks", "shulkers"].includes(list.summaryUnitMode)) {
    list.summaryUnitMode = "items";
  }

  if (typeof list.summaryOpen !== "boolean") {
    list.summaryOpen = true;
  }

  if (!list.summarySections || typeof list.summarySections !== "object") {
    list.summarySections = {
      gather: true,
      precrafts: true,
      goals: true
    };
  }

  const choices = list.summaryChoices;
  const inventory = list.summaryInventory;

  let wasSummaryAllDone = false;
  let notifyCompletionOnDraw = false;
  let missingChoicesCount = 0;

  const panel = document.createElement("details");
  panel.className = "list-summary";
  panel.open = list.summaryOpen;

  panel.addEventListener("toggle", () => {
    list.summaryOpen = panel.open;
    save();
  });

  const summary = document.createElement("summary");
  summary.textContent = de
    ? "Gesamtbedarf & Crafting-Checkliste"
    : "Total materials & crafting checklist";

  const body = document.createElement("div");
  body.className = "list-summary-body";

  panel.append(summary, body);

  function node(tag, className, text) {
    const result = document.createElement(tag);
    if (className) {
      result.className = className;
    }

    if (text !== undefined) {
      result.textContent = text;
    }

    return result;
  }

  function add(map, id, amount) {
    map.set(id, (map.get(id) || 0) + amount);
  }

  function getHave(id) {
    const raw = Number(inventory[id]);
    return Number.isFinite(raw) && raw > 0 ? Math.floor(raw) : 0;
  }

  function setHave(id, value) {
    const clean = Math.max(0, Math.floor(Number(value) || 0));
    if (clean === 0) {
      delete inventory[id];
    } else {
      inventory[id] = clean;
    }
  }

  function getGatherCategory(id, isFuelItem) {
    if (isFuelItem) {
      return "fuel";
    }

    const source = window.materialSources?.[id];
    const firstWay = Array.isArray(source?.ways) ? source.ways[0] : null;
    if (firstWay && sourceCategoryLabels[firstWay.type]) {
      return firstWay.type;
    }

    return "other";
  }

  function openSourceDialog({
    id,
    totalNeeded = 0,
    isFuelItem = false,
    fuelNeeded = 0,
    chosenFuel = null,
    initialFilter = "all",
    quantityLabel = null
  }) {
    const existingDialog = document.getElementById("tc-source-dialog");
    if (existingDialog) {
      existingDialog.remove();
    }

    const normalizedId = H.fullId(id);
    const source = window.materialSources?.[normalizedId];
    const ways = Array.isArray(source?.ways) ? source.ways : [];
    const recipes = H.getEffectiveRecipes(normalizedId, minecraft);
    const isBlock = isBlockById.get(normalizedId);
    const itemName = nameOf(normalizedId);

    const dialog = document.createElement("dialog");
    dialog.id = "tc-source-dialog";
    dialog.className = "tc-source-dialog";

    const inner = node("div", "tc-dialog-inner");

    // Kopfbereich
    const header = node("div", "tc-dialog-header");
    const titleGroup = node("div", "tc-dialog-title-group");

    const icon = node(
      "span",
      `tc-item-icon${isBlock === false ? " is-item" : ""}`
    );
    icon.style.setProperty("--swatch-color", H.colorForItem(normalizedId));
    icon.setAttribute("aria-hidden", "true");
    H.applyItemIcon?.(icon, normalizedId);

    const titleText = node("div", "tc-dialog-title-text");
    titleText.append(node("h3", "tc-dialog-title", itemName));

    if (totalNeeded > 0) {
      const prefix = quantityLabel || (de ? "Gesamtbedarf" : "Total needed");
      titleText.append(
        node(
          "span",
          "tc-dialog-subtitle",
          `${prefix}: ${H.formatQuantity(totalNeeded, list.summaryUnitMode)} ×`
        )
      );
    }

    titleGroup.append(icon, titleText);

    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "tc-dialog-close";
    closeBtn.textContent = "×";
    closeBtn.title = de ? "Schließen" : "Close";
    closeBtn.setAttribute("aria-label", closeBtn.title);

    header.append(titleGroup, closeBtn);
    inner.append(header);

    // Filter-Tabs oben
    const canonicalOrder = ["location", "farm", "trade", "loot", "craft"];
    const countsByType = new Map();
    for (const way of ways) {
      const type = way.type || "other";
      countsByType.set(type, (countsByType.get(type) || 0) + 1);
    }

    const presentTypes = [
      ...canonicalOrder.filter(type => countsByType.has(type)),
      ...[...countsByType.keys()].filter(type => !canonicalOrder.includes(type))
    ];

    let activeFilter =
      initialFilter !== "all" && countsByType.has(initialFilter)
        ? initialFilter
        : "all";
    let searchQuery = "";

    let tabsBar = null;
    if (ways.length > 0) {
      tabsBar = node("div", "tc-dialog-tabs");
      tabsBar.setAttribute("role", "tablist");
      tabsBar.setAttribute(
        "aria-label",
        de ? "Beschaffungswege filtern" : "Filter acquisition methods"
      );
      inner.append(tabsBar);
    }

    // Suchleiste bei vielen Einträgen (ab 6 Wegen)
    let searchClearBtn = null;
    let searchInput = null;
    if (ways.length >= 6) {
      const searchWrap = node("div", "tc-dialog-search");
      searchInput = document.createElement("input");
      searchInput.type = "search";
      searchInput.className = "tc-dialog-search-input";
      searchInput.placeholder = de
        ? "Biom, Struktur oder Methode filtern …"
        : "Filter biome, structure or method …";
      searchInput.setAttribute("aria-label", searchInput.placeholder);
      searchInput.autocomplete = "off";

      searchClearBtn = document.createElement("button");
      searchClearBtn.type = "button";
      searchClearBtn.className = "tc-dialog-search-clear";
      searchClearBtn.textContent = "×";
      searchClearBtn.title = de ? "Filter leeren" : "Clear filter";
      searchClearBtn.setAttribute("aria-label", searchClearBtn.title);
      searchClearBtn.hidden = true;

      searchInput.addEventListener("input", () => {
        searchQuery = searchInput.value.trim().toLowerCase();
        searchClearBtn.hidden = searchQuery.length === 0;
        renderDialogContent();
      });

      searchClearBtn.addEventListener("click", () => {
        searchInput.value = "";
        searchQuery = "";
        searchClearBtn.hidden = true;
        renderDialogContent();
        searchInput.focus();
      });

      searchWrap.append(searchInput, searchClearBtn);
      inner.append(searchWrap);
    }

    // Scrollbarer Inhalt
    const dialogBody = node("div", "tc-dialog-body");

    if (isFuelItem && fuelNeeded > 0 && chosenFuel) {
      const ops = chosenFuel.quarters / 4;
      dialogBody.append(
        node(
          "div",
          "tc-dialog-fuel-note",
          de
            ? `Davon werden ${fuelNeeded} × als Brennstoff für Öfen eingeplant (1 Stück = ${ops} Schmelzvorgänge).`
            : `Includes ${fuelNeeded} × planned as furnace fuel (1 item = ${ops} smelting operations).`
        )
      );
    }

    const waysContainer = node("div", "tc-dialog-ways");

    function renderDialogContent() {
      if (tabsBar) {
        tabsBar.replaceChildren();

        const tabItems = [
          {
            key: "all",
            icon: "",
            label: de ? "Alle" : "All",
            count: ways.length
          },
          ...presentTypes.map(type => {
            const meta = CATEGORY_META[type];
            return {
              key: type,
              icon: meta?.icon || "",
              label: meta ? (de ? meta.de : meta.en) : type,
              count: countsByType.get(type) || 0
            };
          })
        ];

        for (const tab of tabItems) {
          const isSelected = activeFilter === tab.key;
          const tabBtn = document.createElement("button");
          tabBtn.type = "button";
          tabBtn.role = "tab";
          tabBtn.className = `tc-dialog-tab${isSelected ? " is-active" : ""}`;
          tabBtn.setAttribute("aria-selected", String(isSelected));

          if (tab.icon) {
            tabBtn.append(node("span", "tc-dialog-tab-icon", tab.icon));
          }
          tabBtn.append(node("span", "", tab.label));
          tabBtn.append(node("span", "tc-dialog-tab-count", String(tab.count)));

          tabBtn.addEventListener("click", () => {
            if (activeFilter === tab.key) return;
            activeFilter = tab.key;
            renderDialogContent();
          });

          tabsBar.append(tabBtn);
        }
      }

      waysContainer.replaceChildren();

      const filteredWays = ways.filter(way => {
        const typeMatches =
          activeFilter === "all" || (way.type || "other") === activeFilter;
        if (!typeMatches) return false;
        if (!searchQuery) return true;

        const text = String(way[language] || way.en || "").toLowerCase();
        return text.includes(searchQuery);
      });

      if (filteredWays.length === 0) {
        waysContainer.append(
          node(
            "p",
            "tc-dialog-empty",
            de
              ? "Keine passenden Beschaffungswege für diesen Filter gefunden."
              : "No matching acquisition methods found for this filter."
          )
        );
        return;
      }

      for (const way of filteredWays) {
        const type = way.type || "other";
        const meta = CATEGORY_META[type];
        const typeLabel = meta ? (de ? meta.de : meta.en) : type;
        const badgeText = meta?.icon ? `${meta.icon} ${typeLabel}` : typeLabel;

        const wayCard = node("div", "tc-dialog-way");
        const badge = node(
          "span",
          `tc-dialog-way-badge tc-dialog-way-badge--${type}`,
          badgeText
        );
        const text = node(
          "p",
          "tc-dialog-way-text",
          way[language] || way.en || ""
        );
        wayCard.append(badge, text);
        waysContainer.append(wayCard);
      }
    }

    if (ways.length > 0) {
      renderDialogContent();
      dialogBody.append(waysContainer);
    } else if (recipes.length > 0) {
      const stations = [
        ...new Set(
          recipes.map(recipe => recipeTypeNames[recipe.type] || recipe.type)
        )
      ].join(", ");

      dialogBody.append(
        node(
          "p",
          "tc-dialog-way-text",
          de
            ? `Herstellung über ${stations} möglich. Den kompletten Herstellungsbaum findest du unten unter „Gesamtbedarf & Crafting-Checkliste“.`
            : `Can be made using ${stations}. Open “Total materials & crafting checklist” below for the full crafting tree.`
        )
      );
    } else if (!isFuelItem) {
      dialogBody.append(
        node(
          "p",
          "tc-dialog-empty",
          de
            ? "Für diesen Gegenstand ist noch kein geprüfter Fundort oder Beschaffungsweg hinterlegt."
            : "A verified location or acquisition method has not been added for this item yet."
        )
      );
    }

    inner.append(dialogBody);
    dialog.append(inner);

    const closeDialog = () => {
      if (dialog.open) {
        dialog.close();
      }
      dialog.remove();
    };

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

  window.openMaterialSourceDialog = openSourceDialog;

  function selectChoice(
    labelText,
    values,
    selected,
    onChange,
    optionIds = []
  ) {
    const label = node("label", "list-summary-choice", labelText);
    const controlRow = node("div", "list-summary-choice-row");

    if (optionIds.length > 1) {
      const locked =
        selected && optionIds.includes(selected) ? selected : "";
      controlRow.append(createCyclingSlot(optionIds, locked));
    }

    const select = node("select", "list-summary-select");

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = de
      ? "Bitte auswählen"
      : "Please choose";

    select.append(placeholder);

    for (const value of values) {
      const option = document.createElement("option");
      option.value = value.value;
      option.textContent = value.label;
      select.append(option);
    }

    const hasValidSelection =
      selected !== undefined &&
      selected !== "" &&
      values.some(item => String(item.value) === String(selected));

    select.value = hasValidSelection ? String(selected) : "";

    if (!hasValidSelection) {
      missingChoicesCount++;
      select.classList.add("is-missing");
      label.classList.add("is-missing");
    }

    select.addEventListener("change", () => {
      onChange(select.value);
      save();
      draw();
    });

    controlRow.append(select);
    label.append(controlRow);
    return label;
  }

  function createTeamcraftRow({
    id,
    totalNeeded,
    stationName = "",
    stationCount = "",
    isGather = false,
    hasSourceDetails = true,
    onPillClick = null,
    extraMeta = "",
    unitMode
  }) {
    const have = getHave(id);
    const remaining = Math.max(0, totalNeeded - have);
    const isDone = totalNeeded > 0 && remaining === 0;
    const isBlock = isBlockById.get(id);
    const itemName = nameOf(id);

    const row = node("div", `tc-row${isDone ? " is-done" : ""}`);

    const left = node("div", "tc-row-left");

    const icon = node(
      "span",
      `tc-item-icon${isBlock === false ? " is-item" : ""}`
    );
    icon.style.setProperty("--swatch-color", H.colorForItem(id));
    icon.setAttribute("aria-hidden", "true");
    H.applyItemIcon?.(icon, id);

    const labelGroup = node("div", "tc-item-label-group");
    labelGroup.append(
      node("span", "tc-item-name", itemName),
      node("span", "tc-item-qty", `×${H.formatQuantity(totalNeeded, unitMode)}`)
    );

    if (extraMeta) {
      labelGroup.append(node("span", "tc-item-sub", `(${extraMeta})`));
    }

    const copyBtn = document.createElement("button");
    copyBtn.type = "button";
    copyBtn.className = "tc-copy-btn";
    copyBtn.textContent = "⧉";
    copyBtn.title = de
      ? `„${itemName}“ kopieren`
      : `Copy “${itemName}”`;
    copyBtn.setAttribute("aria-label", copyBtn.title);

    copyBtn.addEventListener("click", () => {
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(itemName).catch(() => {});
      }
      copyBtn.textContent = "✓";
      setTimeout(() => {
        if (copyBtn.isConnected) {
          copyBtn.textContent = "⧉";
        }
      }, 900);
    });

    left.append(icon, labelGroup, copyBtn);

    const right = node("div", "tc-row-right");

    const counterGroup = node("div", "tc-counter-group");

    const haveInput = document.createElement("input");
    haveInput.type = "number";
    haveInput.className = "tc-have-input";
    haveInput.min = "0";
    haveInput.step = "1";
    haveInput.value = String(have);
    haveInput.dataset.invId = id;
    haveInput.setAttribute(
      "aria-label",
      de
        ? `Vorhandene Menge für ${itemName}`
        : `Owned quantity for ${itemName}`
    );

    const commitHave = () => {
      const parsed = Math.max(0, Math.floor(Number(haveInput.value) || 0));
      setHave(id, parsed);
      notifyCompletionOnDraw = true;
      save();
      draw();
    };

    haveInput.addEventListener("change", commitHave);
    haveInput.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        event.preventDefault();
        commitHave();
      }
    });

    const totalCell = node("span", "tc-total-cell", `/${totalNeeded}`);

    const checkBtn = document.createElement("button");
    checkBtn.type = "button";
    checkBtn.className = `tc-check-btn${isDone ? " is-checked" : ""}`;
    checkBtn.textContent = "✓";
    checkBtn.title = isDone
      ? (de ? "Als offen markieren" : "Mark as incomplete")
      : (de ? "Als erledigt markieren" : "Mark as complete");
    checkBtn.setAttribute("aria-label", checkBtn.title);

    checkBtn.addEventListener("click", () => {
      if (isDone) {
        setHave(id, 0);
      } else {
        setHave(id, totalNeeded);
      }
      notifyCompletionOnDraw = true;
      save();
      draw();
    });

    counterGroup.append(haveInput, totalCell, checkBtn);
    right.append(counterGroup);

    if (stationName) {
      const isClickable = typeof onPillClick === "function";
      const pill = document.createElement(isClickable ? "button" : "span");
      if (isClickable) {
        pill.type = "button";
        pill.title = de
          ? `Beschaffungswege für ${itemName} anzeigen`
          : `Show acquisition methods for ${itemName}`;
        pill.addEventListener("click", onPillClick);
      }

      pill.className =
        `tc-station-pill${isGather ? " is-gather" : ""}${isClickable ? " is-clickable" : ""}${!hasSourceDetails ? " is-empty-source" : ""}`;

      pill.append(
        node("span", "tc-station-dot"),
        node("span", "", stationName)
      );

      if (stationCount) {
        pill.append(node("span", "tc-station-count", stationCount));
      }

      if (isClickable) {
        pill.append(node("span", "tc-station-hint-icon", "ⓘ"));
      }

      right.append(pill);
    }

    row.append(left, right);
    return row;
  }

  function createTeamcraftSection({
    sectionKey,
    title,
    itemCount,
    entries,
    renderContent
  }) {
    const details = document.createElement("details");
    details.className = "tc-panel";
    details.open = list.summarySections[sectionKey] !== false;

    details.addEventListener("toggle", () => {
      list.summarySections[sectionKey] = details.open;
      save();
    });

    const header = document.createElement("summary");
    header.className = "tc-panel-header";

    const titleWrap = node("div", "tc-panel-title-wrap");
    titleWrap.append(
      node("span", "tc-panel-chevron", "▸"),
      node(
        "span",
        "tc-panel-title",
        de
          ? `${title} (${itemCount} ${itemCount === 1 ? "Gegenstand" : "Gegenstände"})`
          : `${title} (${itemCount} ${itemCount === 1 ? "item" : "items"})`
      )
    );

    const actions = node("div", "tc-panel-actions");

    const resetSectionBtn = document.createElement("button");
    resetSectionBtn.type = "button";
    resetSectionBtn.className = "tc-header-icon-btn";
    resetSectionBtn.textContent = "↻";
    resetSectionBtn.title = de
      ? "Abschnitt zurücksetzen"
      : "Reset section";
    resetSectionBtn.setAttribute("aria-label", resetSectionBtn.title);
    resetSectionBtn.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      for (const entry of entries) {
        setHave(entry.id, 0);
      }
      save();
      draw();
    });

    const completeSectionBtn = document.createElement("button");
    completeSectionBtn.type = "button";
    completeSectionBtn.className = "tc-header-icon-btn";
    completeSectionBtn.textContent = "✓";
    completeSectionBtn.title = de
      ? "Alle in diesem Abschnitt abhaken"
      : "Complete all in this section";
    completeSectionBtn.setAttribute("aria-label", completeSectionBtn.title);
    completeSectionBtn.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      for (const entry of entries) {
        setHave(entry.id, entry.totalNeeded);
      }
      notifyCompletionOnDraw = true;
      save();
      draw();
    });

    actions.append(resetSectionBtn, completeSectionBtn);
    header.append(titleWrap, actions);

    const sectionBody = node("div", "tc-panel-body");
    renderContent(sectionBody);

    details.append(header, sectionBody);
    return details;
  }

  function draw() {
    const activeInvId =
      document.activeElement?.dataset?.invId || null;

    missingChoicesCount = 0;
    body.replaceChildren();

    const goalQuantities = new Map();
    let hasAnyValidItems = false;

    for (const item of list.items || []) {
      const quantity = Number(item.quantity);

      if (!Number.isSafeInteger(quantity) || quantity < 1) {
        continue;
      }

      hasAnyValidItems = true;

      if (item.done) {
        continue;
      }

      add(goalQuantities, H.fullId(item.blockId), quantity);
    }

    if (goalQuantities.size === 0) {
      wasSummaryAllDone = false;
      notifyCompletionOnDraw = false;
      body.append(
        node(
          "p",
          "list-summary-note",
          hasAnyValidItems
            ? (
              de
                ? "Alle Materialien in dieser Liste sind bereits abgehakt – kein offener Bedarf mehr."
                : "All materials in this list are already checked off – nothing left to gather or craft."
            )
            : (
              de
                ? "Füge zuerst Materialien zur Liste hinzu."
                : "Add materials to the list first."
            )
        )
      );
      return;
    }

    const choiceBox = node("div", "list-summary-choices");
    const warnings = [];
    const graph = new Map();

    function buildGraph(id, ancestors = new Set()) {
      if (ancestors.has(id)) {
        warnings.push(
          de
            ? `Rezeptschleife bei ${nameOf(id)}.`
            : `Recipe cycle at ${nameOf(id)}.`
        );
        return;
      }

      if (graph.has(id)) return;

      const entry = {
        id,
        recipe: null,
        ingredients: [],
        unresolved: false
      };

      graph.set(id, entry);

      const recipes = H.getEffectiveRecipes(id, minecraft);

      if (recipes.length === 0) {
        return;
      }

      let recipeIndex = 0;

      if (recipes.length > 1) {
        const distinctOptions = H.buildDistinctRecipeOptions(
          recipes,
          nameOf,
          language
        );

        if (distinctOptions.length === 1) {
          recipeIndex = Number(distinctOptions[0].value);
        } else {
          const key = `recipe:${id}`;
          const selected = choices[key];

          choiceBox.append(
            selectChoice(
              de
                ? `Rezept für ${nameOf(id)}`
                : `Recipe for ${nameOf(id)}`,
              distinctOptions,
              selected,
              value => {
                choices[key] = value;
              }
            )
          );

          if (
            selected === undefined ||
            selected === "" ||
            !recipes[Number(selected)]
          ) {
            entry.unresolved = true;
            warnings.push(
              de
                ? `Rezept für ${nameOf(id)} auswählen.`
                : `Choose a recipe for ${nameOf(id)}.`
            );
            return;
          }

          recipeIndex = Number(selected);
        }
      }

      const recipe = recipes[recipeIndex];

      if (
        !recipe ||
        !Array.isArray(recipe.ingredients) ||
        recipe.ingredients.length === 0 ||
        !Number.isSafeInteger(Number(recipe.count)) ||
        Number(recipe.count) < 1
      ) {
        entry.unresolved = true;
        warnings.push(
          de
            ? `Rezept für ${nameOf(id)} nicht berechenbar.`
            : `Recipe for ${nameOf(id)} cannot be calculated.`
        );
        return;
      }

      entry.recipe = recipe;

      const ingredientGroups = new Map();

      for (const ingredient of recipe.ingredients) {
        const key = JSON.stringify(ingredient);

        if (!ingredientGroups.has(key)) {
          ingredientGroups.set(key, {
            ingredient,
            count: 0
          });
        }

        ingredientGroups.get(key).count++;
      }

      for (const [key, group] of ingredientGroups) {
        const options = H.optionsFor(group.ingredient);

        if (options.length === 0) {
          entry.unresolved = true;
          warnings.push(
            de
              ? `Unbekannte Zutat für ${nameOf(id)}.`
              : `Unknown ingredient for ${nameOf(id)}.`
          );
          continue;
        }

        let ingredientId = options[0];

        if (options.length > 1) {
          const choiceKey = `ingredient:${id}:${key}`;
          const selected = choices[choiceKey];
          const groupLabel = H.describeIngredientGroup(
            options,
            group.ingredient,
            nameOf,
            language
          );

          const labelHeading = groupLabel
            ? (
              de
                ? `Zutat für ${nameOf(id)} · ${groupLabel}`
                : `Ingredient for ${nameOf(id)} · ${groupLabel}`
            )
            : (
              de
                ? `Zutat für ${nameOf(id)}`
                : `Ingredient for ${nameOf(id)}`
            );

          choiceBox.append(
            selectChoice(
              labelHeading,
              options.map(optionId => ({
                value: optionId,
                label: nameOf(optionId)
              })),
              selected,
              value => {
                choices[choiceKey] = value;
              },
              options
            )
          );

          if (!selected || !options.includes(selected)) {
            entry.unresolved = true;
            warnings.push(
              de
                ? `Zutatenvariante für ${nameOf(id)} auswählen.`
                : `Choose an ingredient for ${nameOf(id)}.`
            );
            continue;
          }

          ingredientId = selected;
        }

        entry.ingredients.push({
          id: ingredientId,
          count: group.count
        });
      }

      const nextAncestors = new Set(ancestors);
      nextAncestors.add(id);

      for (const ingredient of entry.ingredients) {
        buildGraph(ingredient.id, nextAncestors);
      }
    }

    for (const id of goalQuantities.keys()) {
      buildGraph(id);
    }

    const indegree = new Map(
      [...graph.keys()].map(id => [id, 0])
    );

    for (const entry of graph.values()) {
      for (const ingredient of entry.ingredients) {
        indegree.set(
          ingredient.id,
          (indegree.get(ingredient.id) || 0) + 1
        );
      }
    }

    const totalDemand = new Map(goalQuantities);
    const depth = new Map(
      [...goalQuantities.keys()].map(id => [id, 0])
    );

    const queue = [...graph.keys()].filter(
      id => indegree.get(id) === 0
    );

    let topoVisitedCount = 0;
    const processed = [];
    const rawMaterials = new Map();
    const cooking = new Map();

    while (queue.length > 0) {
      const id = queue.shift();
      const entry = graph.get(id);
      const totalNeeded = totalDemand.get(id) || 0;

      if (!entry) continue;
      topoVisitedCount++;

      const have = getHave(id);
      const remaining = Math.max(0, totalNeeded - have);

      let batches = 0;
      let produced = 0;

      if (
        !entry.recipe &&
        !entry.unresolved &&
        totalNeeded > 0
      ) {
        add(rawMaterials, id, totalNeeded);
      }

      if (entry.recipe && remaining > 0) {
        const outputCount = Number(entry.recipe.count);

        batches = Math.ceil(remaining / outputCount);
        produced = batches * outputCount;

        if (
          ["smelting", "blasting", "smoking"]
            .includes(entry.recipe.type)
        ) {
          add(cooking, entry.recipe.type, batches);
        }

        for (const ingredient of entry.ingredients) {
          add(
            totalDemand,
            ingredient.id,
            ingredient.count * batches
          );

          depth.set(
            ingredient.id,
            Math.max(
              depth.get(ingredient.id) || 0,
              (depth.get(id) || 0) + 1
            )
          );
        }
      }

      if (totalNeeded > 0) {
        processed.push({
          id,
          totalNeeded,
          have,
          remaining,
          batches,
          produced,
          recipe: entry.recipe,
          depth: depth.get(id) || 0,
          isRaw: !entry.recipe
        });
      }

      for (const ingredient of entry.ingredients) {
        indegree.set(
          ingredient.id,
          indegree.get(ingredient.id) - 1
        );

        if (indegree.get(ingredient.id) === 0) {
          queue.push(ingredient.id);
        }
      }
    }

    if (topoVisitedCount < graph.size) {
      warnings.push(
        de
          ? "Eine Rezeptschleife verhindert die vollständige Berechnung."
          : "A recipe cycle prevents a complete calculation."
      );
    }

    const chosenFuel =
      fuels.find(fuel => fuel.id === list.summaryFuel) || fuels[0];

    let fuelNeeded = 0;
    for (const operations of cooking.values()) {
      fuelNeeded += Math.ceil((operations * 4) / chosenFuel.quarters);
    }

    if (fuelNeeded > 0 && !chosenFuel.reusableBucket) {
      add(rawMaterials, chosenFuel.id, fuelNeeded);
    }

    const trackedIds = new Set([
      ...rawMaterials.keys(),
      ...processed.filter(step => !step.isRaw).map(step => step.id)
    ]);

    let completedEntries = 0;
    for (const id of trackedIds) {
      const neededForId =
        rawMaterials.get(id) ??
        processed.find(step => step.id === id)?.totalNeeded ??
        0;

      if (neededForId > 0 && getHave(id) >= neededForId) {
        completedEntries++;
      }
    }

    const totalEntries = trackedIds.size;
    const progressPercent =
      totalEntries > 0
        ? Math.round((completedEntries / totalEntries) * 100)
        : 0;

    const isSummaryAllDone =
      totalEntries > 0 && completedEntries === totalEntries;

    if (
      notifyCompletionOnDraw &&
      !wasSummaryAllDone &&
      isSummaryAllDone &&
      typeof window.openListCompleteDialog === "function"
    ) {
      window.openListCompleteDialog(list);
    }

    wasSummaryAllDone = isSummaryAllDone;
    notifyCompletionOnDraw = false;

    // 1. Kompakte Werkzeugleiste oben
    const toolbar = node("div", "tc-summary-toolbar");

    const progressWrap = node("div", "tc-progress-wrap");
    const progressMeta = node("div", "tc-progress-meta");
    progressMeta.append(
      node(
        "strong",
        "",
        de
          ? `Fortschritt: ${completedEntries} / ${totalEntries} erledigt`
          : `Progress: ${completedEntries} / ${totalEntries} done`
      ),
      node("span", "", `${progressPercent}%`)
    );

    const progressBar = node("div", "tc-progress-bar");
    const progressFill = node("div", "tc-progress-fill");
    progressFill.style.width = `${progressPercent}%`;
    progressBar.append(progressFill);

    progressWrap.append(progressMeta, progressBar);
    toolbar.append(progressWrap);

    const controls = node("div", "tc-controls");

    const unitSwitch = node("div", "tc-unit-switch");
    const units = [
      { id: "items", label: de ? "Stück" : "Items" },
      { id: "stacks", label: "Stacks" },
      { id: "shulkers", label: "Shulker" }
    ];

    for (const unit of units) {
      const btn = node(
        "button",
        `tc-unit-btn${list.summaryUnitMode === unit.id ? " is-active" : ""}`,
        unit.label
      );
      btn.type = "button";
      btn.addEventListener("click", () => {
        list.summaryUnitMode = unit.id;
        save();
        draw();
      });
      unitSwitch.append(btn);
    }

    controls.append(unitSwitch);

    const fuelSelect = node("select", "tc-fuel-select");
    fuelSelect.setAttribute(
      "aria-label",
      de ? "Brennstoff für Öfen" : "Fuel for furnaces"
    );

    for (const fuel of fuels) {
      const ops = fuel.quarters / 4;
      const option = document.createElement("option");
      option.value = fuel.id;
      option.textContent = de
        ? `Brennstoff: ${nameOf(fuel.id)} (${ops}×)`
        : `Fuel: ${nameOf(fuel.id)} (${ops}×)`;
      fuelSelect.append(option);
    }

    fuelSelect.value = chosenFuel.id;
    fuelSelect.addEventListener("change", () => {
      list.summaryFuel = fuelSelect.value;
      save();
      draw();
    });

    controls.append(fuelSelect);

    if (Object.keys(inventory).length > 0) {
      const resetBtn = node(
        "button",
        "tc-reset-btn",
        de ? "Zurücksetzen" : "Reset"
      );
      resetBtn.type = "button";
      resetBtn.addEventListener("click", () => {
        for (const key of Object.keys(inventory)) {
          delete inventory[key];
        }
        save();
        draw();
      });
      controls.append(resetBtn);
    }

    toolbar.append(controls);
    body.append(toolbar);

    // 2. Rezept- & Variantenentscheidungen
    if (choiceBox.childElementCount > 0) {
      const choiceHeading =
        missingChoicesCount > 0
          ? (
            de
              ? `Entscheidungen für diese Liste (${missingChoicesCount} offen)`
              : `Choices for this list (${missingChoicesCount} missing)`
          )
          : (
            de
              ? "Entscheidungen für diese Liste"
              : "Choices for this list"
          );

      choiceBox.prepend(node("h3", "", choiceHeading));
      body.append(choiceBox);
    }

    if (warnings.length > 0) {
      const warningBox = node("div", "list-summary-warning");
      warningBox.append(
        node(
          "strong",
          "",
          de
            ? "Berechnung noch unvollständig"
            : "Calculation not complete yet"
        )
      );

      const warningList = node("ul", "");
      for (const warning of new Set(warnings)) {
        warningList.append(node("li", "", warning));
      }

      warningBox.append(warningList);
      body.append(warningBox);
    }

    // 3. Teamcraft-Sektion 1: Sammeln
    const rawEntries = [...rawMaterials]
      .map(([id, totalNeeded]) => {
        const isFuelItem =
          fuelNeeded > 0 &&
          !chosenFuel.reusableBucket &&
          id === chosenFuel.id;
        return {
          id,
          totalNeeded,
          isFuelItem,
          category: getGatherCategory(id, isFuelItem)
        };
      })
      .sort((a, b) => nameOf(a.id).localeCompare(nameOf(b.id), language));

    if (rawEntries.length > 0) {
      const categoryOrder = [
        "location",
        "farm",
        "trade",
        "loot",
        "other",
        "fuel"
      ];

      const groupedRaw = new Map();
      for (const cat of categoryOrder) {
        groupedRaw.set(cat, []);
      }
      for (const entry of rawEntries) {
        const bucket = groupedRaw.get(entry.category) || groupedRaw.get("other");
        bucket.push(entry);
      }

      const activeCategories = categoryOrder.filter(
        cat => groupedRaw.get(cat).length > 0
      );

      body.append(
        createTeamcraftSection({
          sectionKey: "gather",
          title: de ? "Sammeln" : "Gathering",
          itemCount: rawEntries.length,
          entries: rawEntries,
          renderContent(container) {
            for (const cat of activeCategories) {
              const itemsInCat = groupedRaw.get(cat);

              if (activeCategories.length > 1 || cat !== "other") {
                container.append(
                  node("div", "tc-group-header", sourceCategoryLabels[cat])
                );
              }

              for (const entry of itemsInCat) {
                const sourceInfo = window.materialSources?.[entry.id];
                const waysCount = Array.isArray(sourceInfo?.ways)
                  ? sourceInfo.ways.length
                  : 0;
                const hasDetails = waysCount > 0 || entry.isFuelItem;

                const fuelHint = entry.isFuelItem
                  ? (de ? `inkl. ${fuelNeeded} Brennstoff` : `incl. ${fuelNeeded} fuel`)
                  : "";

                container.append(
                  createTeamcraftRow({
                    id: entry.id,
                    totalNeeded: entry.totalNeeded,
                    stationName: sourceCategoryLabels[cat],
                    stationCount: waysCount > 1 ? `(${waysCount})` : "",
                    isGather: true,
                    hasSourceDetails: hasDetails,
                    onPillClick: () =>
                      openSourceDialog({
                        id: entry.id,
                        totalNeeded: entry.totalNeeded,
                        isFuelItem: entry.isFuelItem,
                        fuelNeeded,
                        chosenFuel
                      }),
                    extraMeta: fuelHint,
                    unitMode: list.summaryUnitMode
                  })
                );
              }
            }

            if (fuelNeeded > 0 && chosenFuel.reusableBucket) {
              const note = node(
                "p",
                "list-summary-note",
                de
                  ? `Zusätzlich benötigt: ${fuelNeeded} × Lavaeimer-Befüllung (Eimer wiederverwendbar).`
                  : `Also needed: ${fuelNeeded} × lava bucket fill (bucket reusable).`
              );
              note.style.padding = "0.5rem 0.9rem 0";
              container.append(note);
            }
          }
        })
      );
    }

    // 4. Teamcraft-Sektion 2: Vorhergehende Handwerksschritte
    const preCraftSteps = [...processed]
      .filter(step => !step.isRaw && !goalQuantities.has(step.id))
      .sort((a, b) => {
        if (b.depth !== a.depth) {
          return b.depth - a.depth;
        }
        return nameOf(a.id).localeCompare(nameOf(b.id), language);
      });

    if (preCraftSteps.length > 0) {
      const distinctDepths = [
        ...new Set(preCraftSteps.map(step => step.depth))
      ].sort((a, b) => b - a);

      const milestoneNumberByDepth = new Map(
        distinctDepths.map((d, idx) => [d, idx + 1])
      );

      body.append(
        createTeamcraftSection({
          sectionKey: "precrafts",
          title: de
            ? "Vorhergehende Handwerksschritte"
            : "Pre-crafts",
          itemCount: preCraftSteps.length,
          entries: preCraftSteps,
          renderContent(container) {
            let currentMilestone = null;

            for (const step of preCraftSteps) {
              const milestone = milestoneNumberByDepth.get(step.depth) || 1;
              if (milestone !== currentMilestone) {
                currentMilestone = milestone;
                container.append(
                  node(
                    "div",
                    "tc-group-header",
                    de ? `Meilenstein ${milestone}` : `Milestone ${milestone}`
                  )
                );
              }

              const stationName =
                recipeTypeNames[step.recipe?.type] || step.recipe?.type || "";
              const stationCount =
                step.batches > 0 ? `${step.batches}×` : "";

              const surplusText =
                step.produced > step.remaining && step.remaining > 0
                  ? (
                    de
                      ? `+${step.produced - step.remaining} Überschuss`
                      : `+${step.produced - step.remaining} extra`
                  )
                  : "";

              container.append(
                createTeamcraftRow({
                  id: step.id,
                  totalNeeded: step.totalNeeded,
                  stationName,
                  stationCount,
                  isGather: false,
                  extraMeta: surplusText,
                  unitMode: list.summaryUnitMode
                })
              );
            }
          }
        })
      );
    }

    // 5. Teamcraft-Sektion 3: Gegenstände
    const processedById = new Map(
      processed.map(step => [step.id, step])
    );

    const goalSteps = [...goalQuantities.keys()]
      .map(id => processedById.get(id))
      .filter(Boolean);

    if (goalSteps.length > 0) {
      body.append(
        createTeamcraftSection({
          sectionKey: "goals",
          title: de ? "Gegenstände" : "Items",
          itemCount: goalSteps.length,
          entries: goalSteps,
          renderContent(container) {
            for (const step of goalSteps) {
              const stationName = step.recipe
                ? (recipeTypeNames[step.recipe.type] || step.recipe.type)
                : (de ? "Sammeln" : "Gather");

              const stationCount =
                step.recipe && step.batches > 0 ? `${step.batches}×` : "";

              const surplusText =
                step.produced > step.remaining && step.remaining > 0
                  ? (
                    de
                      ? `+${step.produced - step.remaining} Überschuss`
                      : `+${step.produced - step.remaining} extra`
                  )
                  : "";

              container.append(
                createTeamcraftRow({
                  id: step.id,
                  totalNeeded: step.totalNeeded,
                  stationName,
                  stationCount,
                  isGather: !step.recipe,
                  extraMeta: surplusText,
                  unitMode: list.summaryUnitMode
                })
              );
            }
          }
        })
      );
    }

    if (activeInvId) {
      const nextInput = body.querySelector(
        `input.tc-have-input[data-inv-id="${CSS.escape(activeInvId)}"]`
      );
      if (nextInput) {
        nextInput.focus();
        nextInput.select();
      }
    }
  }

  draw();

  return panel;
};