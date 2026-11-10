const DEFAULT_MAPPINGS = [
  { number: "15", name: "Create a centered rectangular slot", code: `' Part 15 — Centered rectangular slot
' Autodesk Inventor 2025 iLogic / VB.NET

Dim slotLength As Double = 30
Dim slotWidth As Double = 10
Dim slotDepth As Double = 5

' Update named parameters in the active part
Parameter("slotLength") = slotLength
Parameter("slotWidth") = slotWidth
Parameter("slotDepth") = slotDepth

' Rebuild the model after changing dimensions
iLogicVb.UpdateWhenDone = True` },
  { number: "21", name: "Set a hole diameter", code: `' Part 21 — Set a hole diameter
' Autodesk Inventor 2025 iLogic / VB.NET

Dim holeDiameter As Double = 8
Dim holeDepth As Double = 18

Parameter("holeDiameter") = holeDiameter
Parameter("holeDepth") = holeDepth

iLogicVb.UpdateWhenDone = True` },
  { number: "42", name: "Add a 2 mm edge fillet", code: `' Part 42 — Add a 2 mm edge fillet
' Autodesk Inventor 2025 iLogic / VB.NET

Dim filletRadius As Double = 2
Parameter("filletRadius") = filletRadius

' Keep the feature update explicit for predictable results
iLogicVb.UpdateWhenDone = True` },
  { number: "58", name: "Drive a plate thickness", code: `' Part 58 — Drive a plate thickness
' Autodesk Inventor 2025 iLogic / VB.NET

Dim plateThickness As Double = 6
Parameter("plateThickness") = plateThickness
RuleParametersOutput()
iLogicVb.UpdateWhenDone = True` },
  { number: "73", name: "Change a pattern count", code: `' Part 73 — Change a pattern count
' Autodesk Inventor 2025 iLogic / VB.NET

Dim instanceCount As Integer = 4
Parameter("instanceCount") = instanceCount

iLogicVb.UpdateWhenDone = True` },
  { number: "90", name: "Set an assembly constraint offset", code: `' Part 90 — Set an assembly constraint offset
' Autodesk Inventor 2025 iLogic / VB.NET

Dim offsetDistance As Double = 12
Parameter("offsetDistance") = offsetDistance

iLogicVb.UpdateWhenDone = True` },
];

const STORAGE_KEY = "inventor-code-finder-mappings";
let mappings = loadMappings();
let pdfText = "";
let pdfDocument = null;
let currentPdfPage = 1;
let activeMapping = mappings.find((mapping) => mapping.number === "15") || mappings[0];
const $ = (selector) => document.querySelector(selector);
const partInput = $("#part-number");
const codeOutput = $("#code-output");
const resultNumber = $("#result-number");
const resultName = $("#result-name");
const resultSource = $("#result-source");
const matchBadge = $("#match-badge");
const resultCard = $("#result-card");
const emptyCard = $("#empty-card");
const catalogGrid = $("#catalog-grid");
const fileInput = $("#pdf-input");
const dropzone = $("#dropzone");
const pdfMessage = $("#pdf-message");
const progressWrap = $("#progress-wrap");
const progressBar = $("#progress-bar");
const progressLabel = $("#progress-label");
const progressValue = $("#progress-value");
const sourceSelect = $("#source-select");
const previewSection = $("#pdf-preview-section");
const pdfCanvas = $("#pdf-canvas");

