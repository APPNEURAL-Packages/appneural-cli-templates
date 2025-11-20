import fs from "fs/promises";
import os from "os";
import path from "path";
import { logger, copyDirectory, pathExists } from "@appneural/cli-shared";
import { FileError } from "@appneural/cli-shared";
import { getGlobalTemplatesDir } from "@appneural/cli-shared";

const TEMPLATE_ROOT = getGlobalTemplatesDir();

async function ensureTemplateDirectory(templateName: string): Promise<string> {
  const templatePath = path.join(TEMPLATE_ROOT, templateName);
  if (!(await pathExists(templatePath))) {
    throw new FileError("APPNEURAL template not found", { templateName });
  }
  const stats = await fs.stat(templatePath);
  if (!stats.isDirectory()) {
    throw new FileError("APPNEURAL template path is invalid", { templateName });
  }
  return templatePath;
}

export async function syncTemplates(): Promise<void> {
  logger.info("APPNEURAL templates sync requested (placeholder)");
  // TODO: Download templates from GitHub releases.
}

export async function createProjectFromTemplate(templateName: string, projectName: string): Promise<void> {
  const sourceTemplate = await ensureTemplateDirectory(templateName);
  const destination = path.resolve(projectName);
  await copyDirectory(sourceTemplate, destination);
  logger.success(`APPNEURAL template '${templateName}' copied to ${destination}`);
}
