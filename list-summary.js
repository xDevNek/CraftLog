window.createListSummary = function createListSummary(
  list,
  minecraft,
  nameOf,
  language,
  save
) {
  const de = language === "de";

  const existingStyle = document.getElementById(
    "craftlog-summary-teamcraft-styles"
  );
  if (existingStyle) {
    existingStyle.remove();
  }

  const style = document.createElement("style");
  style.id = "craftlog-summary-teamcraft-styles";
  style.textContent = `
    .tc-summary-toolbar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      padding: 0.7rem 0.9rem;
      border-radius: 5px;
      background: var(--forest-light);
      border: 1px solid var(--line);
    }

    .tc-progress-wrap {
      flex: 1 1 200px;
      min-width: 0;
    }

    .tc-progress-meta {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 0.5rem;
      font-size: 0.82rem;
      margin-bottom: 0.35rem;
      color: var(--ink);
    }

    .tc-progress-bar {
      height: 6px;
      border-radius: 999px;
      background: var(--line);
      overflow: hidden;
    }

    .tc-progress-fill {
      height: 100%;
      border-radius: 999px;
      background: var(--mc-grass, var(--forest));
      transition: width 180ms ease;
    }

    .tc-controls {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.45rem;
    }

    .tc-unit-switch {
      display: inline-flex;
      border-radius: 4px;
      overflow: hidden;
      border: 1px solid var(--line);
      background: var(--surface);
    }

    .tc-unit-btn {
      appearance: none;
      border: 0;
      border-right: 1px solid var(--line);
      background: transparent;
      color: var(--muted);
      font: inherit;
      font-size: 0.76rem;
      padding: 0.32rem 0.6rem;
      cursor: pointer;
    }

    .tc-unit-btn:last-child {
      border-right: 0;
    }

    .tc-unit-btn:hover {
      color: var(--ink);
      background: var(--forest-light);
    }

    .tc-unit-btn.is-active {
      color: #fff;
      font-weight: bold;
      background: var(--forest);
    }

    :root[data-theme="dark"] .tc-unit-btn.is-active {
      color: #152019;
    }

    .tc-fuel-select {
      font: inherit;
      font-size: 0.78rem;
      padding: 0.32rem 0.55rem;
      border-radius: 4px;
      border: 1px solid var(--line);
      background: var(--surface);
      color: var(--ink);
      max-width: 100%;
    }

    .tc-reset-btn {
      font: inherit;
      font-size: 0.76rem;
      padding: 0.32rem 0.6rem;
      border-radius: 4px;
      border: 1px solid var(--line);
      background: var(--surface);
      color: var(--danger);
      cursor: pointer;
    }

    .tc-reset-btn:hover {
      border-color: var(--danger);
    }

    /* Stabiles 2-Spalten-Grid für Variantenwahl */
    .list-summary-choice-row {
      display: grid;
      grid-template-columns: 15.5rem minmax(0, 1fr);
      align-items: center;
      gap: 0.65rem;
      width: 100%;
    }

    .list-summary-choice-row:has(> :only-child) {
      grid-template-columns: minmax(0, 1fr);
    }

    .list-summary-choice-row .crafting-slot {
      width: 100%;
      min-width: 0;
    }

    .list-summary-choice-row .crafting-slot-box {
      display: flex;
      width: 100%;
      min-width: 0;
      box-sizing: border-box;
      overflow: hidden;
    }

    .list-summary-choice-row .crafting-slot-info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.1rem;
      min-width: 0;
      flex: 1 1 auto;
      overflow: hidden;
    }

    .list-summary-choice-row .crafting-slot-name {
      display: block;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .list-summary-choice-row .crafting-slot-counter {
      display: block;
      line-height: 1.1;
    }

    .list-summary-choice-row .list-summary-select {
      width: 100%;
      min-width: 0;
      box-sizing: border-box;
    }

    @media (max-width: 640px) {
      .list-summary-choice-row {
        grid-template-columns: minmax(0, 1fr);
      }
    }

    /* Teamcraft Sektions-Container (Sammeln / Vorhergehende Handwerksschritte / Gegenstände) */
    .tc-panel {
      border: 1px solid var(--line);
      border-radius: 5px;
      background: var(--surface);
      overflow: hidden;
    }

    .tc-panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      padding: 0.6rem 0.85rem;
      background: var(--forest-light);
      border-bottom: 1px solid var(--line);
      cursor: pointer;
      list-style: none;
      user-select: none;
    }

    .tc-panel:not([open]) .tc-panel-header {
      border-bottom: 0;
    }

    .tc-panel-header::-webkit-details-marker {
      display: none;
    }

    .tc-panel-title-wrap {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      min-width: 0;
    }

    .tc-panel-chevron {
      display: inline-block;
      font-size: 0.75rem;
      color: var(--muted);
      transition: transform 150ms ease;
    }

    .tc-panel[open] .tc-panel-chevron {
      transform: rotate(90deg);
    }

    .tc-panel-title {
      font-size: 0.86rem;
      font-weight: bold;
      color: var(--ink);
    }

    .tc-panel-actions {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      flex-shrink: 0;
    }

    .tc-header-icon-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 26px;
      height: 26px;
      padding: 0;
      border: 1px solid var(--line);
      border-radius: 4px;
      background: var(--surface);
      color: var(--muted);
      font-size: 0.8rem;
      line-height: 1;
    }

    .tc-header-icon-btn:hover {
      border-color: var(--forest);
      color: var(--forest);
    }

    .tc-panel-body {
      padding: 0.35rem 0 0.5rem;
    }

    /* Gruppen-Überschrift mit durchgehender Linie */
    .tc-group-header {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      padding: 0.55rem 0.9rem 0.3rem;
      font-size: 0.82rem;
      font-weight: bold;
      color: var(--forest);
    }

    .tc-group-header::before {
      content: "";
      width: 1.5rem;
      height: 1px;
      background: var(--line);
      flex-shrink: 0;
    }

    .tc-group-header::after {
      content: "";
      flex: 1;
      height: 1px;
      background: var(--line);
    }

    /* Kompakte Teamcraft Item-Zeile */
    .tc-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      padding: 0.38rem 0.9rem;
      border-bottom: 1px solid color-mix(in srgb, var(--line) 45%, transparent);
      transition: background-color 120ms ease, opacity 150ms ease;
    }

    .tc-row:last-child {
      border-bottom: 0;
    }

    .tc-row:hover {
      background: color-mix(in srgb, var(--forest-light) 55%, transparent);
    }

    .tc-row.is-done {
      opacity: 0.52;
    }

    .tc-row-left {
      display: flex;
      align-items: center;
      gap: 0.55rem;
      min-width: 0;
      flex: 1 1 auto;
    }

    .tc-item-icon {
      width: 24px;
      height: 24px;
      border-radius: 3px;
      flex-shrink: 0;
      background:
        linear-gradient(135deg, #ffffff38 0 48%, #00000022 48% 100%),
        var(--swatch-color, #629a50);
      border: 1px solid #00000033;
      box-shadow: inset 0 1px 0 #ffffff40;
    }

    .tc-item-icon.is-item {
      width: 20px;
      height: 20px;
      margin: 2px;
      border-radius: 50%;
    }

    .tc-item-label-group {
      display: flex;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 0.35rem;
      min-width: 0;
    }

    .tc-item-name {
      font-size: 0.86rem;
      color: var(--ink);
      overflow-wrap: anywhere;
    }

    .tc-row.is-done .tc-item-name {
      text-decoration: line-through;
      color: var(--muted);
    }

    .tc-item-qty {
      font-size: 0.85rem;
      font-weight: bold;
      color: var(--ink);
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }

    .tc-item-sub {
      font-size: 0.75rem;
      color: var(--muted);
    }

    .tc-copy-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      padding: 0;
      border: 1px solid var(--line);
      border-radius: 999px;
      background: transparent;
      color: var(--muted);
      font-size: 0.72rem;
      flex-shrink: 0;
      opacity: 0.65;
    }

    .tc-row:hover .tc-copy-btn,
    .tc-copy-btn:focus-visible {
      opacity: 1;
    }

    .tc-copy-btn:hover {
      border-color: var(--forest);
      color: var(--forest);
    }

    /* Rechte Seite der Teamcraft-Zeile: [Input | /Total | ✓] + [Station-Pill] */
    .tc-row-right {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex-shrink: 0;
    }

    .tc-counter-group {
      display: inline-flex;
      align-items: stretch;
      height: 28px;
      border: 1px solid var(--line);
      border-radius: 4px;
      background: var(--paper);
      overflow: hidden;
    }

    .tc-have-input {
      width: 3.4rem;
      border: 0;
      padding: 0 0.4rem;
      background: transparent;
      color: var(--ink);
      font: inherit;
      font-size: 0.82rem;
      text-align: right;
      font-variant-numeric: tabular-nums;
      -moz-appearance: textfield;
    }

    .tc-have-input::-webkit-outer-spin-button,
    .tc-have-input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    .tc-have-input:focus {
      outline: none;
      background: var(--surface);
    }

    .tc-total-cell {
      display: inline-flex;
      align-items: center;
      padding: 0 0.45rem;
      border-left: 1px solid var(--line);
      color: var(--muted);
      font-size: 0.8rem;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
      background: color-mix(in srgb, var(--surface) 60%, transparent);
    }

    .tc-check-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      border: 0;
      border-left: 1px solid var(--line);
      background: var(--surface);
      color: var(--muted);
      font-size: 0.85rem;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 120ms ease, color 120ms ease;
    }

    .tc-check-btn:hover {
      background: var(--forest-light);
      color: var(--forest);
    }

    .tc-check-btn.is-checked {
      background: var(--forest);
      color: #fff;
    }

    :root[data-theme="dark"] .tc-check-btn.is-checked {
      color: #152019;
    }

    .tc-station-pill {
      display: inline-flex;
      align-items: center;
      justify-content: flex-end;
      gap: 0.3rem;
      min-width: 7.2rem;
      padding: 0.2rem 0.5rem;
      border-radius: 999px;
      border: 1px solid var(--line);
      background: var(--paper);
      color: var(--muted);
      font-size: 0.74rem;
      white-space: nowrap;
    }

    .tc-station-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--mc-grass, var(--forest));
      flex-shrink: 0;
    }

    .tc-station-pill.is-gather .tc-station-dot {
      background: var(--accent);
    }

    .tc-station-count {
      font-weight: bold;
      color: var(--ink);
    }

    @media (max-width: 640px) {
      .tc-row {
        flex-wrap: wrap;
        gap: 0.45rem;
      }

      .tc-row-right {
        width: 100%;
        justify-content: space-between;
        padding-left: 2rem;
      }

      .tc-station-pill {
        min-width: 0;
      }
    }
  `;
  document.head.append(style);

  const recipeTypeNames = {
    crafting_shaped: de ? "Werkbank" : "Crafting Table",
    crafting_shapeless: de ? "Werkbank" : "Crafting Table",
    smelting: de ? "Ofen" : "Furnace",
    blasting: de ? "Hochofen" : "Blast Furnace",
    smoking: de ? "Räucherofen" : "Smoker",
    campfire_cooking: de ? "Lagerfeuer" : "Campfire",
    stonecutting: de ? "Steinsäge" : "Stonecutter",
    smithing_transform: de ? "Schmiedetisch" : "Smithing Table"
  };

  const sourceCategoryLabels = {
    location: de ? "Fundort / Abbauen" : "Location / Mining",
    farm: de ? "Farm" : "Farming",
    trade: de ? "Villager-Handel" : "Villager Trading",
    loot: de ? "Loot / Truhen" : "Loot / Chests",
    craft: de ? "Herstellung" : "Crafting",
    fuel: de ? "Brennstoff" : "Fuel",
    other: de ? "Allgemeine Rohstoffe" : "General Resources"
  };

  const fuels = [
    { id: "minecraft:coal", quarters: 32 },
    { id: "minecraft:charcoal", quarters: 32 },
    { id: "minecraft:coal_block", quarters: 320 },
    { id: "minecraft:dried_kelp_block", quarters: 80 },
    { id: "minecraft:blaze_rod", quarters: 48 },
    { id: "minecraft:stick", quarters: 2 },
    { id: "minecraft:bamboo", quarters: 1 },
    { id: "minecraft:lava_bucket", quarters: 400, reusableBucket: true }
  ];

  const isBlockById = new Map(
    (minecraft.catalog || []).map(entry => [
      entry.id,
      Boolean(entry.isBlock)
    ])
  );

  const MATERIAL_COLORS = [
    [/pale_oak/, "#d6d2cc"],
    [/dark_oak/, "#49331d"],
    [/oak/, "#b8945f"],
    [/spruce/, "#7a5934"],
    [/birch/, "#d8cb9e"],
    [/jungle/, "#a87853"],
    [/acacia/, "#ba6337"],
    [/mangrove/, "#773636"],
    [/cherry/, "#e4b4bc"],
    [/bamboo/, "#c9b44c"],
    [/crimson/, "#7e354e"],
    [/warped/, "#2b6e6c"],
    [/light_blue/, "#4aa3d8"],
    [/light_gray/, "#9da09b"],
    [/white/, "#eaeded"],
    [/orange/, "#e06c1d"],
    [/magenta/, "#b83da8"],
    [/yellow/, "#e5c229"],
    [/lime/, "#68b824"],
    [/pink/, "#e588a8"],
    [/gray/, "#52585b"],
    [/cyan/, "#1d8694"],
    [/purple/, "#7a32a8"],
    [/blue/, "#3446a2"],
    [/brown/, "#6d4426"],
    [/green/, "#4f6b24"],
    [/red_sand/, "#b8622b"],
    [/red/, "#9e2b25"],
    [/blackstone/, "#322e36"],
    [/black/, "#24262a"],
    [/deepslate/, "#4c4e52"],
    [/granite/, "#9c6c5c"],
    [/diorite/, "#cececf"],
    [/andesite|cobblestone|stone/, "#878a88"],
    [/sand/, "#dbd0a0"],
    [/charcoal/, "#463b32"],
    [/coal/, "#2c2c2c"],
    [/copper/, "#c06b4f"],
    [/iron/, "#d4d4d4"],
    [/gold/, "#ebd044"],
    [/diamond/, "#4ee2d8"],
    [/emerald/, "#39c964"],
    [/netherite/, "#474044"],
    [/amethyst/, "#9b69d4"],
    [/quartz/, "#ece6dd"],
    [/prismarine/, "#5da399"],
    [/obsidian/, "#291e3a"]
  ];

  function fullId(id) {
    return String(id || "").startsWith("minecraft:")
      ? String(id)
      : `minecraft:${id}`;
  }

  function colorForItem(id) {
    const shortId = fullId(id).replace(/^minecraft:/, "");

    for (const [pattern, color] of MATERIAL_COLORS) {
      if (pattern.test(shortId)) {
        return color;
      }
    }

    let hash = 0;
    for (let i = 0; i < shortId.length; i++) {
      hash = (hash * 31 + shortId.charCodeAt(i)) >>> 0;
    }

    const hue = hash % 360;
    return `hsl(${hue}, 38%, 52%)`;
  }

  function formatQuantity(amount, unitMode) {
    const n = Math.max(0, Math.floor(Number(amount) || 0));

    if (unitMode === "stacks" && n >= 64) {
      const stacks = Math.floor(n / 64);
      const rest = n % 64;
      const label = stacks === 1 ? "1 Stack" : `${stacks} Stacks`;
      return rest > 0 ? `${label} + ${rest}` : label;
    }

    if (unitMode === "shulkers" && n >= 1728) {
      const shulkers = Math.floor(n / 1728);
      const restAfterShulker = n % 1728;
      const stacks = Math.floor(restAfterShulker / 64);
      const rest = restAfterShulker % 64;
      const parts = [`${shulkers} Shulker`];
      if (stacks > 0) {
        parts.push(stacks === 1 ? "1 Stack" : `${stacks} Stacks`);
      }
      if (rest > 0) {
        parts.push(`${rest}`);
      }
      return parts.join(" + ");
    }

    if (unitMode === "shulkers" && n >= 64) {
      const stacks = Math.floor(n / 64);
      const rest = n % 64;
      const label = stacks === 1 ? "1 Stack" : `${stacks} Stacks`;
      return rest > 0 ? `${label} + ${rest}` : label;
    }

    return String(n);
  }

  function optionsFor(ingredient) {
    if (ingredient?.item) {
      return [ingredient.item];
    }

    if (Array.isArray(ingredient?.alternatives)) {
      return [
        ...new Set(
          ingredient.alternatives.flatMap(optionsFor)
        )
      ];
    }

    return [];
  }

  function describeIngredientGroup(optionIds, rawIngredient) {
    const ids = (optionIds || []).map(id =>
      fullId(id).replace(/^minecraft:/, "")
    );

    const tag = rawIngredient?.tag
      ? fullId(rawIngredient.tag).replace(/^minecraft:/, "")
      : "";

    const tagLabels = {
      planks: de ? "Beliebige Holzbretter" : "Any Wooden Planks",
      logs: de ? "Beliebige Stämme" : "Any Logs",
      logs_that_burn: de ? "Beliebige Stämme" : "Any Logs",
      wooden_slabs: de ? "Beliebige Holzstufen" : "Any Wooden Slabs",
      wooden_stairs: de ? "Beliebige Holztreppen" : "Any Wooden Stairs",
      wool: de ? "Beliebige Wolle" : "Any Wool",
      stone_tool_materials: de
        ? "Bruchstein / Tiefenschiefer / Schwarzstein"
        : "Cobblestone / Deepslate / Blackstone",
      stone_crafting_materials: de
        ? "Bruchstein / Tiefenschiefer / Schwarzstein"
        : "Cobblestone / Deepslate / Blackstone",
      coals: de ? "Kohle oder Holzkohle" : "Coal or Charcoal",
      sand: de ? "Beliebiger Sand" : "Any Sand",
      smelts_to_glass: de ? "Sand oder Roter Sand" : "Sand or Red Sand",
      flowers: de ? "Beliebige Blume" : "Any Flower",
      small_flowers: de ? "Beliebige Blume" : "Any Flower",
      saplings: de ? "Beliebiger Setzling" : "Any Sapling"
    };

    if (tag && tagLabels[tag]) {
      return tagLabels[tag];
    }

    if (ids.length === 0) {
      return tag ? (de ? `Gruppe ${tag}` : `Group ${tag}`) : "";
    }

    if (ids.length === 1) {
      return nameOf(ids[0]);
    }

    const every = fn => ids.every(fn);
    const idSet = new Set(ids);

    if (every(id => id.endsWith("_planks"))) {
      return de ? "Beliebige Holzbretter" : "Any Wooden Planks";
    }

    if (
      every(
        id =>
          id.endsWith("_log") ||
          id.endsWith("_stem") ||
          id.endsWith("_wood") ||
          id.endsWith("_hyphae")
      )
    ) {
      return de ? "Beliebige Stämme / Holz" : "Any Logs / Wood";
    }

    if (every(id => id.endsWith("_slab"))) {
      const woodPrefixes = [
        "oak_",
        "spruce_",
        "birch_",
        "jungle_",
        "acacia_",
        "dark_oak_",
        "mangrove_",
        "cherry_",
        "pale_oak_",
        "bamboo_",
        "crimson_",
        "warped_"
      ];

      if (every(id => woodPrefixes.some(prefix => id.startsWith(prefix)))) {
        return de ? "Beliebige Holzstufen" : "Any Wooden Slabs";
      }

      return de ? "Beliebige Stufen" : "Any Slabs";
    }

    if (every(id => id.endsWith("_wool"))) {
      return de ? "Beliebige Wolle" : "Any Wool";
    }

    if (every(id => id.endsWith("_carpet"))) {
      return de ? "Beliebiger Teppich" : "Any Carpet";
    }

    if (every(id => id.endsWith("_bed"))) {
      return de ? "Beliebiges Bett" : "Any Bed";
    }

    if (every(id => id.endsWith("_banner"))) {
      return de ? "Beliebiges Banner" : "Any Banner";
    }

    if (every(id => id.endsWith("_glazed_terracotta"))) {
      return de ? "Beliebige glasierte Keramik" : "Any Glazed Terracotta";
    }

    if (every(id => id.endsWith("_terracotta"))) {
      return de ? "Beliebige Keramik" : "Any Terracotta";
    }

    if (every(id => id.endsWith("_concrete_powder"))) {
      return de ? "Beliebiger Trockenbeton" : "Any Concrete Powder";
    }

    if (every(id => id.endsWith("_concrete"))) {
      return de ? "Beliebiger Beton" : "Any Concrete";
    }

    if (every(id => id === "glass" || id.endsWith("_stained_glass"))) {
      return de ? "Beliebiges Glas" : "Any Glass";
    }

    if (
      every(id => id === "glass_pane" || id.endsWith("_stained_glass_pane"))
    ) {
      return de ? "Beliebige Glasscheibe" : "Any Glass Pane";
    }

    if (every(id => id.endsWith("_candle"))) {
      return de ? "Beliebige Kerze" : "Any Candle";
    }

    if (every(id => id.endsWith("_shulker_box"))) {
      return de ? "Beliebige Shulker-Kiste" : "Any Shulker Box";
    }

    if (
      every(
        id =>
          id.endsWith("_sapling") ||
          id === "mangrove_propagule" ||
          id === "azalea" ||
          id === "flowering_azalea"
      )
    ) {
      return de ? "Beliebiger Setzling" : "Any Sapling";
    }

    if (every(id => id.endsWith("_dye"))) {
      return de ? "Beliebiger Farbstoff" : "Any Dye";
    }

    if (
      ids.length === 2 &&
      idSet.has("coal") &&
      idSet.has("charcoal")
    ) {
      return de ? "Kohle oder Holzkohle" : "Coal or Charcoal";
    }

    if (
      ids.length === 2 &&
      idSet.has("sand") &&
      idSet.has("red_sand")
    ) {
      return de ? "Sand oder Roter Sand" : "Sand or Red Sand";
    }

    if (
      every(id =>
        ["cobblestone", "cobbled_deepslate", "blackstone"].includes(id)
      )
    ) {
      return de
        ? "Bruchstein / Tiefenschiefer / Schwarzstein"
        : "Cobblestone / Deepslate / Blackstone";
    }

    if (ids.length === 2) {
      return de
        ? `${nameOf(ids[0])} oder ${nameOf(ids[1])}`
        : `${nameOf(ids[0])} or ${nameOf(ids[1])}`;
    }

    return de
      ? `Beliebige Zutat (${ids.length} Varianten)`
      : `Any ingredient (${ids.length} variants)`;
  }

  function summarizeRecipeIngredients(recipe) {
    if (!recipe || !Array.isArray(recipe.ingredients)) {
      return "";
    }

    const groups = new Map();

    for (const ingredient of recipe.ingredients) {
      const options = optionsFor(ingredient);
      const label =
        options.length === 1
          ? nameOf(options[0])
          : describeIngredientGroup(options, ingredient);

      if (!label) continue;
      groups.set(label, (groups.get(label) || 0) + 1);
    }

    return [...groups.entries()]
      .map(([label, count]) => `${count} × ${label}`)
      .join(" + ");
  }

  function buildDistinctRecipeOptions(recipes) {
    const seenSignatures = new Set();
    const options = [];

    recipes.forEach((recipe, index) => {
      const ingredientSummary = summarizeRecipeIngredients(recipe);
      const signature = `${recipe.type}|${recipe.count || 1}|${ingredientSummary}`;

      if (seenSignatures.has(signature)) {
        return;
      }
      seenSignatures.add(signature);

      const station = recipeTypeNames[recipe.type] || recipe.type;
      const outCount = recipe.count || 1;
      const label = ingredientSummary
        ? `${station}: ${ingredientSummary} → ${outCount} ×`
        : `${station} (${outCount} ×)`;

      options.push({
        value: String(index),
        label
      });
    });

    return options;
  }

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
      const currentId = fullId(validIds[nextIndex] || validIds[0]);
      const isBlock = isBlockById.get(currentId);
      const label = nameOf(currentId);

      blockIcon.style.setProperty("--slot-color", colorForItem(currentId));
      blockIcon.classList.toggle("is-item", isBlock === false);
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

    select.value = selected || "";

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
    icon.style.setProperty("--swatch-color", colorForItem(id));
    icon.setAttribute("aria-hidden", "true");

    const labelGroup = node("div", "tc-item-label-group");
    labelGroup.append(
      node("span", "tc-item-name", itemName),
      node("span", "tc-item-qty", `×${formatQuantity(totalNeeded, unitMode)}`)
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
      save();
      draw();
    });

    counterGroup.append(haveInput, totalCell, checkBtn);
    right.append(counterGroup);

    if (stationName) {
      const pill = node(
        "span",
        `tc-station-pill${isGather ? " is-gather" : ""}`
      );
      pill.append(
        node("span", "tc-station-dot"),
        node("span", "", stationName)
      );
      if (stationCount) {
        pill.append(node("span", "tc-station-count", stationCount));
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

    body.replaceChildren();

    const goalQuantities = new Map();

    for (const item of list.items || []) {
      const quantity = Number(item.quantity);

      if (!Number.isSafeInteger(quantity) || quantity < 1) {
        continue;
      }

      add(goalQuantities, fullId(item.blockId), quantity);
    }

    if (goalQuantities.size === 0) {
      body.append(
        node(
          "p",
          "list-summary-note",
          de
            ? "Füge zuerst Materialien zur Liste hinzu."
            : "Add materials to the list first."
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

      const recipes = minecraft.recipes[id] || [];

      if (recipes.length === 0) {
        return;
      }

      let recipeIndex = 0;

      if (recipes.length > 1) {
        const distinctOptions = buildDistinctRecipeOptions(recipes);

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
        const options = optionsFor(group.ingredient);

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
          const groupLabel = describeIngredientGroup(
            options,
            group.ingredient
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
      choiceBox.prepend(
        node(
          "h3",
          "",
          de
            ? "Entscheidungen für diese Liste"
            : "Choices for this list"
        )
      );
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
                const firstWay = Array.isArray(sourceInfo?.ways)
                  ? sourceInfo.ways[0]
                  : null;

                const subHint = entry.isFuelItem
                  ? (de ? `inkl. ${fuelNeeded} Brennstoff` : `incl. ${fuelNeeded} fuel`)
                  : (firstWay?.[language] || firstWay?.en || "");

                container.append(
                  createTeamcraftRow({
                    id: entry.id,
                    totalNeeded: entry.totalNeeded,
                    stationName: sourceCategoryLabels[cat],
                    isGather: true,
                    extraMeta: subHint,
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