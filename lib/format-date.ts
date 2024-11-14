/**
 * Formate une date en "jour mois année" (ex : "3 septembre 2024").
 * @param date - La date à formater, de type `Date` ou `string`.
 * @returns La date formatée en chaîne de caractères.
 */
export function formatDate(date: Date | string): string {
    // Convertir la date si elle est au format string
    const dateObj = typeof date === "string" ? new Date(date) : date;
  
    // Vérifier que la date est valide
    if (isNaN(dateObj.getTime())) {
      throw new Error("Date invalide");
    }
  
    // Créer un formateur de date pour le format souhaité en français
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(dateObj);
  }
  
  