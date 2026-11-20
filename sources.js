window.materialSources = {
  "minecraft:dirt": {
    ways: [
      {
        type: "location",
        de: "An der Oberfläche vieler Biome der Oberwelt abbauen.",
        en: "Mine it at the surface of many Overworld biomes."
      }
    ]
  },

  "minecraft:oak_log": {
    ways: [
      {
        type: "location",
        de: "Eichen wachsen unter anderem in Wäldern.",
        en: "Oak trees grow in forests, among other places."
      },
      {
        type: "farm",
        de: "Eichensetzlinge pflanzen, die Bäume wachsen lassen und die Stämme abbauen.",
        en: "Plant oak saplings, grow the trees and collect their logs."
      }
    ]
  },

  "minecraft:stone": {
    ways: [
      {
        type: "location",
        de: "Unterirdisch in der Oberwelt. Beim Abbauen ist Behutsamkeit nötig, um Stein statt Bruchstein zu erhalten.",
        en: "Underground in the Overworld. Mining requires Silk Touch to obtain stone instead of cobblestone."
      },
      {
        type: "craft",
        de: "Bruchstein im Ofen schmelzen; zusätzlich wird Brennstoff benötigt.",
        en: "Smelt cobblestone in a furnace; fuel is also required."
      }
    ]
  },

  "minecraft:stone_bricks": {
    ways: [
      {
        type: "craft",
        de: "Aus Stein herstellen.",
        en: "Craft from stone."
      },
      {
        type: "location",
        de: "Steinziegel kommen auch in Festungen vor.",
        en: "Stone bricks also occur in strongholds."
      }
    ]
  },

  "minecraft:sand": {
    ways: [
      {
        type: "location",
        de: "Beispielsweise in Wüsten, an Stränden und an Flussufern abbauen.",
        en: "Mine it in deserts, on beaches and along riverbanks, for example."
      }
    ]
  },

  "minecraft:glass": {
    ways: [
      {
        type: "craft",
        de: "Sand im Ofen schmelzen; zusätzlich wird Brennstoff benötigt.",
        en: "Smelt sand in a furnace; fuel is also required."
      }
    ]
  },

  "minecraft:iron_ingot": {
    ways: [
      {
        type: "craft",
        de: "Roheisen im Ofen oder Hochofen schmelzen.",
        en: "Smelt raw iron in a furnace or blast furnace."
      },
      {
        type: "loot",
        de: "Eisengolems können Eisenbarren fallen lassen.",
        en: "Iron golems can drop iron ingots."
      },
      {
        type: "farm",
        de: "Eine Eisengolem-Farm kann Eisenbarren liefern. Der Bau und Betrieb der Farm werden im Materialplan nicht berechnet.",
        en: "An iron golem farm can produce iron ingots. Building and operating the farm are not calculated in the material plan."
      }
    ]
  },

  "minecraft:wheat": {
    ways: [
      {
        type: "farm",
        de: "Weizensamen auf Ackerboden anbauen und ausgewachsenen Weizen ernten.",
        en: "Grow wheat seeds on farmland and harvest mature wheat."
      }
    ]
  },

  "minecraft:emerald": {
    ways: [
      {
        type: "trade",
        de: "Beim Handel mit Dorfbewohnern erhalten. Beispielsweise können Bauern Weizen ankaufen, wenn sie das entsprechende Angebot haben.",
        en: "Obtain through villager trading. Farmers can buy wheat if they offer that trade."
      },
      {
        type: "location",
        de: "Smaragderz kommt in Gebirgsregionen der Oberwelt vor.",
        en: "Emerald ore occurs in mountain regions of the Overworld."
      }
    ]
  },

  "minecraft:bookshelf": {
    ways: [
      {
        type: "craft",
        de: "Aus Büchern und Holzbrettern herstellen.",
        en: "Craft using books and planks."
      },
      {
        type: "trade",
        de: "Bibliothekare können Bücherregale anbieten. Prüfe die konkreten Handelsangebote des Dorfbewohners.",
        en: "Librarians can offer bookshelves. Check the villager's actual trades."
      }
    ]
  },

  "minecraft:ender_pearl": {
    ways: [
      {
        type: "loot",
        de: "Endermen können Enderperlen fallen lassen.",
        en: "Endermen can drop ender pearls."
      },
      {
        type: "farm",
        de: "Eine Enderman-Farm kann wiederholt Enderperlen liefern.",
        en: "An enderman farm can repeatedly produce ender pearls."
      },
      {
        type: "trade",
        de: "Kleriker können Enderperlen anbieten. Prüfe ihre tatsächlich verfügbaren Handelsstufen und Angebote.",
        en: "Clerics can offer ender pearls. Check their available trade levels and offers."
      }
    ]
  },

  "minecraft:blaze_rod": {
    ways: [
      {
        type: "loot",
        de: "Lohen in Netherfestungen können Lohenruten fallen lassen.",
        en: "Blazes in Nether fortresses can drop blaze rods."
      },
      {
        type: "farm",
        de: "Lohen können für eine wiederholbare Gewinnung gefarmt werden.",
        en: "Blazes can be farmed for a repeatable supply."
      }
    ]
  },

  "minecraft:rotten_flesh": {
    ways: [
      {
        type: "loot",
        de: "Zombies können verfaultes Fleisch fallen lassen.",
        en: "Zombies can drop rotten flesh."
      },
      {
        type: "farm",
        de: "Eine Zombiefarm kann wiederholt verfaultes Fleisch liefern.",
        en: "A zombie farm can repeatedly produce rotten flesh."
      }
    ]
  },

  "minecraft:saddle": {
    ways: [
      {
        type: "loot",
        de: "Sättel können in bestimmten Truhen gefunden werden, beispielsweise in Monsterraum-Truhen.",
        en: "Saddles can be found in certain chests, including monster room chests."
      },
      {
        type: "loot",
        de: "Sättel können beim Angeln als Schatz erhalten werden.",
        en: "Saddles can be obtained as fishing treasure."
      },
      {
        type: "trade",
        de: "Lederverarbeiter können Sättel anbieten. Prüfe die Handelsstufe und das konkrete Angebot.",
        en: "Leatherworkers can offer saddles. Check their trade level and actual offer."
      }
    ]
  }
};

