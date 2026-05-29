"use client";

import React from "react";
import { toast } from "sonner";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ShareButtonProps {
  className?: string;
  title?: string;
  text?: string;
}

export function ShareButton({
  className,
  title = "LevelLens",
  text = "Check out this compensation view on LevelLens!",
}: ShareButtonProps) {
  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
        toast.success("Shared successfully!");
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          copyToClipboard(url);
        }
      }
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!", {
      description: "You can now share this URL with anyone.",
    });
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleShare}
      className={cn("h-8 w-8 rounded-lg shrink-0", className)}
      aria-label="Share this view"
      title="Share this view"
    >
      <Share2 className="h-4 w-4" />
    </Button>
  );
}
