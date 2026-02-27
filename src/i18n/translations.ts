export type Language = "en" | "nl";

interface TranslationStrings {
  hero: { badge: string; titleLine1: string; titleHighlight: string; titleLine2: string; subtitle: string; cta: string };
  games: { title: string; subtitle: string; addGame: string; noGames: string; all: string; action: string; rpg: string; platformer: string; puzzle: string };
  defaultGames: {
    stellar: { title: string; description: string };
    enchanted: { title: string; description: string };
    pixel: { title: string; description: string };
  };
  form: { addTitle: string; editTitle: string; imageLabel: string; uploadImage: string; maxSize: string; imageRequired: string; imageFileError: string; imageSizeError: string; titleLabel: string; titlePlaceholder: string; descriptionLabel: string; descriptionPlaceholder: string; categoryLabel: string; categoryPlaceholder: string; newCategory: string; newCategoryPlaceholder: string; linkLabel: string; saveChanges: string; addGameBtn: string };
  detail: { notFoundTitle: string; notFoundDesc: string; back: string; backToPortfolio: string; playNow: string; viewProject: string; gameDetails: string; category: string; status: string; available: string };
  footer: { brand: string; copyright: string };
  admin: { title: string; placeholder: string; login: string; cancel: string; checking: string; incorrect: string };
  deleteConfirm: { title: string; description: string; instruction: string; placeholder: string; confirm: string; cancel: string };
  notFound: { title: string; message: string; returnHome: string };
  about: { title: string; subtitle: string; ageLabel: string; yearsOld: string; bio: string; passionTitle: string; passion: string; skillsTitle: string; skills: string[] };
}

