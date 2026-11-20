window.survivalStatuses = {
  obtainable: [
    "minecraft:turtle_scute",
    "minecraft:armadillo_scute",
    "minecraft:chainmail_helmet",
    "minecraft:chainmail_chestplate",
    "minecraft:chainmail_leggings",
    "minecraft:chainmail_boots",
    "minecraft:lava_bucket",
"minecraft:powder_snow_bucket",
"minecraft:water_bucket",
"minecraft:milk_bucket",
"minecraft:pufferfish_bucket",
"minecraft:salmon_bucket",
"minecraft:cod_bucket",
"minecraft:tropical_fish_bucket",
"minecraft:axolotl_bucket",
"minecraft:tadpole_bucket",
"minecraft:filled_map",

...[
  "white",
  "orange",
  "magenta",
  "light_blue",
  "yellow",
  "lime",
  "pink",
  "gray",
  "light_gray",
  "cyan",
  "purple",
  "blue",
  "brown",
  "green",
  "red",
  "black"
].map(color => `minecraft:${color}_bundle`),

"minecraft:written_book",
"minecraft:nether_star",
"minecraft:firework_star",
"minecraft:enchanted_book",
"minecraft:dragon_breath",
"minecraft:splash_potion",
"minecraft:lingering_potion",
"minecraft:music_disc_relic",

...[
  "13",
  "cat",
  "blocks",
  "chirp",
  "far",
  "mall",
  "mellohi",
  "stal",
  "strad",
  "ward",
  "11",
  "wait"
].map(disc => `minecraft:music_disc_${disc}`),

"minecraft:music_disc_creator_music_box",
"minecraft:globe_banner_pattern",
"minecraft:flow_pottery_sherd",
"minecraft:guster_pottery_sherd",
"minecraft:scrape_pottery_sherd"


  ],

  // Diese Block-IDs sind nicht als entsprechende
  // Gegenstände im normalen Überlebensmodus erhältlich.
  not_obtainable: [
    "minecraft:air",
    "minecraft:bedrock",
    "minecraft:suspicious_sand",
    "minecraft:suspicious_gravel",
    "minecraft:budding_amethyst",
    "minecraft:chorus_plant",
    "minecraft:spawner",
    "minecraft:farmland",
    "minecraft:infested_stone",
    "minecraft:infested_cobblestone",
    "minecraft:infested_stone_bricks",
    "minecraft:infested_mossy_stone_bricks",
    "minecraft:infested_cracked_stone_bricks",
    "minecraft:infested_chiseled_stone_bricks",
    "minecraft:infested_deepslate",
    "minecraft:reinforced_deepslate",
    "minecraft:end_portal_frame",
    "minecraft:command_block",
    "minecraft:barrier",
    "minecraft:light",
    "minecraft:dirt_path",
    "minecraft:repeating_command_block",
    "minecraft:chain_command_block",
    "minecraft:structure_void",
    "minecraft:structure_block",
    "minecraft:jigsaw",
    "minecraft:command_block_minecart",
"minecraft:knowledge_book",
"minecraft:debug_stick",
"minecraft:frogspawn",
"minecraft:trial_spawner",
"minecraft:vault",
"minecraft:water",
"minecraft:lava",
"minecraft:tall_seagrass"

  ]
};

window.survivalStatuses.obtainable.push(
  "minecraft:oak_log",
  "minecraft:birch_log",
  "minecraft:spruce_log",
  "minecraft:jungle_log",
  "minecraft:acacia_log",
  "minecraft:dark_oak_log",
  "minecraft:mangrove_log",
  "minecraft:cherry_log",
  "minecraft:pale_oak_log",
  "minecraft:crimson_stem",
  "minecraft:warped_stem",
  "minecraft:dirt",
  "minecraft:sand",
  "minecraft:gravel",
  "minecraft:cobblestone",
  "minecraft:sugar_cane"
);

window.survivalStatuses.obtainable.push(
  "minecraft:coal"
);