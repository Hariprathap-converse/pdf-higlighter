/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */

const showHighlight = (values: any, isHover?: boolean) => {
  let selected: Selected = {
    coords: values?.coords,
    pageNumber: Number(values?.pageNumber),
    selectedCoords: [],
  };

  clearOldRectangles();
  drawRectangle(JSON.parse(JSON.stringify(selected)), isHover);
};

const clearOldRectangles = () => {
  // Select the iframe element
  const iframe = (window as any).frames[0];

  // Check if the iframe exists
  if (iframe) {
    // Access the document inside the iframe
    const iframeDocument = iframe.document;

    // Select all elements with the class "custom-annotations" inside the iframe
    const annotations = iframeDocument.querySelectorAll(".custom-annotations");

    // Remove each annotation element
    annotations.forEach((annotation: any) => {
      annotation.remove();
    });
  } else {
    console.error("iframe element not found.");
  }
};

const drawRectangle = (selected: Selected, isHover?: boolean) => {
  let pageElement: any;
  const { coords: any, pageNumber } = selected;

  // Get the PDFViewerApplication object and set the current page number
  const PDFViewerApplication = (window as any).frames[0].PDFViewerApplication;
  if (pageNumber > 0) {
    PDFViewerApplication.pdfViewer.currentPageNumber = pageNumber;

    // Get the page view and the viewport for the current page
    const page = PDFViewerApplication.pdfViewer.getPageView(
      PDFViewerApplication.pdfViewer.currentPageNumber - 1
    );

    if (page.canvas != undefined) {
      pageElement = page.canvas.parentElement;

      const viewport = page.viewport;

      // Convert the selected coordinates to a format suitable for drawing on the PDF
      selected.selectedCoords = convertPercentageToPixels(
        convertRectangleCoordsToNativeCoords(
          convertToPercentageAndAddMargin(selected, viewport)
        ),
        pageNumber
      );

      // Loop through each set of coordinates in selectedCoords and draw a rectangle on the PDF for each

      selected.selectedCoords.forEach((rect) => {
        // Convert the rectangle coordinates to viewport coordinates
        const bounds = viewport.convertToViewportRectangle(rect);

        // Create a new div element to represent the rectangle
        const el = document.createElement("div");
        try {
          el.className = "custom-annotations";
          el.style.position = "absolute";
          // el.style.border = "0.3em solid #0d850d";
          el.style.opacity = "0.5";
          el.style.left = `${Math.min(bounds[0], bounds[2]) + 2}px`;
          el.style.top = `${Math.min(bounds[1], bounds[3]) + 7}px`;
          el.style.width = `${Math.abs(bounds[0] - bounds[2]) - 5}px`;
          el.style.height = `${Math.abs(bounds[1] - bounds[3]) - 15}px`;
          el.style.backgroundColor = !isHover ? "yellow" : "green";
        } catch (e) {
          console.error(e);
          el.setAttribute(
            "style",
            `position: absolute; background-color: blue; opacity: 0.4; left: ${Math.min(
              bounds[0],
              bounds[2]
            )}px; top: ${Math.min(bounds[1], bounds[3])}px; width: ${Math.abs(
              bounds[0] - bounds[2]
            )}px; height: ${Math.abs(bounds[1] - bounds[3])}px;`
          );
        }

        pageElement.appendChild(el);
      });
    } else {
      setTimeout(() => {
        drawRectangle(selected);
      }, 50);
    }
  }
};

const convertRectangleCoordsToNativeCoords = (coords: Coords) => {
  return [[coords.xMin, coords.yMin, coords.xMax, coords.yMax]];
};

/**
 * Converts the coordinates of a selected area to percentages and adds margins to prevent rectangle boundaries from overlapping with the text.
 *
 * @param selected - An object containing information about the selected area, including its coordinates.
 * @param viewPort - An optional parameter representing the viewport of the PDF viewer.
 * @returns A Coords object with updated coordinates considering the percentage conversion and added margins.
 */
const convertToPercentageAndAddMargin = (selected: Selected, viewport: any) => {
  let coords = selected.coords;

  // Convert coordinates values from pixels to percentage to facilitate margin adjustments
  coords.xMin = convertValueInPercentage(coords.xMin);
  coords.yMin = convertValueInPercentage(coords.yMin);
  coords.xMax = convertValueInPercentage(coords.xMax);
  coords.yMax = convertValueInPercentage(coords.yMax);

  // Initialize padding values to zero
  let paddingX = 0;
  let paddingY = 0;

  // If default padding configuration is available and greater than zero, assign it to padding variables
  if (
    DEFAULT_CONFIG.hasOwnProperty("defaultRectanglePadding") &&
    DEFAULT_CONFIG.defaultRectanglePadding > 0
  ) {
    paddingX = DEFAULT_CONFIG.defaultRectanglePadding;
    paddingY =
      selected.origin === "SELECTED"
        ? 0
        : DEFAULT_CONFIG.defaultRectanglePadding;
  }

  // Adjust coordinates by applying padding to prevent overlapping with text
  return {
    xMin: coords.xMin - paddingX,
    yMin: invertYAxis(coords.yMin) + paddingY,
    xMax: coords.xMax + paddingX,
    yMax: invertYAxis(coords.yMax) - paddingY,
  };
};