Object.assign(window.materialSources, {
  "minecraft:cobblestone": {
    ways: [
      {
        type: "location",
        de: "Stein ohne Behutsamkeit abbauen; dabei erhältst du Bruchstein.",
        en: "Mine stone without Silk Touch to obtain cobblestone."
      }
    ]
  },

  "minecraft:gravel": {
    ways: [
      {
        type: "location",
        de: "Kies kommt unter anderem an Flussufern, auf Meeresböden und unterirdisch vor.",
        en: "Gravel occurs along rivers, on ocean floors and underground, among other places."
      }
    ]
  },

  "minecraft:flint": {
    ways: [
      {
        type: "loot",
        de: "Beim Abbauen von Kies kann Feuerstein entstehen.",
        en: "Mining gravel can produce flint."
      }
    ]
  },

  "minecraft:coal_ore": {
    ways: [
      {
        type: "location",
        de: "Steinkohleerz kommt in der Oberwelt vor, besonders gut sichtbar in höher gelegenen Gebieten.",
        en: "Coal ore occurs in the Overworld and is especially visible in higher terrain."
      }
    ]
  },

  "minecraft:coal": {
    ways: [
      {
        type: "loot",
        de: "Beim Abbauen von Steinkohleerz ohne Behutsamkeit erhältst du Kohle.",
        en: "Mine coal ore without Silk Touch to obtain coal."
      }
    ]
  },

  "minecraft:diamond_ore": {
    ways: [
      {
        type: "location",
        de: "Diamanterz kommt tief unter der Oberfläche der Oberwelt vor.",
        en: "Diamond ore occurs deep below the surface of the Overworld."
      }
    ]
  },

  "minecraft:deepslate_diamond_ore": {
    ways: [
      {
        type: "location",
        de: "Tiefenschiefer-Diamanterz kommt in den tiefen Schichten der Oberwelt vor.",
        en: "Deepslate diamond ore occurs in the deep layers of the Overworld."
      }
    ]
  },

  "minecraft:diamond": {
    ways: [
      {
        type: "loot",
        de: "Beim Abbauen von Diamant- oder Tiefenschiefer-Diamanterz ohne Behutsamkeit erhältst du Diamanten.",
        en: "Mine diamond ore or deepslate diamond ore without Silk Touch to obtain diamonds."
      }
    ]
  },

  "minecraft:redstone": {
    ways: [
      {
        type: "loot",
        de: "Beim Abbauen von Redstone- oder Tiefenschiefer-Redstone-Erz ohne Behutsamkeit erhältst du Redstone-Staub.",
        en: "Mine redstone ore or deepslate redstone ore without Silk Touch to obtain redstone dust."
      }
    ]
  },

  "minecraft:raw_copper": {
    ways: [
      {
        type: "loot",
        de: "Beim Abbauen von Kupfer- oder Tiefenschiefer-Kupfererz ohne Behutsamkeit erhältst du Rohkupfer.",
        en: "Mine copper ore or deepslate copper ore without Silk Touch to obtain raw copper."
      }
    ]
  },

  "minecraft:clay_ball": {
    ways: [
      {
        type: "location",
        de: "Ton kommt unter anderem auf Böden von Flüssen und flachen Gewässern vor. Ohne Behutsamkeit abgebaut, lässt er Tonklumpen fallen.",
        en: "Clay occurs on riverbeds and in shallow water, among other places. Mining it without Silk Touch drops clay balls."
      }
    ]
  },

  "minecraft:sugar_cane": {
    ways: [
      {
        type: "location",
        de: "Zuckerrohr wächst an Wasser in der Oberwelt.",
        en: "Sugar cane grows next to water in the Overworld."
      },
      {
        type: "farm",
        de: "Zuckerrohr neben Wasser pflanzen und nachwachsende Halme ernten.",
        en: "Plant sugar cane next to water and harvest the regrowing stalks."
      }
    ]
  },

  "minecraft:oak_sapling": {
    ways: [
      {
        type: "loot",
        de: "Eichenlaub kann Eichensetzlinge fallen lassen.",
        en: "Oak leaves can drop oak saplings."
      }
    ]
  },

  "minecraft:birch_log": {
    ways: [
      {
        type: "location",
        de: "Birken wachsen unter anderem in Birkenwäldern.",
        en: "Birch trees grow in birch forests, among other places."
      },
      {
        type: "farm",
        de: "Birkensetzlinge pflanzen, Bäume wachsen lassen und die Stämme abbauen.",
        en: "Plant birch saplings, grow the trees and collect their logs."
      }
    ]
  },

  "minecraft:spruce_log": {
    ways: [
      {
        type: "location",
        de: "Fichten wachsen unter anderem in Taiga-Biomen.",
        en: "Spruce trees grow in taiga biomes, among other places."
      },
      {
        type: "farm",
        de: "Fichtensetzlinge pflanzen, Bäume wachsen lassen und die Stämme abbauen.",
        en: "Plant spruce saplings, grow the trees and collect their logs."
      }
    ]
  },

  "minecraft:bone": {
    ways: [
      {
        type: "loot",
        de: "Skelette können Knochen fallen lassen.",
        en: "Skeletons can drop bones."
      },
      {
        type: "farm",
        de: "Eine Skelettfarm kann wiederholt Knochen liefern.",
        en: "A skeleton farm can repeatedly produce bones."
      }
    ]
  },

  "minecraft:string": {
    ways: [
      {
        type: "loot",
        de: "Spinnen können Fäden fallen lassen.",
        en: "Spiders can drop string."
      },
      {
        type: "farm",
        de: "Eine Spinnenfarm kann wiederholt Fäden liefern.",
        en: "A spider farm can repeatedly produce string."
      }
    ]
  },

  "minecraft:gunpowder": {
    ways: [
      {
        type: "loot",
        de: "Creeper können Schwarzpulver fallen lassen.",
        en: "Creepers can drop gunpowder."
      },
      {
        type: "farm",
        de: "Eine Creeperfarm kann wiederholt Schwarzpulver liefern.",
        en: "A creeper farm can repeatedly produce gunpowder."
      }
    ]
  },

  "minecraft:leather": {
    ways: [
      {
        type: "loot",
        de: "Kühe können Leder fallen lassen.",
        en: "Cows can drop leather."
      },
      {
        type: "farm",
        de: "Kühe züchten, um wiederholt Leder gewinnen zu können.",
        en: "Breed cows for a repeatable source of leather."
      }
    ]
  },

  "minecraft:slime_ball": {
    ways: [
      {
        type: "loot",
        de: "Kleine Schleime können Schleimbälle fallen lassen.",
        en: "Small slimes can drop slimeballs."
      },
      {
        type: "farm",
        de: "Eine Schleimfarm kann wiederholt Schleimbälle liefern.",
        en: "A slime farm can repeatedly produce slimeballs."
      }
    ]
  },

  "minecraft:amethyst_shard": {
    ways: [
      {
        type: "location",
        de: "Amethystgeoden kommen unterirdisch in der Oberwelt vor. Voll ausgewachsene Amethysthaufen liefern beim Abbau Amethystscherben.",
        en: "Amethyst geodes occur underground in the Overworld. Mining fully grown amethyst clusters yields amethyst shards."
      }
    ]
  },

  "minecraft:obsidian": {
    ways: [
      {
        type: "location",
        de: "Obsidian entsteht, wenn Wasser einen Lavaquellblock berührt. Zum Abbauen benötigst du eine Diamant- oder Netheritspitzhacke.",
        en: "Obsidian forms when water touches a lava source block. Mining it requires a diamond or netherite pickaxe."
      }
    ]
  },

  "minecraft:netherrack": {
    ways: [
      {
        type: "location",
        de: "Netherrack bildet große Teile des Geländes im Nether.",
        en: "Netherrack forms much of the terrain in the Nether."
      }
    ]
  },

  "minecraft:soul_sand": {
    ways: [
      {
        type: "location",
        de: "Seelensand kommt unter anderem in Seelensandtälern des Nethers vor.",
        en: "Soul sand occurs in Nether soul sand valleys, among other places."
      }
    ]
  },

  "minecraft:blackstone": {
    ways: [
      {
        type: "location",
        de: "Schwarzstein kommt unter anderem in Basaltdeltas des Nethers vor.",
        en: "Blackstone occurs in Nether basalt deltas, among other places."
      }
    ]
  },

  "minecraft:ancient_debris": {
    ways: [
      {
        type: "location",
        de: "Antiker Schrott kommt unterirdisch im Nether vor.",
        en: "Ancient debris occurs underground in the Nether."
      }
    ]
  },

  "minecraft:glowstone": {
    ways: [
      {
        type: "location",
        de: "Glowstone bildet leuchtende Ansammlungen im Nether, häufig an Decken.",
        en: "Glowstone forms glowing clusters in the Nether, often on ceilings."
      }
    ]
  },

  "minecraft:nether_wart": {
    ways: [
      {
        type: "location",
        de: "Netherwarzen wachsen unter anderem in Netherfestungen auf Seelensand.",
        en: "Nether wart grows on soul sand in Nether fortresses, among other places."
      },
      {
        type: "farm",
        de: "Netherwarzen auf Seelensand anpflanzen und ausgewachsene Pflanzen ernten.",
        en: "Plant nether wart on soul sand and harvest the mature plants."
      }
    ]
  },

  "minecraft:end_stone": {
    ways: [
      {
        type: "location",
        de: "Endstein bildet große Teile der Inseln im Ende.",
        en: "End stone forms much of the islands in the End."
      }
    ]
  },

  "minecraft:chorus_fruit": {
    ways: [
      {
        type: "location",
        de: "Choruspflanzen wachsen auf den äußeren Endinseln.",
        en: "Chorus plants grow on the outer End islands."
      },
      {
        type: "farm",
        de: "Chorusblumen auf Endstein pflanzen und die gewachsenen Choruspflanzen ernten.",
        en: "Plant chorus flowers on end stone and harvest the grown chorus plants."
      }
    ]
  },

  "minecraft:elytra": {
    ways: [
      {
        type: "loot",
        de: "Elytren befinden sich in Endschiffen bei manchen Endsiedlungen.",
        en: "Elytra are found in End ships associated with some End cities."
      }
    ]
  },

  "minecraft:shulker_shell": {
    ways: [
      {
        type: "loot",
        de: "Shulker in Endsiedlungen können Shulkerschalen fallen lassen.",
        en: "Shulkers in End cities can drop shulker shells."
      },
      {
        type: "farm",
        de: "Eine Shulkerfarm kann wiederholt Shulkerschalen liefern.",
        en: "A shulker farm can repeatedly produce shulker shells."
      }
    ]
  }
});

