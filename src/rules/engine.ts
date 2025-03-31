
import { Engine } from "json-rules-engine";
import { rules } from "./definitions";

export function createEngine() {
  const engine = new Engine();
  rules.forEach((rule) => engine.addRule(rule));
  return engine;
}
