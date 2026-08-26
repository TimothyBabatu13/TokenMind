import React, { JSX } from "react";
import { GetTrendingTokenUI } from "../tools_invocation_ui/trending-token-ui";
import TokenCard from "../tools_invocation_ui/token-card";
import { TOOL_NAMES } from "../../../ai/agent/agent";
import { ThinkingCard } from "./thinking-card";

interface ToolInvocation {
  toolCallId: string;
  toolName: string | TOOL_NAMES;
  state: "call" | "result" | "partial-call";
  args?: { message: string };
  result?: any;
}

interface Part {
  type: string;
  text?: string;
  toolInvocation?: ToolInvocation;
}

function renderCall(callId: string, message: string, thinkingText: string) {
  return (
    <div key={callId}>
      {message}
      <div>
        <ThinkingCard text={thinkingText} />
      </div>
    </div>
  );
}

export function formatRelativeTime(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  const seconds = Math.floor(diffMs / 1000);
  if (seconds < 60) return rtf.format(-seconds, "second");

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return rtf.format(-minutes, "minute");

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return rtf.format(-hours, "hour");

  const days = Math.floor(hours / 24);
  return rtf.format(-days, "day");
}


function renderResult<C extends React.ComponentType<any>>(
  callId: string,
  Component: C,
  props: React.ComponentProps<C>,
  source?: string,
  fetchedAt?: string
) {
  return (
    <div key={callId}>
      <Component {...props} />
      {source && (
        <p className="text-[11px] text-muted-foreground mt-1">
          Source: {source}
          {fetchedAt && ` · ${formatRelativeTime(fetchedAt)}`}
        </p>
      )}
    </div>
  );
}


const toolConfig: Partial<Record<
  ToolInvocation["toolName"],
  {
    call?: (callId: string, args?: ToolInvocation["args"]) => JSX.Element;
    result?: (callId: string, result?: ToolInvocation["result"]) => JSX.Element;
  }
>> = {
  GET_TRENDING_TOKEN: {
    call: (callId, args) =>
      renderCall(callId, args?.message ?? "", "Trending Token Ai Agent thinking"),
    result: (callId, result) =>
      renderResult(
        callId,
        GetTrendingTokenUI,
        {
          data: result?.result?.body?.tokens,
          prices: result?.result?.body?.prices,
        },
        result?.result?.source,
        result?.result?.fetchedAt
      ),
  },
  GET_TOKEN_INFO: {
    call: (callId, args) =>
      renderCall(callId, args?.message ?? "", "Token Info Ai Agent thinking"),
    result: (callId, result) =>
      renderResult(
        callId,
        TokenCard,
        {
          data: result?.res?.body?.response.data
        },
        result?.res?.source,
        result?.res?.fetchedAt
      ),
  },
};


export function ToolRenderer({ parts }: { parts: Part[] }) {
  return (
    <div>
      {parts.map((part) => {
        if (!part.toolInvocation) return null;
        const { toolCallId, toolName, state, args, result } = part.toolInvocation;

        if (state === "partial-call") {
          return (
            <div key={toolCallId}>
              <ThinkingCard text="Agent is still thinking..." />
            </div>
          );
        }

        const renderer = toolConfig[toolName as TOOL_NAMES]?.[state];
        return renderer ? renderer(toolCallId, state === "call" ? args : result) : null;
      })}
    </div>
  );
}