Object.assign(window.materialSources, {
  "minecraft:iron_ore": {
    ways: [
      {
        type: "location",
        de: "Eisenerz kommt in der Oberwelt vor, sowohl unterirdisch als auch in hoch gelegenen Gebieten.",
        en: "Iron ore occurs in the Overworld, both underground and in high terrain."
      }
    ]
  },

  "minecraft:deepslate_iron_ore": {
    ways: [
      {
        type: "location",
        de: "Tiefenschiefer-Eisenerz kommt in den tieferen Schichten der Oberwelt vor.",
        en: "Deepslate iron ore occurs in the deeper layers of the Overworld."
      }
    ]
  },

  "minecraft:copper_ore": {
    ways: [
      {
        type: "location",
        de: "Kupfererz kommt unterirdisch in der Oberwelt vor. In Tropfsteinhöhlen ist Kupfererz besonders häufig.",
        en: "Copper ore occurs underground in the Overworld. It is especially common in dripstone caves."
      }
    ]
  },

  "minecraft:deepslate_copper_ore": {
    ways: [
      {
        type: "location",
        de: "Tiefenschiefer-Kupfererz kommt in den tieferen Schichten der Oberwelt vor.",
        en: "Deepslate copper ore occurs in the deeper layers of the Overworld."
      }
    ]
  },

  "minecraft:gold_ore": {
    ways: [
      {
        type: "location",
        de: "Golderz kommt in der Oberwelt vor. In Tafelberg-Biomen kommt zusätzliches Golderz vor.",
        en: "Gold ore occurs in the Overworld. Badlands biomes have additional gold ore generation."
      }
    ]
  },

  "minecraft:deepslate_gold_ore": {
    ways: [
      {
        type: "location",
        de: "Tiefenschiefer-Golderz kommt in den tieferen Schichten der Oberwelt vor.",
        en: "Deepslate gold ore occurs in the deeper layers of the Overworld."
      }
    ]
  },

  "minecraft:nether_gold_ore": {
    ways: [
      {
        type: "location",
        de: "Nether-Golderz kommt im Nether vor. Ohne Behutsamkeit abgebaut, lässt es Goldklumpen fallen.",
        en: "Nether gold ore occurs in the Nether. Mining it without Silk Touch drops gold nuggets."
      }
    ]
  },

  "minecraft:raw_gold": {
    ways: [
      {
        type: "loot",
        de: "Golderz oder Tiefenschiefer-Golderz ohne Behutsamkeit abbauen, um Rohgold zu erhalten.",
        en: "Mine gold ore or deepslate gold ore without Silk Touch to obtain raw gold."
      }
    ]
  },

  "minecraft:gold_ingot": {
    ways: [
      {
        type: "craft",
        de: "Rohgold im Ofen oder Hochofen schmelzen; dafür wird Brennstoff benötigt.",
        en: "Smelt raw gold in a furnace or blast furnace; this requires fuel."
      },
      {
        type: "craft",
        de: "Goldbarren lassen sich auch aus Goldklumpen herstellen.",
        en: "Gold ingots can also be crafted from gold nuggets."
      }
    ]
  },

  "minecraft:lapis_ore": {
    ways: [
      {
        type: "location",
        de: "Lapislazulierz kommt unterirdisch in der Oberwelt vor.",
        en: "Lapis lazuli ore occurs underground in the Overworld."
      }
    ]
  },

  "minecraft:deepslate_lapis_ore": {
    ways: [
      {
        type: "location",
        de: "Tiefenschiefer-Lapislazulierz kommt in den tieferen Schichten der Oberwelt vor.",
        en: "Deepslate lapis lazuli ore occurs in the deeper layers of the Overworld."
      }
    ]
  },

  "minecraft:lapis_lazuli": {
    ways: [
      {
        type: "loot",
        de: "Lapislazuli- oder Tiefenschiefer-Lapislazulierz ohne Behutsamkeit abbauen.",
        en: "Mine lapis lazuli ore or deepslate lapis lazuli ore without Silk Touch."
      }
    ]
  },

  "minecraft:redstone_ore": {
    ways: [
      {
        type: "location",
        de: "Redstone-Erz kommt tief unter der Oberfläche der Oberwelt vor.",
        en: "Redstone ore occurs deep below the surface of the Overworld."
      }
    ]
  },

  "minecraft:deepslate_redstone_ore": {
    ways: [
      {
        type: "location",
        de: "Tiefenschiefer-Redstone-Erz kommt in den tiefen Schichten der Oberwelt vor.",
        en: "Deepslate redstone ore occurs in the deep layers of the Overworld."
      }
    ]
  },

  "minecraft:emerald_ore": {
    ways: [
      {
        type: "location",
        de: "Smaragderz kommt in Gebirgsbiomen der Oberwelt vor.",
        en: "Emerald ore occurs in mountain biomes of the Overworld."
      }
    ]
  },

  "minecraft:deepslate_emerald_ore": {
    ways: [
      {
        type: "location",
        de: "Tiefenschiefer-Smaragderz ist eine seltene Variante von Smaragderz in tiefen Schichten von Gebirgsbiomen.",
        en: "Deepslate emerald ore is a rare emerald ore variant in deep layers of mountain biomes."
      }
    ]
  },

  "minecraft:nether_quartz_ore": {
    ways: [
      {
        type: "location",
        de: "Netherquarzerz kommt im Nether vor.",
        en: "Nether quartz ore occurs in the Nether."
      }
    ]
  },

  "minecraft:quartz": {
    ways: [
      {
        type: "loot",
        de: "Netherquarzerz ohne Behutsamkeit abbauen, um Netherquarz zu erhalten.",
        en: "Mine Nether quartz ore without Silk Touch to obtain Nether quartz."
      }
    ]
  }
});

