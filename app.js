const DEFAULT_MAPPINGS = [
  {"number":"20","name":"Rounded Base with Raised Supports","kind":"lesson","commands":"Arc, Circle, Extrude, Hole, Chamfer, Rib","material":"Steel, Mild","note":"Build the rounded base, hole, supports, inclined feature and chamfer","params":[["baseRadius",20,"mm"],["centerHoleDiameter",20,"mm"],["supportOffset",10,"mm"],["inclinedFeatureAngle",45,"deg"]]},
  {"number":"21","name":"Contoured Support","kind":"lesson","commands":"Line, Arc, Sketch Fillet, Extrude, Extrude Cut","material":"Aluminum 6061","note":"Extrude the profile, then cut the stepped side areas","params":[["overallProfile",70,"mm"],["roundedEndRadius",20,"mm"],["internalRadius",10,"mm"],["overallHeight",50,"mm"],["overallWidth",40,"mm"]]},
  {"number":"22","name":"Two-Hole Curved Bracket","kind":"lesson","commands":"Arc, Extrude, Fillet, Hole","material":"ABS Plastic","note":"Place one hole on each perpendicular face","params":[["armRadius",20,"mm"],["holeDiameter",20,"mm"],["bodyLength",50,"mm"],["armLength",40,"mm"]]},
  {"number":"23","name":"Internal Staircase","kind":"lesson","commands":"Rectangle, Extrude, Extrude Cut","material":"Acetal Resin, White","note":"Cut the three successive levels from the rectangular block","params":[["bodyLength",50,"mm"],["bodyWidth",40,"mm"],["stepHeight",10,"mm"],["step1Offset",10,"mm"],["step2Offset",20,"mm"],["step3Offset",30,"mm"]]},
  {"number":"24","name":"Inverted Pyramidal / V-Groove Form","kind":"lesson","commands":"Rectangle, Extrude, Work Plane, Loft Cut, Extrude Cut","material":"Acetal Resin, White","note":"Use a work plane and Loft Cut for the converging V-form","params":[["blockLength",40,"mm"],["blockWidth",40,"mm"],["blockHeight",30,"mm"],["openingLength",20,"mm"],["openingWidth",30,"mm"]]},
  {"number":"25","name":"Two-Lug Angle Bracket","kind":"lesson","commands":"Arc, Extrude, Hole, Fillet","material":"ABS Plastic","note":"Extrude the perpendicular plates and cut the two aligned holes","params":[["plateLength",70,"mm"],["plateThickness",10,"mm"],["outerRadius",20,"mm"],["holeDiameter",20,"mm"],["holeSpacing",40,"mm"]]},
  {"number":"26","name":"Base, Post and Gusset","kind":"lesson","commands":"Extrude, Hole, Fillet, Rib","material":"ABS Plastic","note":"Add the diagonal support with Rib after creating the posts","params":[["baseLength",50,"mm"],["baseWidth",40,"mm"],["baseHeight",20,"mm"],["cornerRadius",10,"mm"],["holeDiameter",20,"mm"],["gussetThickness",10,"mm"]]},
  {"number":"27","name":"Rounded Base with Ramp","kind":"lesson","commands":"Arc, Extrude, Hole, Line, Extrude","material":"ABS Plastic","note":"Extrude the D-shaped base, then add the side-profile ramp","params":[["outerDiameter",40,"mm"],["centerHoleDiameter",20,"mm"],["rampHeight",30,"mm"],["rampWidth",20,"mm"],["baseLength",50,"mm"]]},
  {"number":"28","name":"Upright Saddle and Gusset","kind":"lesson","commands":"Extrude, Circle / Arc, Extrude Cut, Rib, Chamfer","material":"Aluminum 6061","note":"Cut the saddle through the upright and finish the gusset/chamfer","params":[["baseLength",70,"mm"],["saddleDiameter",20,"mm"],["gussetAngle",45,"deg"],["wallThickness",10,"mm"],["supportWidth",40,"mm"]]},
  {"number":"29","name":"Opposed Circular Cutouts","kind":"lesson","commands":"Circle, Arc, Trim, Extrude, Extrude Cut","material":"Acetal Resin, White","note":"Trim the opposing arcs, extrude the profile and cut the partial-depth level","params":[["outerArcDiameter",40,"mm"],["cutoutDiameter",20,"mm"],["bodyLength",40,"mm"],["bodyHeight",30,"mm"],["lowerLevel",20,"mm"]]},
  {"number":"30","name":"Corner Mounting Bracket","kind":"lesson","commands":"Extrude, Fillet, Hole, Rib / Extrude","material":"ABS Plastic","note":"Build perpendicular walls, add the inclined support and cut the holes","params":[["baseLength",50,"mm"],["wallThickness",10,"mm"],["holeDiameter",10,"mm"],["transitionRadius",10,"mm"],["supportHeight",30,"mm"]]},
  {"number":"15","name":"Create a centered rectangular slot","kind":"sample","params":[["slotLength",30,"mm"],["slotWidth",10,"mm"],["slotDepth",5,"mm"]]},
  {"number":"42","name":"Add a 2 mm edge fillet","kind":"sample","params":[["filletRadius",2,"mm"]]},
  {"number":"58","name":"Drive a plate thickness","kind":"sample","params":[["plateThickness",6,"mm"]]},
  {"number":"73","name":"Change a pattern count","kind":"sample","params":[["instanceCount",4,"ul"]]},
  {"number":"90","name":"Set an assembly constraint offset","kind":"sample","params":[["offsetDistance",12,"mm"]]},
];

