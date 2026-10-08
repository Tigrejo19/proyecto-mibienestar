"use strict";

const fs = require("node:fs");
const assert = require("node:assert/strict");

const html = fs.readFileSync("index.html", "utf8");
const policyRoot = "https://tigrejo19.github.io/politicaprivacidad-mibienestar/";
for (const resource of [
  policyRoot,
  policyRoot + "terminos.html",
  policyRoot + "eliminar-cuenta.html",
  policyRoot + "aviso-legal.html",
]) {
  assert.ok(html.includes(`href="${resource}"`), `Missing legal source: ${resource}`);
}
assert.match(html, /<html lang="es">/i);
assert.match(html, /<meta name="viewport"/i);
assert.match(html, /no es un dispositivo médico/i);
assert.match(html, /no (está destinada a )?diagnosticar, tratar, curar ni prevenir enfermedades/i);
for (const forbidden of [
  /precisión diagnóstica/i,
  /diagnosticar correctamente/i,
  /fiabilidad de nivel clínico/i,
  /riesgo cardiovascular alto \(detectado/i,
  /precisión muy superior/i,
  /diagnóstico diferencial/i,
]) {
  assert.doesNotMatch(html, forbidden, `Medical claim requires review: ${forbidden}`);
}
assert.doesNotMatch(html, /<script\b/i, "Project page must remain script-free");
assert.doesNotMatch(html, /http:\/\//i, "Insecure HTTP link is forbidden");
console.log("Project documentation guard passed.");
