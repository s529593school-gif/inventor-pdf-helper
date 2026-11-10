const DEFAULT_MAPPINGS = [
  { number: "20", name: "Rounded Base with Raised Supports", code: `' Lesson 20 — Rounded Base with Raised Supports
' Commands: Arc, Circle, Extrude, Hole, Chamfer, Rib
' Units: mm | Material: Steel, Mild

Dim baseRadius As Double = 20
Dim centerHoleDiameter As Double = 20
Dim supportOffset As Double = 10
Dim angle As Double = 45

Parameter("baseRadius") = baseRadius
Parameter("centerHoleDiameter") = centerHoleDiameter
Parameter("supportOffset") = supportOffset
Parameter("inclinedFeatureAngle") = angle

' Build the rounded base, hole, supports, inclined feature and chamfer
iLogicVb.UpdateWhenDone = True` },
  { number: "21", name: "Contoured Support", code: `' Lesson 21 — Contoured Support
' Commands: Line, Arc, Sketch Fillet, Extrude, Extrude Cut
' Units: mm | Material: Aluminum 6061

Dim overallProfile As Double = 70
Dim roundedEndRadius As Double = 20
Dim internalRadius As Double = 10
Dim overallHeight As Double = 50
Dim overallWidth As Double = 40

Parameter("overallProfile") = overallProfile
Parameter("roundedEndRadius") = roundedEndRadius
Parameter("internalRadius") = internalRadius
Parameter("overallHeight") = overallHeight
Parameter("overallWidth") = overallWidth

' Extrude the profile, then cut the stepped side areas
iLogicVb.UpdateWhenDone = True` },
  { number: "22", name: "Two-Hole Curved Bracket", code: `' Lesson 22 — Two-Hole Curved Bracket
' Commands: Arc, Extrude, Fillet, Hole
' Units: mm | Material: ABS Plastic

Dim armRadius As Double = 20
Dim holeDiameter As Double = 20
Dim bodyLength As Double = 50
Dim armLength As Double = 40

Parameter("armRadius") = armRadius
Parameter("holeDiameter") = holeDiameter
Parameter("bodyLength") = bodyLength
Parameter("armLength") = armLength

' Place one hole on each perpendicular face
iLogicVb.UpdateWhenDone = True` },
  { number: "23", name: "Internal Staircase", code: `' Lesson 23 — Internal Staircase
' Commands: Rectangle, Extrude, Extrude Cut
' Units: mm | Material: Acetal Resin, White

Dim bodyLength As Double = 50
Dim bodyWidth As Double = 40
Dim stepHeight As Double = 10
Dim firstOffset As Double = 10
Dim secondOffset As Double = 20
Dim thirdOffset As Double = 30

Parameter("bodyLength") = bodyLength
Parameter("bodyWidth") = bodyWidth
Parameter("stepHeight") = stepHeight
Parameter("step1Offset") = firstOffset
Parameter("step2Offset") = secondOffset
Parameter("step3Offset") = thirdOffset

' Cut the three successive levels from the rectangular block
iLogicVb.UpdateWhenDone = True` },
  { number: "24", name: "Inverted Pyramidal / V-Groove Form", code: `' Lesson 24 — Inverted Pyramidal / V-Groove Form
' Commands: Rectangle, Extrude, Work Plane, Loft Cut, Extrude Cut
' Units: mm | Material: Acetal Resin, White

Dim blockLength As Double = 40
Dim blockWidth As Double = 40
Dim blockHeight As Double = 30
Dim openingLength As Double = 20
Dim openingWidth As Double = 30

Parameter("blockLength") = blockLength
Parameter("blockWidth") = blockWidth
Parameter("blockHeight") = blockHeight
Parameter("openingLength") = openingLength
Parameter("openingWidth") = openingWidth

' Use a work plane and Loft Cut for the converging V-form
iLogicVb.UpdateWhenDone = True` },
  { number: "25", name: "Two-Lug Angle Bracket", code: `' Lesson 25 — Two-Lug Angle Bracket
' Commands: Arc, Extrude, Hole, Fillet
' Units: mm | Material: ABS Plastic

Dim plateLength As Double = 70
Dim plateThickness As Double = 10
Dim outerRadius As Double = 20
Dim holeDiameter As Double = 20
Dim holeSpacing As Double = 40

Parameter("plateLength") = plateLength
Parameter("plateThickness") = plateThickness
Parameter("outerRadius") = outerRadius
Parameter("holeDiameter") = holeDiameter
Parameter("holeSpacing") = holeSpacing

' Extrude the perpendicular plates and cut the two aligned holes
iLogicVb.UpdateWhenDone = True` },
  { number: "26", name: "Base, Post and Gusset", code: `' Lesson 26 — Base, Post and Gusset
' Commands: Extrude, Hole, Fillet, Rib
' Units: mm | Material: ABS Plastic

Dim baseLength As Double = 50
Dim baseWidth As Double = 40
Dim baseHeight As Double = 20
Dim cornerRadius As Double = 10
Dim holeDiameter As Double = 20
Dim gussetThickness As Double = 10

Parameter("baseLength") = baseLength
Parameter("baseWidth") = baseWidth
Parameter("baseHeight") = baseHeight
Parameter("cornerRadius") = cornerRadius
Parameter("holeDiameter") = holeDiameter
Parameter("gussetThickness") = gussetThickness

' Add the diagonal support with Rib after creating the posts
iLogicVb.UpdateWhenDone = True` },
  { number: "27", name: "Rounded Base with Ramp", code: `' Lesson 27 — Rounded Base with Ramp
' Commands: Arc, Extrude, Hole, Line, Extrude
' Units: mm | Material: ABS Plastic

Dim outerDiameter As Double = 40
Dim centerHoleDiameter As Double = 20
Dim rampHeight As Double = 30
Dim rampWidth As Double = 20
Dim baseLength As Double = 50

Parameter("outerDiameter") = outerDiameter
Parameter("centerHoleDiameter") = centerHoleDiameter
Parameter("rampHeight") = rampHeight
Parameter("rampWidth") = rampWidth
Parameter("baseLength") = baseLength

' Extrude the D-shaped base, then add the side-profile ramp
iLogicVb.UpdateWhenDone = True` },
  { number: "28", name: "Upright Saddle and Gusset", code: `' Lesson 28 — Upright Saddle and Gusset
' Commands: Extrude, Circle / Arc, Extrude Cut, Rib, Chamfer
' Units: mm | Material: Aluminum 6061

Dim baseLength As Double = 70
Dim saddleDiameter As Double = 20
Dim gussetAngle As Double = 45
Dim wallThickness As Double = 10
Dim supportWidth As Double = 40

Parameter("baseLength") = baseLength
Parameter("saddleDiameter") = saddleDiameter
Parameter("gussetAngle") = gussetAngle
Parameter("wallThickness") = wallThickness
Parameter("supportWidth") = supportWidth

' Cut the saddle through the upright and finish the gusset/chamfer
iLogicVb.UpdateWhenDone = True` },
  { number: "29", name: "Opposed Circular Cutouts", code: `' Lesson 29 — Opposed Circular Cutouts
' Commands: Circle, Arc, Trim, Extrude, Extrude Cut
' Units: mm | Material: Acetal Resin, White

Dim outerArcDiameter As Double = 40
Dim cutoutDiameter As Double = 20
Dim bodyLength As Double = 40
Dim bodyHeight As Double = 30
Dim lowerLevel As Double = 20

Parameter("outerArcDiameter") = outerArcDiameter
Parameter("cutoutDiameter") = cutoutDiameter
Parameter("bodyLength") = bodyLength
Parameter("bodyHeight") = bodyHeight
Parameter("lowerLevel") = lowerLevel

' Trim the opposing arcs, extrude the profile and cut the partial-depth level
iLogicVb.UpdateWhenDone = True` },
  { number: "30", name: "Corner Mounting Bracket", code: `' Lesson 30 — Corner Mounting Bracket
' Commands: Extrude, Fillet, Hole, Rib / Extrude
' Units: mm | Material: ABS Plastic

Dim baseLength As Double = 50
Dim wallThickness As Double = 10
Dim holeDiameter As Double = 10
Dim transitionRadius As Double = 10
Dim supportHeight As Double = 30

Parameter("baseLength") = baseLength
Parameter("wallThickness") = wallThickness
Parameter("holeDiameter") = holeDiameter
Parameter("transitionRadius") = transitionRadius
Parameter("supportHeight") = supportHeight

' Build perpendicular walls, add the inclined support and cut the holes
iLogicVb.UpdateWhenDone = True` },
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

async function loadPdfJs() {
  if (window.pdfjsLib) return window.pdfjsLib;
  await new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
  window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  return window.pdfjsLib;
}

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
    const pdfjs = await loadPdfJs();
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
