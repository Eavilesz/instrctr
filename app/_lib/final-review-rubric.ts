export type RubricItem = {
  id: string;
  text: string;
  points: number;
  /** Rendered once above consecutive items that share the same label. */
  groupLabel?: string;
  /** Rendered once, as a section divider, above consecutive items that share the same label. */
  subsectionTitle?: string;
  /** Static, non-scored descriptive sub-bullets shown under the item. */
  details?: string[];
};

export type RubricSection = {
  title: string;
  items: RubricItem[];
};

export type RubricKind = "regular" | "custom";

export const RUBRIC_LABELS: Record<RubricKind, string> = {
  regular: "Regular Final Project",
  custom: "Custom Final Project",
};

export const MAX_SCORE = 100;

const REGULAR_RUBRIC: RubricSection[] = [
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

const CUSTOM_RUBRIC: RubricSection[] = [
  {
    title: "Mandatory Requirements",
    items: [
      {
        id: "c-responsive-resolutions",
        points: 7.4,
        text: "The project is adapted for different screen resolutions and looks correct on all intermediate resolutions. There is no horizontal scrolling on resolutions of `320px` and up. The scrollbar can't be hidden using the overflow: hidden declaration.",
      },
      {
        id: "c-ui-toolkit-elements",
        points: 7.26,
        text: "Elements specified in the UI toolkit are used correctly (e.g., buttons, forms, text elements, etc).",
      },
      {
        id: "c-bem-classes",
        points: 3.63,
        text: "Classes are named according to BEM specifications.",
      },
      {
        id: "c-semantic-html",
        points: 3.63,
        text: "Semantic HTML is used, meaning that semantic tags are used. All elements are used correctly (e.g., a paragraph must be a paragraph, a list must be a list). The DOM tree structure doesn't consist only of `<div />` containers.",
      },
      {
        id: "c-positioning",
        points: 3.63,
        text: "The correct approach for positioning elements has been chosen and is described using the correct syntax. For example, when positioning an element absolutely, its parent block is relatively positioned.",
      },
      {
        id: "c-flex-grid",
        points: 3.63,
        text: "`flex` or `grid` layouts are used to arrange elements whenever applicable.",
      },
      {
        id: "c-vite-cra",
        points: 3.63,
        text: "Infrastructural project files are created using Vite or CRA.",
      },
      {
        id: "c-jsx-parentheses",
        points: 3.63,
        groupLabel: "The markup has been converted into JSX:",
        text: "The markup is included within parentheses `( )`.",
      },
      {
        id: "c-jsx-components",
        points: 3.63,
        groupLabel: "The markup has been converted into JSX:",
        text: "The markup has been moved into the corresponding components.",
      },
      {
        id: "c-project-contains",
        points: 3.63,
        text: "Your project contains:",
        details: [
          "An `images` folder.",
          "A `components` folder with JS and CSS files for the components.",
          "A `fonts` folder.",
        ],
      },
      {
        id: "c-no-lint-errors",
        points: 3.63,
        text: "There are no linting errors or warnings.",
      },
      {
        id: "c-two-routes",
        points: 3.63,
        subsectionTitle: "React and connecting a third-party API",
        groupLabel: "Routes:",
        text: "There are two separate routes: the root route (`/`) and one other (e.g., `/profile` or `/about`).",
      },
      {
        id: "c-navigation-links",
        points: 3.63,
        subsectionTitle: "React and connecting a third-party API",
        groupLabel: "Routes:",
        text: "Navigation between pages and links to external resources is working correctly. There are no broken links or links leading to an empty anchor on the page, and external links open in a new tab. All project pages can be accessed, and there are no hidden blocks.",
      },
      {
        id: "c-hooks-no-conditionals",
        points: 3.63,
        subsectionTitle: "React and connecting a third-party API",
        groupLabel: "React components:",
        text: "Hooks are not used inside conditional statements or loops.",
      },
      {
        id: "c-hooks-main-function",
        points: 3.63,
        subsectionTitle: "React and connecting a third-party API",
        groupLabel: "React components:",
        text: "Hooks are called in a component's main function.",
      },
      {
        id: "c-class-lifecycle-effects",
        points: 3.63,
        subsectionTitle: "React and connecting a third-party API",
        groupLabel: "React components:",
        text: "For class components, effects are described inside the component lifecycle methods.",
      },
      {
        id: "c-async-api-requests",
        points: 7.26,
        subsectionTitle: "React and connecting a third-party API",
        text: "Asynchronous API requests:",
        details: [
          "Requests can be made through the Fetch API or by using XMLHttpRequest. Third-party libraries (such as axios or jQuery) are not used.",
          "API requests are contained in a separate file.",
          "The chain for processing promises ends with a `catch()` block.",
          "The first `then()` handler returns `res.json`.",
        ],
      },
      {
        id: "c-naming-conventions",
        points: 3.63,
        subsectionTitle: "React and connecting a third-party API",
        text: "Naming:",
        details: [
          "camelCase is used for function and variable names.",
          "Only nouns are used as variable names.",
          "Variable names clearly describe what is stored in them. If the project has several variables with similar data, then those variables have unique but descriptive names.",
          "Descriptive names are used for functions, which reflect what they do.",
          "Function names start with a verb.",
          "JS classes and functional components are named using nouns and start with a capital letter.",
          "Names must not include inappropriate or unclear abbreviations.",
          "Custom hook names start with `use`.",
        ],
      },
      {
        id: "c-no-third-party-libs",
        points: 3.63,
        subsectionTitle: "React and connecting a third-party API",
        text: "No third-party JavaScript libraries are used, unless absolutely necessary. If third-party libraries are connected, then they are used appropriately.",
      },
    ],
  },
  {
    title: "Best Practices",
    items: [
      {
        id: "c-bp-reuse-components",
        points: 1.25,
        subsectionTitle: "Markup and JSX",
        text: "The design reuses components wherever possible.",
      },
      {
        id: "c-bp-font-face",
        points: 1.25,
        subsectionTitle: "Markup and JSX",
        text: "Fonts are connected using `@font-face`.",
      },
      {
        id: "c-bp-svg-icons",
        points: 1.25,
        subsectionTitle: "Markup and JSX",
        text: "The icons are exported in SVG format.",
      },
      {
        id: "c-bp-form-focus",
        points: 1.25,
        subsectionTitle: "Markup and JSX",
        text: "Form elements should be highlighted when focused.",
      },
      {
        id: "c-bp-form-placeholders",
        points: 1.25,
        subsectionTitle: "Markup and JSX",
        text: "The form must have placeholders, and there are required properties for the fields.",
      },
      {
        id: "c-bp-no-reset-css",
        points: 1.25,
        subsectionTitle: "Markup and JSX",
        text: "The use of `reset.css` is prohibited.",
      },
      {
        id: "c-initial-state-types",
        points: 1.25,
        subsectionTitle: "React",
        text: "The initial state of state variables contain the correct data type.",
      },
      {
        id: "c-api-requests-in-app",
        points: 1.25,
        subsectionTitle: "React",
        text: "API requests are described inside the `App` component.",
      },
      {
        id: "c-no-memory-leak",
        points: 1.25,
        subsectionTitle: "React",
        text: "There is no memory leak when hanging handlers. All handlers added with `addEventListener` are removed when the component is unmounted.",
      },
      {
        id: "c-api-error-handling",
        points: 1.25,
        subsectionTitle: "React",
        text: "API error handling:",
        details: ["The user receives a message in the case of an error."],
      },
      {
        id: "c-constants-naming",
        points: 1.25,
        subsectionTitle: "React",
        text: "Non-variable values (hard-coded constants) are named in all capital letters and stored in a separate configuration file.",
      },
      {
        id: "c-popup-open-close",
        points: 1.25,
        subsectionTitle: "React",
        text: "If you are using popups, then correct the opening and closing functionality is implemented. Popups can be closed using the cross button, overlay, or ESC key.",
      },
    ],
  },
  {
    title: "Recommendations",
    items: [
      {
        id: "c-rec-system-fonts",
        points: 0.83,
        subsectionTitle: "Markup and JSX",
        text: "System fonts are connected as alternatives to each of your fonts.",
      },
      {
        id: "c-rec-alt-attributes",
        points: 0.83,
        subsectionTitle: "Markup and JSX",
        text: "Images have an `alt` attribute containing appropriate values.",
      },
      {
        id: "c-rec-optimized-images",
        points: 0.83,
        subsectionTitle: "Markup and JSX",
        text: "Raster and vector images have been optimized.",
      },
      {
        id: "c-rec-react-router-links",
        points: 0.83,
        subsectionTitle: "React",
        text: "For internal links in the application, components from the react-router library are used.",
      },
      {
        id: "c-rec-semantic-blocks",
        points: 0.83,
        subsectionTitle: "React",
        text: "Semantically correct blocks are used for components. No `<div />` or other unnecessary HTML tags are used for components that consist of single-level blocks.",
      },
      {
        id: "c-rec-clean-code",
        points: 0.85,
        subsectionTitle: "React",
        text: "The code is clean and easy to understand:",
        details: [
          "The code is readable and clearly structured. Some parts of the code are explained with comments if needed.",
          "There is no extra code: for example, when a variable is declared but not used, or there is some kind of redundant logic.",
          "The code is formatted in the same way, and the indentation hierarchy is respected.",
        ],
      },
    ],
  },
];

export const RUBRICS: Record<RubricKind, RubricSection[]> = {
  regular: REGULAR_RUBRIC,
  custom: CUSTOM_RUBRIC,
};
