import { Command } from "commander";
import { registerTemplateCommands } from "./commands/templates.js";

export default function register(program: Command): void {
  registerTemplateCommands(program);
}
