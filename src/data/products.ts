import { productPhoto } from "@/data/media";
import { type Product } from "@/types/catalog";

// Mock catalogue. Replace with the real one from the backend. Prices are whole Argentine pesos.
// Photos are free stock of the drink each product makes; swap them for real product shots.
const row = (id: string, name: string, category: string, size: string, price: number): Product => ({
  id,
  name,
  category,
  size,
  price,
  image: productPhoto(id),
});

export const PRODUCTS: Product[] = [
  row("ron", "Ron blanco", "Destilados", "750 ml", 12900),
  row("tequila", "Tequila blanco", "Destilados", "750 ml", 24500),
  row("ginebra", "Ginebra", "Destilados", "700 ml", 11800),
  row("vodka", "Vodka", "Destilados", "750 ml", 9900),
  row("aperitivo", "Aperitivo amargo", "Licores y vinos", "700 ml", 12500),
  row("fernet", "Fernet Branca", "Licores y vinos", "750 ml", 14900),
  row("triple", "Triple sec", "Licores y vinos", "700 ml", 8900),
  row("curacao", "Blue curaçao", "Licores y vinos", "500 ml", 7900),
  row("prosecco", "Prosecco", "Licores y vinos", "750 ml", 9500),
  row("tonica", "Agua tónica", "Gaseosas", "4 × 200 ml", 5600),
  row("soda", "Agua mineral con gas", "Gaseosas", "1 l", 1900),
  row("toronja", "Gaseosa de pomelo", "Gaseosas", "355 ml", 1800),
  row("granadina", "Granadina", "Jarabes y frutas", "250 ml", 3200),
  row("coco", "Crema de coco", "Jarabes y frutas", "400 ml", 4800),
  row("pina", "Jugo de piña", "Jarabes y frutas", "1 l", 3100),
  row("lima", "Limas frescas", "Jarabes y frutas", "1 kg", 3500),
  row("maracuya", "Maracuyá", "Jarabes y frutas", "500 g", 6500),
  row("menta", "Menta fresca", "Jarabes y frutas", "atado", 1200),
  row("hielo", "Hielo cristalino", "Hielo y adornos", "bolsa de 2 kg", 2800),
  row("citricos", "Cítricos deshidratados", "Hielo y adornos", "60 g", 4500),
];