function loadMappings() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!Array.isArray(saved)) return DEFAULT_MAPPINGS;
    return [...DEFAULT_MAPPINGS.filter((item) => !saved.some((savedItem) => savedItem.number === item.number)), ...saved];
  } catch { return DEFAULT_MAPPINGS; }
}
function saveMappings() { localStorage.setItem(STORAGE_KEY, JSON.stringify(mappings)); }
function escapeHtml(value) { return String(value).replace(/[&<>"']/g, (character) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;" }[character])); }
function renderCatalog(showAll = false) {
  catalogGrid.innerHTML = (showAll ? mappings : mappings.slice(0, 6)).map((mapping) => `<article class="catalog-card"><button type="button" data-catalog-number="${escapeHtml(mapping.number)}"><span class="catalog-part">PART ${escapeHtml(mapping.number)}</span><strong>${escapeHtml(mapping.name)}</strong></button><small>${mapping.code.split("\n").length} lines · click to load</small></article>`).join("");
}
function searchPart(number) {
  const normalized = String(number).trim().replace(/^0+(?=\d)/, "");
  if (!normalized) return;
  partInput.value = normalized;
  const mapping = mappings.find((item) => item.number === normalized);
  if (mapping) {
    activeMapping = mapping; resultNumber.textContent = mapping.number; resultName.textContent = mapping.name; codeOutput.textContent = mapping.code;
    $("#code-lines").textContent = `${mapping.code.split("\n").length} lines`;
    resultSource.textContent = pdfText ? "Catalog match · checked against your local PDF" : "From the built-in starter catalog";
    matchBadge.textContent = pdfText ? "PDF + CATALOG MATCH" : "CATALOG MATCH"; resultCard.hidden = false; emptyCard.hidden = true;
    $("#search-message").textContent = `Showing the mapping for part ${normalized}.`;
  } else {
    resultNumber.textContent = normalized; resultCard.hidden = true; emptyCard.hidden = false; matchBadge.textContent = "NO EXACT MATCH";
    $("#search-message").textContent = pdfText && pdfText.toLowerCase().includes(normalized) ? `Part ${normalized} appears in your PDF, but has no code mapping yet.` : `No mapping found for part ${normalized}.`;
  }
  $("#result-section").scrollIntoView({ behavior: "smooth", block: "start" });
}
function updateProgress(value, label) { progressWrap.hidden = false; progressBar.style.width = `${value}%`; progressValue.textContent = `${value}%`; progressLabel.textContent = label; }
async function extractPdf(file) {
  const isPdf = file && (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf"));
  if (!isPdf) { pdfMessage.textContent = "Please choose a PDF file."; return; }
  fileInput.disabled = true; updateProgress(5, "Loading PDF engine…");
  try {
    const pdfjs = await import("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.min.mjs");
    pdfDocument = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise; const pages = [];
    for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber += 1) {
      const page = await pdfDocument.getPage(pageNumber); const content = await page.getTextContent(); pages.push(content.items.map((item) => item.str).join(" "));
      updateProgress(Math.round((pageNumber / pdfDocument.numPages) * 100), `Reading page ${pageNumber} of ${pdfDocument.numPages}…`);
    }
    pdfText = pages.join("\n"); $("#file-status").textContent = `${file.name} · ${pdfDocument.numPages} page${pdfDocument.numPages === 1 ? "" : "s"}`;
    pdfMessage.textContent = `PDF loaded locally. Search can now flag part numbers found in ${file.name}.`; updateProgress(100, "PDF ready");
    $("#preview-page-count").textContent = pdfDocument.numPages;
    currentPdfPage = 1;
    previewSection.hidden = false;
    await renderPdfPage(currentPdfPage);
  } catch (error) { console.error(error); pdfMessage.textContent = "This PDF could not be read in the browser. You can still use the built-in catalog."; progressWrap.hidden = true; }
  finally { fileInput.disabled = false; }
}
async function renderPdfPage(pageNumber) {
  if (!pdfDocument) return;
  const page = await pdfDocument.getPage(pageNumber);
  const viewport = page.getViewport({ scale: 1.35 });
  const context = pdfCanvas.getContext("2d");
  pdfCanvas.width = viewport.width;
  pdfCanvas.height = viewport.height;
  await page.render({ canvasContext: context, viewport }).promise;
  $("#preview-page-number").textContent = pageNumber;
  $("#previous-page").disabled = pageNumber <= 1;
  $("#next-page").disabled = pageNumber >= pdfDocument.numPages;
}
$("#search-form").addEventListener("submit", (event) => { event.preventDefault(); searchPart(partInput.value); });
document.querySelectorAll(".inline-example").forEach((button) => button.addEventListener("click", () => searchPart(button.dataset.example)));
fileInput.addEventListener("change", () => extractPdf(fileInput.files[0]));
sourceSelect.addEventListener("change", async () => {
  if (!sourceSelect.value) return;
  try {
    const response = await fetch(sourceSelect.value);
    if (!response.ok) throw new Error(`Could not load bundled PDF (${response.status})`);
    const blob = await response.blob();
    await extractPdf(new File([blob], "inventor-lessons-1-50.pdf", { type: "application/pdf" }));
  } catch (error) {
    console.error(error);
    pdfMessage.textContent = "The bundled lesson pack could not be loaded. Try refreshing the page.";
  }
});
["dragenter", "dragover"].forEach((eventName) => dropzone.addEventListener(eventName, (event) => { event.preventDefault(); dropzone.classList.add("is-dragging"); }));
["dragleave", "drop"].forEach((eventName) => dropzone.addEventListener(eventName, (event) => { event.preventDefault(); dropzone.classList.remove("is-dragging"); }));
dropzone.addEventListener("drop", (event) => extractPdf(event.dataTransfer.files[0]));
$("#previous-page").addEventListener("click", () => { if (currentPdfPage > 1) { currentPdfPage -= 1; renderPdfPage(currentPdfPage); } });
$("#next-page").addEventListener("click", () => { if (pdfDocument && currentPdfPage < pdfDocument.numPages) { currentPdfPage += 1; renderPdfPage(currentPdfPage); } });
$("#copy-button").addEventListener("click", async () => { try { await navigator.clipboard.writeText(activeMapping.code); $("#copy-button").innerHTML = "<span aria-hidden=\"true\">✓</span> Copied"; setTimeout(() => { $("#copy-button").innerHTML = "<span aria-hidden=\"true\">▣</span> Copy code"; }, 1600); } catch { $("#search-message").textContent = "Copy is unavailable here; select the code manually."; } });
$("#download-button").addEventListener("click", () => { const blob = new Blob([activeMapping.code], { type: "text/plain;charset=utf-8" }); const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = `inventor-part-${activeMapping.number}.vb`; link.click(); URL.revokeObjectURL(link.href); });
$("#show-all-button").addEventListener("click", (event) => { const showingAll = event.currentTarget.dataset.all === "true"; renderCatalog(!showingAll); event.currentTarget.dataset.all = String(!showingAll); event.currentTarget.innerHTML = !showingAll ? "Show fewer <span aria-hidden=\"true\">↑</span>" : "View all <span aria-hidden=\"true\">→</span>"; });
catalogGrid.addEventListener("click", (event) => { const button = event.target.closest("[data-catalog-number]"); if (button) searchPart(button.dataset.catalogNumber); });
function showMappingForm() { $("#mapping-section").hidden = false; $("#mapping-number").value = partInput.value; $("#mapping-section").scrollIntoView({ behavior: "smooth", block: "start" }); $("#mapping-number").focus(); }
$("#show-mapping-button").addEventListener("click", showMappingForm);
$("#hide-mapping-button").addEventListener("click", () => { $("#mapping-section").hidden = true; });
$("#mapping-form").addEventListener("submit", (event) => { event.preventDefault(); const number = $("#mapping-number").value.trim().replace(/^0+(?=\d)/, ""); const mapping = { number, name: $("#mapping-name").value.trim(), code: $("#mapping-code").value.trim() }; mappings = [mapping, ...mappings.filter((item) => item.number !== number)]; saveMappings(); renderCatalog(false); $("#mapping-message").textContent = `Part ${number} saved locally.`; event.target.reset(); searchPart(number); });
renderCatalog(); searchPart("15");
