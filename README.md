# Inventor Code Finder

Inventor Code Finder is a free, static GitHub Pages website for Autodesk Inventor 2025 schoolwork. Students can search a built-in catalog of iLogic / VB.NET examples, upload an assignment PDF for local text extraction, copy code, download an `.iLogicVb` (or `.vb`) file, and add their own mappings.

## Privacy and limitations

- PDFs are read in the browser with [PDF.js](https://mozilla.github.io/pdf.js/); no file is uploaded to a server.
- There is no backend, API key, account, or AI generation step.
- PDF text extraction helps confirm that a part number appears in an assignment. The built-in catalog (and mappings added by the user) supplies the actual code.
- The bundled `assets/inventor-lessons-1-50.pdf` pack can be selected from the page. It includes rendered-page navigation so image-based drawings and dimensions can be inspected visually; image-only dimensions are not automatically OCR'd.
- Lessons 20–30 from the supplied packet are included as ready-to-run iLogic rules. Each one creates or updates the lesson's named user parameters (mm, degrees, or unitless) in the open part or assembly. They do **not** draw sketches or features; build the geometry in Inventor and link dimensions to the parameters.
- Parts 15, 42, 58, 73 and 90 are generic sample mappings, not lessons from the PDF.
- The sample code is a starting point. Review parameters and feature names before running any iLogic rule in Inventor.
- Custom mappings are stored in the browser's `localStorage` (key `inventor-code-finder-mappings-v2`) and are private to that browser/profile. Only your own mappings are saved; built-in ones always come from `app.js`. Mappings saved by the first version are migrated automatically.

## Use a rule in Inventor 2025

The page has a full step-by-step guide (section **Run the rule in Inventor 2025**). In short: copy the code, then in Inventor use **Manage → iLogic → Add Rule**, paste, Save, and Run Rule from the iLogic browser. Check **Manage → Parameters** for the results.

## Run locally

```bash
python3 -m http.server 8000
```

Open <http://localhost:8000>.

## Deploy to GitHub Pages

1. Push this repository to GitHub.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Choose `main` and the `/ (root)` folder, then select **Save**.
5. Open the Pages URL shown in settings after publishing completes.

The site is plain HTML, CSS, and JavaScript, so no build command or secret configuration is required.

## Add catalog mappings

Use **Add a part mapping** in the page for a local addition. For shared starter mappings, add an entry to `DEFAULT_MAPPINGS` in `app.js` (`number`, `name`, `kind`, `params` as `[name, value, "mm" | "deg" | "ul"]`), then commit and redeploy.