Object.assign(window.materialSources, {
  "minecraft:dark_oak_log": {
    ways: [
      {
        type: "location",
        de: "Schwarzeichen wachsen in Dunklen Wäldern.",
        en: "Dark oak trees grow in dark forests."
      },
      {
        type: "farm",
        de: "Vier Schwarzeichensetzlinge als 2×2-Gruppe pflanzen und den gewachsenen Baum fällen.",
        en: "Plant four dark oak saplings in a 2×2 arrangement and chop down the grown tree."
      }
    ]
  },

  "minecraft:dark_oak_sapling": {
    ways: [
      {
        type: "loot",
        de: "Schwarzeichenlaub kann Schwarzeichensetzlinge fallen lassen.",
        en: "Dark oak leaves can drop dark oak saplings."
      }
    ]
  },

  "minecraft:jungle_log": {
    ways: [
      {
        type: "location",
        de: "Tropenbäume wachsen in Dschungelbiomen.",
        en: "Jungle trees grow in jungle biomes."
      },
      {
        type: "farm",
        de: "Tropenbaumsetzlinge pflanzen und gewachsene Bäume fällen.",
        en: "Plant jungle saplings and chop down the grown trees."
      }
    ]
  },

  "minecraft:jungle_sapling": {
    ways: [
      {
        type: "loot",
        de: "Tropenbaumlaub kann Tropenbaumsetzlinge fallen lassen.",
        en: "Jungle leaves can drop jungle saplings."
      }
    ]
  },

  "minecraft:acacia_log": {
    ways: [
      {
        type: "location",
        de: "Akazien wachsen in Savannen.",
        en: "Acacia trees grow in savannas."
      },
      {
        type: "farm",
        de: "Akaziensetzlinge pflanzen und gewachsene Bäume fällen.",
        en: "Plant acacia saplings and chop down the grown trees."
      }
    ]
  },

  "minecraft:acacia_sapling": {
    ways: [
      {
        type: "loot",
        de: "Akazienlaub kann Akaziensetzlinge fallen lassen.",
        en: "Acacia leaves can drop acacia saplings."
      }
    ]
  },

  "minecraft:mangrove_log": {
    ways: [
      {
        type: "location",
        de: "Mangroven wachsen in Mangrovensümpfen.",
        en: "Mangrove trees grow in mangrove swamps."
      },
      {
        type: "farm",
        de: "Mangroven-Keimlinge pflanzen und gewachsene Mangroven fällen.",
        en: "Plant mangrove propagules and chop down the grown trees."
      }
    ]
  },

  "minecraft:mangrove_propagule": {
    ways: [
      {
        type: "location",
        de: "Mangroven-Keimlinge wachsen an Mangrovenlaub.",
        en: "Mangrove propagules grow on mangrove leaves."
      },
      {
        type: "farm",
        de: "Mangrovenlaub mit Knochenmehl behandeln, um Keimlinge wachsen zu lassen.",
        en: "Use bone meal on mangrove leaves to grow propagules."
      }
    ]
  },

  "minecraft:cherry_log": {
    ways: [
      {
        type: "location",
        de: "Kirschbäume wachsen in Kirschhainen.",
        en: "Cherry trees grow in cherry groves."
      },
      {
        type: "farm",
        de: "Kirschsetzlinge pflanzen und gewachsene Bäume fällen.",
        en: "Plant cherry saplings and chop down the grown trees."
      }
    ]
  },

  "minecraft:cherry_sapling": {
    ways: [
      {
        type: "loot",
        de: "Kirschlaub kann Kirschsetzlinge fallen lassen.",
        en: "Cherry leaves can drop cherry saplings."
      }
    ]
  },

  "minecraft:pale_oak_log": {
    ways: [
      {
        type: "location",
        de: "Blasseichen wachsen in Blassen Gärten.",
        en: "Pale oak trees grow in pale gardens."
      },
      {
        type: "farm",
        de: "Vier Blasseichensetzlinge als 2×2-Gruppe pflanzen und den gewachsenen Baum fällen.",
        en: "Plant four pale oak saplings in a 2×2 arrangement and chop down the grown tree."
      }
    ]
  },

  "minecraft:pale_oak_sapling": {
    ways: [
      {
        type: "loot",
        de: "Blasseichenlaub kann Blasseichensetzlinge fallen lassen.",
        en: "Pale oak leaves can drop pale oak saplings."
      }
    ]
  },

  "minecraft:bamboo": {
    ways: [
      {
        type: "location",
        de: "Bambus wächst unter anderem in Bambusdschungeln.",
        en: "Bamboo grows in bamboo jungles, among other places."
      },
      {
        type: "farm",
        de: "Bambus pflanzen und nachwachsende Halme ernten.",
        en: "Plant bamboo and harvest the regrowing stalks."
      }
    ]
  },

  "minecraft:crimson_stem": {
    ways: [
      {
        type: "location",
        de: "Karmesinstämme bilden große Karmesinpilze in Karmesinwäldern des Nethers.",
        en: "Crimson stems form huge crimson fungi in Nether crimson forests."
      },
      {
        type: "farm",
        de: "Karmesinpilze auf Karmesin-Nezel mit Knochenmehl zu großen Pilzen wachsen lassen.",
        en: "Grow crimson fungi into huge fungi using bone meal on crimson nylium."
      }
    ]
  },

  "minecraft:warped_stem": {
    ways: [
      {
        type: "location",
        de: "Wirrstämme bilden große Wirrpilze in Wirrwäldern des Nethers.",
        en: "Warped stems form huge warped fungi in Nether warped forests."
      },
      {
        type: "farm",
        de: "Wirrpilze auf Wirr-Nezel mit Knochenmehl zu großen Pilzen wachsen lassen.",
        en: "Grow warped fungi into huge fungi using bone meal on warped nylium."
      }
    ]
  },

  "minecraft:cactus": {
    ways: [
      {
        type: "location",
        de: "Kakteen wachsen in Wüsten.",
        en: "Cacti grow in deserts."
      },
      {
        type: "farm",
        de: "Kaktus auf Sand pflanzen und nachwachsende Teile ernten.",
        en: "Plant cactus on sand and harvest the regrowing sections."
      }
    ]
  },

  "minecraft:kelp": {
    ways: [
      {
        type: "location",
        de: "Seetang wächst unter Wasser in Ozeanen.",
        en: "Kelp grows underwater in oceans."
      },
      {
        type: "farm",
        de: "Seetang unter Wasser pflanzen und nachwachsende Teile ernten.",
        en: "Plant kelp underwater and harvest the regrowing sections."
      }
    ]
  },

  "minecraft:cocoa_beans": {
    ways: [
      {
        type: "location",
        de: "Kakaofrüchte wachsen an Tropenbäumen im Dschungel. Reife Früchte liefern Kakaobohnen.",
        en: "Cocoa pods grow on jungle trees. Mature pods yield cocoa beans."
      },
      {
        type: "farm",
        de: "Kakaobohnen an Tropenbaumstämmen anpflanzen und reife Früchte ernten.",
        en: "Plant cocoa beans on jungle logs and harvest mature pods."
      }
    ]
  },

  "minecraft:melon": {
    ways: [
      {
        type: "location",
        de: "Melonen können in Dschungelbiomen vorkommen.",
        en: "Melons can occur in jungle biomes."
      },
      {
        type: "farm",
        de: "Melonenkerne auf Ackerboden pflanzen. Die gewachsenen Ranken bilden Melonen auf geeigneten Nachbarblöcken.",
        en: "Plant melon seeds on farmland. Mature stems grow melons on suitable adjacent blocks."
      }
    ]
  },

  "minecraft:pumpkin": {
    ways: [
      {
        type: "location",
        de: "Kürbisse kommen vereinzelt an der Oberfläche der Oberwelt vor.",
        en: "Pumpkins occur in scattered patches on the Overworld surface."
      },
      {
        type: "farm",
        de: "Kürbiskerne auf Ackerboden pflanzen. Die gewachsenen Ranken bilden Kürbisse auf geeigneten Nachbarblöcken.",
        en: "Plant pumpkin seeds on farmland. Mature stems grow pumpkins on suitable adjacent blocks."
      }
    ]
  },

  "minecraft:carrot": {
    ways: [
      {
        type: "location",
        de: "Karotten können auf Feldern in Dörfern wachsen.",
        en: "Carrots can grow in village farms."
      },
      {
        type: "farm",
        de: "Karotten auf Ackerboden anpflanzen und ausgewachsene Pflanzen ernten.",
        en: "Plant carrots on farmland and harvest mature crops."
      }
    ]
  },

  "minecraft:potato": {
    ways: [
      {
        type: "location",
        de: "Kartoffeln können auf Feldern in Dörfern wachsen.",
        en: "Potatoes can grow in village farms."
      },
      {
        type: "farm",
        de: "Kartoffeln auf Ackerboden anpflanzen und ausgewachsene Pflanzen ernten.",
        en: "Plant potatoes on farmland and harvest mature crops."
      }
    ]
  },

  "minecraft:beetroot": {
    ways: [
      {
        type: "location",
        de: "Rote Bete kann auf Feldern in Dörfern wachsen.",
        en: "Beetroots can grow in village farms."
      },
      {
        type: "farm",
        de: "Rote-Bete-Samen auf Ackerboden anpflanzen und ausgewachsene Pflanzen ernten.",
        en: "Plant beetroot seeds on farmland and harvest mature crops."
      }
    ]
  },

  "minecraft:sweet_berries": {
    ways: [
      {
        type: "location",
        de: "Süßbeerensträucher wachsen in Taiga-Biomen.",
        en: "Sweet berry bushes grow in taiga biomes."
      },
      {
        type: "farm",
        de: "Süßbeeren pflanzen und reife Sträucher abernten.",
        en: "Plant sweet berries and harvest mature bushes."
      }
    ]
  },

  "minecraft:glow_berries": {
    ways: [
      {
        type: "location",
        de: "Leuchtbeeren wachsen an Höhlenranken, unter anderem in üppigen Höhlen.",
        en: "Glow berries grow on cave vines, including those in lush caves."
      },
      {
        type: "farm",
        de: "Leuchtbeeren an der Unterseite eines Blocks pflanzen und Beeren von den Ranken ernten.",
        en: "Plant glow berries beneath a block and harvest berries from the vines."
      }
    ]
  }
});

