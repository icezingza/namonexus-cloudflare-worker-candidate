import { useEffect } from "react";

type SeoHeadProps = {
  title: string;
  description: string;
  path: string;
};

function upsertMeta(name: string, content: string) {
  let element =
    document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`) ??
    document.head.querySelector<HTMLMetaElement>(
      `meta[data-namonexus-seo="${name}"]`,
    );
  if (!element) {
    element = document.createElement("meta");
    element.dataset.namonexusSeo = name;
    document.head.appendChild(element);
  }
  element.name = name;
  element.content = content;
}

export default function SeoHead({ title, description, path }: SeoHeadProps) {
  useEffect(() => {
    document.title = title;
    upsertMeta("description", description);
    upsertMeta("robots", "index,follow");

    let canonical = document.head.querySelector<HTMLLinkElement>(
      'link[data-namonexus-seo="canonical"]',
    );
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      canonical.dataset.namonexusSeo = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = new URL(path, window.location.origin).toString();
  }, [description, path, title]);

  return null;
}
