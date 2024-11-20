import { CUSTOMIZATION_PALETTES_NAMES, CustomizationPalette } from "./contract";

export const CUSTOMIZATION_PALETTES: CustomizationPalette[] = [
  {
    id: 0,
    name: CUSTOMIZATION_PALETTES_NAMES.SKIN,
    colors: [
      "#F0D5A1", // Piel clara cálida
      "#F4C6A1", // Piel clara rosada
      "#E8B58B", // Piel clara con subtonos amarillos
      "#D79D6A", // Piel media clara
      "#C68E17", // Piel media cálida
      "#A5744B", // Piel bronceada
      "#9E5B40", // Piel morena clara
      "#7E3F2E", // Piel morena
      "#5C3024", // Piel oscura cálida
      "#3C1F15"  // Piel muy oscura
    ]
  },
  {
    id: 1,
    name: CUSTOMIZATION_PALETTES_NAMES.HAIR,
    colors: [
      "#2E1A47", // Violeta oscuro - ideal para un look audaz
      "#4A2A1D", // Marrón oscuro - color natural y elegante
      "#8E4B3E", // Castaño - tono versátil
      "#B97A4A", // Castaño claro - perfecto para tonos más cálidos
      "#E5C28D", // Rubio oscuro - tono más natural para rubios oscuros
      "#FFD700", // Amarillo dorado - ideal para un estilo más vibrante
      "#F2D64B", // Rubio claro - ideal para un look fresco y soleado
      "#D9A76B", // Cobre cálido - un tono que recuerda al otoño
      "#B05256", // Rojo oscuro - ideal para un look más intenso
      "#6A4E38", // Marrón claro - 
      "#F1A7A0", // Rosa pastel - perfecto para un estilo más suave y juvenil
      "#3C3C3C", // Gris oscuro - adecuado para un look más sofisticado
      "#A9A9A9", // Gris
      "#FF4F58", // Rojo brillante - un tono llamativo y vibrante
      "#1E4D32"  // Verde oscuro - para un estilo más aventurero
    ]
  },
  {
    id: 2,
    name: CUSTOMIZATION_PALETTES_NAMES.CLOTHES,
    colors: [
      "#FFFFFF", // Blanco
      "#000000", // Negro
      "#C0C0C0", // Gris claro
      "#808080", // Gris
      "#D3D3D3", // Gris plata
      "#FF5733", // Rojo anaranjado
      "#FF0000", // Rojo
      "#FF6347", // Tomate (rojo suave)
      "#C70039", // Rojo intenso
      "#900C3F", // Burdeos
      "#F4A300", // Naranja
      "#FFC300", // Amarillo dorado
      "#FFD700", // Amarillo
      "#4CAF50", // Verde hierba
      "#388E3C", // Verde oscuro
      "#03A9F4", // Azul claro
      "#2196F3", // Azul
      "#3F51B5", // Azul profundo
      "#8E24AA", // Morado
      "#9C27B0"  // Púrpura
    ]
  },
  {
    id: 3,
    name: CUSTOMIZATION_PALETTES_NAMES.EYES,
    colors: [
      "#6A4E23", // Marrón oscuro
      "#3B2F2A", // Marrón medio
      "#9E7B56", // Marrón claro
      "#3E5C5B", // Verde grisáceo
      "#4B9F8C", // Verde menta
      "#83C6D2", // Azul claro
      "#2F6496", // Azul oscuro
      "#B8D9E2", // Gris claro
      "#5B4C43", // Avellana
      "#4A4A4A"  // Gris oscuro
    ]
  }
]

export function findPaletteByName(paletteName: CUSTOMIZATION_PALETTES_NAMES): CustomizationPalette | undefined {
  const palette = CUSTOMIZATION_PALETTES.find(palette => palette.name === paletteName);

  return palette;
}