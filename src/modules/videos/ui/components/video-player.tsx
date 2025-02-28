"use client";

import MuxPlayer from "@mux/mux-player-react";

interface VideoPlayerProps {
  playbackId?: string | null | undefined;
  thumbnailUrl?: string | null | undefined;
  autoPlay?: boolean;
  onPlay?: () => void;
}

export const VideoPlayer = ({
  playbackId,
  thumbnailUrl,
  autoPlay,
  onPlay,
}: VideoPlayerProps) => {
  // if (!playbackId) return null;

  return (
    <MuxPlayer
      playbackId={playbackId || ""}
      poster={thumbnailUrl || "/placeholder.svg"}
      playerInitTime={0}
      autoPlay={autoPlay}
      thumbnailTime={0}
      onPlay={onPlay}
      accentColor="#FF2056"
      className="size-full object-contain"
    />
  );
};
