export function calculateDaysRemaining(endDateString: Date): string {
    const currentDate: Date = new Date();
    const endDate: Date = new Date(endDateString);
  
    // Vérifie si la date de fin est valide
    if (isNaN(endDate.getTime())) {
      throw new Error("La date de fin est invalide");
    }
  
    const differenceInMilliseconds: number = endDate.getTime() - currentDate.getTime();
    const millisecondsInADay: number = 24 * 60 * 60 * 1000;
    const daysRemaining: number = Math.ceil(differenceInMilliseconds / millisecondsInADay);
  
    if (daysRemaining > 0) {
      return `Il reste ${daysRemaining} jours avant la fin de la promotion.`;
    } else if (daysRemaining === 0) {
      return "La promotion se termine aujourd'hui !";
    } else {
      return "La promotion est terminée.";
    }
  }
  