const STORAGE_KEY = "inventor-code-finder-mappings-v2";
const LEGACY_STORAGE_KEY = "inventor-code-finder-mappings";
const BUILTIN_NUMBERS = new Set(DEFAULT_MAPPINGS.map((item) => item.number));
let customMappings = loadCustomMappings();
let mappings = combineMappings();
let pdfText = "";
let pdfDocument = null;
let currentPdfPage = 1;
let activeMapping = mappings.find((mapping) => mapping.number === "20") || mappings[0];
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

// Built-in mappings are stored as data and turned into a complete iLogic rule here.
// Custom mappings typed into the page are shown exactly as the user wrote them.
function buildRule(mapping) {
  const calls = mapping.params.map(([name, value, unit]) => {
    const expression = unit === "ul" ? `"${String(value)}"` : `"${String(value)} ${unit}"`;
    const units = unit === "ul" ? "UnitsTypeEnum.kUnitlessUnits" : `"${unit}"`;
    return `    SetParam(params, "${name}", ${expression}, ${units})`;
  });
  const header = [`' ${mapping.kind === "lesson" ? "Lesson" : "Part"} ${mapping.number} \u2014 ${mapping.name}`];
  if (mapping.commands) header.push(`' Commands: ${mapping.commands}`);
  if (mapping.material) header.push(`' Units: mm | Material: ${mapping.material}`);
  header.push("' Autodesk Inventor 2025 iLogic / VB.NET");
  header.push("'");
  header.push("' This rule creates or updates the named user parameters listed below (edit the values to suit).");
  header.push("' It does NOT draw sketches or features. Build the model first, then link its dimensions to these parameters.");
  if (mapping.note) header.push(`' Modeling reminder: ${mapping.note}`);
  return `${header.join("\n")}

Sub Main()
    Dim doc As Document = ThisDoc.Document
    If doc.DocumentType <> DocumentTypeEnum.kPartDocumentObject And doc.DocumentType <> DocumentTypeEnum.kAssemblyDocumentObject Then
        MessageBox.Show("Open an Inventor part or assembly before running this rule.", "Inventor Code Finder")
        Return
    End If

    Dim params As UserParameters = doc.ComponentDefinition.Parameters.UserParameters
${calls.join("\n")}

    iLogicVb.UpdateWhenDone = True
End Sub

Sub SetParam(params As UserParameters, name As String, expression As String, units As Object)
    For Each existing As UserParameter In params
        If existing.Name = name Then
            existing.Expression = expression
            Return
        End If
    Next
    params.AddByExpression(name, expression, units)
End Sub`;
}

function getRuleCode(mapping) {
  return mapping.params ? buildRule(mapping) : mapping.code;
}

function loadCustomMappings() {
  const readList = (key) => {
    try {
      const saved = JSON.parse(localStorage.getItem(key) || "null");
      return Array.isArray(saved) ? saved : null;
    } catch { return null; }
  };
  const current = readList(STORAGE_KEY);
  if (current) return current.filter((item) => item && item.number && item.code);
  // One-time migration from the first version, which also saved the built-in starters.
  const legacy = readList(LEGACY_STORAGE_KEY) || [];
  const migrated = legacy.filter((item) => item && item.number && item.code && !BUILTIN_NUMBERS.has(item.number));
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated)); } catch { /* storage unavailable */ }
  return migrated;
}
function combineMappings() {
  const builtins = DEFAULT_MAPPINGS.filter((item) => !customMappings.some((custom) => custom.number === item.number));
  return [...customMappings, ...builtins];
}

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

