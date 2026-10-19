import { type IngredientGroup } from "@/types/catalog";

// What people can tick in their pantry. `productId` links an ingredient to what the shop sells.
export const INGREDIENT_GROUPS: IngredientGroup[] = [
  {
    title: "Destilados",
    short: "Destilados",
    items: [
      { id: "rum", label: "Ron blanco", productId: "ron" },
      { id: "tequila", label: "Tequila blanco", productId: "tequila" },
      { id: "gin", label: "Ginebra", productId: "ginebra" },
      { id: "vodka", label: "Vodka", productId: "vodka" },
    ],
  },
  {
    title: "Licores y vinos",
    short: "Licores",
    items: [
      { id: "bitter", label: "Aperitivo amargo", productId: "aperitivo" },
      { id: "prosecco", label: "Prosecco", productId: "prosecco" },
      { id: "triple", label: "Triple sec", productId: "triple" },
      { id: "curacao", label: "Blue curaçao", productId: "curacao" },
    ],
  },
  {
    title: "Frutas y hierbas",
    short: "Frutas",
    items: [
      { id: "lime", label: "Lima", productId: "lima" },
      { id: "orange", label: "Naranja" },
      { id: "strawberry", label: "Frutillas" },
      { id: "mint", label: "Menta", productId: "menta" },
      { id: "pineapple", label: "Jugo de piña", productId: "pina" },
      { id: "passion", label: "Maracuyá", productId: "maracuya" },
      { id: "coconut", label: "Crema de coco", productId: "coco" },
    ],
  },
  {
    title: "Gaseosas",
    short: "Gaseosas",
    items: [
      { id: "grapefruit", label: "Gaseosa de pomelo", productId: "toronja" },
      { id: "tonic", label: "Agua tónica", productId: "tonica" },
      { id: "ginger", label: "Ginger beer", productId: "ginger" },
      { id: "soda", label: "Agua con gas", productId: "soda" },
      { id: "lemon", label: "Gaseosa de limón" },
    ],
  },
  {
    title: "Básicos",
    short: "Básicos",
    items: [
      { id: "grenadine", label: "Granadina", productId: "granadina" },
      { id: "syrup", label: "Almíbar" },
      { id: "salt", label: "Sal" },
      { id: "ice", label: "Hielo", productId: "hielo" },
    ],
  },
];

export const DEFAULT_PANTRY = ["rum", "lime", "syrup", "ice", "mint", "soda"];
