import { type AuditoryResource } from "@prisma/client";
import { useEffect, useState } from "react";
import Image from "next/image";

type ResourcePhotoProps = (
  | {
      photo: AuditoryResource["photo"];
      src: string | undefined;
    }
  | {
      src: string;
      photo: null;
    }
) & { name: string };

export const ResourcePhoto = (input: ResourcePhotoProps) => {
  const [blobSrc, setBlobSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!input.photo?.data) {
      return;
    }

    const blob = new Blob([input.photo.data], { type: "image/png" });
    setBlobSrc(URL.createObjectURL(blob));
  }, [input.photo]);

  const commonProps = {
    width: 512,
    height: 512,
  };

  if (input.photo?.data) {
    return (
      // Required because blob image processed by client, not server
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className="w-full rounded-xl border border-neutral-400 bg-white drop-shadow-lg"
        src={blobSrc ?? ""}
        alt={`${input.name} logo`}
        {...commonProps}
      />
    );
  }

  return (
    <Image
      className="w-full rounded-xl border border-neutral-400 bg-white drop-shadow-lg"
      src={blobSrc ?? `/resource_logos/${input.src ?? "logo_not_found.png"}`}
      alt={`${input.name} logo`}
      {...commonProps}
    />
  );
};
