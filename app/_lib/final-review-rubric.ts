export type RubricItem = {
  id: string;
  text: string;
  points: number;
  /** Rendered once above consecutive items that share the same label. */
  groupLabel?: string;
  /** Static, non-scored descriptive sub-bullets shown under the item. */
  details?: string[];
};

export type RubricSection = {
  title: string;
  items: RubricItem[];
};

export const MAX_SCORE = 100;

export const RUBRIC: RubricSection[] = [
  {
    title: "Mandatory Requirements",
    items: [
      {
        id: "layout-blocks",
        points: 12.8,
        text: "All the blocks from the brief have been coded. The layout matches the designs for all resolutions from the mockup. Differences in size should not visually contradict the layout or get out of the grid in the layout.",
      },
      {
        id: "responsive-resolutions",
        points: 12.6,
        text: "The project is adapted for different screen resolutions and looks correct on all intermediate resolutions. There is no horizontal scrolling on resolutions of 320px and up. The scrollbar can't be hidden using the overflow: hidden declaration.",
      },
      {
        id: "navigation-links",
        points: 12.6,
        text: "Navigation between pages and links to external resources are working correctly: there are no broken links or links leading to an empty anchor on the page, and external links open in a new tab. All project pages can be accessed, and hidden blocks can be displayed.",
      },
      {
        id: "bem-classes",
        points: 4.2,
        text: "Classes are named according to BEM specifications.",
      },
      {
        id: "semantic-html",
        points: 4.2,
        text: "Semantic HTML is used, meaning that semantic tags are used. All elements are used correctly (e.g., a paragraph must be a paragraph, a list must be a list). The DOM tree structure doesn't consist only of `<div />` containers.",
      },
      {
        id: "positioning",
        points: 4.2,
        text: "The correct approach for positioning elements has been chosen and is described using the correct syntax. For example, when positioning an element absolutely, its parent block is relatively positioned.",
      },
      {
        id: "flex-grid",
        points: 4.2,
        text: "`flex` or `grid` layouts are used to arrange elements whenever applicable.",
      },
      {
        id: "vite-cra",
        points: 4.2,
        text: "Infrastructural project files are created using Vite or CRA.",
      },
      {
        id: "popup-windows",
        points: 4.2,
        text: "The popup windows have opening and closing functionality implemented.",
      },
      {
        id: "jsx-parentheses",
        points: 4.2,
        groupLabel: "The markup has been converted into JSX:",
        text: "The markup is included within parentheses `( )`.",
      },
      {
        id: "jsx-components",
        points: 4.2,
        groupLabel: "The markup has been converted into JSX:",
        text: "The markup has been moved into the corresponding components.",
      },
      {
        id: "project-contains",
        points: 4.2,
        text: "Your project contains:",
        details: [
          "An `images` folder.",
          "A `components` folder with JS and CSS files for the components.",
          "A `fonts` folder.",
        ],
      },
      {
        id: "no-lint-errors",
        points: 4.2,
        text: "There are no linting errors or warnings.",
      },
    ],
  },
  {
    title: "Best Practices",
    items: [
      {
        id: "element-states",
        points: 2.16,
        text: "Buttons, input fields, and links are implemented in all of the states specified in the design.",
      },
      {
        id: "reuse-components",
        points: 2.14,
        text: "The design reuses components wherever possible.",
      },
      {
        id: "font-face",
        points: 2.14,
        text: "Fonts are connected using `@font-face`.",
      },
      {
        id: "svg-icons",
        points: 2.14,
        text: "The icons are exported in SVG format.",
      },
      {
        id: "form-focus",
        points: 2.14,
        text: "Form elements should be highlighted when focused.",
      },
      {
        id: "form-placeholders",
        points: 2.14,
        text: "The form must have placeholders, and there are required properties for the fields.",
      },
      {
        id: "no-reset-css",
        points: 2.14,
        text: "The use of `reset.css` is prohibited.",
      },
    ],
  },
  {
    title: "Recommendations",
    items: [
      {
        id: "system-fonts",
        points: 1.67,
        text: "System fonts are connected as alternatives to each of your fonts.",
      },
      {
        id: "alt-attributes",
        points: 1.67,
        text: "Images have an `alt` attribute containing appropriate values.",
      },
      {
        id: "optimized-images",
        points: 1.66,
        text: "Images have been optimized.",
      },
    ],
  },
];
