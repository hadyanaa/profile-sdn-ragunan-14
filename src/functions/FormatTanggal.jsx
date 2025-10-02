export const formatTanggal = (dateInput) => {
      if (!dateInput) return "";
      const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
      const options = {
         weekday: "long", // Senin
         day: "numeric",  // 13
         month: "long",   // Juli
         year: "numeric"  // 2025
      };
      return date.toLocaleDateString("id-ID", options);
   };