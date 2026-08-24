"use client";

import { signIn } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function LimitReachedDialog({
  open,
  onDismiss,
}: {
  open: boolean;
  onDismiss: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={(next) => !next && onDismiss()}>
      <DialogContent className="border-border bg-card p-0 sm:max-w-sm">
        <div className="flex flex-col gap-6 p-6">
          <DialogHeader className="gap-3 text-left">
            <DialogTitle className="text-xl font-semibold text-center leading-7 tracking-tight text-balance">
              You&apos;ve hit your daily quota
            </DialogTitle>
            <DialogDescription className="text-sm leading-6 text-pretty text-center">
              Sign in with Google to keep chatting with TokenMind.
            </DialogDescription>
          </DialogHeader>

          <Button
            className="h-11 w-full rounded-lg text-sm font-medium"
            onClick={() => signIn("google")}
          >
            Continue with Google
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
