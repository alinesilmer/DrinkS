import { CUP4_PHOTO, CUP_PHOTO, GLASS3_PHOTO } from "@/data/media";

/**
 * The glasses of your photos, and the shapes that let a drink be poured into each one. Every number is in the
 * photo's own pixels.
 */
export interface GlassShape {
  src: string;
  width: number;
  height: number;
  /** The inside of the glass: the drink is cut to it. */
  inside: string;
  /** Moves `inside` into the photo's pixels, when it was measured in other units. */
  transform?: string;
  /** Something that stands in the glass (a straw): the drink covers it, so it looks dipped in. */
  hole?: string;
  /** Draw the glass once more over the drink, to keep its shine. Off for a glass that is milky inside. */
  front?: boolean;
  /** How much the depth and the sides darken the drink (1 = the usual; less keeps its colours clean). */
  shade?: number;
  /** The box of the inside, for the depth and the sides of the drink. */
  bounds: { left: number; right: number; top: number; bottom: number };
}

/** The tall glass, with its lime and its straw. */
export const TALL: GlassShape = {
  src: CUP_PHOTO,
  width: 1024,
  height: 1536,
  inside: "M246 432L330 1372Q333 1397 360 1397H745Q772 1397 776 1372L852 432Z",
  hole: "M712 432L788 432L671 1016L595 1016Z",
  bounds: { left: 246, right: 852, top: 432, bottom: 1397 },
};

/** The hurricane glass, with its sugar rim and its stick of cinnamon. The drink is in front of the stick, so it looks dipped in. */
export const HURRICANE: GlassShape = {
  src: CUP4_PHOTO,
  width: 1086,
  height: 1448,
  // the inside, measured row by row from the photo (the outer edge of the glass less the thickness of its wall)
  inside: "M248 340L257 355L265 370L272 385L279 400L286 415L292 430L297 445L302 460L306 475L310 490L313 505L315 520L316 535L317 550L317 565L316 580L314 595L311 610L308 625L304 640L298 655L292 670L285 685L276 700L268 715L258 730L251 745L242 760L234 775L227 790L221 805L215 820L210 835L206 850L203 865L200 880L199 895L199 910L200 925L201 940L205 955L208 970L214 985L221 1000L228 1015L238 1030L249 1045L261 1060L838 1060L851 1045L862 1030L871 1015L879 1000L886 985L892 970L895 955L899 940L901 925L901 910L901 895L900 880L898 865L895 850L891 835L886 820L880 805L874 790L866 775L859 760L850 745L842 730L833 715L825 700L817 685L811 670L805 655L799 640L796 625L793 610L791 595L790 580L789 565L789 550L790 535L793 520L795 505L798 490L802 475L806 460L812 445L817 430L823 415L830 400L837 385L844 370L853 355L861 340Z",
  front: false,
  shade: 0.3,
  bounds: { left: 199, right: 901, top: 340, bottom: 1060 },
};

/** The short glass, with its cherry. */
export const ROCKS: GlassShape = {
  src: GLASS3_PHOTO,
  width: 1158,
  height: 1358,
  inside: "M168 352L988 352L905 985C880 1030 290 1030 268 985Z",
  bounds: { left: 168, right: 988, top: 352, bottom: 1030 },
};
