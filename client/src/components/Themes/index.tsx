document.addEventListener("DOMContentLoaded", (): void => { 
    document.getElementById("manaColor")!.addEventListener('change', (e: Event): void => {
        manaTheme((e.target as HTMLSelectElement).value);
    });
  });
  
  function manaTheme(value: string): void {
    switch (value) {
      case "colorless":
        document.getElementById("bedecked")!.setAttribute("class", "theme-colorless");
        break;
      case "white":
        document.getElementById("bedecked")!.setAttribute("class", "theme-white");
        break;
      case "blue":
        document.getElementById("bedecked")!.setAttribute("class", "theme-blue");
        break;
      case "black":
        document.getElementById("bedecked")!.setAttribute("class", "theme-black");
        break;
      case "red":
        document.getElementById("bedecked")!.setAttribute("class", "theme-red");
        break;
      case "green":
        document.getElementById("bedecked")!.setAttribute("class", "theme-green");
        break;
      case "manaTheme":
        document.getElementById("bedecked")!.setAttribute("class", "theme-default");
        break;
    }
  }

  export default manaTheme;