Object.assign(window.materialSources, {
  // Tiere und Mob-Drops
  "minecraft:white_wool": {
    ways: [
      {
        type: "loot",
        de: "Weiße Schafe können geschoren werden, um weiße Wolle zu erhalten.",
        en: "Shear white sheep to obtain white wool."
      },
      {
        type: "farm",
        de: "Weiße Schafe züchten und regelmäßig scheren. Die Wolle wächst nach, wenn Schafe Gras fressen.",
        en: "Breed white sheep and shear them repeatedly. Their wool regrows when they eat grass."
      }
    ]
  },

  "minecraft:feather": {
    ways: [
      {
        type: "loot",
        de: "Hühner können Federn fallen lassen.",
        en: "Chickens can drop feathers."
      },
      {
        type: "farm",
        de: "Hühner züchten, um wiederholt Federn gewinnen zu können.",
        en: "Breed chickens for a repeatable source of feathers."
      }
    ]
  },

  "minecraft:egg": {
    ways: [
      {
        type: "farm",
        de: "Hühner legen nach einiger Zeit Eier, die eingesammelt werden können.",
        en: "Chickens lay eggs over time, which can be collected."
      }
    ]
  },

  "minecraft:beef": {
    ways: [
      {
        type: "loot",
        de: "Kühe können rohes Rindfleisch fallen lassen.",
        en: "Cows can drop raw beef."
      },
      {
        type: "farm",
        de: "Kühe züchten, um wiederholt Rindfleisch gewinnen zu können.",
        en: "Breed cows for a repeatable source of beef."
      }
    ]
  },

  "minecraft:spider_eye": {
    ways: [
      {
        type: "loot",
        de: "Spinnen können Spinnenaugen fallen lassen.",
        en: "Spiders can drop spider eyes."
      }
    ]
  },

  "minecraft:ink_sac": {
    ways: [
      {
        type: "loot",
        de: "Tintenfische können Tintenbeutel fallen lassen.",
        en: "Squids can drop ink sacs."
      }
    ]
  },

  "minecraft:glow_ink_sac": {
    ways: [
      {
        type: "loot",
        de: "Leuchttintenfische können Leuchttintenbeutel fallen lassen.",
        en: "Glow squids can drop glow ink sacs."
      }
    ]
  },

  "minecraft:ghast_tear": {
    ways: [
      {
        type: "loot",
        de: "Ghasts im Nether können Ghasttränen fallen lassen.",
        en: "Ghasts in the Nether can drop ghast tears."
      }
    ]
  },

  "minecraft:phantom_membrane": {
    ways: [
      {
        type: "loot",
        de: "Phantome können Phantomhaut fallen lassen.",
        en: "Phantoms can drop phantom membranes."
      }
    ]
  },

  "minecraft:totem_of_undying": {
    ways: [
      {
        type: "loot",
        de: "Magier (Evoker) lassen Totems der Unsterblichkeit fallen. Sie kommen unter anderem in Waldanwesen und bei Überfällen vor.",
        en: "Evokers drop totems of undying. They occur in woodland mansions and raids, among other places."
      }
    ]
  },

  "minecraft:breeze_rod": {
    ways: [
      {
        type: "loot",
        de: "Böen in Prüfungskammern können Böenruten fallen lassen.",
        en: "Breezes in trial chambers can drop breeze rods."
      }
    ]
  },

  // Ozeane und Wasser
  "minecraft:prismarine": {
    ways: [
      {
        type: "location",
        de: "Prismarin ist Bestandteil von Ozeanmonumenten.",
        en: "Prismarine is part of ocean monuments."
      },
      {
        type: "craft",
        de: "Prismarin lässt sich auch aus Prismarinscherben herstellen.",
        en: "Prismarine can also be crafted from prismarine shards."
      }
    ]
  },

  "minecraft:prismarine_shard": {
    ways: [
      {
        type: "loot",
        de: "Wächter in und um Ozeanmonumente können Prismarinscherben fallen lassen.",
        en: "Guardians in and around ocean monuments can drop prismarine shards."
      }
    ]
  },

  "minecraft:prismarine_crystals": {
    ways: [
      {
        type: "loot",
        de: "Wächter können Prismarinkristalle fallen lassen.",
        en: "Guardians can drop prismarine crystals."
      }
    ]
  },

  "minecraft:sea_lantern": {
    ways: [
      {
        type: "location",
        de: "Seelaternen sind in Ozeanmonumenten verbaut. Zum Einsammeln als Seelaterne benötigst du Behutsamkeit.",
        en: "Sea lanterns are found in ocean monuments. Silk Touch is required to collect the lantern itself."
      },
      {
        type: "craft",
        de: "Seelaternen lassen sich aus Prismarinscherben und Prismarinkristallen herstellen.",
        en: "Sea lanterns can be crafted from prismarine shards and prismarine crystals."
      }
    ]
  },

  "minecraft:wet_sponge": {
    ways: [
      {
        type: "location",
        de: "Nasse Schwämme können in Schwammräumen von Ozeanmonumenten gefunden werden.",
        en: "Wet sponges can be found in sponge rooms of ocean monuments."
      },
      {
        type: "loot",
        de: "Große Wächter können nasse Schwämme fallen lassen.",
        en: "Elder guardians can drop wet sponges."
      }
    ]
  },

  "minecraft:sponge": {
    ways: [
      {
        type: "craft",
        de: "Nasse Schwämme lassen sich im Ofen trocknen.",
        en: "Wet sponges can be dried in a furnace."
      }
    ]
  },

  "minecraft:nautilus_shell": {
    ways: [
      {
        type: "loot",
        de: "Ertrunkene, die eine Nautilusschale tragen, können sie beim Besiegen fallen lassen.",
        en: "Drowned carrying a nautilus shell can drop it when defeated."
      },
      {
        type: "loot",
        de: "Nautilusschalen können beim Angeln als Schatz erhalten werden.",
        en: "Nautilus shells can be obtained as fishing treasure."
      }
    ]
  },

  "minecraft:trident": {
    ways: [
      {
        type: "loot",
        de: "Ertrunkene mit einem Dreizack können ihn beim Besiegen fallen lassen.",
        en: "Drowned carrying a trident can drop it when defeated."
      }
    ]
  },

  "minecraft:sea_pickle": {
    ways: [
      {
        type: "location",
        de: "Seegurken kommen unter Wasser vor, insbesondere bei Korallenriffen in warmen Ozeanen.",
        en: "Sea pickles occur underwater, particularly around coral reefs in warm oceans."
      }
    ]
  },

  "minecraft:tube_coral_block": {
    ways: [
      {
        type: "location",
        de: "Orgelkorallenblöcke kommen in Korallenriffen warmer Ozeane vor. Zum Einsammeln als lebender Korallenblock wird Behutsamkeit benötigt.",
        en: "Tube coral blocks occur in warm-ocean coral reefs. Silk Touch is required to collect a living coral block."
      }
    ]
  },

  "minecraft:sniffer_egg": {
    ways: [
      {
        type: "loot",
        de: "Schnüffler-Eier können beim Abbürsten von verdächtigem Sand in warmen Ozeanruinen gefunden werden.",
        en: "Sniffer eggs can be found by brushing suspicious sand in warm ocean ruins."
      },
      {
        type: "farm",
        de: "Zwei Schnüffler können mit Fackelliliensamen gezüchtet werden und dabei ein Schnüffler-Ei erzeugen.",
        en: "Breeding two sniffers with torchflower seeds produces a sniffer egg."
      }
    ]
  },

  // Strukturen und Truhenloot
  "minecraft:heart_of_the_sea": {
    ways: [
      {
        type: "loot",
        de: "Das Herz des Meeres befindet sich in einer Truhe mit vergrabenem Schatz.",
        en: "A heart of the sea is found in a buried treasure chest."
      }
    ]
  },

  "minecraft:echo_shard": {
    ways: [
      {
        type: "loot",
        de: "Truhen in Antiken Städten können Echoscherben enthalten.",
        en: "Chests in ancient cities can contain echo shards."
      }
    ]
  },

  "minecraft:disc_fragment_5": {
    ways: [
      {
        type: "loot",
        de: "Truhen in Antiken Städten können Schallplattenfragmente enthalten.",
        en: "Chests in ancient cities can contain disc fragments."
      }
    ]
  },

  "minecraft:netherite_upgrade_smithing_template": {
    ways: [
      {
        type: "loot",
        de: "Truhen in Bastionsruinen können Netherite-Upgrade-Schmiedevorlagen enthalten.",
        en: "Chests in bastion remnants can contain netherite upgrade smithing templates."
      }
    ]
  },

  "minecraft:music_disc_pigstep": {
    ways: [
      {
        type: "loot",
        de: "Truhen in Bastionsruinen können die Schallplatte „Pigstep“ enthalten.",
        en: "Chests in bastion remnants can contain the Pigstep music disc."
      }
    ]
  },

  "minecraft:name_tag": {
    ways: [
      {
        type: "loot",
        de: "Truhen in Monsterräumen können Namensschilder enthalten.",
        en: "Chests in monster rooms can contain name tags."
      },
      {
        type: "loot",
        de: "Namensschilder können beim Angeln als Schatz erhalten werden.",
        en: "Name tags can be obtained as fishing treasure."
      }
    ]
  },

  "minecraft:golden_apple": {
    ways: [
      {
        type: "loot",
        de: "Truhen in Wüstenpyramiden können goldene Äpfel enthalten.",
        en: "Chests in desert pyramids can contain golden apples."
      },
      {
        type: "craft",
        de: "Goldene Äpfel lassen sich auch herstellen.",
        en: "Golden apples can also be crafted."
      }
    ]
  },

  "minecraft:enchanted_golden_apple": {
    ways: [
      {
        type: "loot",
        de: "Truhen in Wüstenpyramiden können verzauberte goldene Äpfel enthalten. Sie besitzen kein gewöhnliches Herstellungsrezept.",
        en: "Chests in desert pyramids can contain enchanted golden apples. They have no ordinary crafting recipe."
      }
    ]
  },

  "minecraft:trial_key": {
    ways: [
      {
        type: "loot",
        de: "Prüfungsspawner in Prüfungskammern können nach Abschluss einer Prüfung Prüfungsschlüssel ausgeben.",
        en: "Trial spawners in trial chambers can dispense trial keys after a completed trial."
      }
    ]
  },

  "minecraft:ominous_trial_key": {
    ways: [
      {
        type: "loot",
        de: "Ominöse Prüfungsspawner in Prüfungskammern können ominöse Prüfungsschlüssel ausgeben.",
        en: "Ominous trial spawners in trial chambers can dispense ominous trial keys."
      }
    ]
  },

  "minecraft:heavy_core": {
    ways: [
      {
        type: "loot",
        de: "Ominöse Tresore in Prüfungskammern können einen schweren Kern ausgeben.",
        en: "Ominous vaults in trial chambers can dispense a heavy core."
      }
    ]
  }
});

