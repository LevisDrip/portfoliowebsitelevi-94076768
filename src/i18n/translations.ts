export type Language = "en" | "nl";

interface TranslationStrings {
  hero: { badge: string; titleLine1: string; titleHighlight: string; titleLine2: string; subtitle: string; cta: string };
  games: { title: string; subtitle: string; addGame: string; noGames: string; all: string; action: string; rpg: string; platformer: string; puzzle: string };
  form: { addTitle: string; editTitle: string; imageLabel: string; uploadImage: string; maxSize: string; imageRequired: string; imageFileError: string; imageSizeError: string; titleLabel: string; titlePlaceholder: string; descriptionLabel: string; descriptionPlaceholder: string; categoryLabel: string; categoryPlaceholder: string; linkLabel: string; saveChanges: string; addGameBtn: string };
  detail: { notFoundTitle: string; notFoundDesc: string; back: string; backToPortfolio: string; playNow: string; viewProject: string; gameDetails: string; category: string; status: string; available: string };
  footer: { brand: string; copyright: string };
  admin: { title: string; placeholder: string; login: string; cancel: string; checking: string; incorrect: string };
  notFound: { title: string; message: string; returnHome: string };
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
    // Not Found
    notFound: {
      title: "404",
      message: "Oops! Page not found",
      returnHome: "Return to Home",
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
    notFound: {
      title: "404",
      message: "Oeps! Pagina niet gevonden",
      returnHome: "Terug naar Home",
    },
  },
};
