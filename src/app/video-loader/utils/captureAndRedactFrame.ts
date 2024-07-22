import nlp from 'compromise';
import Tesseract from 'tesseract.js';

const defaultOptions = {
  outputFileType: 'image/jpg',
  redactedColor: 'black',
  outlineColor: 'green',
  outlineWidth: 2,
  outputFileQuality: 0.6
};

/**
 * Function to capture, analyze and redact private text content for a video frame at a given time.
 * - Canvas API used to hide sensitive date and capture the image.
 * - [Tesseract](https://www.npmjs.com/package/tesseract.js) OCR used to analyze the image and provide list of words in view.
 * - [Compromise](https://www.npmjs.com/package/compromise) NLP used to analyze the words and provide list of private text values.
 */
export default async function captureAndRedactFrame({
  canvas,
  video,
  options
}: {
  canvas: HTMLCanvasElement;
  video: HTMLVideoElement;
  options?: {
    outputFileType?: 'image/jpg' | 'image/png';
    outputFileQuality?: number;
    redactedColor?: CanvasFillStrokeStyles['fillStyle'];
    outlineColor?: CanvasFillStrokeStyles['strokeStyle'];
    outlineWidth?: CanvasPathDrawingStyles['lineWidth'];
  };
}): Promise<{ dataURL: string }> {
  return new Promise(async (resolve, reject) => {
    // get the canvascontext
    const context = canvas.getContext('2d');

    if (!context) {
      return reject('canvasContext is not available');
    }

    try {
      // draw the video to context
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // create variable to store words and normalizedText from tesseract
      const tesseractWords = await Tesseract.recognize(canvas, 'eng')
        .then((result) => result.data.words)
        .then((words) => ({
          words,
          normalizedText: words
            .map((word) => word.text.trim().toLowerCase())
            .join(' ')
        }));

      // get a set of private text values from compromise
      const privateTextSet = await getPrivateTextSet(
        tesseractWords.normalizedText
      );

      // iterate through all the words returned by tesseract,
      // hide or redact any words that are in the privateTextSet
      // add a border around the unredacted words
      tesseractWords.words.forEach((word) => {
        const lowerCaseText = word.text.toLowerCase();
        const shouldRedact =
          privateTextSet.has(lowerCaseText) ||
          matchesRedactablePattern(lowerCaseText);

        // hide redacted words or add a border around unredacted words on the canvas

        if (shouldRedact) {
          context.fillStyle =
            options?.redactedColor ?? defaultOptions.redactedColor;
          context.fillRect(
            word.bbox.x0,
            word.bbox.y0,
            word.bbox.x1 - word.bbox.x0,
            word.bbox.y1 - word.bbox.y0
          );
        } else {
          context.strokeStyle =
            options?.outlineColor ?? defaultOptions.outlineColor;
          context.lineWidth =
            options?.outlineWidth ?? defaultOptions.outlineWidth;
          context.strokeRect(
            word.bbox.x0,
            word.bbox.y0,
            word.bbox.x1 - word.bbox.x0,
            word.bbox.y1 - word.bbox.y0
          );
        }
      });

      // convert the redacted canvas frame to dataURL
      const redactedDataURL = canvas.toDataURL(
        options?.outputFileType || defaultOptions.outputFileType,
        options?.outputFileQuality || defaultOptions.outputFileQuality
      );
      return resolve({ dataURL: redactedDataURL });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * checks if provided text matches any redactable patterns
 */
function matchesRedactablePattern(text = ''): boolean {
  return ['ffmpeg', 'medium', 'URL', '\\bhttps?://[^\\s]+\\b', '/@w+/'].some(
    (pattern) => new RegExp(pattern, 'i').test(text)
  );
}

/**
 * parses provided text in compromise and returns
 * a set of text values that are considered private
 */
function getPrivateTextSet(normalizedText: string) {
  return new Promise<Set<string>>((resolve, reject) => {
    try {
      const doc = nlp(normalizedText);

      const privateEntities: string[] = [
        ...doc.people().out('array'),
        ...doc.match('#Email').out('array'),
        ...doc.match('#PhoneNumber').out('array'),
        ...doc.urls().out('array'),
        ...doc.match('typescript').out('array'),
        ...doc.match('essentials').out('array')
      ];

      resolve(new Set(privateEntities));
    } catch (error) {
      reject(error);
    }
  });
}