Object.assign(window.materialSources, {
  "minecraft:turtle_scute": {
    ways: [
      {
        type: "loot",
        de: "Ein junges Schildkrötenjunges lässt beim Heranwachsen zum erwachsenen Tier einen Schildkröten-Hornschild fallen.",
        en: "A baby turtle drops a turtle scute when it grows into an adult."
      }
    ]
  },

  "minecraft:armadillo_scute": {
    ways: [
      {
        type: "loot",
        de: "Ein Gürteltier kann mit einem Pinsel Gürteltier-Hornschilde abgeben.",
        en: "Use a brush on an armadillo to obtain armadillo scutes."
      }
    ]
  },

  "minecraft:chainmail_helmet": {
    ways: [
      {
        type: "trade",
        de: "Ein Rüstungsschmied kann eine Kettenhaube anbieten. Prüfe seine tatsächlichen Handelsangebote.",
        en: "An armorer can offer a chainmail helmet. Check the villager's actual trades."
      }
    ]
  },

  "minecraft:chainmail_chestplate": {
    ways: [
      {
        type: "trade",
        de: "Ein Rüstungsschmied kann einen Kettenbrustpanzer anbieten. Prüfe seine tatsächlichen Handelsangebote.",
        en: "An armorer can offer a chainmail chestplate. Check the villager's actual trades."
      }
    ]
  },

  "minecraft:chainmail_leggings": {
    ways: [
      {
        type: "trade",
        de: "Ein Rüstungsschmied kann eine Kettenhose anbieten. Prüfe seine tatsächlichen Handelsangebote.",
        en: "An armorer can offer chainmail leggings. Check the villager's actual trades."
      }
    ]
  },

  "minecraft:chainmail_boots": {
    ways: [
      {
        type: "trade",
        de: "Ein Rüstungsschmied kann Kettenstiefel anbieten. Prüfe seine tatsächlichen Handelsangebote.",
        en: "An armorer can offer chainmail boots. Check the villager's actual trades."
      }
    ]
  }
});

