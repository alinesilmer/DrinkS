import { type GlassKind, type Recipe, type StampPalette } from "@/types/catalog";
import { STAMP } from "@/data/stampPalettes";

// Mock recipes. `needs` are ingredient ids from data/ingredients.ts.
const recipe = (
  id: string,
  name: string,
  glassLabel: string,
  minutes: number,
  glass: GlassKind,
  palette: StampPalette,
  [top, bottom, garnish]: [string, string, string],
  needs: string[],
  steps: string[],
): Recipe => ({ id, name, glassLabel, minutes, glass, palette, colors: { top, bottom, garnish }, needs, steps });

export const RECIPES: Recipe[] = [
  recipe("daiquiri", "Daiquiri clásico", "Copa coupe", 3, "coupe", STAMP.vanilla,
    ["#F5E9D0", "#F2D08A", "#F78F3F"], ["rum", "lime", "syrup", "ice"], [
      "Agitá con fuerza 60 ml de ron, 25 ml de jugo de lima y 15 ml de almíbar con hielo.",
      "Colá en una copa bien fría.",
      "Dejá flotar una rodaja fina de lima.",
    ]),
  recipe("daiquiri-fresa", "Daiquiri de frutilla frozen", "Copa coupe · licuadora", 5, "coupe", STAMP.chili,
    ["#D2491C", "#B83A14", "#F2D08A"], ["rum", "lime", "syrup", "strawberry", "ice"], [
      "Licuá 60 ml de ron, 30 ml de jugo de lima, 20 ml de almíbar y 6 frutillas con dos tazas de hielo.",
      "Seguí hasta que una cuchara se sostenga de pie.",
      "Serví en una copa helada y poné una frutilla arriba.",
    ]),
  recipe("mojito", "Mojito", "Vaso alto", 4, "high", STAMP.vanilla,
    ["#EAF3F8", "#CFE2EE", "#F2D08A"], ["rum", "lime", "mint", "syrup", "soda", "ice"], [
      "Presioná suavemente 8 hojas de menta con 20 ml de almíbar y 25 ml de jugo de lima en el vaso.",
      "Agregá 50 ml de ron, llená de hielo picado y revolvé.",
      "Completá con agua con gas y una ramita de menta.",
    ]),
  recipe("pina-colada", "Piña colada", "Copa huracán · licuadora", 5, "hurricane", STAMP.marine,
    ["#F5E9D0", "#F2D08A", "#F78F3F"], ["rum", "coconut", "pineapple", "ice"], [
      "Licuá 60 ml de ron, 60 ml de crema de coco y 120 ml de jugo de piña con una taza de hielo.",
      "Serví en una copa alta y fría.",
      "Decorá con la fruta que tengas a mano.",
    ]),
  recipe("paloma", "Paloma", "Vaso alto", 2, "high", STAMP.melon,
    ["#F78F3F", "#D2491C", "#D2491C"], ["tequila", "grapefruit", "lime", "salt", "ice"], [
      "Escarchá con sal el borde de un vaso alto y llenalo de hielo.",
      "Agregá 50 ml de tequila y 15 ml de jugo de lima.",
      "Completá con gaseosa de pomelo y revolvé una vez.",
    ]),
  recipe("margarita", "Margarita", "Vaso corto", 3, "rocks", STAMP.sand,
    ["#F5E9D0", "#CFE2EE", "#D2491C"], ["tequila", "triple", "lime", "salt", "ice"], [
      "Agitá 50 ml de tequila, 25 ml de triple sec y 25 ml de jugo de lima con hielo.",
      "Colá sobre hielo nuevo en un vaso escarchado con sal.",
      "Decorá con un gajo de lima.",
    ]),
  recipe("sunrise", "Tequila sunrise", "Copa huracán", 2, "hurricane", STAMP.pool,
    ["#F2D08A", "#D2491C", "#F78F3F"], ["tequila", "orange", "grenadine", "ice"], [
      "Llená un vaso alto de hielo, agregá 50 ml de tequila y 120 ml de jugo de naranja.",
      "Volcá 15 ml de granadina despacio por el borde para que se hunda.",
      "No revuelvas. Serví con una rodaja de naranja.",
    ]),
  recipe("spritz", "Spritz de la Riviera", "Copa de vino", 2, "wine", STAMP.marine,
    ["#F78F3F", "#D2491C", "#F2D08A"], ["bitter", "prosecco", "soda", "orange", "ice"], [
      "Llená de hielo una copa grande de vino.",
      "Agregá 90 ml de prosecco, 60 ml de aperitivo amargo y un chorrito de agua con gas.",
      "Revolvé con suavidad y agregá una rodaja gruesa de naranja.",
    ]),
  recipe("gin-tonic", "Gin tonic", "Copa balón", 1, "wine", STAMP.chili,
    ["#EAF3F8", "#CFE2EE", "#F2D08A"], ["gin", "tonic", "lime", "ice"], [
      "Llená la copa de hielo hasta arriba.",
      "Agregá 50 ml de ginebra y luego 150 ml de tónica por el borde.",
      "Exprimí un gajo de lima y dejalo caer adentro.",
    ]),
  recipe("mule", "Moscow mule", "Taza de cobre", 2, "rocks", STAMP.melon,
    ["#F5E9D0", "#F78F3F", "#35566F"], ["vodka", "ginger", "lime", "ice"], [
      "Llená una taza de hielo y agregá 50 ml de vodka y 15 ml de jugo de lima.",
      "Completá con ginger beer.",
      "Revolvé una vez y decorá con lima.",
    ]),
  recipe("blue-lagoon", "Blue lagoon", "Vaso alto", 2, "high", STAMP.sand,
    ["#8FB8D6", "#5F8FB5", "#D2491C"], ["vodka", "curacao", "lemon", "ice"], [
      "Llená un vaso alto de hielo.",
      "Agregá 40 ml de vodka y 20 ml de blue curaçao.",
      "Completá con gaseosa de limón y revolvé hasta que quede azul pileta.",
    ]),
  recipe("limonada", "Limonada con menta", "Sin alcohol", 2, "high", STAMP.pool,
    ["#D2491C", "#B83A14", "#F2D08A"], ["lime", "syrup", "soda", "mint", "ice"], [
      "Poné 30 ml de almíbar y 25 ml de jugo de lima en un vaso con hielo.",
      "Completá con agua con gas.",
      "Dale una palmada a una ramita de menta y agregala.",
    ]),
  recipe("maracuya-fizz", "Fizz de maracuyá", "Sin alcohol", 2, "rocks", STAMP.marine,
    ["#F2D08A", "#F78F3F", "#D2491C"], ["passion", "ginger", "lime", "ice"], [
      "Mezclá la pulpa de un maracuyá con 15 ml de jugo de lima sobre hielo.",
      "Completá con ginger beer.",
      "Decorá con una rodaja de lima.",
    ]),
];
