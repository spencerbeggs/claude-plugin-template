import type { Pipeline } from "../plugin.config.js";

/**
 * Format and return session info as additional context.
 * Detection runs in setup, but formatting happens here to avoid
 * persisting large markdown strings to the env file.
 */
const handler: Pipeline["SessionStart"] = ({ state }) => {
	return {
		status: "executed",
		action: "context",
		summary: `${state.foo} is the value of foo from setup`,
		claudeContext: "Hello, world!",
	};
};

export default handler;
