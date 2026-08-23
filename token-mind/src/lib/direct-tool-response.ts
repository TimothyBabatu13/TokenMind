import { createDataStreamResponse, formatDataStreamPart } from "ai";
import { TOOL_NAMES } from "../../ai/agent/agent";

export function respondWithDirectToolResult(toolName: TOOL_NAMES, resultPayload: any) {
  const toolCallId = crypto.randomUUID();
  return createDataStreamResponse({
    execute: async (dataStream) => {
      dataStream.write(formatDataStreamPart("tool_call", { toolCallId, toolName, args: {} }));
      dataStream.write(formatDataStreamPart("tool_result", { toolCallId, result: resultPayload }));
    },
  });
}

export function respondWithDirectText(text: string) {
  return createDataStreamResponse({
    execute: async (dataStream) => {
      dataStream.write(formatDataStreamPart("text", text));
    },
  });
}