Object.assign(window.materialSources, {
  "minecraft:lava_bucket": {
    ways: [
      {
        type: "location",
        de: "Einen leeren Eimer an einem Lavaquellblock verwenden.",
        en: "Use an empty bucket on a lava source block."
      }
    ]
  },

  "minecraft:powder_snow_bucket": {
    ways: [
      {
        type: "location",
        de: "Einen leeren Eimer auf Pulverschnee verwenden.",
        en: "Use an empty bucket on powder snow."
      }
    ]
  },

  "minecraft:water_bucket": {
    ways: [
      {
        type: "location",
        de: "Einen leeren Eimer an einem Wasserquellblock verwenden.",
        en: "Use an empty bucket on a water source block."
      }
    ]
  },

  "minecraft:milk_bucket": {
    ways: [
      {
        type: "loot",
        de: "Einen leeren Eimer an einer Kuh, Pilzkuh oder Ziege verwenden.",
        en: "Use an empty bucket on a cow, mooshroom or goat."
      }
    ]
  },

  "minecraft:filled_map": {
    ways: [
      {
        type: "craft",
        de: "Eine leere Karte verwenden, um eine Karte der Umgebung zu erstellen.",
        en: "Use an empty map to create a map of the surrounding area."
      }
    ]
  }
});

// Für diese Tiere wird jeweils ein Wassereimer verwendet.
for (const [id, deName, enName] of [
  ["pufferfish_bucket", "Kugelfisch", "pufferfish"],
  ["salmon_bucket", "Lachs", "salmon"],
  ["cod_bucket", "Kabeljau", "cod"],
  ["tropical_fish_bucket", "Tropenfisch", "tropical fish"],
  ["axolotl_bucket", "Axolotl", "axolotl"],
  ["tadpole_bucket", "Kaulquappe", "tadpole"]
]) {
  window.materialSources[`minecraft:${id}`] = {
    ways: [
      {
        type: "loot",
        de: `Einen Wassereimer an einem ${deName} verwenden.`,
        en: `Use a water bucket on a ${enName}.`
      }
    ]
  };
}

