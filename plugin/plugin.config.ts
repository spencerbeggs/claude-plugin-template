import type { InferPluginCommands, InferPluginPipeline } from "claude-binary-plugin";
import { ClaudeBinaryPlugin } from "claude-binary-plugin";
import { z } from "zod";

const optionsSchema = z.object({
	/** Enable auto-allow for safe bash commands (default: true) */
	EXAMPLE_OPTION: z
		.string()
		.default("true")
		.transform((v) => v !== "false"),
});

/** Inferred options type from schema */
//type PluginOptions = z.infer<typeof optionsSchema>;

const plugin = ClaudeBinaryPlugin.create({
	prefix: "MY_PLUGIN",

	// ─────────────────────────────────────────────────────────────────────────
	// Layer 2: Options with validation and defaults
	// ─────────────────────────────────────────────────────────────────────────
	options: optionsSchema,

	// ─────────────────────────────────────────────────────────────────────────
	// Layer 3: Computed variables from detection pipeline
	// ─────────────────────────────────────────────────────────────────────────
	setup: async () => {
		return {
			foo: "bar",
		};
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Build options
	// ─────────────────────────────────────────────────────────────────────────
	bytecode: true,
	persistLocal: true,

	// ─────────────────────────────────────────────────────────────────────────
	// Hooks - All defined as external files for easier testing
	// ─────────────────────────────────────────────────────────────────────────
	hooks: {
		SessionStart: [
			{
				name: "context",
				description: "Provides environment detection and project context",
				pipeline: "./hooks/context.hook.ts",
			},
		],
	},
});

// ─────────────────────────────────────────────────────────────────────────────
// Type Exports
// ─────────────────────────────────────────────────────────────────────────────

export type Pipeline = InferPluginPipeline<typeof plugin>;
export type Commands = InferPluginCommands<typeof plugin>;

export default plugin;
