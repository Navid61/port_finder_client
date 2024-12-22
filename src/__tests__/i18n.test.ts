// src/__tests__/i18n.test.ts
import i18n from "@/i18n";

describe("i18n translations", () => {
  it("should return correct translations for English (default language)", () => {
    expect(i18n.t("title")).toBe("Search and Select Ports");
    expect(i18n.t("placeholder.search")).toBe("Type to search ports...");
    expect(i18n.t("message.noResults")).toBe("No ports found.");
    expect(i18n.t("header.selectedPorts")).toBe("Selected Ports:");
    expect(i18n.t("button.remove")).toBe("Remove");
    expect(i18n.t("error.networkFailure")).toBe("Network failure! Please try again.");
  });

  it("should return correct translations for German (de)", async () => {
    await i18n.changeLanguage("de");
    expect(i18n.t("title")).toBe("Häfen suchen und auswählen");
    expect(i18n.t("placeholder.search")).toBe("Geben Sie ein, um Häfen zu suchen...");
    expect(i18n.t("message.noResults")).toBe("Keine Häfen gefunden.");
    expect(i18n.t("header.selectedPorts")).toBe("Ausgewählte Häfen:");
    expect(i18n.t("button.remove")).toBe("Entfernen");
    expect(i18n.t("error.networkFailure")).toBe("Netzwerkfehler! Bitte versuchen Sie es erneut.");
  });

  it("should fallback to English for unknown keys", async () => {
    await i18n.changeLanguage("de");
    expect(i18n.t("nonexistent.key")).toBe("nonexistent.key"); // Default fallback behavior
  });
});