// Die Färbung ist kein gewöhnliches Rezept in unserer
// bisherigen Rezeptdatei; deshalb erfassen wir sie hier.
for (const color of [
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
]) {
  window.materialSources[
    `minecraft:${color}_bundle`
  ] = {
    ways: [
      {
        type: "craft",
        de: "Ein Bündel mit dem entsprechenden Farbstoff färben.",
        en: "Dye a bundle using the corresponding dye."
      }
    ]
  };
}

Object.assign(window.materialSources, {
  "minecraft:written_book": {
    ways: [
      {
        type: "craft",
        de: "Ein Buch und eine Feder beschreiben und anschließend signieren.",
        en: "Write in a book and quill, then sign it."
      }
    ]
  },

  "minecraft:nether_star": {
    ways: [
      {
        type: "loot",
        de: "Der Wither lässt beim Besiegen einen Netherstern fallen.",
        en: "The Wither drops a nether star when defeated."
      }
    ]
  },

  "minecraft:firework_star": {
    ways: [
      {
        type: "craft",
        de: "Aus Schwarzpulver und mindestens einem Farbstoff herstellen. Weitere Zutaten können den Effekt verändern.",
        en: "Craft using gunpowder and at least one dye. Additional ingredients can change the effect."
      }
    ]
  },

  "minecraft:enchanted_book": {
    ways: [
      {
        type: "craft",
        de: "Ein Buch am Zaubertisch mit Erfahrung und Lapislazuli verzaubern.",
        en: "Enchant a book at an enchanting table using experience and lapis lazuli."
      },
      {
        type: "trade",
        de: "Bibliothekare können verzauberte Bücher anbieten. Verzauberung und Angebot hängen vom Dorfbewohner ab.",
        en: "Librarians can offer enchanted books. The enchantment and offer depend on the villager."
      }
    ]
  },

  "minecraft:dragon_breath": {
    ways: [
      {
        type: "loot",
        de: "Die Atemwolke des Enderdrachen mit Glasflaschen einsammeln.",
        en: "Collect the Ender Dragon's breath cloud using glass bottles."
      }
    ]
  },

  "minecraft:splash_potion": {
    ways: [
      {
        type: "craft",
        de: "Einen Trank mit Schwarzpulver am Braustand zu einem Wurftrank verarbeiten.",
        en: "Brew a potion with gunpowder in a brewing stand to make a splash potion."
      }
    ]
  },

  "minecraft:lingering_potion": {
    ways: [
      {
        type: "craft",
        de: "Einen Wurftrank mit Drachenatem am Braustand zu einem Verweiltrank verarbeiten.",
        en: "Brew a splash potion with dragon's breath in a brewing stand to make a lingering potion."
      }
    ]
  },

  "minecraft:music_disc_relic": {
    ways: [
      {
        type: "loot",
        de: "Die Schallplatte „Relic“ kann beim Abbürsten von verdächtigem Kies in Pfadruinen gefunden werden.",
        en: "The Relic music disc can be found by brushing suspicious gravel in trail ruins."
      }
    ]
  }
});

// Diese Schallplatten können fallen, wenn ein Skelett
// oder Eiswanderer einen Creeper tötet.
for (const disc of [
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
]) {
  window.materialSources[
    `minecraft:music_disc_${disc}`
  ] = {
    ways: [
      {
        type: "loot",
        de: "Kann fallen, wenn ein Skelett oder Eiswanderer einen Creeper tötet.",
        en: "Can drop when a skeleton or stray kills a creeper."
      }
    ]
  };
}

Object.assign(window.materialSources, {
  "minecraft:music_disc_creator_music_box": {
    ways: [
      {
        type: "loot",
        de: "Die Schallplatte „Creator (Music Box)“ kann aus einem ominösen Tresor in einer Prüfungskammer erhalten werden.",
        en: "The Creator (Music Box) music disc can be obtained from an ominous vault in a trial chamber."
      }
    ]
  },

  "minecraft:globe_banner_pattern": {
    ways: [
      {
        type: "trade",
        de: "Ein Kartograf auf der höchsten Handelsstufe kann die Globus-Bannervorlage anbieten. Prüfe sein konkretes Angebot.",
        en: "A master-level cartographer can offer the Globe banner pattern. Check the villager's actual trade."
      }
    ]
  },

  "minecraft:flow_pottery_sherd": {
    ways: [
      {
        type: "loot",
        de: "Kann aus einer entsprechend verzierten Vase in einer Prüfungskammer gewonnen werden. Die Vase muss so zerbrochen werden, dass sie ihre Töpferscherben fallen lässt.",
        en: "Can be obtained from a corresponding decorated pot in a trial chamber. Break the pot in a way that makes it drop its pottery sherds."
      }
    ]
  },

  "minecraft:guster_pottery_sherd": {
    ways: [
      {
        type: "loot",
        de: "Kann aus einer entsprechend verzierten Vase in einer Prüfungskammer gewonnen werden. Die Vase muss so zerbrochen werden, dass sie ihre Töpferscherben fallen lässt.",
        en: "Can be obtained from a corresponding decorated pot in a trial chamber. Break the pot in a way that makes it drop its pottery sherds."
      }
    ]
  },

  "minecraft:scrape_pottery_sherd": {
    ways: [
      {
        type: "loot",
        de: "Kann aus einer entsprechend verzierten Vase in einer Prüfungskammer gewonnen werden. Die Vase muss so zerbrochen werden, dass sie ihre Töpferscherben fallen lässt.",
        en: "Can be obtained from a corresponding decorated pot in a trial chamber. Break the pot in a way that makes it drop its pottery sherds."
      }
    ]
  }
});
