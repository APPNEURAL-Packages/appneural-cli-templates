import { logger } from "@appneural/cli-shared";
import { withTelemetry } from "@appneural/cli-shared";
import { withSpinner } from "@appneural/cli-shared";
import { ValidationError } from "@appneural/cli-shared";
import { createProjectFromTemplate, syncTemplates } from "../services/template.service.js";
const AVAILABLE_TEMPLATES = [
    "microservice-rest",
    "microservice-graphql",
    "ui-admin",
    "ui-portal",
    "infra-cdk"
];
export function registerTemplateCommands(program) {
    const templates = program.command("templates").description("APPNEURAL template catalogue");
    templates
        .command("list")
        .description("List APPNEURAL templates")
        .action(() => withTelemetry("templates:list", async () => {
        await withSpinner("Loading APPNEURAL templates", async () => {
            await new Promise((resolve) => setTimeout(resolve, 200));
        });
        AVAILABLE_TEMPLATES.forEach((template) => logger.info(`APPNEURAL template: ${template}`));
    }));
    templates
        .command("sync")
        .description("Sync APPNEURAL template registry")
        .action(() => withTelemetry("templates:sync", async () => {
        await withSpinner("Syncing APPNEURAL templates", syncTemplates);
        logger.success("APPNEURAL templates synchronized");
    }));
    templates
        .command("new <template> <project>")
        .description("Generate a project from an APPNEURAL template")
        .action((template, project) => withTelemetry("templates:new", async () => {
        if (!AVAILABLE_TEMPLATES.includes(template)) {
            throw new ValidationError("APPNEURAL template not found", { template });
        }
        if (!project) {
            throw new ValidationError("APPNEURAL project path required");
        }
        await withSpinner("Generating APPNEURAL template", async () => createProjectFromTemplate(template, project));
        logger.success(`APPNEURAL template '${template}' created at ${project}`);
    }));
}
//# sourceMappingURL=templates.js.map