/**
 * Inverts the value on the Y-axis. Given a value, it returns the difference between 100 and the given value.
 * This is used to adapt coordinates when there is a change or inversion in the Y-axis orientation.
 *
 * @param val - The value on the Y-axis that needs to be inverted.
 *
 * @returns The inverted value on the Y-axis.
 */
const invertYAxis = (val: number): number => {
  return 100 - val;
};

/**
 * Converts a given value to a percentage representation by multiplying it by 100.
 * This is useful in scenarios where the input value is in a range of 0-1 and
 * needs to be scaled to a percentage representation.
 *
 * @param val - The input number that needs to be converted to a percentage.
 *
 * @returns The converted value in percentage.
 */
const convertValueInPercentage = (val: number): number => {
  return val * 100;
};

/**
 * Converts coordinates from percentage to pixels based on the page's view port dimensions.
 *
 * @param coords - An array of coordinate arrays, where each coordinate array contains
 *                 four elements representing a bounding box ([xMin, yMin, xMax, yMax]).
 * @param pageNumber - The number of the page for which the conversion is to be done.
 * @returns - An array of coordinate arrays converted to pixel values.
 */
const convertPercentageToPixels = (coords: number[][], pageNumber: number) => {
  // Get the viewport for the specified page number
  var viewPort = getPdfViewPort(pageNumber);

  // Convert each coordinate from percentage to pixels based on the viewport dimensions
  for (let coord of coords) {
    coord[0] = (viewPort.viewBox[2] / 100) * reduceToTens(coord[0]);
    coord[2] = (viewPort.viewBox[2] / 100) * reduceToTens(coord[2]);
    coord[1] = (viewPort.viewBox[3] / 100) * reduceToTens(coord[1]);
    coord[3] = (viewPort.viewBox[3] / 100) * reduceToTens(coord[3]);
  }

  return coords;
};

/**
 * This method retrieves the viewport of a specific page in a PDF document.
 *
 * @param pageNumber - The number of the page for which the viewport needs to be retrieved.
 *                     If not specified, it defaults to the current page number.
 * @returns {PageViewport} - The viewport details of the specified or current page.
 */
const getPdfViewPort = (pageNumber: number) => {
  // Getting the PDFViewerApplication instance from the global window object
  let PDFViewerApplication = (window as any).frames[0].PDFViewerApplication;

  // If pageNumber is not provided, default to the current page number
  if (pageNumber === undefined || pageNumber === null || pageNumber === 0) {
    pageNumber = PDFViewerApplication.pdfViewer.currentPageNumber;
  }

  // Getting the viewport of the second page (index 1)
  const pageviewPort = PDFViewerApplication.pdfViewer.getPageView(0).viewport;

  // Returning the viewport of the requested page
  return pageviewPort;
};

/**
 * Reduces the input value by tens until it is less than 100 using recursion.
 *
 * @param val - The input number that needs to be reduced.
 * @returns - The reduced value.
 */
const reduceToTens = (val: number): number => {
  // Base case: if the value is less than 100, return the value
  if (val < 100) return val;

  // Recursive case: reduce the value by 100 and call the function again
  return reduceToTens(val - 100);
};

export default showHighlight;

// A constant object holding the default configuration settings.
// Object.freeze is used to make the object immutable, preventing any changes to it.
const DEFAULT_CONFIG = Object.freeze({
  defaultRectanglePadding: 1, // Default padding around rectangles
  clearCanvasBeforeHighlighting: true, // Flag to clear canvas before highlighting new text
  highlightTextOnElementFocus: true, // Flag to highlight text when the element gains focus
  highlightAll: true, // Flag to indicate if all occurrences should be highlighted
  pdfGlobalSearch: true, // Flag to enable global search in the PDF
  highlightAtPDFScale: true, // Flag to enable highlighting at the PDF's scale
});

// Class representing coordinates with properties to store the minimum and maximum values for X and Y axis.
interface Coords {
  xMin: number; // Minimum value on the X-axis
  xMax: number; // Maximum value on the X-axis
  yMin: number; // Minimum value on the Y-axis
  yMax: number; // Maximum value on the Y-axis
}

// Class representing selected text with properties to store details like page number, coordinates, and query text.
interface Selected {
  origin?: string; // The origin or source from where the selection is made
  query?: string; // The query text or the text that has been selected
  pageNumber: number; // The page number where the text is selected
  selectedCoords: number[][]; // The coordinates of the selected text
  coords: Coords; // The Coords object representing the bounding coordinates of the selected text
}
/**
 * Highlights all values from a structured data object (like your "c" object).
 * Uses the same rendering logic and visual style as showHighlight().
 */