function saveMappings() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(customMappings)); } catch { /* storage unavailable */ } }
function escapeHtml(value) { return String(value).replace(/[&<>"']/g, (character) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;" }[character])); }
function renderCatalog(showAll = false) {
  catalogGrid.innerHTML = (showAll ? mappings : mappings.slice(0, 6)).map((mapping) => `<article class="catalog-card"><button type="button" data-catalog-number="${escapeHtml(mapping.number)}"><span class="catalog-part">PART ${escapeHtml(mapping.number)}</span><strong>${escapeHtml(mapping.name)}</strong></button><small>${getRuleCode(mapping).split("\n").length} lines · click to load</small></article>`).join("");
}
function searchPart(number, { scroll = true } = {}) {
  const normalized = String(number).trim().replace(/^0+(?=\d)/, "");
  if (!normalized) return;
  partInput.value = normalized;
  const mapping = mappings.find((item) => item.number === normalized);
  if (mapping) {
    activeMapping = mapping; resultNumber.textContent = mapping.number; resultName.textContent = mapping.name; const code = getRuleCode(mapping); codeOutput.textContent = code;
    $("#code-lines").textContent = `${code.split("\n").length} lines`;
    resultSource.textContent = pdfText ? "Catalog match · checked against your local PDF" : "From the built-in starter catalog";
    matchBadge.textContent = pdfText ? "PDF + CATALOG MATCH" : "CATALOG MATCH"; resultCard.hidden = false; emptyCard.hidden = true;
    $("#search-message").textContent = `Showing the mapping for part ${normalized}.`;
  } else {
    resultNumber.textContent = normalized; resultCard.hidden = true; emptyCard.hidden = false; matchBadge.textContent = "NO EXACT MATCH";
    $("#search-message").textContent = pdfText && pdfText.toLowerCase().includes(normalized) ? `Part ${normalized} appears in your PDF, but has no code mapping yet.` : `No mapping found for part ${normalized}.`;
  }
  if (scroll) $("#result-section").scrollIntoView({ behavior: "smooth", block: "start" });
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
$("#copy-button").addEventListener("click", async () => { try { await navigator.clipboard.writeText(getRuleCode(activeMapping)); $("#copy-button").innerHTML = "<span aria-hidden=\"true\">✓</span> Copied"; setTimeout(() => { $("#copy-button").innerHTML = "<span aria-hidden=\"true\">▣</span> Copy code"; }, 1600); } catch { $("#search-message").textContent = "Copy is unavailable here; select the code manually."; } });
function downloadRule(extension) {
  const blob = new Blob([getRuleCode(activeMapping)], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `inventor-part-${activeMapping.number}.${extension}`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}
$("#download-button").addEventListener("click", () => downloadRule("iLogicVb"));
$("#download-vb-button").addEventListener("click", () => downloadRule("vb"));
$("#show-all-button").addEventListener("click", (event) => { const showingAll = event.currentTarget.dataset.all === "true"; renderCatalog(!showingAll); event.currentTarget.dataset.all = String(!showingAll); event.currentTarget.innerHTML = !showingAll ? "Show fewer <span aria-hidden=\"true\">↑</span>" : "View all <span aria-hidden=\"true\">→</span>"; });
catalogGrid.addEventListener("click", (event) => { const button = event.target.closest("[data-catalog-number]"); if (button) searchPart(button.dataset.catalogNumber); });
function showMappingForm() { $("#mapping-section").hidden = false; $("#mapping-number").value = partInput.value; $("#mapping-section").scrollIntoView({ behavior: "smooth", block: "start" }); $("#mapping-number").focus(); }
$("#show-mapping-button").addEventListener("click", showMappingForm);
$("#hide-mapping-button").addEventListener("click", () => { $("#mapping-section").hidden = true; });
$("#mapping-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const number = $("#mapping-number").value.trim().replace(/^0+(?=\d)/, "");
  const mapping = { number, name: $("#mapping-name").value.trim(), code: $("#mapping-code").value.trim() };
  customMappings = [mapping, ...customMappings.filter((item) => item.number !== number)];
  mappings = combineMappings();
  saveMappings();
  renderCatalog(false);
  $("#mapping-message").textContent = `Part ${number} saved locally.`;
  event.target.reset();
  searchPart(number);
});
renderCatalog(); searchPart("20", { scroll: false });