export const translations: Record<Language, TranslationStrings> = {
  en: {
    // Hero
    hero: {
      badge: "Game Developer Portfolio",
      titleLine1: "Creating ",
      titleHighlight: "Worlds",
      titleLine2: "One Pixel at a Time",
      subtitle: "Welcome to my game development portfolio. Explore my collection of games spanning various genres and platforms.",
      cta: "View My Games",
    },
    // Games Section
    games: {
      title: "My Games",
      subtitle: "Explore my collection of games. Each project represents countless hours of passion and creativity.",
      addGame: "Add Game",
      noGames: "No games found in this category yet.",
      all: "All",
      action: "Action",
      rpg: "RPG",
      platformer: "Platformer",
      puzzle: "Puzzle",
    },
    defaultGames: {
      stellar: { title: "Stellar Warfare", description: "An epic space battle game with intense multiplayer combat and stunning visuals. Command your fleet across the galaxy." },
      enchanted: { title: "Enchanted Woods", description: "A mystical fantasy RPG set in a magical forest. Discover secrets, battle creatures, and uncover ancient mysteries." },
      pixel: { title: "Pixel Runner", description: "A retro-style platformer with challenging levels, collectibles, and nostalgic 8-bit graphics." },
    },
    // Game Upload Form
    form: {
      addTitle: "Add New Game",
      editTitle: "Edit Game",
      imageLabel: "Game Image *",
      uploadImage: "Click to upload image",
      maxSize: "Max 5MB",
      imageRequired: "Please upload an image",
      imageFileError: "Please select an image file",
      imageSizeError: "Image must be less than 5MB",
      titleLabel: "Title *",
      titlePlaceholder: "Enter game title",
      descriptionLabel: "Description *",
      descriptionPlaceholder: "Describe your game...",
      categoryLabel: "Category *",
      categoryPlaceholder: "Select a category",
      newCategory: "+ New Category",
      newCategoryPlaceholder: "Enter category name",
      linkLabel: "Game Link (Optional)",
      saveChanges: "Save Changes",
      addGameBtn: "Add Game",
    },
    // Game Detail
    detail: {
      notFoundTitle: "Game Not Found",
      notFoundDesc: "The game you're looking for doesn't exist.",
      back: "Back",
      backToPortfolio: "Back to Portfolio",
      playNow: "Play Now",
      viewProject: "View Project",
      gameDetails: "Game Details",
      category: "Category",
      status: "Status",
      available: "Available",
    },
    // Footer
    footer: {
      brand: "GameDev Portfolio",
      copyright: "All rights reserved.",
    },
    // Admin
    admin: {
      title: "Admin Access",
      placeholder: "Enter password",
      login: "Login",
      cancel: "Cancel",
      checking: "Checking...",
      incorrect: "Incorrect password",
    },
    deleteConfirm: {
      title: "Delete Game",
      description: "This action cannot be undone. This will permanently delete the game.",
      instruction: 'Type "delete" to confirm:',
      placeholder: "delete",
      confirm: "Delete",
      cancel: "Cancel",
    },
    // Not Found
    notFound: {
      title: "404",
      message: "Oops! Page not found",
      returnHome: "Return to Home",
    },
    about: {
      title: "About Me",
      subtitle: "The developer behind the games",
      ageLabel: "Age",
      yearsOld: "years old",
      bio: "I'm a passionate game developer who loves creating immersive digital experiences. From pixel art platformers to epic space battles, I bring ideas to life through code and creativity.",
      passionTitle: "My Passion",
      passion: "I started making games at a young age and never stopped. Every project is a new adventure — a chance to learn, grow, and share something meaningful with players around the world.",
      skillsTitle: "Skills",
      skills: ["Game Design", "Programming", "Pixel Art", "Level Design", "Sound Design", "Storytelling"],
    },
  },
  nl: {
    hero: {
      badge: "Game Developer Portfolio",
      titleLine1: "Werelden ",
      titleHighlight: "Creëren",
      titleLine2: "Pixel voor Pixel",
      subtitle: "Welkom bij mijn game development portfolio. Ontdek mijn collectie games in diverse genres en platforms.",
      cta: "Bekijk Mijn Games",
    },
    games: {
      title: "Mijn Games",
      subtitle: "Ontdek mijn collectie games. Elk project vertegenwoordigt ontelbare uren passie en creativiteit.",
      addGame: "Game Toevoegen",
      noGames: "Nog geen games gevonden in deze categorie.",
      all: "Alle",
      action: "Actie",
      rpg: "RPG",
      platformer: "Platformer",
      puzzle: "Puzzel",
    },
    defaultGames: {
      stellar: { title: "Stellaire Oorlogsvoering", description: "Een episch ruimtegevecht-spel met intense multiplayer-actie en verbluffende graphics. Leid je vloot door het heelal." },
      enchanted: { title: "Betoverde Bossen", description: "Een mystieke fantasy-RPG in een magisch bos. Ontdek geheimen, bestrijd wezens en ontrafel oude mysteries." },
      pixel: { title: "Pixel Renner", description: "Een retro-platformer met uitdagende levels, verzamelobjecten en nostalgische 8-bit graphics." },
    },
    form: {
      addTitle: "Nieuwe Game Toevoegen",
      editTitle: "Game Bewerken",
      imageLabel: "Game Afbeelding *",
      uploadImage: "Klik om afbeelding te uploaden",
      maxSize: "Max 5MB",
      imageRequired: "Upload een afbeelding",
      imageFileError: "Selecteer een afbeeldingsbestand",
      imageSizeError: "Afbeelding moet kleiner zijn dan 5MB",
      titleLabel: "Titel *",
      titlePlaceholder: "Voer de titel in",
      descriptionLabel: "Beschrijving *",
      descriptionPlaceholder: "Beschrijf je game...",
      categoryLabel: "Categorie *",
      categoryPlaceholder: "Selecteer een categorie",
      newCategory: "+ Nieuwe Categorie",
      newCategoryPlaceholder: "Voer categorienaam in",
      linkLabel: "Game Link (Optioneel)",
      saveChanges: "Wijzigingen Opslaan",
      addGameBtn: "Game Toevoegen",
    },
    detail: {
      notFoundTitle: "Game Niet Gevonden",
      notFoundDesc: "De game die je zoekt bestaat niet.",
      back: "Terug",
      backToPortfolio: "Terug naar Portfolio",
      playNow: "Speel Nu",
      viewProject: "Bekijk Project",
      gameDetails: "Game Details",
      category: "Categorie",
      status: "Status",
      available: "Beschikbaar",
    },
    footer: {
      brand: "GameDev Portfolio",
      copyright: "Alle rechten voorbehouden.",
    },
    admin: {
      title: "Admin Toegang",
      placeholder: "Voer wachtwoord in",
      login: "Inloggen",
      cancel: "Annuleren",
      checking: "Controleren...",
      incorrect: "Onjuist wachtwoord",
    },
    deleteConfirm: {
      title: "Game Verwijderen",
      description: "Deze actie kan niet ongedaan worden gemaakt. De game wordt permanent verwijderd.",
      instruction: 'Typ "delete" om te bevestigen:',
      placeholder: "delete",
      confirm: "Verwijderen",
      cancel: "Annuleren",
    },
    notFound: {
      title: "404",
      message: "Oeps! Pagina niet gevonden",
      returnHome: "Terug naar Home",
    },
    about: {
      title: "Over Mij",
      subtitle: "De ontwikkelaar achter de games",
      ageLabel: "Leeftijd",
      yearsOld: "jaar oud",
      bio: "Ik ben een gepassioneerde game-ontwikkelaar die graag meeslepende digitale ervaringen creëert. Van pixel art platformers tot epische ruimtegevechten, ik breng ideeën tot leven met code en creativiteit.",
      passionTitle: "Mijn Passie",
      passion: "Ik begon op jonge leeftijd met het maken van games en ben nooit gestopt. Elk project is een nieuw avontuur — een kans om te leren, te groeien en iets betekenisvols te delen met spelers over de hele wereld.",
      skillsTitle: "Vaardigheden",
      skills: ["Game Design", "Programmeren", "Pixel Art", "Level Design", "Geluidsontwerp", "Storytelling"],
    },
  },
};
