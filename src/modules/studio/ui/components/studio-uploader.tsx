import MuxUploader, {
  MuxUploaderDrop,
  MuxUploaderFileSelect,
  MuxUploaderProgress,
  MuxUploaderStatus,
} from "@mux/mux-uploader-react";
import { UploadIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface StudioUploaderProps {
  endpoint?: string | null;
  onSuccess: () => void;
}

const UPLOADER_ID = "video-uploader";

export const StudioUploader = ({
  onSuccess,
  endpoint,
}: StudioUploaderProps) => {
  return (
    <div className="">
      <MuxUploader
        id={UPLOADER_ID}
        endpoint={endpoint}
        onSuccess={onSuccess}
        className="group/uploader hidden"
      />
      <MuxUploaderDrop muxUploader={UPLOADER_ID} className="group/drop">
        <div slot="heading" className="flex flex-col items-center gap-6">
          <div className="flex size-32 items-center justify-center gap-2 rounded-full bg-muted">
            <UploadIcon className="group/drop-[&[active]]:animate-bounce size-10 text-muted-foreground transition-all duration-300" />
          </div>
          <div className="flex flex-col gap-2 text-center">
            <p className="text-sm">Drag and Drop video files to upload</p>
            <p className="text-xs text-muted-foreground">
              Your videos will be private until you publish them
            </p>
          </div>
          <MuxUploaderFileSelect muxUploader={UPLOADER_ID}>
            <Button type="button" className="rounded-full">
              Select files
            </Button>
          </MuxUploaderFileSelect>
        </div>
        <span slot="separator" className="hidden" />
        <MuxUploaderStatus muxUploader={UPLOADER_ID} className="text-sm" />
        <MuxUploaderProgress
          muxUploader={UPLOADER_ID}
          className="text-sm"
          type="percentage"
        />
        <MuxUploaderProgress muxUploader={UPLOADER_ID} type="bar" />
      </MuxUploaderDrop>
    </div>
  );
};
